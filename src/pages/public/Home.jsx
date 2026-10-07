import React from 'react';
import SEO from '../../components/common/SEO';
import Hero from '../../components/home/Hero';
import CategoryTiles from '../../components/home/CategoryTiles';
import FeaturedCarousel from '../../components/home/FeaturedCarousel';
import HeritageCounters from '../../components/home/HeritageCounters';
import MaestriOrafi from '../../components/home/MaestriOrafi';
import Bestsellers from '../../components/home/Bestsellers';
import BridalBanner from '../../components/home/BridalBanner';
import GiftGuide from '../../components/home/GiftGuide';
import TestimonialsSlider from '../../components/home/TestimonialsSlider';
import InstagramGrid from '../../components/home/InstagramGrid';
import TrustBar from '../../components/home/TrustBar';

const Home = () => {
  return (
    <>
      <SEO
        title="Alta Gioielleria Italiana dal 1954"
        description="Discover Italian luxury fine jewellery handcrafted in Florence & Valenza. 18kt Gold, Certified Diamonds & High Jewellery by Aurelia Venezia."
      />
      <Hero />
      <CategoryTiles />
      <FeaturedCarousel />
      <HeritageCounters />
      <MaestriOrafi />
      <Bestsellers />
      <BridalBanner />
      <GiftGuide />
      <TestimonialsSlider />
      <InstagramGrid />
      <TrustBar />
    </>
  );
};

export default Home;
