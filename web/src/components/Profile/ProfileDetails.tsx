import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

interface ProfileData {
  age?: number;
  gender?: string;
  height_cm?: number;
  weight_kg?: number;
  daily_calorie_target?: number;
  fitness_goals?: string;
  weight_goal_kg?: number;
}

function ProfileDetails() {
  const [profileDataValue, setProfileDataValue] = useState<ProfileData>({});
  const [feedback, setFeedback] = useState('');

  const userId = useSelector(
    (state: { user: { userId: number } }) => state.user.userId,
  );

  const fetchUserProfileDetails = useCallback(() => {
    axios
      .get(process.env.REACT_APP_API_URL + `/profile/${userId}`, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res) => {
        setProfileDataValue(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  useEffect(() => {
    fetchUserProfileDetails();
  }, [userId, fetchUserProfileDetails]);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;

    // Convert numeric fields to numbers
    const numericFields = [
      'age',
      'height_cm',
      'weight_kg',
      'daily_calorie_target',
      'weight_goal_kg',
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
        user_id: userId,
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
          <label htmlFor="height_cm">Height (cm):</label>
          <input
            type="number"
            id="height_cm"
            name="height_cm"
            value={profileDataValue.height_cm || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-section">
          <label htmlFor="weight_kg">Weight (kg):</label>
          <input
            type="number"
            id="weight_kg"
            name="weight_kg"
            value={profileDataValue.weight_kg || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-section">
          <label htmlFor="daily_calorie_target">Daily Calorie Target:</label>
          <input
            type="number"
            id="daily_calorie_target"
            name="daily_calorie_target"
            value={profileDataValue.daily_calorie_target || ''}
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
          <label htmlFor="weight_goal_kg">Weight Goal (kg):</label>
          <input
            type="number"
            id="weight_goal_kg"
            name="weight_goal_kg"
            value={profileDataValue.weight_goal_kg || ''}
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
