import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserThunk } from "../../../store/features/user/user.thunk";
import { IoLogIn } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";

const Navbar = () => {
  const {isAuthenticated, userProfile} = useSelector(state => state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUserThunk());
  };

  return (
    <div>
      <div className="navbar bg-base-200 shadow-sm border-b">
        <div className="flex-1">
          <a className="pl-10 flex items-center gap-1 cursor-pointer">
            <span className="inline-block text-5xl font-black text-blue-600 -rotate-12">
              B
            </span>

            <span className="text-3xl font-extrabold text-slate-900">
              LOGIFY
            </span>
          </a>
        </div>
        {
          isAuthenticated? (
            <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search"
            className="input w-24 md:w-auto"
          />
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={userProfile?.avatar || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to="/profile" className="justify-between">
                  <span className="flex items-center gap-1 text-sm"><CiUser /> Profile</span>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/blog/add"} className="text-sm"><FaPlus />Create Blog</NavLink>
              </li>
              <li>
                <div className="bg-[#cecbcb] w-full p-[0.5px]"></div>
                <button onClick={handleLogout} className="text-sm"><span className="text-red-500"><CiLogout /></span>Logout</button>
              </li>
            </ul>
          </div>
        </div>
          ) : (
            <button className="btn btn-primary" onClick={() => navigate('/login')}>Sign In <span className="text-2xl"> <IoLogIn /> </span></button>
          )
        }
      </div>
    </div>
  );
};

export default Navbar;
