import { Request, Response } from "express";
import { constants } from "http2";
import transactionService from "../services/transaction.service";
import { Transaction } from "../entities";
import nftService from "../services/nft.service";

const getTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await transactionService.getTransactions();
    return res.status(constants.HTTP_STATUS_OK).json(transactions);
  } catch (error) {
    console.log(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

const createTransaction = async (req: Request, res: Response) => {
  try {
    const { price, nftId, token, type } = req.body;
    const user = req.session.user;
    const tx = new Transaction();
    const nft = await nftService.getNftById(nftId);
    tx.nft = nft;
    tx.price = price;
    tx.type = type || "SALE";
    tx.createdBy = user;
    tx.owner = user;
    tx.token = token;
    const transaction = await transactionService.createTransaction(tx);
    return res.status(constants.HTTP_STATUS_OK).json(transaction);
  } catch (error) {
    console.log(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

export default {
  getTransactions,
  createTransaction,
};
