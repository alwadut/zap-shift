import React from 'react';
import Banner from '../banner/Banner';
import OurServices from '../Services/OurServices';
import BrandSliders from '../BrandSliders/Brandsliders';

const Home = () => {
    return (
        <div>
          
                <Banner></Banner>
                <OurServices />
                <BrandSliders></BrandSliders>
            
        </div>
    );
};

export default Home;