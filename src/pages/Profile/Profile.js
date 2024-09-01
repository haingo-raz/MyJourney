import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import "./Profile.scss";
import Navbar from '../../components/Navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/reducer/userSlice';

function Profile(props) {

    const [formInputData, setFormInputData] = useState([])
    const [feedback, setFeedback] = useState("")
    const [formData, setFormData] = useState("password")

    const loggedInUser = useSelector((state) => state.user.email);
    const navigate = useNavigate(); 
    const dispatch = useDispatch();

    const handleSubmit  = (e) => {  
    }

    const onLogout = () => {
        if(window.confirm("Are you sure you want to log out?")){
            localStorage.removeItem("user_email");
            dispatch(logoutUser());
            navigate("/")
        }
    }

    const onDeleteAccount = (e) => {
    }   

    return (
        <>
            <Navbar/>
            <div className="profileContainer">        
                <section className="profileSection">

                    <form action="POST" className="accountForm" onSubmit={handleSubmit}>
                        <h1 className="formTitle">My profile</h1>
                        <p>Update your email or password</p>
                        {/* Show logged in user's email here */}
                        <div className="formSection">
                            <p className="formLabel">Email</p>
                            <input type="email" id="email" name="email" required value={loggedInUser} readOnly></input>
                        </div>

                        <div>
                            {formData === "email" ? 
                            <button className="formButton" onClick={() => setFormData("password")}>Update password instead</button>:
                            <button className="formButton" onClick={() => setFormData("email")}>Update email instead</button>
                            }
                        </div>

                        { formData === "email" ? 
                            <div className="formSection">
                                <p className="formLabel">New Email</p>
                                <input type="newEmail" id="newEmail" name="newEmail" required></input>
                            </div> :
                            <>
                                <div className="formSection">
                                    <p className="formLabel">New Password<span>*</span></p>
                                    <input type="newPassword" id="newPassword" name="newPassword" required></input>
                                </div>
            
                                <div className="formSection">
                                    <p className="formLabel">Confirm password<span>*</span></p>
                                    <input type="confirmPassword" id="confirmPassword" name="confirmPassword" required></input>
                                </div>
                            </>
                        }
                        <div className="formSection">
                            <p className="formLabel">Password<span>*</span></p>
                            <input type="password" id="password" name="password" required></input>
                        </div>
                    
                        <div id="workout-form-feedback">{feedback}</div>

                        <button type="submit" className="formButton">Update</button>
                    </form>

                    <form action="" className="accountForm" onSubmit={onLogout}>
                        <h1 className="formTitle">Log out</h1>
                        <button className="formButton" type="submit"><b>Logout</b></button>
                        {feedback && <p>{feedback}</p>}
                    </form>

                    <form action="" className="accountForm" onSubmit={onDeleteAccount}>
                        <h1 className="formTitle">Danger zone</h1>
                        <button className="formButton danger" type="submit"><b>Delete Account</b></button>
                        {feedback && <p>{feedback}</p>}
                    </form>

                </section>  
            </div>
        </>
    );
}

export default Profile;