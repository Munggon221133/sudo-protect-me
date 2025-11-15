import { NavLink, useNavigate } from "react-router-dom"
import trueLogo from "../../assets/true_logo.png"
import "./Navbar.css"

export default function Navbar() {
    const navigate = useNavigate()

    return (
        <nav className="nav-wrapper">

            {/* LEFT */}
            <div className="nav-left">
                <img
                    src={trueLogo}
                    alt="true"
                    className="nav-logo"
                    onClick={() => navigate("/Home")}
                />
            </div>

            {/* CENTER LINKS */}
            <div className="nav-center">
                <NavLink
                    to="/Home"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                >
                    Management
                </NavLink>

                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/report"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                >
                    Report
                </NavLink>
            </div>

            {/* RIGHT SECTION */}
            <div className="nav-right">
                <span className="nav-user">Admin</span>

                <button className="logout-btn" onClick={() => navigate("/")}>
                    Logout
                </button>

                <div className="user-circle">T</div>
            </div>

        </nav>
    )
}
