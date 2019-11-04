import React from "react";
import "../../assets/styles/footer.scss";

const Footer = () => {
    return (
        <div>
            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-6 col-lg-6">
                            <p>
                                Na każdym etapie produkcji filtrów FILTRON,
                                kierujemy się precyzją. Dowodem tego są
                                nowoczesne i zautomatyzowane linie produkcyjne,
                                zaawansowane metody laboratoryjnej kontroli
                                jakości oraz innowacyjne rozwiązania
                                konstrukcyjne. Dzięki naszej precyzji, setki
                                tysięcy europejskich mechaników od lat ufa
                                jakości filtrów FILTRON
                            </p>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-6">
                            <div className="row">
                                <div className="col-sm-12 col-md-8 col-lg-8">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna
                                        aliqua
                                    </p>
                                </div>
                                <div className="col-sm-12 col-md-4 col-lg-4">
                                    <ul>
                                        <li>
                                            <a
                                                href="/"
                                                onClick={e =>
                                                    e.preventDefault()
                                                }
                                            >
                                                link1
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="/"
                                                onClick={e =>
                                                    e.preventDefault()
                                                }
                                            >
                                                link2
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="/"
                                                onClick={e =>
                                                    e.preventDefault()
                                                }
                                            >
                                                link3
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
