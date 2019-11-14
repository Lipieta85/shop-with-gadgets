import React from "react";
import { useSelector } from "react-redux";
import "../../assets/styles/basket.scss";
import BasketButtons from "./BasketButtons";

const Basket = props => {
    const items = useSelector(state => state.cartReducer.addedItems);

    let addedItems = items.length ? (
        items.map(item => {
            console.log(item);
            return (
                <li
                    className="row nav-item collection-item border d-flex"
                    key={item.id}
                >
                    <div className="col-md-4 d-flex align-items-center text-center p-1">
                        <div className="item-img">
                            <img src={item.img} alt="item" className="w-50" />
                        </div>
                    </div>

                    <div className="col-md-8 border-left desc-col">
                        <BasketButtons
                            itemId={item.id}
                            itemDesc={items.desc}
                            itemTitle={item.title}
                            itemPrice={item.price}
                            itemQuantity={item.quantity}
                            itemTotalPrice={item.itemTotalPrice}
                        />
                    </div>
                </li>
            );
        })
    ) : (
        <p>Twój koszyk jest pusty</p>
    );
    return <>{addedItems}</>;
};

export default Basket;
