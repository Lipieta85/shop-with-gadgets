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
        items.map(item => {
            return (
                <li
                    className="row nav-item collection-item d-flex mb-1"
                    key={item.product.id}
                >
                    <div className="col-sm-4 d-flex align-items-center text-center p-1">
                        <div className="item-img">
                            <img
                                src={
                                    item.images.length
                                        ? item.images.map(data => {
                                              return data.small;
                                          })
                                        : defImg
                                }
                                alt="item"
                                className="item-basket-img"
                            />
                        </div>
                    </div>

                    <div className="col-sm-8 desc-col">
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
