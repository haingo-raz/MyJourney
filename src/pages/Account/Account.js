import React from 'react';
import './Account.scss';
// import SignUpForm from '../../components/Forms/SignUpForm';
// import LoginForm from '../../components/Forms/LoginForm';
// import { useDispatch, useSelector } from 'react-redux';

function Account({component}) {

    // const signUp = useSelector(
    //     (state) => state.formSignUp.signUp
    // );


    return (
        <div className="accountPage">
            <section className="textWeb">
                <h1>My journey</h1>
                <p>An easier way to manage your workout.</p>
            </section>

            <section className="formSection">
                {component}
            </section>    
        </div>
    );
}

export default Account;