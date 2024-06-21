import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, Outlet } from 'react-router-dom';
import bug1 from '../../../public/Assets/bug1.png';
import dashboard from '../../../public/Assets/dashboard.png';
import tickets from '../../../public/Assets/tickets.png';
import { logout } from '../../redux/auth/AuthSlice';

const Sidebar = () => {
  const loading = useSelector((state) => state.auth.loading);
  const isLogin = useSelector((state) => state.auth.isLogin);
  const dispatch = useDispatch();
  if (loading) {
    return (
      <div className="grid grid-cols-[20rem,8fr]">
        <aside className="h-screen py-1.5 px-2.5 bg-white border-x-2">
          <div className="flex justify-between items-center py-4 px-8">
            <Skeleton width={150} height={40} />
          </div>
          <nav>
            <Skeleton count={3} height={50} />
          </nav>
        </aside>
        <main>
          <Skeleton className="mt-5" count={9} height={70} />
        </main>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-[20rem,8fr] overflow-y-hidden">
      <aside className="h-screen py-1.5 px-2.5 bg-white border-x-2">
        <div className="flex justify-between items-center py-4 px-8">
          <img className="w-[15rem]" src={bug1} alt="logo" />
        </div>
        <nav className="pt-[4rem] flex flex-col gap-10 text-4xl">
          <>
            <div className="hover:bg-blue-500 hover:text-white rounded-xl flex items-center gap-6">
              <img width={20} height={20} alt="dashboard" src={dashboard} className="w-[20px]" />
              <Link href="/" className="text-[rgb(58,54,54)] hover:text-white">
                Dashboard
              </Link>
            </div>
            <div className="hover:bg-blue-500 hover:text-white rounded-xl flex items-center gap-6">
              <img alt="tickets" width={20} height={20} src={tickets} className="w-[20px]" />
              <Link href="/" className="text-[rgb(58,54,54)] hover:text-white">
                Tickets
              </Link>
            </div>
            <div className="w-full h-px bg-[silver]" />
            <div className="flex items-center gap-6">
              {isLogin && (
                <button
                  type="button"
                  className="p-[0.8rem] bg-[red] text-white w-36 rounded-xl text-center m-auto hover:scale-90 duration-200 transition-transform"
                  onClick={() => dispatch(logout())}
                >
                  Logout
                </button>
              )}
            </div>
          </>
        </nav>
      </aside>
      <main>
        <Outlet />
      </main>
      <ToastContainer />
    </div>
  );
};

export default Sidebar;
