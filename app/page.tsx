import { getServerSession } from "next-auth/next";
import Link from "next/link";
import { authOptions } from "./api/auth/authOptions";
import ProductCard from "./components/ProductCard/ProductCard";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  return (
    <main>
      <h1>Hellow {user ? user.name : "New User"}</h1>
      <Link href={"/users"}>Users</Link>
      <ProductCard />
    </main>
  );
}
