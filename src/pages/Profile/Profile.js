import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Profile.scss";
import Navbar from '../../components/Navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, updateEmail } from '../../redux/reducer/userSlice';
import axios from 'axios';

function Profile() {
    const [emailChangeData, setEmailChangeData] = useState({});
    const [passwordChangeData, setPasswordChangeData] = useState({});
    const [accountDeletePassword, setAccountDeletePassword] = useState();
    const [isPasswordMatching, setIsPasswordMatching] = useState(true);
    const [feedback, setFeedback] = useState("");
    const [dangerZonefeedback, setDangerZoneFeedback] = useState("");
    const [formData, setFormData] = useState("password");

    const loggedInUser = useSelector((state) => state.user.email);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onEmailChange = (e) => {
        const newInput = { ...emailChangeData, [e.target.name]: e.target.value };
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
                .then(res => {
                    console.log(res.data);
                    if (res.data === "Success") {
                        setFeedback("Email updated successfully")
                        setEmailChangeData({})
                        localStorage.setItem("user_email", emailChangeData.newEmail);
                        dispatch(updateEmail(emailChangeData.newEmail));
                    } else {
                        setFeedback("Invalid password. Please try again.")
                    }
                })
                .catch(err => setFeedback(err))
        } else {
            setFeedback("Email update cancelled.")
        }
    }

    const onPasswordChange = (e) => {
        const newInput = { ...passwordChangeData, [e.target.name]: e.target.value };
        setPasswordChangeData(newInput);
    }

    useEffect(() => {
        if ( passwordChangeData.newPassword === passwordChangeData.confirmPassword ) {
            setIsPasswordMatching(true);
        } else {
            setIsPasswordMatching(false);
        }
    }, [passwordChangeData.newPassword, passwordChangeData.confirmPassword])

    const onEditPasswordSubmit = async (e) => {
        e.preventDefault();
        if (!isPasswordMatching) {
            setFeedback("The confirmed password field should match with the first one.")
        } else {
            if (window.confirm("Are you sure you want to change your password?")) {
                try {
                    const res = await axios.put(process.env.REACT_APP_API_URL + '/update-password', {
                        email: loggedInUser,
                        newPassword: passwordChangeData.newPassword,
                        password: passwordChangeData.currentPassword
                    });
                    if (res.data === "Success") {
                        setFeedback("Password updated successfully.")
                        setPasswordChangeData({})
                    } else {
                        setFeedback("Invalid password. Please try again.")
                    }
                } catch (err) {
                    setFeedback(err.message);
                }
            } else {
                setFeedback("Password update cancelled.")
            }
        }
    }

    const onLogout = () => {
        if (window.confirm("Are you sure you want to log out?")) {
            localStorage.removeItem("user_email");
            dispatch(logoutUser());
            navigate("/");
        }
    }

    const onDeleteAccount = (e) => {
        e.preventDefault();
        if (window.confirm("Are you sure you want to delete your account? This action is irreversible.")) {
            axios.delete(process.env.REACT_APP_API_URL + '/delete-account', {
                data: {
                    email: loggedInUser,
                    password: accountDeletePassword
                }
            })
                .then(res => {
                    if (res.data === "Success") {
                        localStorage.removeItem("user_email");
                        dispatch(logoutUser());
                        navigate("/");
                    } else {
                        setDangerZoneFeedback("Invalid password. Please try again.")
                    }
                })
                .catch(err => setDangerZoneFeedback(err))
        }
        alert("Your account has been deleted.")
    }

    return (
        <>
            <Navbar />
            <div className="profileContainer">
                <section className="profileSection">
                    <div className="accountForm">
                        <h1 className="formTitle">My profile</h1>
                        <div className="formSection">
                            <label className="formLabel">Email</label>
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
                                    <label className="formLabel">New Email*</label>
                                    <input
                                        type="email"
                                        id="newEmail"
                                        name="newEmail"
                                        value={emailChangeData.newEmail || ""}
                                        onChange={onEmailChange}
                                        required
                                    />
                                </div>

                                <div className="formSection">
                                    <label className="formLabel">Password<span>*</span></label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={emailChangeData.password || ""}
                                        onChange={onEmailChange}
                                        required
                                    />
                                </div>

                                <div>{feedback}</div>
                                <button type="submit" className="formButton">Update</button>
                            </form>
                            :
                            <form action="POST" className="accountForm" onSubmit={onEditPasswordSubmit}>
                                <p>Update your password</p>

                                <div className="formSection">
                                    <label className="formLabel">New Password<span>*</span></label>
                                    <input
                                        type="password"
                                        id="newPassword"
                                        name="newPassword"
                                        value={passwordChangeData.newPassword || ""}
                                        onChange={onPasswordChange}
                                        required
                                    />
                                </div>

                                <div className="formSection">
                                    <label className="formLabel">Confirm password<span>*</span></label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        className={isPasswordMatching ? "" : "no-match"}
                                        title={isPasswordMatching ? "" : "The password should match with the above password."}
                                        name="confirmPassword"
                                        value={passwordChangeData.confirmPassword || ""}
                                        onChange={onPasswordChange}
                                        required
                                    />
                                </div>

                                <div className="formSection">
                                    <label className="formLabel">Password<span>*</span></label>
                                    <input
                                        type="password"
                                        id="currentPassword"
                                        name="currentPassword"
                                        value={passwordChangeData.currentPassword || ""}
                                        onChange={onPasswordChange}
                                        required
                                    />
                                </div>

                                <div>{feedback}</div>

                                <button
                                    type="submit"
                                    className="formButton"
                                >
                                    Update
                                </button>
                            </form>
                        }
                    </div>
                    <form action="" className="accountForm" onSubmit={onLogout}>
                        <h1 className="formTitle">Log out</h1>
                        <button className="formButton" type="submit"><b>Logout</b></button>
                    </form>

                    <form action="" className="accountForm" onSubmit={onDeleteAccount}>
                        <h1 className="formTitle">Danger zone</h1>
                        <label className="formLabel">Password<span>*</span></label>
                        <div className="formSection">
                            <input
                                type="password"
                                id="password-delete"
                                name="password-delete"
                                value={accountDeletePassword || ""}
                                onChange={(e) => setAccountDeletePassword(e.target.value)}
                                required
                            />
                        </div>
                        <button className="formButton danger" type="submit"><b>Delete Account</b></button>
                        <div>{dangerZonefeedback}</div>
                    </form>
                </section>
            </div>
        </>
    );
}

export default Profile;
