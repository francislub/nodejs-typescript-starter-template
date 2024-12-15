import { createClass, getClasses } from "@/controllers/classes";
import express from "express";
const classRouter = express.Router();

classRouter.post("/classes", createClass);
classRouter.get("/classes", getClasses);
classRouter.post("/classes", createClass);
classRouter.get("/classes", getClasses);
// schoolRouter.get("/customers/:id", getCustomerById);
// schoolRouter.get("/api/v2/customers", getV2Customers);

export default classRouter;
