import React from 'react';
import locationMarchent from "../../assets/location-merchant.png"
const BeMerchent = () => {
    return (
        <div data-aos="zoom-in-up"
      className=" merchent-card rounded-2xl my-5 bg-[url('assets/be-a-merchant-bg.png')] bg-no-repeat ">
  <div className="hero-content flex-col md:flex-row-reverse justify-between p-20 text-base-100">
    <div className=' '>
        <img
      src={locationMarchent}
      className="rounded-lg w-full "
    />
    </div>
    <div>
      <h1 className="text-3xl   font-bold">Merchant and Customer Satisfaction is Our First Priority</h1>
      <p className="py-6">
       We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
      </p>
     <div className='flex flex-col md:flex-row gap-5'>
         <button className="btn-color p-2 px-4 rounded-2xl font-semibold text-black">Become a Merchent</button>
      <button className="text-greenAndYellow p-2 px-4 rounded-2xl font-semibold border">Earn With Profast Courier</button>
     </div>
    </div>
  </div>
</div>
    );
};

export default BeMerchent;