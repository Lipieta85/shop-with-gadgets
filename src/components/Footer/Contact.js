import React, { useState, useEffect } from "react";
import NavMenu from "../Nav/NavMenuClient";
import "../../assets/styles/contact.scss";
import { getContactDetails } from "../../api/index";
import Spinner from "../UI/Spinner/Spinner";
import { useSelector } from "react-redux";

const Contact = () => {
    const [contact, setContact] = useState("");
    const token = localStorage.getItem("token");
    const lang = useSelector(state => state.clientDataReducer.language);

    useEffect(() => {
        getContactDetails(token, lang).then(res => {
            setContact(res.data.data.objects);
        });
    }, [token, lang]);

    return (
        <div className="contact-details">
            <NavMenu />
            {contact ? (
                contact.map((e, key) => (
                    <>
                        <h2>{e.title}</h2>
                        <div key={key}>
                            {
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: e.content,
                                    }}
                                />
                            }
                        </div>
                    </>
                ))
            ) : (
                <Spinner />
            )}
        </div>
    );
};

export default Contact;
