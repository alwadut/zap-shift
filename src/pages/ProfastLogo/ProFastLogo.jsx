import React from 'react';
import logo from "../../../src/assets/logo.png"
import { Link } from 'react-router';
const ProFastLogo = () => {
    return (
        <Link to='/'>
        <div className='flex  items-end'>
            <img className='mb-2' src={logo} alt="" />
            <h1 className='text-3xl font-bold -ms-2'>ProFast</h1>
        </div></Link>
    );
};

export default ProFastLogo;