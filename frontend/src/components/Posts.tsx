import { api } from "@/consts";
import { Post } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  posts: Post[];
  removePost:(id:number) =>void
}

const Posts = ({ posts,removePost }: Props) => {
  const handleDelete = async (id: number) => {
      const response = await fetch(`${api}/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      console.log(data, "DATA FROM DELETE ");
      removePost(id)

  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {posts.map((post: Post) => {
        return (
          <div className=" rounded-3xl border-2 shadow-xl hover:border-amber-50  h-[65vh] shadow-orange-200 x" key={post.id}>
            <div className="text-end hover:text-red-700 pr-5 pb-3">
              <button className="text-3xl cursor-pointer   hover:text-red-500 text-red-50" onClick={() => handleDelete(post.id)}>X</button>
            </div>
            <img
              src={post.image ? post.image : ""}
              alt={post.name}
              className="w-full h-64 "
            />
            <div className="p-4 ">
              <h2 className="text-lg  text-gray-800">{post.name}</h2>
              <p className="text-sm text-gray-600 mt-2 overflow-hidden">
                {post.description}
              </p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xl font-bold text-red-500">
                  ${post.price}
                </span>
              </div>
              <div className="text-center   text-white hover:text-red-500">

              <Link key={post.id} href={`/posts/${post.id}`}>
                <button className="text-xl   cursor-pointer py-2 bg-red-500 px-5 rounded-2xl">Read More</button>
              </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Posts;
