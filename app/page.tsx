import Link from "next/link";
import ProductCard from "./components/ProductCard";

export default function Home() {
  return (
    <>
      <h1>Hi</h1>
      <Link href={"/users"}>Users</Link>
    </>
  );
}
