import React, { useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getIndividualProduct } from "../../actions/productactionCltr";
import { Carousel } from 'react-bootstrap';
import _ from 'lodash'
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from "../../App";

function IndividualProduct() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { id } = useParams();
    const {userState} = useContext(UserContext)
    console.log(userState.companylist,'user')
    const user = userState.user.role
    // console.log(user,'role')
    console.log(id,'id')
    const product = useSelector((state) => {
        return state.product.product;
    });
    const page = userState.companylist.map(ele =>ele.products.find(ele1=>ele1._id === id))
    console.log(page,'page')
    const company = userState.companylist.find(ele => ele.products._id === page._id)
    // console.log(company,'hl')
    const web = company._id
    console.log(web)
    useEffect(() => {
        dispatch(getIndividualProduct(id));
    }, [dispatch, id])

    const handleClick = (prod)=>{
        navigate('/add-enquiry',{state:{prod}})
    }
    const navigateBack = () => {
        navigate(`/company-website/${web}`);
    }

    return (
        <div className="container mt-4 product-page" style={{ maxWidth: "800px" }}>
        {company && <button onClick={navigateBack}>Back to company</button>}
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
            {user === 'customer' ? <button onClick={()=>handleClick(product)}>Add Enquiry</button>:<button>Delete product</button>}
            
        </div>
    );
}

export default IndividualProduct;
