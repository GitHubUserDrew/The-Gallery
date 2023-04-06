import React from "react";
import "./css/Picture.css";
import { deleteImage } from "../store/gallerySlice";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import {useRef} from 'react'



function Picture({ image, setImage, setAdd }) {
  const dispatch = useDispatch();

  let options = useRef();

  const mouseOver = (e)=>{
    options.current.style.right = "0"
    options.current.style.opacity = "1"

  }

  const mouseOut = (e)=>{
    options.current.style.right = "-100%"
    options.current.style.opacity = "0"

  }

  return (
    <div
      className="picture"
      style={{ backgroundImage: `url(${image.src})` }}
      key={image._id}
      onMouseOver={mouseOver}
      onMouseOut={mouseOut}
    >
      <div className="options" ref={options}>
        <div
          className="delete"
          onClick={(e) => dispatch(deleteImage(image._id))}
        >
          <DeleteIcon />
        </div>
        <div
          className="edit"
          onClick={(e) => {
            dispatch(deleteImage(image._id))
            
            setImage(image);
            setAdd(true)
          }}
        >
          <EditIcon />
        </div>
      </div>
      <div className="info">
        <p>{image.title}</p>
        
      </div>
    </div>
  );
}

export default Picture;
