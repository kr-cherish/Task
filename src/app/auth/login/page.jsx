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

    try {
      const res = await fetch("/api/auth/login", {  
        method: "POST",
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      // console.log("Response Data:", data);

      if (res.ok && data.token) {
        alert("Login Successful");
        router.push('/dashboard');
      } else {
        alert(data.error || "Login Failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex justify-center p-60 w-full min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 max-w-md">
        <h1 className="text-center mb-4 text-3xl font-extrabold">Login</h1>

        {["email", "password"].map((field) => (
          <input 
            key={field} 
            name={field} 
            type={field === "password" ? "password" : "text"} 
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)} 
            onChange={handleChange} 
            className="block w-full rounded-lg bg-gray-300 p-2 border mb-2"
            required
          />
        ))}

        <button type="submit" className="w-full transition duration-300 ease-in-out hover:translate-y-1 hover:scale-102 bg-green-500 text-white p-2 rounded-lg text-[15px] hover:bg-green-700 cursor-pointer">
          Login
        </button>
      </form>
    </div>
  );
}
