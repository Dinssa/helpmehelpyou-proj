import './AuthPage.css';

import { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';


import SignUpForm from "../../components/auth/SignUpForm"
import LoginForm from "../../components/auth/LoginForm"

export default function AuthPage({setUser}){

    const [activeTab, setActiveTab] = useState('login');

    const handleTabSelect = (tab) => {
        setActiveTab(tab);
    };

    return (
        <main className="AuthPage">
            {/* <h1>Auth Page</h1> */}
            <div className='mainAuthBox'>
                <Tabs activeKey={activeTab} onSelect={handleTabSelect}>
                    <Tab eventKey="login" title="Login">
                    <LoginForm setUser={setUser} />
                    </Tab>
                    <Tab eventKey="signup" title="Sign Up">
                    <SignUpForm setUser={setUser} />
                    </Tab>
                </Tabs>
            </div>
        </main>
    )
}