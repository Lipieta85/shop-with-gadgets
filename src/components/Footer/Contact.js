import React, { useState, useEffect } from "react";
import NavMenu from "../ClientPanel/NavMenuClient";
import "../../assets/styles/contact.scss";
import { getContactDetails } from "../../api/index";
import Spinner from "../UI/Spinner/Spinner";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const Contact = () => {
    const [contact, setContact] = useState("");
    const token = localStorage.getItem("token");
    const lang = useSelector(state => state.clientDataReducer.language);

    const { t } = useTranslation();

    useEffect(() => {
        getContactDetails(token, lang).then(res => {
            setContact(res.data.data.objects);
        });
    }, [token, lang]);

    return (
        <div className="contact-details">
            <NavMenu /> <h2>{t(`Footer.ContactDetails`)}</h2>
            {contact ? (
                contact.map((e, key) => (
                    <div key={key}>
                        {
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: e.content,
                                }}
                            />
                        }
                    </div>
                ))
            ) : (
                <Spinner />
            )}
        </div>
    );
};

export default Contact;
