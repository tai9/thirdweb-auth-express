import { AppDataSource } from "../configs/db.config";
import { Nft } from "../entities";

const nftRepository = AppDataSource.getRepository(Nft);

const getNfts = async () => {
  try {
    const [data, count] = await nftRepository.findAndCount();
    return { data, count };
  } catch (err) {
    throw err;
  }
};

const createNft = async (nft: Nft) => {
  try {
    return await nftRepository.save(nft);
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
