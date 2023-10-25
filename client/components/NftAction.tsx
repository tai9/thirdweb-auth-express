import React from "react";
import { INft } from "../types/nft";
import { useAddress } from "@thirdweb-dev/react";

type Props = {
  nft: INft;
  handleListing: (nft: INft) => void;
  handleBuy: (nft: INft) => void;
  handleCancel: (nft: INft) => void;
};

const NftAction = ({ nft, handleListing, handleBuy, handleCancel }: Props) => {
  const address = useAddress();

  const isOwner = address === nft.owner.walletAddress;
  const firstTx = nft.transactions?.[0];
  const isOnSale = firstTx ? firstTx.type === "SALE" : false;

  const renderActions = () => {
    if (isOnSale) {
      return (
        <>
          <button onClick={() => handleBuy(nft)}>
            Buy: {firstTx?.price} {firstTx?.token}
          </button>
          <button onClick={() => handleCancel(nft)}>Cancel</button>
        </>
      );
    }

    if (isOwner) {
      return <button onClick={() => handleListing(nft)}>List</button>;
    }
  };

  return <div className="flex-row">{renderActions()}</div>;
};

export default NftAction;
