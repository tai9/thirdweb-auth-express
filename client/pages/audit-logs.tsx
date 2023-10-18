import axios from "axios";
import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { DataWithPagination } from "../types/common";
import { IRole } from "../types/role";
import { IAuditLog } from "../types/audit";
import { formatDate } from "../utils/formatDate";

const AuditLogsPage: NextPage = () => {
  const [roles, setRoles] = useState<DataWithPagination<IAuditLog>>({
    data: [],
    count: 0,
  });
  useEffect(() => {
    fetchRoles();
  }, []);
  const fetchRoles = async () => {
    try {
      const { data } = await axios.get("/api/audit-logs");
      setRoles(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Role count: {roles.count}</h2>
      {roles.count !== 0 && (
        <table>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Data</th>
            <th>Created by</th>
            <th>Created at</th>
            <th></th>
          </tr>
          {roles.data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.type}</td>
              <td>{item.description || "-"}</td>
              <td>{item.status === "SUCCESS" ? "✅" : "❌"}</td>
              <td>{item.data || "-"}</td>
              <td>{item.createdBy || "-"}</td>
              <td>{formatDate(item.createdAt) || "-"}</td>
            </tr>
          ))}
        </table>
      )}
    </div>
  );
};

export default AuditLogsPage;
