import React from 'react';
import './Account.scss';

interface AccountProps {
  component: React.ReactNode;
}

function Account({ component }: AccountProps) {
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

export default Account;
