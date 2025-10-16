import React,{useState,useRef,useEffect} from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import account from '../assets/account.png'


function ProfileMenu() {
    const {logout,user}=useAuth()
    const navigate= useNavigate()
    const [open,setOpen]= useState(false);
    const menuRef= useRef() // {curent: undefined}
      const username = user?.email ? user.email.split("@")[0] : "User";

    useEffect(()=>{
      const handleClickOutside =(e)=>{
        if(menuRef.current && !menuRef.current.contains(e.target)){
          setOpen(false)
        }
      }
      document.addEventListener('mousedown',handleClickOutside);
      return ()=> document.removeEventListener('mousedown',handleClickOutside)
    },[])


  return (

    <div  ref={menuRef} className=" relative">
      {/* Profile Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="focus:outline-none"
      >
        <img
          src={account}
          alt="Profile"
          className="w-8 h-8 rounded-full border border-gray-300 "
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl bg-gray-300 shadow-lg border border-gray-200 z-50">
         
          <div className="absolute -top-2 right-5 w-4 h-4 bg-white border-t border-l border-gray-200 rotate-45"></div>

          <div className="px-4 py-3 border-b border-gray-100">
            <p className="font-semibold text-gray-800">{username}</p>
            <button
              onClick={() => {
                navigate(`/profile/${user._id}`);
                setOpen(false);
              }}
              className="text-sm text-gray-600 hover:underline"
            >
              View profile
            </button>
          </div>

          {/* Menu Item */}
          <div className="py-3">
              <hr  className='text-gray-300'/>
            <MenuItem label="Ratings"  onClick={() => navigate("/my-reviews")} />
            <hr  className='text-gray-300'/>
            <MenuItem label="Favourites" onClick={() => navigate("/my-favourite")} />
  <hr  className='text-gray-300'/>

            <div className="border-t border-gray-100 mt-2">
              <MenuItem
                label="Logout"
                textColor="text-red-600 text-lg"
                onClick={() => {
                  logout()
                  navigate("/");
                  setOpen(false);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


function MenuItem({ label, onClick, textColor = "text-gray-700 text-md" }) {
  return (
    <button
      onClick={onClick}
      className={`block w-full text-left px-4 py-2 text-[18px] hover:bg-gray-100 ${textColor}`}
    >
      {label}
    </button>
  );
}

export default ProfileMenu