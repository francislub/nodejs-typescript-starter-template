import { createParent, getParents } from "@/controllers/parents";
import express from "express";
const parentRouter = express.Router();

parentRouter.post("/parents", createParent);
parentRouter.get("/parents", getParents);
// parentRouter.get("/customers/:id", getCustomerById);
// parentRouter.get("/api/v2/customers", getV2Customers);

export default parentRouter;
