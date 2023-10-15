import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { DataWithPagination } from "../types/common";
import { IPermission } from "../types/permission";

const PermissionsPage: NextPage = () => {
  const [permCategories, setPermCategories] = useState([]);
  const [permissions, setPermissions] = useState<
    DataWithPagination<IPermission>
  >({
    data: [],
    count: 0,
  });
  const [form, setForm] = useState<Partial<IPermission>>({
    name: "",
    description: "",
    status: false,
    categories: [],
  });

  useEffect(() => {
    fetchPermCategories();
    fetchPermissions();
  }, []);

  const fetchPermCategories = async () => {
    try {
      const { data } = await axios.get("/api/permissions/perm-categories");
      const obj: any = {};
      data?.forEach((item: any) => {
        const d = obj[item.name];
        if (d) {
          obj[item.name] = [
            ...obj[item.name],
            { id: item.id, type: item.type },
          ];
        } else {
          obj[item.name] = [{ id: item.id, type: item.type }];
        }
      });
      setPermCategories(obj);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPermissions = async () => {
    try {
      const { data } = await axios.get("/api/permissions");
      setPermissions(data);
    } catch (err) {
      console.log(err);
    }
  };

  const renderPerms = () => {
    const data = [];
    for (const [key, value] of Object.entries(permCategories)) {
      data.push({
        key,
        value: value as any[],
      });
    }
    return (
      <div>
        {data.map((item, idx) => (
          <div key={idx}>
            <div>{item.key}</div>
            <ul>
              {item.value.map((x) => (
                <li key={x.id}>
                  <input
                    type="checkbox"
                    value={x.id}
                    checked={form.categories?.includes(x.id)}
                    onClick={(e: any) => {
                      const value = +e.target.value;
                      const checked = e.target.checked;
                      let data = form.categories || [];
                      if (checked) {
                        data.push(value);
                      } else {
                        data = data.filter((x) => x !== value);
                      }
                      setForm((prev) => ({
                        ...prev,
                        categories: data,
                      }));
                    }}
                  />
                  {x.type}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  const handleCreatePermission = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post("/api/permissions", form);
      await fetchPermissions();
    } catch (err) {
      console.log(err);
    }
  };

  const handlePermissionDelete = async (id: number) => {
    try {
      await axios.delete(`/api/permissions/${id}`);
      await fetchPermissions();
    } catch (err) {
      console.log(err);
    }
  };

  const handleRowClick = (value: IPermission) => {
    setForm({
      name: value.name || "",
      description: value.description || "",
      status: value.status,
      categories: value.categories,
    });
  };

  return (
    <div>
      <h2>Permission count: {permissions.count}</h2>
      {permissions.count !== 0 && (
        <table>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Categories</th>
            <th>Created by</th>
            <th></th>
          </tr>
          {permissions.data.map((item) => (
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
              <td>{item.categories || "-"}</td>
              <td>{item.createdBy || "-"}</td>
              <td>
                <button onClick={() => handlePermissionDelete(item.id)}>
                  delete
                </button>
              </td>
            </tr>
          ))}
        </table>
      )}

      <hr />

      <form className="flex-col" onSubmit={handleCreatePermission}>
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
        <div>{renderPerms()}</div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default PermissionsPage;
