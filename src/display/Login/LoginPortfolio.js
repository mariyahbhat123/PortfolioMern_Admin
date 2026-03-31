import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPortfolio() {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      // email;
      // ("mariyah@email.com");
      // password;
      // ("12345678");
      const res = await fetch("http://localhost:5000/api/adminLogin", {
        method: "POST", // HTTP method
        headers: {
          "Content-Type": "application/json", // tell server it's JSON
        },

        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await res.json(); // 👈 Parse response body as JSON
      console.log("Response data:", data);
      localStorage.setItem("auth_token", data.auth_token);
      localStorage.setItem("user_id", data.user_info._id);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-gradient-to-r from-indigo-200 to-indigo-500  h-[100vh]">
      <div className="flex justify-center items-center h-full">
        <div className="bg-transparent w-[40%] min-h-[50%] rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-6 text-white">
          <div>
            <h4>Welcome Back</h4>
          </div>
          <div className="p-4 space-y-8">
            <div>
              <label
                htmlFor="email"
                className="text-left w-full text-white text-base font-semibold"
              >
                Email
              </label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example: john@email.com"
                className="border border-gray-600 w-full h-[30%] rounded-md p-[8px]  mt-2 placeholder:p-1 focus:border-none focus:outline-none text-gray-800"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-left w-full text-white text-base font-semibold"
              >
                Password
              </label>
              <input
                type="password"
                onChange={(e) => setpassword(e.target.value)}
                placeholder="enter your password..."
                className="border border-gray-600 w-full h-[30%] rounded-md p-[8px] mt-2 placeholder:p-1 focus:border-none focus:outline-none text-gray-800"
              />
            </div>
            <div>
              <button
                className="w-full bg-indigo-600 rounded-md p-[8px] font-semibold text-base hover:bg-gradient-to-r hover:from-indigo-500 hover:to-indigo-700 transition-all"
                onClick={handleLogin}
              >
                Log in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
