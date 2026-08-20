import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegComments } from "react-icons/fa";
import {
  getComments,
  postComment,
} from "../../store/features/comment/comment.thunk";
import { useParams } from "react-router-dom";

const Comment = () => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams();

  const handleComment = () => {
    dispatch(postComment({ id, comment }));
  };

  useEffect(() => {
    dispatch(getComments(id));
  }, []);

  const { comments } = useSelector((state) => state.comment);

  const getFormattedDate = (date) => {
    const formattedDate = new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    return formattedDate;
  };

  console.log(comments);
  return (
    <>
      <div className="flex items-center gap-3">
        <span className="text-3xl text-blue-700">
          <FaRegComments />
        </span>
        <h1 className="text-2xl font-semibold">Comments</h1>
      </div>
      <span>Comment</span>
      <textarea
        placeholder="Type your comment..."
        className="textarea textarea-primary w-full"
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <button
        className="btn btn-primary text-white font-semibold"
        onClick={handleComment}
      >
        Submit
      </button>

      <div className="mt-4">
        <div className="flex items-center gap-2 text-xl">
          <span>{comments?.length}</span>
          <span>comments</span>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          {comments?.map((com) => (
            <div key={com._id} className="flex items-center gap-2">
              <img
                className="h-12 w-12 rounded-full object-cover border border-gray-300 shadow-sm"
                src={com?.author?.avatar}
                alt={com?.author?.name || "User avatar"}
              />
              <div>
                <div>{com?.author?.name}</div>
                <div>{getFormattedDate(com?.createdAt)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Comment;
