import React from "react";
import { useSelector } from "react-redux";
import "../../assets/styles/basket.scss";
import BasketButtons from "./BasketButtons";
import defImg from "../../assets/images/default.jpg";

const Basket = props => {
    const items = useSelector(state => state.cartReducer.addedItems);

    let addedItems = items.length ? (
        items.map(item => {
            return (
                <li
                    className="row nav-item collection-item border d-flex"
                    key={item.product.id}
                >
                    <div className="col-md-4 d-flex align-items-center text-center p-1">
                        <div className="item-img">
                            <img
                                src={item.img ? item.img : defImg}
                                alt="item"
                                className="item-basket-img"
                            />
                        </div>
                    </div>

                    <div className="col-md-8 border-left desc-col">
                        <BasketButtons
                            itemId={item.product.id}
                            //itemDesc={items.product.description1}
                            itemTitle={item.product.description1}
                            itemPrice={item.price.price}
                            itemQuantity={item.quantity}
                            itemTotalPrice={item.itemTotalPrice}
                        />
                    </div>
                </li>
            );
        })
    ) : (
        <p className="emptyBasket">Twój koszyk jest pusty</p>
    );
    return <>{addedItems}</>;
};

export default Basket;
