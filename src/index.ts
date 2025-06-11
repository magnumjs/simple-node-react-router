import * as fs from 'fs';
import * as path from 'path';

interface PackageInfo {
  name: string;
  path: string;
  size: number;     // in bytes
  fileCount: number;
}

// Recursively get total size and file count of a directory
function getDirStats(dirPath: string): { size: number, count: number } {
  let totalSize = 0;
  let fileCount = 0;

  function walk(currentPath: string) {
    const stats = fs.statSync(currentPath);

    if (stats.isDirectory()) {
      const entries = fs.readdirSync(currentPath);
      entries.forEach(entry => walk(path.join(currentPath, entry)));
    } else if (stats.isFile()) {
      totalSize += stats.size;
      fileCount += 1;
    }
  }

  try {
    walk(dirPath);
  } catch (err) {
    console.error(`Failed to read ${dirPath}:`, err);
  }

  return { size: totalSize, count: fileCount };
}

// Get list of top-level packages in node_modules
function getNodeModulesPackages(baseDir: string): PackageInfo[] {
  const nmPath = path.join(baseDir, 'node_modules');
  const packages: PackageInfo[] = [];

  if (!fs.existsSync(nmPath)) {
    console.error('node_modules directory not found.');
    return packages;
  }

  const entries = fs.readdirSync(nmPath);

  for (const entry of entries) {
    const packagePath = path.join(nmPath, entry);

    // Scoped packages
    if (entry.startsWith('@')) {
      const scopedEntries = fs.readdirSync(packagePath);
      for (const scoped of scopedEntries) {
        const fullScopedPath = path.join(packagePath, scoped);
        const { size, count } = getDirStats(fullScopedPath);
        packages.push({ name: `${entry}/${scoped}`, path: fullScopedPath, size, fileCount: count });
      }
    } else {
      const { size, count } = getDirStats(packagePath);
      packages.push({ name: entry, path: packagePath, size, fileCount: count });
    }
  }

  return packages;
}

// Sort by size and file count (weight)
function sortPackages(packages: PackageInfo[]): PackageInfo[] {
  return packages.sort((a, b) => {
    if (b.size !== a.size) return b.size - a.size;
    return b.fileCount - a.fileCount;
  });
}

// Run
const packages = getNodeModulesPackages(process.cwd());
const sorted = sortPackages(packages);

// Output
console.log(`\nSorted node_modules packages by size and file count:\n`);
sorted.forEach(pkg => {
  console.log(`${pkg.name.padEnd(40)} | Size: ${(pkg.size / 1024 / 1024).toFixed(2)} MB | Files: ${pkg.fileCount}`);
});
