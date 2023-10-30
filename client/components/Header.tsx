import { useBalance, useUser } from "@thirdweb-dev/react";
import Link from "next/link";
import React from "react";
import { shortenEthereumAddress } from "../utils/shortenEthereumAddress";

const Header = () => {
  const { user } = useUser();

  const { data } = useBalance("0x5d5f781C0ffAB3524E414942b80684e3e0445fe4");

  return (
    <div className="flex-row header">
      <Link href={"/"}>
        <button>Home 🚀</button>
      </Link>

      <Link href={"/nfts"}>
        <button>NFTs</button>
      </Link>

      <Link href={"/transactions"}>
        <button>Transactions</button>
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
        <div>User ID: {(user?.session as any)?.["userId"] || "-"}</div>
        <div
          style={{
            fontWeight: 600,
            color: "purple",
          }}
        >
          Balance: {data?.displayValue} {data?.symbol}
        </div>
      </div>
    </div>
  );
};

export default Header;
