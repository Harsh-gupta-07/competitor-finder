"use client";
import Image from "next/image";
import { useState } from "react";
import { main } from "./gemini";

export default function Home() {
  const [ans, setAns] = useState([]);
  const [name, setName] = useState("");
  const [load, setLoad] = useState(false);

  async function handle() {
    setLoad(true);
    const result = await main(name);
    let temp = result.split("||");
    temp.shift();
    temp.pop();
    setAns(temp);
    setName("");
    setLoad(false);
    // console.log(temp);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md mb-6">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
          Competitor Search
        </h1>
        <input
          type="text"
          value={name}
          onKeyDown={(e) => {
            if (e.key === "Enter") handle();
          }}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          placeholder="Enter your startup"
        />
        <button
          onClick={handle}
          className="cursor-pointer w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Search
        </button>
        {load && (
          <div className="mt-4 text-center text-blue-500 font-medium animate-pulse">
            Loading...
          </div>
        )}
      </div>

      {!load && ans.length > 0 ? (
        <div className="w-full max-w-7xl flex flex-wrap gap-4 justify-center">
          {ans.map((val, ind) => (
            val!==""?<div
              key={ind}
              className="bg-white p-4 rounded-lg shadow-md w-full sm:w-[48%] lg:w-[30%] max-h-60 overflow-y-auto whitespace-pre-wrap break-words text-gray-800 text-sm"
            >
              {val.trim()}
            </div>:""
          ))}
        </div>
      ):<h1 className="text-2xl font-bold text-center mb-4 text-gray-800">The Search came out Empty</h1>}
    </div>
  );
}
