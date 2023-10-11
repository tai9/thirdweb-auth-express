import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { IUser } from "../types/user";
import axios from "axios";
import { DataWithPagination } from "../types/common";
import { formatDate } from "../utils/formatDate";

const UsersPage: NextPage = () => {
  const [users, setUsers] = useState<DataWithPagination<IUser>>({
    data: [],
    count: 0,
  });
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/api/users");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteUser = async (address: string) => {
    try {
      await axios.delete(`/api/users/${address}`);
      await fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div>Users: {users.count}</div>
      {users.data.map((item) => (
        <div key={item.id} className="flex-row">
          <div>{item.id}</div>
          <div>{item.name || "-"}</div>
          <div>{item.walletAddress}</div>
          <div>{formatDate(item.createdAt)}</div>
          <div>{formatDate(item.updatedAt)}</div>
          <button onClick={() => handleDeleteUser(item.walletAddress)}>
            DELETE
          </button>
        </div>
      ))}
    </div>
  );
};

export default UsersPage;
