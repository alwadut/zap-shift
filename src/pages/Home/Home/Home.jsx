import React from 'react';
import Banner from '../banner/Banner';
import OurServices from '../Services/OurServices';
import BrandSliders from '../BrandSliders/Brandsliders';
import FeaturesSection from '../FeaturesSection/FeaturesSection';

const Home = () => {
    return (
        <div>
          
                <Banner></Banner>
                <OurServices />
                <BrandSliders></BrandSliders>
                <FeaturesSection></FeaturesSection>
            
        </div>
    );
};

export default Home;