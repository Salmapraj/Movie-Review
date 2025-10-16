import React from 'react'
import MyReview from '../../components/MyReview';
import { useAuth } from '../../context/AuthContext';
import account from "../../assets/account.png"

function Profile() {
  const {user}= useAuth()
  const username = user?.email ? user.email.split("@")[0] : "User";
  return (
    <div className='min-h-screen'>
        <div className=' realative w-full h-[50vh] bg-[#142d3e] p-5'>
         <MyReview/>
         <div className='flex  items-center gap-4'>
          <img src={account} alt="pp" className='w-50' />
          {/* <span className='text-xl text-white'>{user.email}</span> */}
         </div>
        </div>


    </div>
  )
}

export default Profile;