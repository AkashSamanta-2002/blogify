import React from "react";
import { FaHome } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { LuAlignJustify } from "react-icons/lu";
import { GrBlog } from "react-icons/gr";
import { FaRegComments } from "react-icons/fa";
import { useSelector } from 'react-redux'

const Button = ({name, icon, destination}) => {
  return <NavLink to={destination} className="flex items-center gap-2 cursor-pointer hover:bg-[#dfdede] p-2 w-full pl-5">{icon}{name}</NavLink>  
}

const Sidebar = () => {
  const {userProfile} = useSelector(state => state.user);
  
  return (
    <div className="bg-base-200 min-w-70 h-full border-r">
      <div className="flex flex-col items-baseline h-full pt-3 gap-2 text-[#565656]">
        <Button name="Home" icon={<IoHome />} destination={"/"}/>
        {userProfile?.role?.includes("admin") && (<Button name="Categories" icon={<LuAlignJustify />} destination={"/category"} />)}
        <Button name="Blogs" icon={<GrBlog />} destination={"/blog"} />
        <Button name="Comments" icon={<FaRegComments />} />
        <div>Categories</div>
      </div>
    </div>
  );
};


export default Sidebar;
