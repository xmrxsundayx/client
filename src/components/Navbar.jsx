import React from 'react';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const currentDate = new Date().toLocaleDateString();

    const isHomePage = location.pathname === '/';

    return (
        <nav>
            <div>
                <div className="title">
                    <h1>Productivity Planner</h1>
                </div>
                {isHomePage ? (
                    <div className="text-center p-3">
                        <div className="d-flex justify-content-center">
                            <span className="nav-date m-auto">DATE:
                            <span className="font-weight-bold" style={{ fontSize: "larger" }}>
                                {currentDate}
                            </span>
                            </span>
                        </div>
                        <div className="d-flex justify-content-end">
                            <a href="/calendar" className="tab text-decoration-none">CALENDAR</a>
                        </div>
                    </div>
                ) : (
                    <a href="/" className="tab text-decoration-none">HOME</a>)}
            </div>
        </nav>
    );
};

export default Navbar;