import { useState } from "react"

function CompanyDetails() {
    const [details, setDetails] = useState({
        vision: '',
        mission: '',
        aboutus: ''
    })
    const handleDetails = (e) => {
        const { name, value } = e.target
        setDetails((prev) => ({
            ...prev, [name]: value
        }))
    }
    return (
        <div>
            <h2>Company Details</h2>
            <label htmlFor="aboutus">About Company</label><br />
            <textarea
                id="aboutus"
                name="aboutus"
                value={details.aboutus}
                onChange={handleDetails}
            ></textarea><br />
            <label htmlFor="mission">About Company</label><br />
            <textarea
                id="mission"
                name="mission"
                value={details.mission}
                onChange={handleDetails}
            ></textarea><br />
            <label htmlFor="vision">About Company</label><br />
            <textarea
                id="vision"
                name="vision"
                value={details.vision}
                onChange={handleDetails}
            ></textarea><br />
            <button>Submit</button>
        </div>
    )
}

export default CompanyDetails