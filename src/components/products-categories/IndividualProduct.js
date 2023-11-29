import { Link, useLocation, useParams } from "react-router-dom"

function IndividualProduct(){
    const {id} = useParams()
    console.log(id)
    return (
        <div>
            <><Link to="/company/products">Back</Link></>
            <h1>About Product</h1>
        </div>
    )
}

export default IndividualProduct