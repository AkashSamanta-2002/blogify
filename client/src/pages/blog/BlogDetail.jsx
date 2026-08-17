import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBlogByIdThunk } from "../../store/features/blog/blog.thunk";
import { FaUser } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";

const BlogDetail = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  useEffect(() => {
    dispatch(getBlogByIdThunk(id));
  }, []);

  const { singleBlogData: blog } = useSelector((state) => state.blog);
  console.log(blog.data);

  const getFormattedDate = (date) => {
    const formattedDate = new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    return formattedDate;
  };
  const { screenLoading } = useSelector((state) => state.blog);

  if (screenLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <div className="flex flex-col items-center gap-4 p-8 rounded-2xl shadow-lg bg-white">
          <span className="loading loading-spinner loading-lg text-info"></span>
          <p className="text-gray-600 font-medium animate-pulse">
            Loading blog...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex p-5 gap-2">
      <div className="card bg-base-100 shadow-sm w-340">
        <div className="card-body w-full">
          <h1 className="w-full font-bold text-2xl">{blog?.data?.title}</h1>
          <div className="w-full flex items-center gap-2">
            <span>
              <img
                className="h-10 w-10 rounded-full"
                src={blog?.data?.author?.avatar}
                alt="user"
              />
            </span>
            <div className="flex flex-col">
              <span className="font-semibold">{blog?.data?.author?.name}</span>
              <span className="flex items-center gap-1"> <span><FaRegCalendarAlt /></span> {getFormattedDate(blog?.data?.createdAt)}</span>
            </div>
          </div>
          <img
            src={blog?.data?.featured_image}
            alt="blog img"
            className="w-200"
          />
        </div>
      </div>
      <div className="card bg-base-100 shadow-sm w-full"></div>
    </div>
  );
};

export default BlogDetail;
