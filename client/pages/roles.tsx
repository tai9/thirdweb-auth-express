import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { DataWithPagination } from "../types/common";
import { IRole } from "../types/role";
import axios from "axios";
import { IPermission } from "../types/permission";

const RolesPage: NextPage = () => {
  const [roles, setRoles] = useState<DataWithPagination<IRole>>({
    data: [],
    count: 0,
  });
  const [permissions, setPermissions] = useState<
    DataWithPagination<IPermission>
  >({
    data: [],
    count: 0,
  });
  const [form, setForm] = useState<Partial<IRole>>({
    name: "",
    description: "",
    status: false,
    permissionIds: [],
  });

  useEffect(() => {
    fetchRoles();
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    try {
      const { data } = await axios.get("/api/permissions");
      setPermissions(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRoles = async () => {
    try {
      const { data } = await axios.get("/api/roles");
      setRoles(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreate = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post("/api/roles", form);
      await fetchRoles();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete("/api/roles/" + id);
      await fetchRoles();
    } catch (err) {
      console.log(err);
    }
  };

  const handleRowClick = (value: Partial<IRole>) => {
    setForm({
      ...value,
    });
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
            <th>Permissions</th>
            <th>Created by</th>
            <th></th>
          </tr>
          {roles.data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td
                onClick={() => handleRowClick(item)}
                style={{
                  cursor: "pointer",
                  color: "blue",
                }}
              >
                {item.name}
              </td>
              <td>{item.description || "-"}</td>
              <td>{item.status === true ? "✅" : "❌"}</td>
              <td>{item.permissionIds || "-"}</td>
              <td>{item.createdBy || "-"}</td>
              <td>
                <button onClick={() => handleDelete(item.id)}>delete</button>
              </td>
            </tr>
          ))}
        </table>
      )}

      <hr />

      <form className="flex-col" onSubmit={handleCreate}>
        <div>
          Name:{" "}
          <input
            type="text"
            value={form.name}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
          Description:{" "}
          <input
            type="text"
            value={form.description}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
          Status:{" "}
          <input
            type="checkbox"
            checked={form.status}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                status: e.target.checked,
              }))
            }
          />
        </div>

        <div>
          <h4>Permissions:</h4>
          {permissions.data.map((x) => (
            <span
              key={x.id}
              style={{
                color: "blue",
                cursor: "pointer",
              }}
              onClick={() => {
                const isExisted = form.permissionIds?.includes(x.id);
                if (isExisted) {
                  const d = form.permissionIds?.filter((item) => item !== x.id);
                  setForm((prev) => ({
                    ...prev,
                    permissionIds: d,
                  }));
                } else {
                  setForm((prev) => ({
                    ...prev,
                    permissionIds: [...(prev.permissionIds || []), x.id],
                  }));
                }
              }}
            >
              {form.permissionIds?.includes(x.id) && "✅"} {x.name} <br />
            </span>
          ))}
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default RolesPage;
