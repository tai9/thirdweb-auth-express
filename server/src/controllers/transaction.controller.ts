import { Request, Response } from "express";
import { constants } from "http2";
import transactionService from "../services/transaction.service";

const getTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await transactionService.getTransactions();
    return res.status(constants.HTTP_STATUS_OK).json(transactions);
  } catch (error) {
    console.log(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

export default {
  getTransactions,
};
