import React, { Suspense } from "react";
import UserTable from "./UserTable";
import Link from "next/link";

interface Props {
  searchParams: { sortOrder: string };
}

export default async function UserPages({
  searchParams: { sortOrder },
}: Props) {
  return (
    <>
      <h1>Users</h1>
      <Link href={"/users/new"} className="btn mb-3">
        New User
      </Link>
      <Suspense fallback={<p>loading...</p>}>
        <UserTable sortOrder={sortOrder as "name"} />
      </Suspense>
    </>
  );
}
