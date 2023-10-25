import {
  useBalance,
  useContract,
  useTransferToken,
  Web3Button,
} from "@thirdweb-dev/react";
import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { DataWithPagination, TOKEN } from "../types/common";
import { INft } from "../types/nft";
import { shortenEthereumAddress } from "../utils/shortenEthereumAddress";

const contractAddress = "0x5d5f781C0ffAB3524E414942b80684e3e0445fe4";
const toAddress = "0x2966bA693DA5343e2a50bdDD174aB89a727C76dd";
const amount = "9";

import Modal from "react-modal";
import NftAction from "../components/NftAction";
import { ITransaction } from "../types/transaction";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

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

  const [nftSelected, setNftSelected] = useState<INft>();

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal(nft: INft) {
    setIsOpen(true);
    setNftSelected(nft);
  }

  function closeModal() {
    setIsOpen(false);
  }

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

  const [listingPrice, setListingPrice] = useState(0);

  const handleListNft = async () => {
    if (!nftSelected || !listingPrice) return;
    try {
      await axios.post("/api/transactions", {
        nftId: nftSelected?.id,
        price: listingPrice,
        token: TOKEN.ADP,
      });
      await fetchNfts();
      closeModal();
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancelSale = async (nft: INft) => {
    try {
      await axios.post("/api/transactions", {
        nftId: nft.id,
        type: "CANCELED",
      });
      await fetchNfts();
    } catch (err) {
      console.log(err);
    }
  };

  const handleBuy = async () => {
    // if (!nftSelected || !listingPrice) return;
    // await axios.post("/api/transactions", {
    //   nftId: nftSelected?.id,
    //   price: listingPrice,
    // });
    console.log("handleBuy");
  };

  const renderNftStatus = (transactions?: ITransaction[]) => {
    if (!transactions?.length) return "";
    const tx = transactions[0];
    return tx.type;
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
            <b>{renderNftStatus(item.transactions)}</b>

            <NftAction
              nft={item}
              handleListing={openModal}
              handleBuy={handleBuy}
              handleCancel={handleCancelSale}
            />
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="flex-col">
          <div>List NFT: {nftSelected?.name}</div>
          <div className="flex-row">
            <input onChange={(e) => setListingPrice(+e.target.value)} />
            <select name="" id="">
              <option value={TOKEN.ADP}>{TOKEN.ADP}</option>
            </select>
            <button onClick={handleListNft}>List</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default NFTsPage;
