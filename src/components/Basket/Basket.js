import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../assets/styles/basket.scss";
import { Link } from "react-router-dom";
import {
    addQuantity,
    subtractQuantity,
    removeCart,
} from "../../actions/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faMinusSquare } from "@fortawesome/free-solid-svg-icons";

const Basket = () => {
    const items = useSelector(state => state.addedItems);
    const total = useSelector(state => state.total);

    const dispatch = useDispatch();

    let addedItems = items.length ? (
        items.map(item => {
            return (
                <li
                    className="row nav-item collection-item border d-flex"
                    key={item.id}
                >
                    <div className="col-md-4 d-flex align-items-center text-center">
                        <div className="item-img">
                            <img src={item.img} alt="item" className="w-50" />
                        </div>
                    </div>

                    <div className="col-md-8 border-left desc-col">
                        <div className="item-desc">
                            <h4 className="title text-uppercase">
                                {item.title}
                            </h4>
                            <p>{item.desc}</p>
                            <p>
                                <b>Cena: {item.price},00 zł</b>
                            </p>
                            <div className="add-remove">
                                <span className="mr-3 mb-3">
                                    <b>Ilość: {item.quantity}</b>
                                </span>

                                <span>
                                    <Link
                                        className="add-quantity m-1"
                                        onClick={() =>
                                            dispatch(addQuantity(item.id))
                                        }
                                    >
                                        <FontAwesomeIcon icon={faPlusSquare} />
                                    </Link>
                                    <Link
                                        className="minus-quantity m-1"
                                        onClick={() =>
                                            dispatch(subtractQuantity(item.id))
                                        }
                                    >
                                        <FontAwesomeIcon icon={faMinusSquare} />
                                    </Link>
                                </span>
                            </div>
                            <div className="text-right">
                                <button
                                    className="btn btn-outline-primary"
                                    onClick={() =>
                                        dispatch(removeCart(item.id))
                                    }
                                >
                                    Usuń z koszyka
                                </button>
                            </div>
                        </div>
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
