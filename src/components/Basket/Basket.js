import React from "react";
import { useSelector} from "react-redux";
//import { getBasketProducts } from "../../actions/index";
import "../../assets/styles/basket.scss";
import BasketButtons from "./BasketButtons";
import defImg from "../../assets/images/default.jpg";

const Basket = props => {
    const items = useSelector(state => state.cartReducer.addedItems);

    //const token = sessionStorage.getItem("token");

    // useEffect(() => {
    //    dispatch(getBasketProducts(token)) 
    // }, [dispatch, token])


    //const basketItems = sessionStorage.getItem("basket") ? sessionStorage.getItem("basket") : items
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
                                src={item.images.length ? item.images.map(data => {
                                    return data.small
                                }) : defImg}
                                alt="item"
                                className="item-basket-img"
                            />
                        </div>
                    </div>

                    <div className="col-md-8 border-left desc-col">
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
