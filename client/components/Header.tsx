import Link from "next/link";
import React from "react";

const Header = () => {
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
    </div>
  );
};

export default Header;
