///<reference>
import sessions from "express-session";
declare module "express-session" {
  interface SessionData {
    username?: string;
    user?: any;
  }
}
