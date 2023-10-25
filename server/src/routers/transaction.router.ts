import express from "express";
import transactionController from "../controllers/transaction.controller";
// import { ensureAuthenticatedUser } from "../middlewares/ensureAuthenticated";

const transactionRouters = express.Router();

// authentication
// router.use(ensureAuthenticatedUser);

transactionRouters.get("/", transactionController.getTransactions);

export default transactionRouters;
