import React from 'react';
import './Wellbeing.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

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
            <h1>
                My wellbeing
            </h1>

            <section className="topicSlider">
                <Slider {...settings}>
                    <div className="articleBox">
                        <h3 className="articleTitle">5 proven ways to combat stress</h3>
                        <div className="btnContainer">
                            <button>SHOW ME</button>
                        </div>
                    </div>
                    <div className="articleBox">
                        <h3 className="articleTitle">5 proven ways to combat stress</h3>
                        <div className="btnContainer">
                            <button>SHOW ME</button>
                        </div>
                    </div>
                    <div className="articleBox">
                        <h3 className="articleTitle">5 proven ways to combat stress</h3>
                        <div className="btnContainer">
                            <button>SHOW ME</button>
                        </div>
                    </div>
                    <div className="articleBox">
                        <h3 className="articleTitle">5 proven ways to combat stress</h3>
                        <div className="btnContainer">
                            <button>SHOW ME</button>
                        </div>
                    </div>
                    <div className="articleBox">
                        <h3 className="articleTitle">5 proven ways to combat stress</h3>
                        <div className="btnContainer">
                            <button>SHOW ME</button>
                        </div>
                    </div>
                    
                </Slider>
            </section>
        </div>
    );
}

export default Wellbeing;