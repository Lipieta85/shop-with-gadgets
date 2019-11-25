import React from "react";
import NavMenu from "../components/HomePage/NavMenu";
import LoginForm from "../components/HomePage/LoginForm";
import Rules from "../components/HomePage/Rules";
import Slider from "../components/HomePage/Slider";

const HomePageContainer = () => {
    return (
        <>
            <NavMenu />
            <LoginForm />
            <Rules />
            <Slider />
        </>
    );
};

export default HomePageContainer;
