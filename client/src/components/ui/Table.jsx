import React from "react";

export default function Table({ data = [], columns = [] }) {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key} className="border p-2 text-left">
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} className="odd:bg-gray-50">
            {columns.map((col) => (
              <td key={col.key} className="border p-2">
                {row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
