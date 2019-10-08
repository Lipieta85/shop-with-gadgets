import React from 'react';
import '../assets/styles/nav-menu.scss';

const NavMenu = () => {
    return (
        <div className="container-fuid">
            <nav className="navbar navbar-expand-lg navbar-light bg-light border">
                <div className="collapse navbar-collapse d-flex justify-content-around" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Strona Główna</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">Nagrody</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">Zasady</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">Faq</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">Kontakt</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default NavMenu;