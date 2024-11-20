import React from 'react';
import './Account.scss';
import PropTypes from 'prop-types';

function Account({ component }) {
  return (
    <div className="account-page">
      <section className="text-web">
        <h1>My journey</h1>
        <p>An easier way to manage your workout.</p>
      </section>

      <section className="form-section">{component}</section>
    </div>
  );
}

Account.propTypes = {
  component: PropTypes.element.isRequired,
};

export default Account;
