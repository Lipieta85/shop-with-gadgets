import React from "react";
import "../assets/styles/order-end.scss";

export default function NotFound() {
    return (
        <div className="order-end text-center">
            <div className="order-end-box">
                <h3>Twoje dane autoryzacyjne wygasły, zaloguj sie ponownie</h3>
                <a
                    className="btn btn-outline-primary mt-4"
                    href="https://mh-ecommerce-dev.bpower2.com/index.php/site/desktop"
                >
                    Wróć do strony logowania
                </a>
            </div>
        </div>
    );
}
