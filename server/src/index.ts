import cookieParser from "cookie-parser";
import { config } from "dotenv";
import express from "express";
import { getDbConnection } from "./configs/db.config";
import { authMiddleware, authRouter } from "./middlewares/auth.middleware";
import permissionRouters from "./routers/permission.router";
import roleRouters from "./routers/role.router";
import userRouters from "./routers/user.router";
import auditLogRouters from "./routers/auditLog.router";
import Redis from "ioredis";
import RedisStore from "connect-redis";
import sessions from "express-session";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import nftRouters from "./routers/nft.router";

config();

const redisClient = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: +process.env.REDIS_PORT || 6379,
  username: process.env.REDIS_USERNAME || "default",
  password: process.env.REDIS_PASSWORD || "",
});

const redisStore = new RedisStore({
  client: redisClient,
  prefix: "authDapp:",
});

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const maxAge = 1000 * 60 * 5; //5min
app.use(
  sessions({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: maxAge,
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    },
    store: redisStore,
  })
);

app.use("/ping", (req, res) => {
  res.send("ok");
});

// If used on the BACKEND pass your 'secretKey'
const sdk = new ThirdwebSDK("goerli", {
  secretKey: process.env.THIRDWEB_AUTH_SECRET_KEY,
});

app.use("/get-contracts", async (req, res) => {
  try {
    const contract = await sdk.getContract(
      "0x5d5f781C0ffAB3524E414942b80684e3e0445fe4"
    );
    const data = await contract.metadata.get();
    console.log(data);

    // const data = await contract.call("balanceOf", [
    //   "0x2966bA693DA5343e2a50bdDD174aB89a727C76dd",
    // ]);
    // const s = new BigNumber(data._hex);
    // console.log(s.toNumber(), data);

    return res.send("ok");
  } catch (error) {
    console.log(error);

    res.send("fail");
  }
});

app.get("/get-session", (req, res) => {
  return res.status(200).json({
    status: "ok",
    data: req.session,
  });
});

app.get("/set-session", (req, res) => {
  try {
    req.session.username = "tailorrrr";
    return res.send(req.session);
  } catch (error) {
    console.error("Error setting session:", error);
    return res.status(500).send("Internal Server Error");
  }
});

// We add the auth middleware to our app to let us access the user across our API
app.use(authMiddleware);

// Now we add the auth router to our app to set up the necessary auth routes
app.use("/auth", authRouter);

app.use("/users", userRouters);
app.use("/permissions", permissionRouters);
app.use("/roles", roleRouters);
app.use("/audit-logs", auditLogRouters);
app.use("/nfts", nftRouters);

// connect DB
getDbConnection();

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
