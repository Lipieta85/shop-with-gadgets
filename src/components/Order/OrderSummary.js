import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder, productsToOrder } from "../../actions/index";
import "../../assets/styles/order-summary.scss";
import defImg from "../../assets/images/default.jpg";

const OrderSummary = () => {
    const products = useSelector(state => state.cartReducer.addedItems);
    const productsOrdered = useSelector(
        state => state.cartReducer.productsToOrder,
    );
    const total = useSelector(state => state.cartReducer.total);
    const orderSelectInputValue = useSelector(
        state => state.cartReducer.orderSelectInputValue,
    );
    const [checkBoxText] = useState("Budżet maretingowy");

    const dispatch = useDispatch();

    const token = sessionStorage.getItem("token");

    if (products && productsOrdered.length === 0) {
        products.map(item => {
            const basketProducts = {
                prodId: item.product.id,
                uomPrimary: item.product.uom_primary,
                quantity: item.quantity,
            };
            return dispatch(productsToOrder(basketProducts));
        });
    }

    let currency = [];
    let addedItems = products.length ? (
        products.map(item => {
            currency.push(item.price.currency);
            return (
                <tr key={item.product.id} className='table-row'>
                    <td className="">
                        <div className="">
                            <img src={item.images.length? item.images[0].small: defImg}
                                alt="item"
                                className="summary-img"
                            />
                        <span className="text-uppercase">
                            {item.product.description1}
                        </span>
                        </div>
                    </td>
                    <td>
                        <span className="">
                            {item.price.price}{" "}
                            {item.price.currency}
                        </span>
                    </td>    
                    <td>
                        <span className="">
                            {item.quantity}
                        </span>
                    </td>  
                    <td>
                        <span className="">
                            {item.itemTotalPrice}{" "}
                            {item.price.currency}
                        </span>
                    </td>                               
                </tr>
            );
        })
    ) : (
        <p>Twój koszyk jest pusty</p>
    );

    return (
        <div className="order-summary">
            <div className="container">
                <h2>Podsumowanie zamówienia</h2>
                <hr />
                <p className="order-summary-text">1. Zamówione produkty:</p>
                <table className="summary-table">
                    <thead>
                        <tr className="summary-header">
                            <th>Nazwa produktu</th>
                            <th>Cena</th>
                            <th>Ilość</th>
                            <th>Razem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {addedItems}
                    </tbody> 
                </table>
                <p className="order-summary-text mt-4">
                    2. Kwota do zapłaty:{" "}
                    <span className="summary-text-value font-weight-bold text-uppercase">
                        {total} {products[0].price.currency}
                    </span>
                </p>
                <p className="order-summary-text">
                    3. Adres dostawy:{" "}
                    <span className="summary-text-value font-weight-bold text-uppercase">
                        {orderSelectInputValue}
                    </span>
                </p>
                {/* <p className="order-summary-text">
                    4. Numer zamówienia Klienta:{" "}
                    <span className="summary-text-value font-weight-bold text-uppercase">
                        {orderInputState}
                    </span>
                </p> */}
                <p className="order-summary-text">
                    5. Typ zamówienia:{" "}
                    <span className="summary-text-value font-weight-bold text-uppercase">
                        {checkBoxText}
                    </span>
                </p>
                <hr />
                <div className="d-flex flex-wrap justify-content-between">
                    <Link
                        to="/Basket"
                        className="btn btn-outline-primary btn-back"
                    >
                        Wróć do koszyka
                    </Link>
                    <Link
                        to="/OrderEnd"
                        className="btn btn-outline-primary btn-submit"
                        onClick={() => dispatch(createOrder(token))}
                    >
                        Zatwierdź zamówienie
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
