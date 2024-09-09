import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import def1 from '../containers/corousel-images/def1.jpg'
import def2 from '../containers/corousel-images/def2.jpg'
import def3 from '../containers/corousel-images/def3.jpg'
import def4 from '../containers/corousel-images/def4.jpg'
import def5 from '../containers/corousel-images/def5.jpg'
import def6 from '../containers/corousel-images/def6.jpg'
import def7 from '../containers/corousel-images/def7.jpg'

const ExampleCarouselImage = ({ imageUrl, text }) => {
   return (
      <img
         className="d-block w-100"
         src={imageUrl}
         alt={text}
         style={{ maxHeight: '400px', objectFit: 'cover' }}
      />
   );
};

function IndividualIntervalsExample() {
   // Define your image URLs
   const imageUrls = [def1, def2, def6, def7, def3, def4, def5]


   const images = [
      {
         imageUrl: imageUrls[0],
         text: 'First slide',
         captionTitle: 'First slide label',
         captionText: 'Nulla vitae elit libero, a pharetra augue mollis interdum.',
         interval: 1000,
      },
      {
         imageUrl: imageUrls[1],
         text: 'Second slide',
         captionTitle: 'Second slide label',
         captionText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
         interval: 500,
      },
      {
         imageUrl: imageUrls[2],
         text: 'Third slide',
         captionTitle: 'Third slide label',
         captionText: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.',
         interval: 500, // You can set the interval as needed
      }, {
         imageUrl: imageUrls[3],
         text: 'fourth slide',
         captionTitle: 'fourth slide label',
         captionText: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.',
         interval: 1000, // You can set the interval as needed
      }, {
         imageUrl: imageUrls[4],
         text: 'fifth slide',
         captionTitle: 'fifth slide label',
         captionText: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.',
         interval: 1000,
      }, {
         imageUrl: imageUrls[5],
         text: 'sixth slide',
         captionTitle: 'sixth slide label',
         captionText: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.',
         interval: 1000,
      }
   ];

   return (
      <Carousel>
         {images.map((image, index) => (
            <Carousel.Item key={index} interval={image.interval} >
               <ExampleCarouselImage imageUrl={image.imageUrl} text={image.text} />
               <Carousel.Caption>
                  <h3>{image.captionTitle}</h3>
                  <p>{image.captionText}</p>
               </Carousel.Caption>
            </Carousel.Item>
         ))}
      </Carousel>
   );
}

export default IndividualIntervalsExample;

