import React, { useState } from 'react'
import Carousel from 'bootstrap'
import image1 from '../corousel-images/def1.jpg'
import image2 from '../corousel-images/def2.jpg'

function HomeCarousel(){
    const images = [image1,image2]
    const [img,setImg] = useState('')
    return (
        <div>
            <Carousel activeIndex = {img} >

            </Carousel>
        </div>
    )
}

export default HomeCarousel