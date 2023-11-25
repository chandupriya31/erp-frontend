import { useEffect, useState } from "react";
import axios from "../../config/axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setAddEnquiry } from "../../actions/enquiry-action";

function AddEnquiry() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState('');
  const [phNo, setphNo] = useState('');
  const [quantity, setQuantity] = useState('');
  const [company, setCompany] = useState([]);
  const [companyId, setCompanyId] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('/api/products/list');
        const companies = await axios.get('/api/companies/list');
        setProducts(response.data);
        setCompany(companies.data);
      } catch (e) {
        console.log(e.response.data.errors);
      }
    })();
  }, []);

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    const formData = {
      productId,
      phNo,
      quantity,
      companyId
    };
    dispatch(setAddEnquiry(({ formData, navigate })));
    setProductId('');
    setphNo('');
    setQuantity('');
    setCompanyId('');
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2>Add Enquiry</h2>
          <form onSubmit={handleEnquirySubmit}>
            <div className="mb-3">
              <label htmlFor="product" className="form-label">Product</label>
              <select className="form-select" value={productId} onChange={(e) => setProductId(e.target.value)}>
                <option value="">Select product</option>
                {products.map(ele => (
                  <option key={ele._id} value={ele._id}>{ele.productname}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="phNo" className="form-label">Mobile Number</label>
              <input
                type="number"
                className="form-control"
                id="phNo"
                value={phNo}
                onChange={(e) => setphNo(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">Quantity</label>
              <input
                type="number"
                className="form-control"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="company" className="form-label">Company</label>
              <select
                className="form-select"
                id="company"
                value={companyId}
                onChange={(e) => setCompanyId(e.target.value)}>
                <option value="">Select Company</option>
                {company.map(ele => (
                  <option key={ele._id} value={ele._id}>{ele.companyname}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddEnquiry;
