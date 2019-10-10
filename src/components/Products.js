import React, { useEffect, useState } from 'react';
import "../assets/styles/products.scss";
import image1 from "../assets/images/box1.jpg";
import axios from 'axios';

const Products = () => {
    const [state, setstate] = useState([])
    useEffect(() => {
       axios.get("https://jsonplaceholder.typicode.com/photos?_start=0&_limit=4").then(res => setstate(res.data))
    }, [])
    return (
        <div className="container">
            <div className="col-12">
                <div className="row">
                {
                    state.map(item => (
                        <div className="col-xl-3 col-lg-3 col-md-6 col-s-6">
                            <div class="card">
                            <img class="card-img-top" src={image1} alt="Card image cap"></img>
                            <div class="card-body">
                                <h5 class="card-title">{item.title}</h5>
                                <p class="card-text">{item.body}</p>
                                <a href={item.id} class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>   
                    ))
                }
                </div>
            </div>
        </div>
    );
};

export default Products;