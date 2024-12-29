import { createDepartment, getBriefDepartments, getDepartments } from "@/controllers/departments";
import express from "express";
const departmentRouter = express.Router();

departmentRouter.post("/departments", createDepartment);
departmentRouter.get("/departments", getDepartments);
departmentRouter.get("/departments/brief", getBriefDepartments);
// departmentRouter.get("/customers/:id", getCustomerById);
// departmentRouter.get("/api/v2/customers", getV2Customers);

export default departmentRouter;
