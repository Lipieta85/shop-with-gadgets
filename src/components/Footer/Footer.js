import React from "react";
import "../../assets/styles/footer.scss";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
    const { t } = useTranslation();
    return (
        <div>
            <footer className="footer d-flex align-items-center">
                <div className="container-fluid">
                    <div className="d-flex justify-content-end footer-text-line">
                        <p className="footer-regulations m-0">
                            <Link
                                className="text-decoration-none"
                                to="/Contact"
                                onClick={() => window.scrollTo(0, 0)}
                            >
                                {t(`Footer.ContactDetails`)}
                            </Link>
                        </p>

                        <p className="footer-regulations details ml-5 m-0">
                            <Link
                                className="text-decoration-none"
                                to="/Regulations"
                                onClick={() => window.scrollTo(0, 0)}
                            >
                                {t(`Footer.ShopRules`)}
                            </Link>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
