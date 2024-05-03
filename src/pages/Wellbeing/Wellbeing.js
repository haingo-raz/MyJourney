import React from 'react';
import { Link } from 'react-router-dom';
import './Wellbeing.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Navbar from '../../components/Navbar/Navbar';

function Wellbeing() {

    //slider settings
    var settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };

    return (
        <div className="wellbeingPage">
            <Navbar/>
            <h1>
                My wellbeing
            </h1>

            <section className="topicSlider">
                <Slider {...settings}>
                    <div className="articleBox">
                        <h3 className="articleTitle">5 ways to combat stress</h3>
                        <div className="btnContainer">
                            <button><Link to="/combat_stress">SHOW ME</Link></button>
                        </div>
                    </div>
                    <div className="articleBox">
                        <h3 className="articleTitle">5 communication tips</h3>
                        <div className="btnContainer">
                            <button><Link to="/communication_tips">SHOW ME</Link></button>
                        </div>
                    </div>
                    <div className="articleBox">
                        <h3 className="articleTitle">5 tips to avoid procrastination</h3>
                        <div className="btnContainer">
                            <button><Link to="/avoid_procastination">SHOW ME</Link></button>
                        </div>
                    </div>
                    <div className="articleBox">
                        <h3 className="articleTitle">5 ways to increase happiness</h3>
                        <div className="btnContainer">
                            <button><Link to="/increase_happiness">SHOW ME</Link></button>
                        </div>
                    </div>
                </Slider>
            </section>
        </div>
    );
}

export default Wellbeing;