const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const uploadRoute = require("./routes/uploads");

const app = express();

const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend/src")));
app.use("/uploads", express.static(uploadsDir));
app.use("/api/upload", uploadRoute);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/src/index.html"));
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});