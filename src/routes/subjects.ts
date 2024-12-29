import { createSubject, getBriefSubjects, getSubjects } from "@/controllers/subjects";
import express from "express";
const subjectRouter = express.Router();

subjectRouter.post("/subjects", createSubject);
subjectRouter.get("/subjects", getSubjects);
subjectRouter.get("/subjects/brief", getBriefSubjects);
// subjectRouter.get("/customers/:id", getCustomerById);
// subjectRouter.get("/api/v2/customers", getV2Customers);

export default subjectRouter;
