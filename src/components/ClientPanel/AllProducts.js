import React from "react";
import { useSelector, useDispatch } from "react-redux";

const AllProducts = () => {
    const items = useSelector(state => state.cartReducer.items);
};

export default AllProducts;
