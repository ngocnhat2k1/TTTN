import styles from './ProductWrapper.module.css'
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { FaRegHeart, FaExpand } from "react-icons/fa";
import { formatter } from '../../../utils/utils';
import { useEffect, useState } from 'react';

function ProductWrapper({ unit }) {

    const [listNewArrival, setListNewArrival] = useState([]);
    // const [listTrending, setListTrending] = useState([]);
    const [listBestSellers, setListBestSellers] = useState([]);
    const [listOnSell, setListOnSell] = useState([]);
    const [list, setList] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/product/newArrival`)
            .then(response => {
                setListNewArrival(response.data.data)
            })
            .catch(err => {
                console.log(err);
            })

        axios
            .get(`http://localhost:8000/api/product/saleProduct`)
            .then(response => {
                setListOnSell(response.data.data)
            })
            .catch(err => {
                console.log(err);
            })

        axios
            .get(`http://localhost:8000/api/product/bestSeller`)
            .then(response => {
                setListBestSellers(response.data.data)
            })
            .catch(err => {
                console.log(err);
            })

        // axios
        //     .get(`http://localhost:8000/api/product/trending/day=7`)
        //     .then(response => {
        //         console.log(response.data.data)
        //         setListTrending(response.data.data)
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })
    }, [])

    useEffect(() => {
        if (unit === "New Arrival") {
            setList(listNewArrival);
        } else if (unit === "On Sell") {
            setList(listOnSell);
        } else if (unit === "Best Sellers") {
            setList(listBestSellers)
        }
        //  else if (unit === "Trending") {
        //     setList(listTrending)
        // }
    }, [unit, listBestSellers, listNewArrival, listOnSell])

    return (
        <>
            {list.map((product) => {
                return (
                    <Col lg={3} md={4} sm={6} xs={12} key={product.id}>
                        <div className={styles.productWrapper}>
                            <div className={styles.thumb}>
                                <Link to={`/shop/${product.id}`} className={styles.image}>
                                    <img src={product.image} alt={product.name} />
                                </Link>
                                <span className={styles.badges}>
                                    <span
                                        className={
                                            unit === "New Arrival" ? styles.new : unit === "Best Seller" ? styles.best : unit === "Trending" ? styles.trending : styles.sale
                                        }>
                                        {unit === "On Sell" ? product.percentSale + "% OFF" : unit}</span>
                                </span>
                                <div className={styles.actions}>
                                    <a className={`${styles.wishList} ${styles.action}`} title="Wishlist">
                                        <FaRegHeart />
                                    </a>
                                    <a className={`${styles.quickView} ${styles.action}`} title="Quickview">
                                        <FaExpand />
                                    </a>
                                </div>
                                <button className={`${styles.addToCart}`}>Add to cart</button>
                            </div>
                            <div className={styles.content}>
                                <h5 className={styles.title}>
                                <Link to={`/shop/${product.id}`}>{product.name}</Link>
                                </h5>
                                <span className={styles.price}>
                                    {unit === "On Sell" ? formatter.format(product.price * ((100 - product.percentSale) / 100)) : formatter.format(product.price)}
                                </span>
                            </div>
                        </div>
                    </Col>
                )
            })}
        </>
    )
}

export default ProductWrapper