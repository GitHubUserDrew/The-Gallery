import SearchIcon from '@mui/icons-material/Search';
import {useDispatch, useSelector} from "react-redux"
import {logout} from "../store/authSlice"

export default function Header({search , setSearch, setAdd}){


    const dispatch = useDispatch()
    const user = useSelector(state => state.auth)




    
    


    return (
        <div className="header">
            <div className="logo">
                The Gallery
            </div>
            <div className="search">
                <div className="searchbox">
                    <input type="text" name="" id="" value={search} onChange={e=> setSearch(e.target.value)} />
                    <SearchIcon/>
                </div>
                <button onClick={()=> setAdd(true)}>Add</button>

            </div>
            <div className="user">
                    <button onClick={()=> dispatch(logout())} >Logout</button>
                    <div className="pfp">
                        <img src={user.pfp} alt="" />
                    </div>
            </div>
        </div>
        
    )
}