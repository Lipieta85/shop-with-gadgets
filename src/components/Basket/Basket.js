import React from "react";
import { useSelector } from "react-redux";
//import { getBasketProducts } from "../../actions/index";
import "../../assets/styles/basket.scss";
import BasketButtons from "./BasketButtons";
import defImg from "../../assets/images/default.jpg";

const Basket = props => {
    const items = useSelector(state => state.cartReducer.addedItems);

    // const token = sessionStorage.getItem("token");

    // useEffect(() => {
    //    dispatch(getBasketProducts(token))
    // }, [dispatch, token])

    let addedItems = items.length ? (
        items.map((item, i) => {
            return (
                <li
                    className="row nav-item collection-item d-flex mb-1"
                    key={item.product.id}
                >
                    <div className="col-md-1 hidden-sm"></div>
                    <div className="col-sm-3 d-flex text-center p-0 img-box">
                        <span className="item-number">{i + 1}.</span>
                        <div className="item-img white-bg w-100 h-100">
                            <img
                                src={
                                    item.images.length
                                        ? item.images[0].small
                                        : defImg
                                }
                                alt="item"
                                className="item-basket-img"
                            />
                        </div>
                    </div>
                    <div className="col-sm-9 col-md-8 desc-col">
                        <BasketButtons
                            itemId={item.product.id}
                            itemTitle={item.product.description1}
                            itemPrice={item.price.price}
                            itemQuantity={item.quantity}
                            itemTotalPrice={item.itemTotalPrice}
                            itemCurrency={item.price.currency}
                            itemUnit={item.product.uom_primary}
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
