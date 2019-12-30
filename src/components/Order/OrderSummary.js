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

    const budgetOrder = true;
    const orderIsFirst = true;

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
                    <td>
                        <img src={item.images.length? item.images[0].small: defImg}
                            alt="item"
                            className="summary-img"
                        />
                        <span className="text-uppercase">
                            {item.product.description1}
                        </span>
                    </td>
                    <td>
                        {item.price.price}{" "}
                        {item.price.currency}
                    </td>    
                    <td>{item.quantity}</td>  
                    <td>
                        {item.itemTotalPrice}{" "}
                        {item.price.currency}
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
                <ol>
                {budgetOrder&&orderIsFirst?
                    <li className="order-summary-text">Wartość Twojego budżetu: 
                        <span className="summary-text-value font-weight-bold text-uppercase">
                            {} {products[0].price.currency}
                        </span>
                    </li>
                :<></>
                }
                {budgetOrder&&!orderIsFirst?
                    <li className="order-summary-text">Wartość dostępnego budżetu: </li>
                :<></>
                }
                <li className="order-summary-text">Zamówione produkty:</li>
                </ol>
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
                <ol start={budgetOrder?3:2}>
                    <li className="order-summary-text">
                        {budgetOrder?'Wartość zamówienia: ':'Kwota do zapłaty: '}
                        <span className="summary-text-value font-weight-bold text-uppercase">
                            {total} {products[0].price.currency}
                        </span>
                    </li>
                    {budgetOrder?
                        <li className="order-summary-text">
                            Pozostało do wykorzystania:
                            <span className="summary-text-value font-weight-bold text-uppercase">
                                {} {products[0].price.currency}
                            </span>
                        </li> 
                    :<></>
                    }
                    <li className="order-summary-text">
                        Adres dostawy:{" "}
                        <span className="summary-text-value font-weight-bold text-uppercase">
                            {orderSelectInputValue}
                        </span>
                    </li>
                    <li className="order-summary-text">
                        Typ zamówienia:{" "}
                        <span className="summary-text-value font-weight-bold text-uppercase">
                            {checkBoxText}
                        </span>
                    </li>
                </ol>
                {/* <p className="order-summary-text">
                    4. Numer zamówienia Klienta:{" "}
                    <span className="summary-text-value font-weight-bold text-uppercase">
                        {orderInputState}
                    </span>
                </p> */}  
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
