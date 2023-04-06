import React, { useEffect, useState } from "react";
import { addImage } from "../store/gallerySlice";
import { useDispatch } from "react-redux";
import {useRef} from "react"
import UploadIcon from '@mui/icons-material/Upload';
function AddImage({ image , setAdd, setImage}) {
  const [src, setSrc] = useState("");
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const upload = function () {
    if (!src || !title) return;
    dispatch(addImage({ src, title }));
    setSrc("");
    setTitle("");
    setAdd(false);
  };
  useEffect(() => {
    if (image) {
      setSrc(image.src);
      setTitle(image.title);
      setImage(null)
    }
  }, [image]);

  const getSrc = function (e) {
    if (e.target.files[0].type.split("/")[0] == "image") {
      let reader = new FileReader();

      reader.onloadend = function () {
        setSrc(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      e.target.files[0] = null;
    }
  };

  let fileInp = useRef();


  return (
    <div className="add">
      <div className="add-main" >
        <button onClick={()=> setAdd(false)}>Close</button>
        <div>
          <input type="file" name="" id="" ref={fileInp} onChange={getSrc} style={{display:"none"}} />
          <input
            type="text"
            name=""
            id=""
            placeholder={"Enter a title"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}

          />
          <div className="upload-area" onClick={e => fileInp.current.click()}>
            {
                !src&&<> <p>click to select image</p>
                <UploadIcon/></> 
            }
            {
                src && <img src={src}/>
            }
          </div>
        
          <button onClick={upload}>Upload</button>
        </div>
      </div>
    </div>
  );
}

export default AddImage;
