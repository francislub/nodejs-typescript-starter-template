import { createStudent, getNextStudentSquence, getStudents } from "@/controllers/students";
import express from "express";
const studentRouter = express.Router();

studentRouter.post("/students", createStudent);
studentRouter.get("/students", getStudents);
studentRouter.get("/students/seq", getNextStudentSquence);
// studentRouter.get("/customers/:id", getCustomerById);
// studentRouter.get("/api/v2/customers", getV2Customers);

export default studentRouter;
