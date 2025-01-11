import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

interface ProfileData {
  age?: number;
  gender?: string;
  height?: number;
  weight?: number;
  daily_intake_calorie?: number;
  fitness_goals?: string;
  weight_goal?: number;
}

function ProfileDetails() {
  const [profileDataValue, setProfileDataValue] = useState<ProfileData>({});
  const [feedback, setFeedback] = useState('');

  const loggedInUser = useSelector(
    (state: { user: { email: string } }) => state.user.email,
  );

  const fetchUserProfileDetails = useCallback(() => {
    axios
      .get(process.env.REACT_APP_API_URL + `/profile/${loggedInUser}`, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res) => {
        setProfileDataValue(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loggedInUser]);

  useEffect(() => {
    fetchUserProfileDetails();
  }, [loggedInUser, fetchUserProfileDetails]);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;

    // Convert numeric fields to numbers
    const numericFields = [
      'age',
      'height',
      'weight',
      'daily_intake_calorie',
      'weight_goal',
    ];
    setProfileDataValue((prevState) => ({
      ...prevState,
      [name]: numericFields.includes(name) ? Number(value) : value,
    }));
  };

  const updateUserProfileDetails = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(profileDataValue);
    axios
      .put(process.env.REACT_APP_API_URL + '/profile', {
        user_email: loggedInUser,
        profileDataValue: profileDataValue,
      })
      .then((res) => {
        console.log('Profile udpate response', res);
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
          <label htmlFor="daily_intake_calorie">Daily Intake Calorie:</label>
          <input
            type="number"
            id="daily_intake_calorie"
            name="daily_intake_calorie"
            value={profileDataValue.daily_intake_calorie || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-section">
          <label htmlFor="fitness_goals">Fitness Goals:</label>
          <textarea
            id="fitness_goals"
            name="fitness_goals"
            value={profileDataValue.fitness_goals || ''}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-section">
          <label htmlFor="weight_goal">Weight Goal (kg):</label>
          <input
            type="number"
            id="weight_goal"
            name="weight_goal"
            value={profileDataValue.weight_goal || ''}
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
