import { AppDataSource } from "../configs/db.config";
import { AuditLog, IAuditLog } from "../entities";

const auditLogRepository = AppDataSource.getRepository(AuditLog);

const createAuditLog = async (data: Partial<IAuditLog>) => {
  try {
    const audit = new AuditLog();
    audit.type = data.type;
    audit.status = data.status;
    audit.description = data.description;
    audit.createdBy = data.createdBy;
    audit.data = data.data;

    return await auditLogRepository.save(audit);
  } catch (err) {
    throw err;
  }
};

const getAuditLogs = async () => {
  try {
    const [data, count] = await auditLogRepository.findAndCount();
    return { data, count };
  } catch (err) {
    throw err;
  }
};

export default {
  createAuditLog,
  getAuditLogs,
};
