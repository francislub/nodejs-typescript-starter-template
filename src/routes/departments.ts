import { createDepartment, getDepartments } from "@/controllers/departments";
import express from "express";
const departmentRouter = express.Router();

departmentRouter.post("/departments", createDepartment);
departmentRouter.get("/departments", getDepartments);
// departmentRouter.get("/customers/:id", getCustomerById);
// departmentRouter.get("/api/v2/customers", getV2Customers);

export default departmentRouter;
