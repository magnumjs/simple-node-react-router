const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json()); // 👈 Add this line to parse JSON bodies

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Node.js backend!" });
});

app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

app.post("/api/echo", (req, res) => {
  // Example of handling JSON POST
  const { name } = req.body;
  res.json({ message: `Hi ${name}, nice to meet you!` });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
