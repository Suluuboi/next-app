//"use client";
import Link from "next/link";
import ProfileNav from "./Profile";

interface Props {}

export default function NavBar({}: Props) {
  return (
    <nav className="flex bg-slate-200 p-5 space-x-3">
      <Link className="mr-5" href={"/"}>
        Home
      </Link>
      <Link href={"/admin"}>Admin</Link>
      <Link href={"/users"}>Users</Link>
      <div className="flex flex-1 justify-end ">
        <ProfileNav />
      </div>
    </nav>
  );
}
