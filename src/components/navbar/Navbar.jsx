import { NavLink, useNavigate } from "react-router-dom"
import { getUser, clearUser, clearToken } from "../../lib/storage"
import { useState, useEffect } from "react"
import trueLogo from "../../assets/true_logo.png"
import "./Navbar.css"

export default function Navbar() {
    const navigate = useNavigate()
    const [user, setUserState] = useState(null)
    const [isNavOpen, setIsNavOpen] = useState(false)
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

    useEffect(() => {
        setUserState(getUser())
    }, [])

    const initials = user
        ? `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase()
        : "U"

    const displayName = user
        ? `${user.firstName} ${user.lastName}`
        : "Admin"

    const role = user?.role || "user"

    const roleLabelMap = {
        admin: "Admin",
        user: "User",
        guest: "Guest",
    }
    const roleLabel = roleLabelMap[role] || "User"

    const isAdmin = role === "admin"

    const logout = () => {
        clearUser()
        clearToken()
        setIsNavOpen(false)
        setIsUserMenuOpen(false)
        navigate("/")
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

                {/* LEFT: logo */}
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
                        <span className="nav-user-name">{displayName}</span>
                        {/* 🔥 show actual role here */}
                        <span className="nav-user-role">{roleLabel}</span>
                    </div>

                    <div
                        className="user-avatar-wrapper"
                        onClick={() => setIsUserMenuOpen(prev => !prev)}
                    >
                        <div className="user-circle">{initials}</div>

                        {isUserMenuOpen && (
                            <div className="user-menu">
                                <button
                                    type="button"
                                    className="user-menu-item"
                                    onClick={() => { navigate("/profile"); closeMenus(); }}
                                >
                                    Profile
                                </button>
                                <button
                                    type="button"
                                    className="user-menu-item"
                                // onClick={() => { navigate("/settings"); closeMenus(); }}
                                >
                                    Settings
                                </button>

                                {/* ⭐ ADMIN-ONLY MENU SECTION */}
                                {isAdmin && (
                                    <>
                                        <div className="user-menu-divider" />
                                        <button
                                            type="button"
                                            className="user-menu-item user-menu-item--admin"
                                        // onClick={() => { navigate("/admin"); closeMenus(); }}
                                        >
                                            Admin Panel
                                        </button>
                                        <button
                                            type="button"
                                            className="user-menu-item user-menu-item--admin"
                                        // onClick={() => { navigate("/admin/users"); closeMenus(); }}
                                        >
                                            Manage Users
                                        </button>
                                    </>
                                )}

                                <div className="user-menu-divider" />
                                <button
                                    type="button"
                                    className="user-menu-item user-menu-item--danger"
                                    onClick={logout}
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
