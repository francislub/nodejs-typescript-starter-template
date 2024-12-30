import express from "express";
import schoolRouter from "./routes/school";
import adminRouter from "./routes/admin";
import classRouter from "./routes/classes";
import parentRouter from "./routes/parents";
import studentRouter from "./routes/students";
import departmentRouter from "./routes/departments";
import subjectRouter from "./routes/subjects";
import teacherRouter from "./routes/teachers";
import userRouter from "./routes/users";

require("dotenv").config();
const cors = require("cors");
const app = express();

app.use(cors());

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`); // Log a message indicating the server is running
});

app.use("/api/v1", schoolRouter);
app.use("/api/v1", adminRouter);
app.use("/api/v1", classRouter);
app.use("/api/v1", parentRouter);
app.use("/api/v1", studentRouter);
app.use("/api/v1", departmentRouter);
app.use("/api/v1", subjectRouter);
app.use("/api/v1", teacherRouter);
app.use("/api/v1", userRouter);
