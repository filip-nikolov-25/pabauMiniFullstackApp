import { api } from "@/consts";
import { Post } from "@/types";
import React, { useState } from "react";

interface Props {
  addLatestPost: (post: Post) => void;
  setIsAddingPost:(value:boolean)=> void
}

const CreatePost = ({ addLatestPost,setIsAddingPost }: Props) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number | null>(null);
  const [image, setImage] = useState<string>(`https://picsum.photos/seed/${Date.now()}/200/300`);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCreate = async () => {
    if (!name || !description || price === null || !image) {
      setErrorMessage("PLEASE FILL ALL THE FIELDS");
      return
    }

    try {
      const response = await fetch(api, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, price, image }),
      });

      const data = await response.json();
      console.log(data, "CURRENT DATA ");
      addLatestPost(data);

      setName("");
      setDescription("");
      setPrice(null);
      setImage("");
      setIsAddingPost(false)
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center  bg-black bg-opacity-50">
    <div className="bg-gray-500 rounded-3xl p-6 w-1/2 mx-auto">
      <div className="flex flex-col">
        <label className="text-center text-gray-50 mb-5">NAME</label>
        <input
          className="rounded-3xl border-2 border-white p-2"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-center mb-5 text-gray-50">Description</label>
        <input
          type="text"
          className="border-2 rounded-3xl border-white p-2"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-center mb-5 text-gray-50">PRICE</label>
        <input
          type="number"
          className="border-2 rounded-3xl border-white p-2"
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-center mb-5 text-gray-50">IMAGE URL</label>
        <input
          type="text"
          disabled
          className="rounded-3xl border-2 border-white p-2"
        />
      </div>
      <div className="text-center mt-5">
        <button
          onClick={handleCreate}
          className="bg-gray-50 rounded-3xl px-[18%]  text-2xl text-white  py-1 mt-2"
        >
          SUBMIT
        </button>
      </div>
      <div className="text-center mt-5 ">
        <button
          onClick={() => setIsAddingPost(false)}
          className="bg-red-500 text-white py-1 px-[20%]  text-2xl rounded-full"
        >
          Exit
        </button>
      </div>
      <h2 className="text-red-500 mt-3">{errorMessage}</h2>
    </div>
  </div>
  );
};

export default CreatePost;
