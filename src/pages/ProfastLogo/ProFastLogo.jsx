import React from 'react';
import logo from "../../../src/assets/logo.png"
const ProFastLogo = () => {
    return (
        <div className='flex  items-end'>
            <img className='mb-2' src={logo} alt="" />
            <h1 className='text-3xl font-bold -ms-2'>ProFast</h1>
        </div>
    );
};

export default ProFastLogo;