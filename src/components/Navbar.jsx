"use client";

import Link from "next/link";
import { useSelector } from "react-redux";

export default function Navbar() {
  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <Link href="/dashboard">
        <span className="text-white font-bold text-xl">MyStore</span>
      </Link> 
      <div>
        <Link href="/cart">
          <button className="relative bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">
            Cart
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-xs font-bold">
                {cartItems.length}
              </span>
            )}
          </button>
        </Link>
      </div>
    </nav>
  );
}
