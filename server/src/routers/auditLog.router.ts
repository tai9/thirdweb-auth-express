import express from "express";
import auditController from "../controllers/auditLog.controller";

const auditLogRouters = express.Router();

auditLogRouters.get("/", auditController.getAuditLogs);

export default auditLogRouters;
