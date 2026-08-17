import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBlogByIdThunk } from "../../store/features/blog/blog.thunk";
import { FaUser } from "react-icons/fa";

const BlogDetail = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  useEffect(() => {
    dispatch(getBlogByIdThunk(id));
  }, []);

  const { singleBlogData: blog } = useSelector((state) => state.blog);
  console.log(blog)
 
  return (
    <div className="flex  p-5">
      <div className="card bg-base-100 shadow-sm w-full">
        <div className="card-body w-full">
            <h1 className="w-full font-bold text-2xl">{blog?.data?.title}</h1>
            <span className="w-full flex items-center gap-1"><span><FaUser /></span>{blog?.data?.author?.name}</span>
            <img src={blog?.data?.featured_image} alt="blog img" className="w-200" />
        </div>
      </div>
      <div className="card bg-base-100 shadow-sm w-full">

      </div>
    </div>
  );
};

export default BlogDetail;
