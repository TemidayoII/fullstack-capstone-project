import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { urlConfig } from '../../config';
import { useAppContext } from '../../context/AuthContext';

export default function Navbar() {

    const { isLoggedIn, setIsLoggedIn, userName, setUserName } = useAppContext();
    const navigate = useNavigate();

    useEffect(() => {
        const authTokenFromSession = sessionStorage.getItem('auth-token');
        const nameFromSession = sessionStorage.getItem('name');

        if (authTokenFromSession) {
            setIsLoggedIn(true);
            if (nameFromSession) {
                setUserName(nameFromSession);
            }
        } else {
            setIsLoggedIn(false);
        }

    }, [isLoggedIn, setIsLoggedIn, setUserName]);

    const handleLogout = () => {
        sessionStorage.removeItem('auth-token');
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('email');

        setIsLoggedIn(false);
        navigate('/app');
    };

    const profileSection = () => {
        navigate('/app/profile');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href={`${urlConfig.backendUrl}/app`}>
                GiftLink
            </a>

            <div className="collapse navbar-collapse justify-content-end">
                <ul className="navbar-nav">

                    <li className="nav-item">
                        <a className="nav-link" href="/home.html">Home</a>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/app">Gifts</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/app/search">Search</Link>
                    </li>

                    {!isLoggedIn ? (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/app/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/app/register">Register</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <span
                                    className="nav-link"
                                    style={{ cursor: "pointer" }}
                                    onClick={profileSection}
                                >
                                    Welcome, {userName}
                                </span>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link btn btn-link" onClick={handleLogout}>
                                    Logout
                                </button>
                            </li>
                        </>
                    )}

                </ul>
            </div>
        </nav>
    );
}