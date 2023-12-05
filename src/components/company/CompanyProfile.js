import { useContext,useState } from "react"
import { UserContext } from "../../App"
import { Button } from "react-bootstrap"
import { useDispatch } from "react-redux"
import axios from "../../config/axios"

const CompanyProfile = ()=>{
    const dispatch = useDispatch()
    const [isEdit,setIsEdit] = useState(false)
    const {userState,userDispatch} = useContext(UserContext)
    console.log(userState,'user')
    const [username, setUsername] = useState(userState.user.username)
    const [email, setEmail] = useState(userState.user.email)
    const [companyname,setCompanyname] = useState(userState.company.companyname)
    const [GST,setGST] = useState(userState.company.GST)
    const [contactdetails, setContactDetails] = useState({
        address: {
            name: userState.company.contactdetails.address.name
        },
        phone: userState.company.contactdetails.phone,
        email: userState.company.contactdetails.email
    })
    const [details, setDetails] = useState({
        vision: userState.company.details.vision,
        mission: userState.company.details.mission,
        aboutus: userState.company.details.aboutus
    })
    console.log(details)
    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setContactDetails((prev) => ({
            ...prev,
            address: {
                ...prev.address.name,
                [name]: value
            }
        }))
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setContactDetails((prev) => ({
            ...prev, [name]: value
        }))
    }
    const handleDetails = (e) => {
        const { name, value } = e.target;
        setDetails((prev) => ({
            ...prev, [name]: value
        }));
    }

    const handleEdit = async(e)=>{
        setIsEdit(!isEdit)
        e.preventDefault()
        const formData = {
            companyname,
            GST,
            contactdetails,
            details
        }
        const response = await axios.put('/api/company/update',formData,{
            headers:{
                'Authorization':localStorage.getItem('token')
            }
        })
        userDispatch({type:'UPDATE_COMPANY_DETAILS',payload:formData})
    }

    // console.log(contactdetails)

return (
    <div className="container mt-3" style={{ width: '700px' }}>
        <div className="container mt-4 d-flex justify-content-center">
        <div className="card" style={{ width: '500px' }}>
            <div className="card-header">
                <h4>Admin Info</h4>
            </div>
            <div className="card-body">
                <form>
                    <div className="form-group">
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            disabled={true}
                            onChange={(e) => setUsername(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            disabled={true}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Role:</label>
                        <b style={{ color: 'green' }}>{userState.user.role}</b>
                    </div>
                </form>
            </div>
            </div>
        </div>   <br/>
            <div className="card">
                <div className="card-header">
                    <h4>Company Info</h4>
                </div>
                <div className="card-body">
                    <form> 
                    <div className="form-group">
                        <label>Company Name:</label>
                        <input
                            type="text"
                            value={companyname}
                            onChange={(e) => setCompanyname(e.target.value)}
                            disabled={isEdit === false}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>GST:</label>
                        <input
                            type="text"
                            value={GST}
                            onChange={(e) => setGST(e.target.value)}
                            disabled={isEdit === false}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Address:</label>
                        <input
                            type="text"
                            name="name"
                            value={contactdetails.address.name}
                            onChange={handleAddressChange}
                            disabled={isEdit === false}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone Number:</label>
                        <input
                            type="number"
                            value={contactdetails.phone}
                            name="phone"
                            onChange={handleChange}
                            disabled={isEdit === false}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={contactdetails.email}
                            name="email"
                            onChange={handleChange}
                            disabled={isEdit === false}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                    </div>
                    <div className="form-group">
                        <label>About company:</label>
                        <textarea
                            value={details.aboutus}
                            onChange={handleDetails}
                            disabled={isEdit === false}
                            className="form-control"
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label>Vision:</label>
                        <textarea
                            value={details.vision}
                            onChange={handleDetails}
                            disabled={isEdit === false}
                            className="form-control"
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label>Mission:</label>
                        <textarea
                            value={details.mission}
                            onChange={handleDetails}
                            disabled={isEdit === false}
                            className="form-control"
                        ></textarea>
                    </div>
                    <Button onClick={handleEdit}>{isEdit ? 'Save' : 'Edit'}</Button>
                </form>
            </div>
        </div>
    </div>
);

}

export default CompanyProfile