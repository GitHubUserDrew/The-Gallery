
import { useSelector, useDispatch } from "react-redux"
import { useEffect , useState} from "react"
import { getImages } from "../store/gallerySlice";
import Header from './Header'
import Main from "./Main"
import AddImage from "./AddImage"
import './css/Gallery.css'
import { formControlClasses } from "@mui/material";

export default function Gallery({}){
    let dispatch = useDispatch();
    let images = useSelector(state => state.gallery)
    const [search, setSearch] = useState('')
    useEffect(()=>{
       
        dispatch(getImages());
    }, [])
    const [image, setImage] = useState({});

    useEffect(()=>{
        console.log(image)
    },[image])



    const [add,setAdd]= useState(false)
    



   

    return(
        <div className="gallery">
           <Header search={search} setSearch={setSearch} setAdd={setAdd}/>
           {add && <AddImage image={image} setAdd={setAdd} setImage={setImage} />}
           <Main search={search} setSearch={setSearch} images={images} setAdd={setAdd}  setImage={setImage}/>
        </div>
    )
}