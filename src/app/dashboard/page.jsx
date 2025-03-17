"use client"; 
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { addToCart,removeFromCart } from "@/lib/cartSlice";
import { useDispatch } from "react-redux";
const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="flex justify-center bg-gray-100 ">
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  flex-wrap justify-center items-center" >
      {products.map((product) => (
        <div key={product.id} className="border rounded-lg p-4 shadow-lg">
          <img src={product.image} alt={product.title} className="w-full h-60 border-4 rounded-b-lg bg-origin-border border-black" />
          <h2 className="text-medium font-semibold mt-2 line-clamp-1">{product.title}</h2>
          <p className="text-sm text-black font-normal line-clamp-3 ">{product.description.substring(0, 200)}...</p>
          <button
            className="mt-2 bg-blue-500 text-white px-2 py-2 rounded-lg transition-all duration-300 font-bold
            hover:bg-blue-700 text-[15px] cursor-pointer active:scale-95 disabled:bg-gray-400
            sm" 
            onClick={() => router.push(`/dashboard/${product.id}`)}
          >
            More Info
          </button>
          <button
                onClick={() => dispatch(addToCart(product))}
                className="mt-2 bg-green-500 text-white px-3 py-2 rounded-lg transition-all duration-300 font-bold
                hover:bg-blue-700 text-[15px] cursor-pointer active:scale-95 disabled:bg-gray-400
                sm"
              >
                Add to Cart
              </button>
              <button
                onClick={() => dispatch(removeFromCart(product._id))}
                className="mmt-2 bg-red-600 text-white px-3 py-2 rounded-lg transition-all duration-300 font-bold
                hover:bg-blue-700 text-[15px] cursor-pointer active:scale-95 disabled:bg-gray-400
                sm"
              >
                Remove
              </button>
              </div>
      ))}
    </div>
    </div>
  );
};

export default Dashboard;
