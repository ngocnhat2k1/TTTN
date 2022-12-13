import React, { useState, useEffect } from 'react'
import { FaListAlt, FaTimes, FaImage } from 'react-icons/fa'
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import Cookies from 'js-cookie';
import { useForm } from "react-hook-form";
import 'bootstrap/dist/css/bootstrap.min.css';
import { formatter } from '../../../../until/FormatterVND';

const ActionOrder = ({ idOrder, idCustomer }) => {
    const [modal, setModal] = useState(false);
    const [idDelivery, setIdDelivery] = useState('')
    const [createdAt, setCreatedAt] = useState('')
    const [email, setEmail] = useState('')
    const [totalPrice, settotalPrice] = useState('')
    const [discount, setDiscount] = useState(0)
    const [listProducts, setListProducts] = useState([])
    const [address, setAddress] = useState('')
    const [paidType, setPaidType] = useState("")
    const [deletedBy, setDeletedBy] = useState()
    const [expectedDate, setexpectedDate] = useState('')
    const [state, setState] = useState('')
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const toggleModal = () => {
        setModal(!modal);
        axios
            .get(`http://127.0.0.1:8000/api/v1/orders/${idOrder}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('adminToken')}`,
                },
            })

            .then((response) => {
                console.log(response.data)
                setIdDelivery(response.data.data.order.idDelivery)
                setCreatedAt(response.data.data.order.dateOrder)
                settotalPrice(response.data.data.order.totalPrice)
                setListProducts(response.data.data.order.products)
                setEmail(response.data.data.order.customer.email)
                setState(response.data.data.order.status)
                setAddress(response.data.data.order.address)
                setPaidType(response.data.data.order.paidType)
                setDiscount(response.data.data.product)
                setDeletedBy(response.data.data.order.deleted_by)
                setexpectedDate(response.data.data.order.expectedDeliveryTime)
            });
    };

    const closeModal = () => {
        setModal(!modal);
    }
    const handleState = () => {
        axios
            .put(`http://127.0.0.1:8000/api/v1/orders/${idOrder}/updateStatus=2`, 2, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('adminToken')}`,
                },
            })
            .then((response) => {
                alert(response.data.message)
                window.location.reload(false)
            })
    }
    const handleCancel = () => {
        axios
            .delete(`http://127.0.0.1:8000/api/v1/orders/${idOrder}/destroy=1`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('adminToken')}`,
                },
            })
            .then((response) => {
                alert(response.data.success)
                window.location.reload(false)
            })
            .catch((err) => { console.log(err) })

    }
    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    return (
        <div><FaListAlt onClick={toggleModal} />
            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content-order">
                        <Row>
                            <div className='detail-wrapper'>
                                <div className='detail-header'>
                                    <Row className='header-conten'>
                                        <h4>
                                            Chi tiết đơn hàng {idDelivery}
                                        </h4>
                                    </Row>
                                    <Row>
                                        <Col lg={6}>
                                            <div className='detail-bottom'>
                                                <ul>
                                                    <li>
                                                        <span>Ngày đặt hàng: </span>
                                                        <h6>{createdAt}</h6>
                                                    </li>
                                                </ul>

                                                <ul>
                                                    <li>
                                                        <span>Thanh toán: </span>
                                                        <h6>{paidType}</h6>
                                                    </li>
                                                </ul>
                                                <ul>
                                                    <li>
                                                        <span>Ngày dự kiến giao hàng: </span>
                                                        <h6>{expectedDate}</h6>
                                                    </li>
                                                </ul>
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className='detail-bottom'>
                                                <ul>
                                                    <li>
                                                        <span>Email: </span>
                                                        <h6>{email}</h6>
                                                    </li>
                                                </ul>
                                                <ul>
                                                    <li>
                                                        <span>Trạng thái: </span>
                                                        <h6>{state}</h6>
                                                    </li>
                                                </ul>
                                            </div>
                                        </Col>
                                        <Col lg={12}>
                                            <div className='detail-address'>
                                                <ul>
                                                    <li>
                                                        <span>Địa Chỉ: </span>
                                                        <h6>{address}</h6>
                                                    </li>
                                                </ul>

                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <div className='detail-body'>
                                    <table className='table table-borderless mb-0'>
                                        <thead>
                                            <tr>
                                                <th scope='col'>#</th>
                                                <th scope='col'>Sản Phẩm</th>
                                                <th scope='col'>Giá</th>
                                                <th scope='col'>Số Lượng</th>
                                                <th scope='col'>Giảm giá</th>
                                                <th scope='col'>Tổng</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listProducts && Object.values(listProducts).map((product) => {
                                                return (
                                                    <tr key={product.id} className="align-middle">
                                                        <th scope='col' className='img_product_order'><img src={product.img} alt="img" /></th>
                                                        <th scope='col'>{product.name}</th>
                                                        <th scope='col'>{formatter.format(product.price)}</th>
                                                        <th scope='col'>{product.quantity}</th>
                                                        <th scope='col'>{product.percentSale}%</th>
                                                        <th scope='col'>{formatter.format((product.price * (1 - (product.percentSale / 100))) * product.quantity)}</th>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td colSpan={2}></td>
                                                <td colSpan={1}></td>
                                                <td className='font-bold text-dark' colSpan={2}>Tổng</td>
                                                <td className='font-bold text-theme'>{formatter.format(totalPrice)}</td>
                                            </tr>
                                            {discount ? <tr>
                                                <td colSpan={2}></td>
                                                <td colSpan={1}></td>
                                                <td className='font-bold text-dark' colSpan={2}>Voucher</td>
                                                <td className='font-bold text-theme'>-{discount}%</td>
                                            </tr> : ""}
                                        </tfoot>
                                    </table>
                                    <div className='detail-footer text-right'>
                                        <div className='buttons'>
                                            {console.log(state === "Đơn hàng đang gửi cho đơn vị vận chuyển.")}
                                            {state == "Đơn hàng đang chờ xử lý." ? <button className='theme-btn-one btn-blue-overlay btn_sm' onClick={handleState}>Xác Nhận</button> : ""}
                                            {state === "Đơn hàng đang chờ xử lý." ? <button className='theme-btn-one btn-red-overlay btn_sm ml-2' onClick={handleCancel} >Huỷ Đơn Hàng</button> : ""}
                                        </div>
                                    </div>
                                    <button className="close close-modal" onClick={toggleModal}><FaTimes /></button>

                                </div>
                            </div>
                        </Row>
                    </div >
                </div >)}
        </div >
    )
}

export default ActionOrder