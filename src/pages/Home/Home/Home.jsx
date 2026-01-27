import React from 'react';
import Banner from '../banner/Banner';
import OurServices from '../Services/OurServices';
import BrandSliders from '../BrandSliders/Brandsliders';
import FeaturesSection from '../FeaturesSection/FeaturesSection';
import BeMerchent from '../../BeMerchent/BeMerchent';
import ReviewSlider from '../../CoutomerReview/ReviewSlider';
import HowItWorks from '../../HowItsWork/HowItWorks';

const Home = () => {
    return (
        <div>
          
                <Banner></Banner>
                <HowItWorks></HowItWorks>
                <OurServices />
                <BrandSliders></BrandSliders>
                <FeaturesSection></FeaturesSection>
                <BeMerchent></BeMerchent>
                <ReviewSlider></ReviewSlider>
            
        </div>
    );
};

export default Home;