import React from 'react';
import "../assets/styles/products.scss";
import image1 from "../assets/images/box1.jpg"

const Products = () => {
    return (
        <div className="container">
            <div className="col-12">
                <div className="row">
                    <div className="col-4">
                        <div class="card">
                            <img class="card-img-top" src={image1} alt="Card image cap"></img>
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div class="card">
                            <img class="card-img-top" src={image1} alt="Card image cap"></img>
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div class="card">
                            <img class="card-img-top" src={image1} alt="Card image cap"></img>
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;