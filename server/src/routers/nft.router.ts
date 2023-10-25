import express from "express";
import nftController from "../controllers/nft.controller";
// import { ensureAuthenticatedNft } from "../middlewares/ensureAuthenticated";

const nftRouters = express.Router();

// authentication
// router.use(ensureAuthenticatedNft);

nftRouters.post("/", nftController.createNft);
nftRouters.get("/", nftController.getNfts);
nftRouters.delete("/:id", nftController.deleteNft);
nftRouters.put("/:id", nftController.updateNft);

export default nftRouters;
