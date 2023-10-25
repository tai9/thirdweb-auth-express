import { Request, Response } from "express";
import { constants } from "http2";
import { Nft, NftStatus, User } from "../entities";
import nftService from "../services/nft.service";
import auditService from "../services/audit.service";

const createNft = async (req: Request, res: Response) => {
  const user = req?.session.user as User;
  try {
    const nft = new Nft();
    nft.name = req.body.name;
    nft.description = req.body.description;
    nft.status = req.body.status;
    nft.owner = user?.id;
    nft.createdBy = user?.id;
    nft.status = NftStatus.NOT_ON_SALE;

    const nftCreated = await nftService.createNft(nft);
    await auditService.createAuditLog({
      type: "NFT",
      status: "SUCCESS",
      description: "Create nft",
      data: JSON.stringify(nftCreated),
      createdBy: user?.id,
    });
    return res.status(constants.HTTP_STATUS_OK).json(nftCreated);
  } catch (error) {
    console.log(error);
    await auditService.createAuditLog({
      type: "NFT",
      status: "FAIL",
      description: "Create nft",
      data: JSON.stringify(error),
      createdBy: user?.id,
    });
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

const getNfts = async (req: Request, res: Response) => {
  try {
    const nfts = await nftService.getNfts();
    return res.status(constants.HTTP_STATUS_OK).json(nfts);
  } catch (error) {
    console.log(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

const deleteNft = async (req: Request, res: Response) => {
  try {
    const id = +req.params.id;
    const user = req?.session.user as User;
    try {
      const { affected } = await nftService.deleteNft(id);
      if (affected === 0) {
        throw new Error("Nft not found");
      }
      await auditService.createAuditLog({
        type: "NFT",
        status: "SUCCESS",
        description: "Delete nft",
        data: JSON.stringify({ nftId: id }),
        createdBy: user?.id,
      });
      return res.status(constants.HTTP_STATUS_OK).json({ id });
    } catch (error: any) {
      console.log(error);
      await auditService.createAuditLog({
        type: "NFT",
        status: "FAIL",
        description: "Delete nft",
        data: JSON.stringify({ nftId: id, error: error.message }),
        createdBy: user?.id,
      });
      res
        .status(constants.HTTP_STATUS_BAD_REQUEST)
        .json({ error: error.message });
    }
  } catch (err) {
    res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json();
  }
};

const updateNft = async (req: Request, res: Response) => {
  try {
    // const id = +req.params.id;
    // const nft = new Nft();
    // const nfts = await nftService.deleteNft(id);
    return res.status(constants.HTTP_STATUS_OK).json({});
  } catch (error) {
    console.log(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

export default {
  createNft,
  getNfts,
  deleteNft,
  updateNft,
};
