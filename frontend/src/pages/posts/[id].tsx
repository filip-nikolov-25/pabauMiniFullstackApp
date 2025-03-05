import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; 
import { api } from '@/consts';

const DynamicPainting = () => {
  const [post, setPost] = useState<any>(null);
  const router = useRouter(); 
  const { id } = router.query; 
  console.log(id,"ID")
  const getPostById = async (id: string) => {
    try {
      const response = await fetch(`${api}/${id}`);
      const data = await response.json();
      setPost(data);
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };
  console.log(post,"POST")
  useEffect(() => {
    if (id) {
      getPostById(id.toString());
    }
  }, [id]);

  return (
    <div>
      {post ? (
        <div className='w-1/2 mx-auto border-gray-100 rounded-4xl border-2 h-[100vh]'>
        <div className='flex  justify-center items-center'>
          <div>
          <h1 className='text-5xl text-center mt-20 mb-5'>{post.name}</h1>
          <p className='text-center mb-5 text-xl'>{post.description}</p>

          <img className='text-center w-full' src={post.image} width={800} alt={post.name} />
          <p className='text-center text-xl text-red-500 mt-6'>PRICE: {post.price}$</p>
          </div>
        </div>
    </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default DynamicPainting;
