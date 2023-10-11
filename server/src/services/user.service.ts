import { AppDataSource } from "../configs/db.config";
import { User } from "../entities";

const userRepository = AppDataSource.getRepository(User);

const createUser = async (user: User) => {
  try {
    return await AppDataSource.manager.save(user);
  } catch (err) {
    throw err;
  }
};

const getUsers = async () => {
  try {
    const [data, count] = await AppDataSource.manager.findAndCount(User);
    return { data, count };
  } catch (err) {
    throw err;
  }
};

const getUserByAddress = async (address: string) => {
  try {
    return await userRepository.findBy({
      walletAddress: address,
    });
  } catch (err) {
    throw err;
  }
};

const deleteUser = async (address: string) => {
  try {
    return await userRepository.delete({
      walletAddress: address,
    });
  } catch (err) {
    throw err;
  }
};

export default {
  createUser,
  getUsers,
  getUserByAddress,
  deleteUser,
};
