import CreatePost from "@/components/CreatePost";
import Posts from "@/components/Posts";
import { api } from "@/consts";
import { Post } from "@/types";
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const addLatestPost = (post: Post) => {
    setPosts((prevPosts) => [...prevPosts, post]);
  };
  const [isAddingPost, setIsAddingPost] = useState<boolean>(false);

  const removePost = (id: number) => {
    const filtererPosts = posts.filter((post) => post.id !== id);
    setPosts(filtererPosts);
  };

  useEffect(() => {
    fetch(`${api}`)
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);
  return (
    <div className="text-5xl ">
      <div className="flex justify-between bg-gray-500 p-10 ">
        <h3 className="text-3xl">Dummy Paintings</h3>
        <h3 className="text-3xl text-red-500" onClick={() => setIsAddingPost(true)}>Add Yours +</h3>
      </div>
      <Posts posts={posts} removePost={removePost} />
      {isAddingPost && <CreatePost  setIsAddingPost={ setIsAddingPost} addLatestPost={addLatestPost} />}
    </div>
  );
}
