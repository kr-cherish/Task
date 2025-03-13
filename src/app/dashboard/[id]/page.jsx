"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="items-center bg-gray-100 justify-center">
    <div className="p-6 max-w-3xl mx-auto">
      <img src={product.image} alt={product.title} className=" rounded-b-full rounded-t-full items-center size-100" />
      <h1 className="text-2xl font-bold mt-4">{product.title}</h1>
      <p className="text-gray-700 mt-2">{product.description}</p>
      <p className="text-xl font-semibold mt-2">${product.price}</p>
    </div>
    </div>
  );
};

export default ProductDetail;
