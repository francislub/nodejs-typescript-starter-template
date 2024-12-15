import { createClass, createStream, getClasses, getStreams } from "@/controllers/classes";
import express from "express";
const classRouter = express.Router();

classRouter.post("/classes", createClass);
classRouter.get("/classes", getClasses);
classRouter.post("/streams", createStream);
classRouter.get("/streams", getStreams);
// schoolRouter.get("/customers/:id", getCustomerById);
// schoolRouter.get("/api/v2/customers", getV2Customers);

export default classRouter;
