import React, { Fragment } from 'react';
import About from '../../components/about/about';
import BackToTop from '../../components/backToTop/backToTop';
import ContactArea from '../../components/ContactArea';
import Hero from '../../components/hero/hero';
import Marquee from '../../components/marque/marque';
import Navbar from '../../components/Navbar/Navbar';
import ProjectSection from '../../components/ProjectSection/ProjectSection';
import ServiceSection from '../../components/ServiceSection/ServiceSection';
import Testimonial from '../../components/Testimonial/Testimonial';
import { Element } from 'react-scroll'
import BlogSection from '../../components/BlogSection/BlogSection';
import Footer from '../../components/footer/Footer';
import Pricing from '../../components/Pricing';
import TechnologiesSection from '../../components/TechnologiesSection/TechnologiesSection';
import AwardsSection from '../../components/AwardsSection/AwardsSection';

const HomePage = () => {
    return (<Fragment>
        <Navbar />
        <Element name='home'>
            <Hero />
        </Element>
        <Element name='about'>
            <About />
        </Element>
        <Element name='service'>
            <ServiceSection />
        </Element>
        <Marquee />
        <Element name='technologies'>
            <TechnologiesSection />
        </Element>
        <Element name='project'>
            <ProjectSection />
        </Element>
         <Element name='Awards'>
            <AwardsSection />
        </Element>
        {/* <Testimonial /> */}
        <Element name='blog'>
            <BlogSection />
        </Element>
        {/* <Pricing /> */}
        <Element name='contact'>
            <ContactArea />
        </Element>
        <Footer />
        <BackToTop />
    </Fragment>
    )
};
export default HomePage;