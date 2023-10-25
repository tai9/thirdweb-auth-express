import type { NextPage } from "next";
import {
  useBalance,
  useContract,
  useContractRead,
  useTransferToken,
  Web3Button,
} from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { DataWithPagination } from "../types/common";
import { INft, NFT_STATUS } from "../types/nft";
import { shortenEthereumAddress } from "../utils/shortenEthereumAddress";
const contractAddress = "0x5d5f781C0ffAB3524E414942b80684e3e0445fe4";
const toAddress = "0x2966bA693DA5343e2a50bdDD174aB89a727C76dd";
const amount = "9";
const NFTsPage: NextPage = () => {
  // Contract must be an ERC-20 contract
  const { contract } = useContract(contractAddress);
  const {
    mutate: transferTokens,
    isLoading,
    error,
  } = useTransferToken(contract);

  const { data } = useBalance("0x5d5f781C0ffAB3524E414942b80684e3e0445fe4");
  console.log(data);

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
      <Web3Button
        contractAddress={contractAddress}
        action={() =>
          transferTokens({
            to: toAddress, // Address to transfer to
            amount: amount, // Amount to transfer
          })
        }
      >
        Transfer
      </Web3Button>
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
                shortenEthereumAddress(item.createdBy.walletAddress) ||
                "admin"}
            </i>
            <b>{NFT_STATUS[item.status]}</b>
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
