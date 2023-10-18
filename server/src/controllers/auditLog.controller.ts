import { Request, Response } from "express";
import { constants } from "http2";
import auditService from "../services/audit.service";

const getAuditLogs = async (req: Request, res: Response) => {
  try {
    const data = await auditService.getAuditLogs();
    return res.status(constants.HTTP_STATUS_OK).json(data);
  } catch (error) {
    console.log(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

export default {
  getAuditLogs,
};
