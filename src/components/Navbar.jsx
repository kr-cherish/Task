"use client";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Navbar() {
  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <Link href="/" className="text-xl font-bold">
        My Store
      </Link>
      <Link href="/cart" className="bg-yellow-500 px-4 py-2 rounded-md">
        Cart ({cartItems.length})
      </Link>
    </nav>
  );
}
