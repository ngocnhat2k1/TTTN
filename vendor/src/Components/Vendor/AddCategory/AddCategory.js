import React, { useEffect, useState } from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import '../DashBoard.css'
import { useForm } from "react-hook-form";
import axios from 'axios';
import Cookies from 'js-cookie';
import ModalConfirm from '../ModalConfirm/ModalConfirm';

const AddCategory = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [success, setSuccess] = useState("")
    const [message, setMessage] = useState('')
    const [notify, setNotify] = useState(false)
    const onSubmit = data => {
        axios
            .post('http://127.0.0.1:8000/api/v1/categories/create', data,
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('adminToken')}`,
                    },
                },
            )
            .then((response) => {
                setSuccess(response.data.success);
                setMessage(response.data.message);
                setNotify(true)
            })
            .catch(function (error) {
                alert(error);
                console.log(error);
            });
    }
    return (
        <Col sm={12} md={12} lg={9}>
            <div className='tab-content dashboard_content'>
                <div className='tab-pane fade show active'>
                    <div id='add_product_area'>
                        <div className='container'>
                            <Row>
                                <Col lg={12}>
                                    <div className='add_product_wrapper'>
                                        <h4>Thêm danh mục</h4>
                                        <form className='add_product_form'
                                            onSubmit={handleSubmit(onSubmit)}>
                                            <Row>
                                                <Col lg={12}>
                                                    <div className='fotm-group'>
                                                        <label htmlFor="product_name">Tên danh mục</label>
                                                        <input
                                                            id='category_name'
                                                            type="text"
                                                            className='form-control'
                                                            placeholder='Nhập tên danh mục'
                                                            {...register("name", { required: true })} />
                                                        {errors.name?.type && <span className='error'>Không được bỏ trống mục này</span>}
                                                    </div>
                                                </Col>
                                                <Col lg={12}>
                                                    <div className='vendor_order_boxed position-relative'>
                                                        <div className='btn_right_table'>
                                                            <button type='submit' className="theme-btn-one bg-black btn_sm">
                                                                Thêm danh mục
                                                            </button>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </form>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
            {notify && (
                <ModalConfirm success={success} message={message} />
            )}
        </Col >
    )
}

export default AddCategory