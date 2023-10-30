import React, { useState } from "react";
import { INft } from "../types/nft";
import { useAddress, useContract, useTransferToken } from "@thirdweb-dev/react";
import axios from "axios";
import Modal from "react-modal";
import { TOKEN } from "../types/common";

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

type Props = {
  nft: INft;
  callbackFunc: (nft?: INft) => Promise<void>;
};

const NftAction = ({ nft, callbackFunc }: Props) => {
  const address = useAddress();

  const isOwner = address === nft.lastTransaction?.createdBy.walletAddress;
  const firstTx = nft.lastTransaction;
  const isOnSale = firstTx ? firstTx.type === "SALE" : false;

  const { contract } = useContract(
    process.env.NEXT_PUBLIC_THIRDWEB_CONTRACT_ADDRESS
  );
  const {
    mutate: transferTokens,
    isLoading,
    error,
  } = useTransferToken(contract);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [listingPrice, setListingPrice] = useState(0);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleBuy = async (nft: INft) => {
    try {
      const sale = nft.lastTransaction;
      transferTokens(
        {
          to: sale?.createdBy.walletAddress || "", // Address to transfer to
          amount: sale?.price || 0, // Amount to transfer
        },
        {
          onSuccess: async () => {
            await axios.post("/api/transactions", {
              nftId: nft.id,
              price: sale?.price,
              type: "SOLD",
            });
            await callbackFunc();
          },
        }
      );
    } catch (err) {
      console.log("handleBuy error", err);
    }
  };

  const handleListing = async () => {
    if (!listingPrice) return;
    try {
      await axios.post("/api/transactions", {
        nftId: nft?.id,
        price: listingPrice,
        token: TOKEN.ADP,
      });
      await callbackFunc();
      closeModal();
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancelSale = async () => {
    try {
      await axios.post("/api/transactions", {
        nftId: nft.id,
        type: "CANCELED",
      });
      await callbackFunc();
    } catch (err) {
      console.log(err);
    }
  };

  const renderActions = () => {
    if (isOnSale) {
      return (
        <>
          {isOnSale && (
            <button
              disabled={isOwner || isLoading}
              onClick={() => handleBuy(nft)}
            >
              Buy: {firstTx?.price} {firstTx?.token}
            </button>
          )}
          <button onClick={handleCancelSale}>Cancel</button>
        </>
      );
    }

    if (isOwner) {
      return <button onClick={openModal}>List</button>;
    }
  };

  return (
    <div className="flex-row">
      {renderActions()}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="flex-col">
          <div>List NFT: {nft?.name}</div>
          <div className="flex-row">
            <input onChange={(e) => setListingPrice(+e.target.value)} />
            <select name="" id="">
              <option value={TOKEN.ADP}>{TOKEN.ADP}</option>
            </select>
            <button onClick={handleListing}>List</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default NftAction;
