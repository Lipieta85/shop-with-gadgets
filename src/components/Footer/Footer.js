import React from "react";
import "../../assets/styles/footer.scss";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div>
            <footer className="footer border-top d-flex align-items-center">
                <div className="container-fluid">
                    <div className="d-flex justify-content-end">
                        <p className="footer-regulations m-0">
                            <Link
                                className="regulations text-decoration-none"
                                to="/Regulations"
                            >
                                Regulamin sklepu
                            </Link>
                        </p>

                        <p className="footer-contact details ml-5 m-0">
                            <Link
                                className="rodo text-decoration-none"
                                to="/Rodo"
                            >
                                Regulamin RODO
                            </Link>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
