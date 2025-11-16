import { NavLink, useNavigate } from "react-router-dom"
import { useState } from "react"
import trueLogo from "../../assets/true_logo.png"
import "./Navbar.css"

export default function Navbar() {
    const navigate = useNavigate()
    const [isNavOpen, setIsNavOpen] = useState(false)
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

    const handleLogout = () => {
        // TODO: clear auth/token if you have one
        navigate("/")
        setIsUserMenuOpen(false)
        setIsNavOpen(false)
    }

    const closeMenus = () => {
        setIsNavOpen(false)
        setIsUserMenuOpen(false)
    }

    const navLinkClass = ({ isActive }) =>
        isActive ? "nav-link nav-link--active" : "nav-link"

    return (
        <header className="nav-shell">
            <nav className="nav-wrapper">

                {/* LEFT: logo + brand */}
                <div className="nav-left">
                    <img
                        src={trueLogo}
                        alt="true"
                        className="nav-logo"
                        onClick={() => {
                            navigate("/Home")
                            closeMenus()
                        }}
                    />
                </div>

                {/* CENTER: main links */}
                <div className={`nav-center ${isNavOpen ? "nav-center--open" : ""}`}>
                    <NavLink
                        to="/Home"
                        className={navLinkClass}
                        onClick={closeMenus}
                    >
                        Management
                    </NavLink>

                    <NavLink
                        to="/dashboard"
                        className={navLinkClass}
                        onClick={closeMenus}
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/report"
                        className={navLinkClass}
                        onClick={closeMenus}
                    >
                        Report
                    </NavLink>
                </div>

                {/* RIGHT: user + dropdown + hamburger */}
                <div className="nav-right">
                    <div className="nav-user-info">
                        <span className="nav-user-name">Admin</span>
                        <span className="nav-user-role">Owner</span>
                    </div>

                    <div
                        className="user-avatar-wrapper"
                        onClick={() => setIsUserMenuOpen(prev => !prev)}
                    >
                        <div className="user-circle">T</div>

                        {isUserMenuOpen && (
                            <div className="user-menu">
                                <button
                                    type="button"
                                    className="user-menu-item"
                                // onClick={() => navigate("/profile")}
                                >
                                    Profile
                                </button>
                                <button
                                    type="button"
                                    className="user-menu-item"
                                // onClick={() => navigate("/settings")}
                                >
                                    Settings
                                </button>
                                <button
                                    type="button"
                                    className="user-menu-item user-menu-item--danger"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>

                    {/* MOBILE TOGGLE */}
                    <button
                        type="button"
                        className={`nav-toggle ${isNavOpen ? "nav-toggle--open" : ""}`}
                        aria-label="Toggle navigation"
                        onClick={() => setIsNavOpen(prev => !prev)}
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                </div>
            </nav>
        </header>
    )
}
