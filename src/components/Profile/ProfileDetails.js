import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

function ProfileDetails() {
  const [profileDataValue, setProfileDataValue] = useState({});
  const [feedback, setFeedback] = useState('');

  const loggedInUser = useSelector((state) => state.user.email);

  useEffect(() => {
    fetchUserProfileDetails();
  }, [loggedInUser]);

  const fetchUserProfileDetails = () => {
    axios
      .get(process.env.REACT_APP_API_URL + `/profile/${loggedInUser}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        setProfileDataValue(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileDataValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const updateUserProfileDetails = (e) => {
    e.preventDefault();
    console.log(profileDataValue);
    axios
      .put(process.env.REACT_APP_API_URL + '/profile', {
        user_email: loggedInUser,
        profileDataValue: profileDataValue,
      })
      .then((res) => {
        if (res.data === 'Success') {
          setFeedback('Profile details updated successfully');
        }
      })
      .catch((err) => {
        console.log(err);
        setFeedback('Profile details update failed');
      });
  };

  return (
    <div className="account-form">
      <h1>Profile Details</h1>
      <form action="POST" onSubmit={updateUserProfileDetails}>
        <div className="form-section">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={profileDataValue.age || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-section">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={profileDataValue.gender || ''}
            onChange={handleChange}
          >
            <option value="" disabled>
              {' '}
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-section">
          <label htmlFor="height">Height (cm):</label>
          <input
            type="number"
            id="height"
            name="height"
            value={profileDataValue.height || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-section">
          <label htmlFor="weight">Weight (kg):</label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={profileDataValue.weight || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-section">
          <label htmlFor="dailyIntakeCalorie">Daily Intake Calorie:</label>
          <input
            type="number"
            id="dailyIntakeCalorie"
            name="dailyIntakeCalorie"
            value={profileDataValue.dailyIntakeCalorie || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-section">
          <label htmlFor="fitnessGoals">Fitness Goals:</label>
          <textarea
            id="fitnessGoals"
            name="fitnessGoals"
            value={profileDataValue.fitnessGoals || ''}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-section">
          <label htmlFor="weightGoal">Weight Goal (kg):</label>
          <input
            type="number"
            id="weightGoal"
            name="weightGoal"
            value={profileDataValue.weightGoal || ''}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="form-button">
          Save
        </button>
        <div>{feedback}</div>
      </form>
    </div>
  );
}

export default ProfileDetails;
