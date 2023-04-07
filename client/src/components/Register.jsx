import KeyIcon from "@mui/icons-material/Key";
import PersonIcon from "@mui/icons-material/Person";
import { register } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './css/login.css'

export default function Register({}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    user && navigate("/");
  }, [user]);

  return (
    <div className="login">
      <div className="login-main">
        <div className="inp-container">
          <input
            type="text"
            name=""
            id=""
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <PersonIcon />
        </div>
        <div className="inp-container">
          <input
            type="password"
            name=""
            id=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <KeyIcon />
        </div>
        <button onClick={() => dispatch(register({ username, password }))}>
          Register
        </button>
        <p>
          Already have an account? <Link to="/">login</Link>
        </p>
      </div>
    </div>
  );
}
