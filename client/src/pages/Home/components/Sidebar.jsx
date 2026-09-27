import React, { useEffect } from "react";
import { GoDot } from "react-icons/go";
import { NavLink } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { LuAlignJustify } from "react-icons/lu";
import { GrBlog } from "react-icons/gr";
import { FaRegComments } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoriesThunk } from "../../../store/features/category/category.thunk";

const Button = ({ name, icon, destination }) => {
  return (
    <NavLink
      to={destination}
      className={({ isActive }) =>
        `group flex items-center gap-3 w-full px-4 py-2.5 rounded-lg
        transition-all duration-200
        ${
          isActive
            ? "bg-primary text-primary-content shadow-sm"
            : "text-base-content/70 hover:bg-base-300 hover:text-base-content"
        }`
      }
    >
      <span className="text-lg">{icon}</span>

      <span className="font-medium text-sm">
        {name}
      </span>

      <FiChevronRight
        className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
        size={15}
      />
    </NavLink>
  );
};

const Sidebar = () => {
  const dispatch = useDispatch();

  const { userProfile } = useSelector((state) => state.user);
  const { allCategoryData } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getAllCategoriesThunk());
  }, [dispatch]);

  return (
    <aside className="w-64 min-h-screen bg-base-100 border-r border-base-300">
      <div className="flex flex-col h-full px-3 py-5">

        {/* Logo / Brand */}
        <div className="px-3 mb-7">
          <h2 className="text-xl font-bold text-base-content">
            BlogSpace
          </h2>

          <p className="text-xs text-base-content/50 mt-1">
            Manage your content
          </p>
        </div>

        {/* Main Navigation */}
        <div>
          <p className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-base-content/40">
            Navigation
          </p>

          <div className="flex flex-col gap-1">
            <Button
              name="Home"
              icon={<IoHomeOutline />}
              destination="/"
            />

            {userProfile?.role?.includes("admin") && (
              <Button
                name="Categories"
                icon={<LuAlignJustify />}
                destination="/category"
              />
            )}

            <Button
              name="Blogs"
              icon={<GrBlog />}
              destination="/blog"
            />

            <Button
              name="Comments"
              icon={<FaRegComments />}
              destination={`/comments/${userProfile?._id}`}
            />
          </div>
        </div>

        {/* Categories */}
        <div className="mt-8">
          <div className="flex items-center justify-between px-3 mb-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-base-content/40">
              Categories
            </p>

            <span className="text-xs text-base-content/40">
              {allCategoryData?.length || 0}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            {allCategoryData?.map((category) => (
              <NavLink
                key={category?._id}
                to={`/category/${category?._id}`}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-base-content/65 hover:bg-base-200 hover:text-base-content transition-colors"
              >
                <GoDot className="text-base-content/40" size={14} />

                <span className="truncate">
                  {category?.name}
                </span>
              </NavLink>
            ))}
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-auto px-3 pt-5">
          <div className="p-3 rounded-xl bg-base-200">
            <p className="text-xs font-medium text-base-content/70">
              Explore
            </p>

            <p className="text-xs text-base-content/40 mt-1">
              Discover articles by category.
            </p>
          </div>
        </div>

      </div>
    </aside>
  );
};

export default Sidebar;