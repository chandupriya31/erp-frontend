// IndividualProduct.js

import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getIndividualProduct } from "../../actions/productactionCltr";
import { Button, Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function IndividualProduct() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { id } = useParams();
    const product = useSelector((state) => {
        return state.product.product;
    });

    useEffect(() => {
        dispatch(getIndividualProduct(id));
    }, [dispatch, id])

    const handleClick = (prod)=>{
        navigate('/add-enquiry',{state:{prod}})
    }

    return (
        <div className="container mt-4 product-page" style={{ maxWidth: "800px" }}>
            <Link to="/company/products" className="btn btn-primary">
                Back
            </Link>
            <h1 className="mt-3">About Product</h1>

            <div className="carousel-container">
                <Carousel className="mt-3">
                    {product.image &&
                        product.image.map((ele, index) => (
                            <Carousel.Item key={index}>
                                <img
                                    className="d-block w-100"
                                    src={ele.url}
                                    alt={`Product Image ${index + 1}`}
                                />
                            </Carousel.Item>
                        ))}
                </Carousel>
            </div>

            <h3>{product.productname}</h3>
            <h5>Product description</h5>
            <p>
                <b>{product.description}</b>
            </p>
            <button onClick={()=>handleClick(product)}>Add Enquiry</button>
        </div>
    );
}

export default IndividualProduct;
