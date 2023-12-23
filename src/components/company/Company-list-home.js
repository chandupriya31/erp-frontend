import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../App';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Pagination from 'react-bootstrap/Pagination';
import { useNavigate } from 'react-router-dom';

export default function CompanyList() {
   const navigate = useNavigate()
   const { userState } = useContext(UserContext);
   const companies = userState.companylist;
   console.log(companies);
   const [currentPage, setCurrentPage] = useState(() => {
      const savedPage = localStorage.getItem('currentPage');
      return savedPage ? parseInt(savedPage) : 1;
   })
   const companiesPerPage = 8;

   const indexOfLastCompany = currentPage * companiesPerPage;
   const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
   const currentCompanies = companies.slice(indexOfFirstCompany, indexOfLastCompany);

   const totalPages = Math.ceil(companies.length / companiesPerPage);

   const handlePaginationClick = (pageNumber) => {
      setCurrentPage(pageNumber);
   }
   const handleClick = (id) => {
      if (id) {
         navigate(`/company-website/${id}`)
      }
   }
   useEffect(() => {
      localStorage.setItem('currentPage', currentPage);
   }, [currentPage]);


   return (
      <div style={{margin: 'auto', maxWidth: '1000px'}}>
         <Container className="mt-3" >
            <div style={{ border: '1px solid blue', padding: '10px', marginBottom: '30px' }}>
               <h1 style={{ fontSize: '2.5rem', color: 'blue', margin: '0' }}>Company List</h1>
            </div>
            <Row xs={1} md={2} lg={3} className="g-4">
               {currentCompanies.map((ele) => (
                  <Col key={ele._id}>
                     <Card style={{ width: '300px', height: '410px' }} className="mb-3">
                        <Card.Img variant="top" src="https://images.unsplash.com/photo-1598302936625-6075fbd98dd7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/100px100"
                           style={{ objectFit: 'cover', height: '50%' }} />
                        <Card.Body className="d-flex flex-column justify-content-between">
                           <Card.Title>{ele.companyname}</Card.Title>
                           <Card.Text >
                              <b>address</b>-{ele.contactdetails.address.name}
                           </Card.Text>
                           <Button variant="primary" className="align-self-center" onClick={() => handleClick(ele._id)}>view website....</Button>
                        </Card.Body>
                     </Card>
                  </Col>
               ))}
            </Row >
            <Pagination style={{ marginLeft: '700px' }}>
               <Pagination.First onClick={() => handlePaginationClick(1)} />
               <Pagination.Prev onClick={() => handlePaginationClick(currentPage)} />
               {Array.from({ length: totalPages }).map((_, index) => (
                  <Pagination.Item
                     key={index + 1}
                     active={index + 1 === currentPage}
                     onClick={() => handlePaginationClick(index + 1)}
                  >
                     {index + 1}
                  </Pagination.Item>
               ))}
               <Pagination.Next onClick={() => handlePaginationClick(currentPage)} />
               <Pagination.Last onClick={() => handlePaginationClick(totalPages)} />
            </Pagination>
         </Container>
      </div>
   );
}
