import Image from "next/image";
import Link from "next/link";
import ProductCard from "./components/ProductCard";

export default function Home() {
  
  return (
    <>
      <h1>Hi</h1>
      <div>
        <Link href={"/users"}>Users</Link>
        <br />
        <Link href={"/users/detail"}>User Detail</Link>
      </div>
      <ProductCard />
    </>
  );
}
