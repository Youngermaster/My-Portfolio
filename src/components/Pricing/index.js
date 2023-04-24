import React from 'react'
import { Link } from 'react-router-dom'



const Pricing = (props) => {
    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }


    const pricing = [
        {
            rate: '120',
            des: 'Consectetur adipiscing elit. Purusout phasellus.',
            li1: 'Web App design',
            li2: 'Software Development',
            li3: '3D Animation Add',
            li4: 'Graphic Design',
            li5: 'Web Development',
            title: 'Basic',
            link: '/',
        },
        {
            rate: '210',
            des: 'Consectetur adipiscing elit. Purusout phasellus.',
            li1: 'Web App design',
            li2: 'Software Development',
            li3: '3D Animation Add',
            li4: 'Graphic Design',
            li5: 'Web Development',
            title: 'Premium',
            link: '/',
        },
        {
            rate: '373',
            des: 'Consectetur adipiscing elit. Purusout phasellus.',
            li1: 'Web App design',
            li2: 'Software Development',
            li3: '3D Animation Add',
            li4: 'Graphic Design',
            li5: 'Web Development',
            title: 'Advanced',
            link: '/',
        },


    ]


    return (
        <section className="tp-pricing-section section-padding">
            <div className="container">
                <div className="tp-section-title">
                    <span>Pricing</span>
                    <h2>My Pricing Plan</h2>
                </div>
                <div className="tp-pricing-wrap">
                    <div className="row">
                        {pricing.map((pricing, ptem) => (
                            <div className="col col-lg-4 col-md-6 col-12" key={ptem}>
                                <div className="tp-pricing-item">
                                    <div className="tp-pricing-top">
                                        <div className="pricing-thumb">
                                            <span>{pricing.title}</span>
                                        </div>
                                        <div className="tp-pricing-text">
                                            <h2>${pricing.rate}<span>/per month</span></h2>
                                            <p>{pricing.des}</p>
                                        </div>
                                    </div>
                                    <div className="tp-pricing-bottom">
                                        <div className="tp-pricing-bottom-text">
                                            <ul>
                                                <li>{pricing.li1}</li>
                                                <li>{pricing.li2}</li>
                                                <li>{pricing.li3}</li>
                                                <li>{pricing.li5}</li>
                                                <li>{pricing.li4}</li>
                                            </ul>
                                            <Link onClick={ClickHandler} to={pricing.link}>Choose Plan</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="visible-rotate-text">
                <h1>My Pricing</h1>
            </div>
        </section>
    )
}

export default Pricing;