// interface Props{
//   params: { slug: string[] };
//   searchParams: { sortOrder: string };
// }

import { sort } from "fast-sort";
import Link from "next/link";

export default async function UserTable({
  sortOrder,
}: {
  sortOrder: "name" | "email";
}) {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "no-cache",
  });
  const users: User[] = await res.json();

  const sortedUsers = sort(users).asc(
    sortOrder === "email" ? (user) => user.email : (user) => user.name
  );
  return (
    <>
      <div>Order By: {sortOrder}</div>
      <table className="table ">
        <thead>
          <tr>
            <th>
              <Link href={"/users?sortOrder=name"}>Name</Link>
            </th>
            <th>
              <Link href={"/users?sortOrder=email"}>Email</Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

interface User {
  id: number;
  name: string;
  email: string;
}
