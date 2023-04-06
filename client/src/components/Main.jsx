import React, { useEffect, useState } from 'react'
import Picture from './Picture'

function Main({search , images, setImage, setAdd}) {

  const [ filteredImages, setFilteredImages] = useState([]);


  useEffect(()=>{
    if(!search )return setFilteredImages(images);
    setFilteredImages(images.filter( image => image.title === search? true : false));
  },[search])


  useEffect(()=>{
    setFilteredImages(images)
  }, [images])



  return (
    <div className='main'>
        <div className="images">
            {
                filteredImages?.map(image => <Picture image ={image} setAdd={setAdd}  setImage={setImage} />)
            }
        </div>
    </div>
  )
}

export default Main