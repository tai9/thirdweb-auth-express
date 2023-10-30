import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { DataWithPagination } from "../types/common";
import { INft } from "../types/nft";
import { shortenEthereumAddress } from "../utils/shortenEthereumAddress";

import NftAction from "../components/NftAction";

const NFTsPage: NextPage = () => {
  const [nfts, setNfts] = useState<DataWithPagination<INft>>({
    data: [],
    count: 0,
  });

  const [form, setForm] = useState<Partial<INft>>({
    name: "",
  });

  useEffect(() => {
    fetchNfts();
  }, []);

  const fetchNfts = async () => {
    try {
      const { data } = await axios.get("/api/nfts");
      setNfts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreate = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post("/api/nfts", form);
      await fetchNfts();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      NFTs page
      <h2>Role count: {nfts.count}</h2>
      <div className="flex-row">
        {nfts.data.map((item) => (
          <div className="nft-card" key={item.id}>
            <img
              src="https://i.seadn.io/s/raw/files/c45cb9e9c1d7a1078a2b4ac4949cb44b.png?auto=format&dpr=1&w=1000"
              alt=""
              width={200}
              height={200}
            />
            <div>{item.name}</div>
            <i>
              Owned by:{" "}
              {item.createdBy.name ||
                shortenEthereumAddress(
                  item.lastTransaction?.createdBy.walletAddress || ""
                ) ||
                "admin"}
            </i>
            <b>{item.lastTransaction?.type}</b>

            <NftAction nft={item} callbackFunc={fetchNfts} />
          </div>
        ))}
      </div>
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
        </div>

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default NFTsPage;
