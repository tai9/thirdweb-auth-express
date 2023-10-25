import { AppDataSource } from "../configs/db.config";
import { Transaction } from "../entities";

const transactionRepository = AppDataSource.getRepository(Transaction);

const getTransactions = async () => {
  try {
    const [data, count] = await transactionRepository.findAndCount();
    return { data, count };
  } catch (err) {
    throw err;
  }
};

const createTransaction = async (transaction: Transaction) => {
  try {
    return await transactionRepository.save(transaction);
  } catch (err) {
    throw err;
  }
};

const getTransactionById = async (id: number) => {
  try {
    return await transactionRepository.findOneBy({ id });
  } catch (err) {
    throw err;
  }
};

export default {
  createTransaction,
  getTransactions,
  getTransactionById,
};
