import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { DataWithPagination } from "../types/common";
import { ITransaction } from "../types/transaction";

const TransactionsPage: NextPage = () => {
  const [transactions, setTransactions] = useState<
    DataWithPagination<ITransaction>
  >({
    data: [],
    count: 0,
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const { data } = await axios.get("/api/transactions");
      setTransactions(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Transaction: {transactions.count}</h2>
      <div className="flex-row">
        {transactions.count !== 0 && (
          <table>
            <tr>
              <th>ID</th>
              <th>TX ID</th>
              <th>NFT</th>
              <th>Type</th>
              <th>Price</th>
              <th>Token</th>
              <th>Owner</th>
              <th>Buyer</th>
              <th>Created by</th>
            </tr>
            {transactions.data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td
                  style={{
                    cursor: "pointer",
                    color: "blue",
                  }}
                >
                  {item.txId}
                </td>
                <td>{item.nftId || "-"}</td>
                <td>{item.type}</td>
                <td>{item.price || "-"}</td>
                <td>{item.token || "-"}</td>
                <td>{item.owner || "-"}</td>
                <td>{item.buyer || "-"}</td>
                <td>{item.createdBy || "-"}</td>
              </tr>
            ))}
          </table>
        )}
      </div>
    </div>
  );
};

export default TransactionsPage;
