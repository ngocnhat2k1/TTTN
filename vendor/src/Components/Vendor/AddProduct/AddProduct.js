import React, { useEffect, useState } from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import { FaImage, FaCheck } from 'react-icons/fa'
import '../DashBoard.css'
import { useForm } from "react-hook-form";
import axios from 'axios';
import Cookies from 'js-cookie';

const AddProduct = () => {
    const [image, setImage] = useState('');
    const [listCategories, setListCategories] = useState([]);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const handleImage = (e) => {
        const file = e.target.files[0];

        const Reader = new FileReader();

        Reader.readAsDataURL(file);

        Reader.onload = () => {
            if (Reader.readyState === 2) {
                setImage(Reader.result);

            }
        };
    };
    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/api/v1/categories`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('adminToken')}`,
                }
            })
            .then((response) => {
                setListCategories(response.data.data)
            })
    }, [])

    const onSubmit = data => {
        const payload = {
            ...data,
            img: image,
            categoryId: data.categoryId
        }
        console.log("cái data", payload)

        axios
            .post('http://127.0.0.1:8000/api/v1/products/add', payload,
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('adminToken')}`,
                    },
                },
            )
            .then((response) => {
                alert(response.data.success);
                console.log(response.data.error);
                if (response.data.success === true) {
                    window.location.href = 'http://localhost:4000/all-products';
                }
            })
            .catch(function (error) {
                alert(error);
                console.log(error);
            });
    };

    return (
        <Col sm={12} md={12} lg={9}>
            <div className='tab-content dashboard_content'>
                <div className='tab-pane fade show active'>
                    <div id='add_product_area'>
                        <div className='container'>
                            <Row>
                                <Col lg={12}>
                                    <div className='add_product_wrapper'>
                                        <h4>Thêm Sản Phẩm</h4>
                                        <form className='add_product_form'
                                            onSubmit={handleSubmit(onSubmit)}>
                                            <Row>
                                                <Col lg={12}>
                                                    <div className='image-input'>
                                                        <img src={image} alt="img" className='image-preview' />
                                                        <input type="file" id='imageInput' accept='image/*'
                                                            {...register("img", { required: true, onChange: handleImage })} />
                                                        {errors.file?.type && <span className='error'>Không được bỏ trống mục này</span>}
                                                        <label htmlFor="imageInput" className='image-button'><FaImage />Chọn ảnh</label>
                                                    </div>
                                                </Col>
                                                <Col lg={6}>
                                                    <div className='fotm-group'>
                                                        <label htmlFor="product_name">Tên sản phẩm</label>
                                                        <input
                                                            id='product_name'
                                                            type="text"
                                                            className='form-control'
                                                            placeholder='Product Title here'
                                                            {...register("name", { required: true })} />
                                                        {errors.name?.type && <span className='error'>Không được bỏ trống mục này</span>}
                                                    </div>
                                                </Col>
                                                <Col lg={6}>
                                                    <div className='fotm-group'>
                                                        <label htmlFor="product_price">Giá sản phẩm</label>
                                                        <input
                                                            id="product_price"
                                                            type="number"
                                                            className='form-control'
                                                            placeholder='Product Price'
                                                            {...register("price", { required: true, min: 1 })} />
                                                        {errors.price && errors.price.type === "min" && <span className='error'>Số lượng phải lớn hơn 1</span>}
                                                        {errors.price && errors.price.type === "required" && <span className='error'>Không được bỏ trống mục này</span>}
                                                    </div>
                                                </Col>
                                                <Col lg={6}>
                                                    <div className='fotm-group'>
                                                        <label htmlFor="quantity">Số lượng</label>
                                                        <input
                                                            id='quantity'
                                                            type="number"
                                                            className='form-control'
                                                            placeholder='45'
                                                            {...register("quantity", { required: true, min: 1 })} />
                                                        {errors.quantity && errors.quantity.type === "min" && <span className='error'>Số lượng phải lớn hơn 1</span>}
                                                        {errors.quantity && errors.quantity.type === "required" && <span className='error'>Không được bỏ trống mục này</span>}
                                                    </div>
                                                </Col>

                                                <Col lg={6}>
                                                    <div className='fotm-group'>
                                                        <label htmlFor="percent_sale">Phần trăm giảm giá</label>
                                                        <input
                                                            id='percent_sale'
                                                            type="number"
                                                            className='form-control'
                                                            {...register("percentSale", { min: 0, max: 99 })} />
                                                        {errors.percentSale && <span className='error'>Phần trăm giảm giá chỉ có thể từ 1-99</span>}
                                                    </div>
                                                </Col>
                                                <Col lg={12}>
                                                    <div className='fotm-group'>
                                                        <label htmlFor="categoryId">Danh mục</label>
                                                        <Row>
                                                            <select
                                                                id="categoryId"
                                                                {...register("categoryId",)}>
                                                                {listCategories.map((category) => {
                                                                    return (
                                                                        <option
                                                                            key={category.id}
                                                                            value={category.id}
                                                                            id="categoryId"
                                                                        >{category.name}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                        </Row>
                                                    </div>
                                                </Col>
                                                <Col lg={12}>
                                                    <div className='fotm-group'>
                                                        <label htmlFor="description">Mô tả</label>
                                                        <textarea
                                                            id='description'
                                                            rows="4" cols=""
                                                            className='form-control'
                                                            placeholder='Description'
                                                            spellCheck="false"
                                                            {...register("description", { required: true })}
                                                        ></textarea>
                                                        {errors.description?.type && <span className='error'>Không được bỏ trống mục này</span>}
                                                    </div>
                                                </Col>
                                                <Col lg={12}>
                                                    <div className='vendor_order_boxed position-relative'>
                                                        <div className='btn_right_table'>
                                                            <button type='submit' className="theme-btn-one bg-black btn_sm">
                                                                Thêm sản phẩm
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
        </Col >
    )
}

export default AddProduct