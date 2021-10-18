import React from 'react';
import './Home.css'
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <section id="hero-section" className="mb-3">
            <div className="carousel slide" data-ride="carousel" id="hero">
                <ol class="carousel-indicators">
                    <li data-target="#hero" data-slide-to="0" class="active"></li>
                    <li data-target="#hero" data-slide-to="1"></li>
                    <li data-target="#carohero" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/f8ac168a-781a-4ade-a82d-d8191f245853/air-force-1-crater-womens-shoes-1bdNb2.png" className="d-block h-100" alt="First Slide" />
                        <div className="carousel-content">
                            <p className="text nike">NIKE AIR</p>
                            <span className="f">FORCE 1 CRATER</span><br /><br />
                            <botton type="botton" className="btn btn-secondary rounded-pill text-light f2">
                                <div className="t">Shop</div>
                            </botton>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/040317ba-f2d1-4aeb-a7c4-0d667debef36/air-zoom-alphafly-next-mens-road-racing-shoes-fNntgL.png" className="d-block h-100" alt="Second Slide" />
                        <div className="carousel-content">
                            <p className="text nike">NIKE AIR</p>
                            <span className="f">ZOOM ALPHAFLY NEXT%</span><br /><br />
                            <botton type="botton" className="btn btn-secondary rounded-pill text-light f2">
                                <div className="t">Shop</div>
                            </botton>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/ab191ef9-2b59-4351-8564-7308ab976f1f/pegasus-trail-3-gore-tex-mens-waterproof-trail-running-shoes-kzkHrx.png" className="d-block h-100" alt="Third Slide" />
                        <div className="carousel-content">
                            <p className="text nike">NIKE PEGASUS</p>
                            <span className="f">TRAIL3 GORE-TEX</span><br /><br />
                            <botton type="botton" className="btn btn-secondary rounded-pill text-light f2">
                                <div className="t">Shop</div>
                            </botton>
                        </div>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#hero" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#hero" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
            <div className="row ml-5">
                <div className="col-lg-6 col-md-6 col-12 col-xxl-6 my-5">
                    <h1 className="my-5 display-4">YOUR PERFECT <br /> RUNNING PARTNER
                    </h1>
                    <p className="display-6">Get the new Nike+ Run Club App</p>
                    <button type="button" className="btn btn-dark text-white rounded-pill">Shop now</button>
                </div>
                <div className="col-lg-6 col-md-6 col-12 col-xxl-6 my-5">
                    <figure>
                        <img src="https://static.nike.com/a/images/w_1920,c_limit/d5006fa0-0dca-4838-8efc-78a37aa385b9/what-shoes-are-best-for-overpronation-2021-nike-help.jpg" className="img-fluid mt-5" />
                    </figure>
                </div>
            </div>
        </section>
    );
}

export default Home;