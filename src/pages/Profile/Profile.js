import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Profile.scss";
import Navbar from '../../components/Navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/reducer/userSlice';
import axios from 'axios';

function Profile(props) {

    const [emailChangeData, setEmailChangeData] = useState([]);
    const [passwordChangeData, setPasswordChangeData] = useState([]);
    const [feedback, setFeedback] = useState("");
    const [formData, setFormData] = useState("password");

    // const loggedInUser = useSelector((state) => state.user.email);
    const loggedInUser = localStorage.getItem("user_email");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onEmailChange = (e) => {
        const newInput = (data) => ({...data, [e.target.name]: e.target.value});
        setEmailChangeData(newInput);
    }

    const onEditEmailSubmit = (e) => {
        e.preventDefault();
        if (window.confirm("Are you sure you want to change your email?")) {
            axios.put(process.env.REACT_APP_API_URL + '/update-email', {
                email: loggedInUser,
                newEmail: emailChangeData.newEmail,
                password: emailChangeData.password
            })
            .then (res => {
                console.log(res.data);
                if (res.data === "Success") {
                    setFeedback("Email updated successfully")
                    localStorage.setItem("user_email", emailChangeData.newEmail);
                } else {
                    setFeedback("Invalid password. Please try again.")
                }
            })
            .catch(err => setFeedback(err))
        } else {
            setFeedback("Email update cancelled")
            return;
        }
    }

    const onEditPasswordSubmit = (e) => {
        e.preventDefault();
    }

    const onLogout = () => {
        if (window.confirm("Are you sure you want to log out?")) {
            localStorage.removeItem("user_email");
            dispatch(logoutUser());
            navigate("/");
        }
    }

    const onDeleteAccount = (e) => {
        // Handle account deletion
    }

    return (
        <>
            <Navbar />
            <div className="profileContainer">
                <section className="profileSection">

                    <div className="accountForm">
                        <h1 className="formTitle">My profile</h1>
                        <div className="formSection">
                            <p className="formLabel">Email</p>
                            <input type="email" id="email" name="email" required value={loggedInUser} readOnly></input>
                        </div>

                        <div>
                            {formData === "email" ?
                                <button className="formButton" onClick={() => setFormData("password")}>Update password instead</button> :
                                <button className="formButton" onClick={() => setFormData("email")}>Update email instead</button>
                            }
                        </div>

                        {formData === "email" ?
                            <form action="POST" className="accountForm" onSubmit={onEditEmailSubmit}>
                                <p>Update your email</p>

                                <div className="formSection">
                                    <p className="formLabel">New Email*</p>
                                    <input 
                                        type="email" 
                                        id="newEmail" 
                                        name="newEmail" 
                                        value={emailChangeData.newEmail}
                                        onChange = {onEmailChange}
                                        required
                                    />
                                </div>

                                <div className="formSection">
                                    <p className="formLabel">Password<span>*</span></p>
                                    <input 
                                        type="password" 
                                        id="password" 
                                        name="password" 
                                        value={emailChangeData.password}
                                        onChange = {onEmailChange}
                                        required
                                    />
                                </div>

                                <div id="workout-form-feedback">{feedback}</div>
                                <button type="submit" className="formButton">Update</button>
                            </form>
                            :
                            <form action="POST" className="accountForm" onSubmit={onEditPasswordSubmit}>
                                <p>Update your password</p>

                                <div className="formSection">
                                    <p className="formLabel">New Password<span>*</span></p>
                                    <input type="newPassword" id="newPassword" name="newPassword" required></input>
                                </div>

                                <div className="formSection">
                                    <p className="formLabel">Confirm password<span>*</span></p>
                                    <input type="confirmPassword" id="confirmPassword" name="confirmPassword" required></input>
                                </div>

                                <div className="formSection">
                                    <p className="formLabel">Password<span>*</span></p>
                                    <input type="password" id="password" name="password" required></input>
                                </div>

                                <div id="workout-form-feedback">{feedback}</div>

                                <button type="submit" className="formButton">Update</button>
                            </form>
                        }
                    </div>
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
