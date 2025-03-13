"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const router = useRouter();
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    alert(data.token ? "Login successful!" : data.error);
    router.push('/dashboard');
  };

  return (
    <div className="flex justify-center p-60 w-full min-h-screen bg-gray-100">
    <form onSubmit={handleSubmit} className="p-6 max-w-md ">
        <h1 className="text-center mb-4 text-3xl font-extrabold ">Login</h1>
      {["Email", "Password"].map((field) => (
        <input key={field} name={field} type={field} placeholder={field} onChange={handleChange} className="block w-100 rounded-lg bg-gray-300 p-2 border mb-2" />
      ))}
      <button type="submit" className="w-full transition duration-300 ease-in-out hover:translate-y-1 hover:scale-102 bg-green-500 text-white p-2 rounded-lg text-[15px] hover:bg-green-700  cursor-pointer ">Login</button>
    </form>
    </div>
  );
}
