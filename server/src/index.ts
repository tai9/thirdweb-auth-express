import cookieParser from "cookie-parser";
import { config } from "dotenv";
import express from "express";
import { getDbConnection } from "./configs/db.config";
import { authMiddleware, authRouter } from "./middlewares/auth.middleware";
import permissionRouters from "./routers/permission.router";
import roleRouters from "./routers/role.router";
import userRouters from "./routers/user.router";
import auditLogRouters from "./routers/auditLog.router";

config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/ping", (req, res) => {
  res.send("ok");
});

// We add the auth middleware to our app to let us access the user across our API
app.use(authMiddleware);

// Now we add the auth router to our app to set up the necessary auth routes
app.use("/auth", authRouter);

app.use("/users", userRouters);
app.use("/permissions", permissionRouters);
app.use("/roles", roleRouters);
app.use("/audit-logs", auditLogRouters);

// connect DB
getDbConnection();

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
