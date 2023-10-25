import { In, Not } from "typeorm";
import { AppDataSource } from "../configs/db.config";
import { Nft, Transaction } from "../entities";

const nftRepository = AppDataSource.getRepository(Nft);

const getNfts = async () => {
  try {
    const [data, count] = await nftRepository.findAndCount({
      relations: ["transactions", "createdBy", "owner"],
      order: {
        transactions: {
          createdAt: "DESC",
        },
      },
    });
    return { data, count };
  } catch (err) {
    throw err;
  }
};

const createNft = async (nft: Nft) => {
  try {
    return await AppDataSource.transaction(
      async (transactionalEntityManager) => {
        const nftCreated = await transactionalEntityManager.save(nft);
        const transaction = new Transaction();
        transaction.nftId = nftCreated.id;
        transaction.createdBy = nft.createdBy;
        transaction.owner = nft.createdBy;
        transaction.type = "MINT";

        await transactionalEntityManager.save(transaction);
        return nftCreated;
      }
    );
  } catch (err) {
    throw err;
  }
};

const updateNft = async (nft: Nft) => {
  try {
    return await nftRepository.update(nft.id, {
      ...nft,
    });
  } catch (err) {
    throw err;
  }
};

const getNftById = async (id: number) => {
  try {
    return await nftRepository.findOneBy({ id });
  } catch (err) {
    throw err;
  }
};

const deleteNft = async (id: number) => {
  try {
    return await nftRepository.delete({
      id,
    });
  } catch (err) {
    throw err;
  }
};

export default {
  createNft,
  getNfts,
  getNftById,
  deleteNft,
  updateNft,
};
