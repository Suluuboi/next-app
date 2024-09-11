import { notFound } from "next/navigation";

interface Props {
  params: { id: number };
}
export default function UserDetailsPage({ params: { id } }: Props) {
  if (id > 10) notFound();
  return <div>UserDetailsPage for id: {id}</div>;
}
