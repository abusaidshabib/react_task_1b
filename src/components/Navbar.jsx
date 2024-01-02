import React from 'react';
import { Link } from 'react-router-dom';
import { GoPerson } from "react-icons/go";
import { AuthContext } from '../authContext';

const Navbar = () => {
    const { dispatch } = React.useContext(AuthContext);
    return (
        <div className='flex justify-between px-[112px] py-[43px]'>
            <p className='uppercase font-b text-5xl text-white'>app</p>
            <button onClick={() => dispatch({ type: "LOGOUT" })} className='bg-neural rounded-full text-base w-[124px] h-[48px] font-light flex items-center justify-center gap-1'>
                <GoPerson className='text-lg' />
                <span>Logout</span>
            </button>
        </div>
    );
};

export default Navbar;