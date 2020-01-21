import React, { useState, useEffect } from "react";
import NavMenu from "../ClientPanel/NavMenuClient";
import "../../assets/styles/contact.scss";
import { getContactDetails } from "../../api/index";
import Spinner from "../UI/Spinner/Spinner";

const Contact = () => {
    const [contact, setContact] = useState("");
    const token = localStorage.getItem("token");

    useEffect(() => {
        getContactDetails(token).then(res => {
            setContact(res.data.data.objects);
        });
    }, [token]);

    return (
        <div className="contact-details">
            <NavMenu /> <h2>Dane kontaktowe</h2>
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