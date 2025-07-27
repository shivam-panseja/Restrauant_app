const express = require("express");
const dbConnect = require("./database/dbConnect");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config();
dbConnect();
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
//routes
// app.use("/api/v1", require("./routes/testRoutes"));
app.use("/api/v1", require("./routes/authRoutes"));
app.use("/api/v1", require("./routes/userRoute"));
app.get("/", (req, res) => {
  res.status(200).json({ Status: "Server is running successfully" });
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server started on port http://localhost:${port}`.bgCyan);
});
