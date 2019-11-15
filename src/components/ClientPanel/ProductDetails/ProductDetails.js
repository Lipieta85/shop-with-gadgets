import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import Button from '../Button'
import NavMenu from './ProductDetailsNavMenu'
import ClientPanelMenu from '../../ClientPanelMenu'
import Carousel from './Carousel'

import '../../../assets/styles/product-details.scss'

const ProductDetails = props => {
    const products = useSelector(state => state.cartReducer.items)
    const [loadedProduct, setLoadedProduct] = useState([])
    const id = props.match.params.id

    useEffect(() => {
        if (id) {
            const filter = products.filter(product => {
                return product.id === id
            })
            setLoadedProduct(filter[0])
        }
    }, [loadedProduct, products, id])
    const nexItem = () => {
        if (Number(id) < products.length) {
            props.history.push('/product/' + (Number(id) + 1))
        } else if (Number(id) === products.length) {
            props.history.push('/product/1')
        }
    }
    const prevItem = () => {
        if (Number(id) === 1) {
            props.history.push('/product/' + products.length)
        } else {
            props.history.push('/product/' + (Number(id) - 1))
        }
    }
    return (
        <div className="product-details">
            <div className="container-fluid">
                <NavMenu />
                <div className="row product-details-container">
                    <div className="col-md-9">
                        <div className="product-details-content row p-2">
                            <div className="col-md-6 d-flex align-items-center">
                                <div className="d-flex justify-content-center">
                                    <Carousel
                                        loadedProductImage={`/${loadedProduct.img}`}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div style={{ maxWidth: '1000px' }}>
                                    <div className="product-details-desc p-3">
                                        <h3 className="product-details-header">
                                            {loadedProduct.title}
                                        </h3>
                                        <p className="product-details-text">
                                            {loadedProduct.desc}
                                        </p>
                                        <p className="font-weight-bold">
                                            Kod produktu:{' '}
                                            <span className="product-details-text">
                                                WPK700
                                            </span>
                                        </p>
                                        <p className="font-weight-bold">
                                            Jednostka miary:{' '}
                                            <span className="product-details-text">
                                                szt
                                            </span>
                                        </p>
                                        <p className="font-weight-bold">
                                            Cena jendostkowa:{' '}
                                            <span className="product-details-text">
                                                {loadedProduct.price} zł
                                            </span>
                                        </p>
                                        <p className="font-weight-bold">
                                            Stan magazynowy:{' '}
                                            <span className="product-details-text">
                                                {loadedProduct.availableProduct}{' '}
                                                szt.
                                            </span>
                                        </p>
                                        <div className="product-buttons-container row">
                                            <Button itemId={id} />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-3 d-flex justify-content-between">
                                    <button
                                        className="btn btn-outline-primary"
                                        onClick={prevItem}
                                    >
                                        Poprzedni
                                    </button>
                                    <button
                                        className="btn btn-outline-primary"
                                        onClick={nexItem}
                                    >
                                        Następny
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="client-panel col-md-3">
                        <ClientPanelMenu />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
