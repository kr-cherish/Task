"use client";

import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "@/lib/cartSlice";

export default function Cart() {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div className="grid grid-cols-3 gap-6">
                    {cartItems.map((product) => (
                        <div
                            key={product._id}
                            className="bg-white p-4 rounded-lg shadow-md"
                        >
                            <img src={product.image} alt={product.title} className="w-full h-40 object-cover rounded-md" />
                            <h3 className="text-lg font-bold mt-2">{product.title}</h3>
                            <p className="text-sm text-gray-600">{product.description}</p>
                            <p className="mt-2 text-lg font-semibold">Quantity: {product.quantity}</p>
                            <div className="flex gap-3 mt-3">
                                <button
                                    onClick={() => dispatch(addToCart(product))}
                                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                                >
                                    +
                                </button>
                                <button
                                    onClick={() => dispatch(removeFromCart(product._id))}
                                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                                >
                                    -
                                </button>
                            </div>
                        </div>
                    ))}

                </div>
            )}
        </div>
    );
}
