import { useUser } from "@thirdweb-dev/react";
import Link from "next/link";
import React from "react";
import { shortenEthereumAddress } from "../utils/shortenEthereumAddress";

const Header = () => {
  const { user } = useUser();
  return (
    <div className="flex-row header">
      <Link href={"/"}>
        <button>Home 🚀</button>
      </Link>

      <Link href={"/nfts"}>
        <button>NFTs</button>
      </Link>

      <Link href={"/audit-logs"}>
        <button>Audit logs</button>
      </Link>

      <Link href={"/users"}>
        <button>Users</button>
      </Link>
      <Link href={"/roles"}>
        <button>Roles</button>
      </Link>
      <Link href={"/permissions"}>
        <button>Permissions</button>
      </Link>

      <div>
        <div>{shortenEthereumAddress(user?.address || "")}</div>
        <div>User ID: {(user?.session as any)["userId"]}</div>
      </div>
    </div>
  );
};

export default Header;
