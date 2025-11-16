import { getUser } from "../lib/storage"
import { useState, useEffect } from "react"
import Navbar from "../components/navbar/Navbar"
import "../styles/Profile.css"

const QUICK_STATS = [
    { label: "Daily Screen Time", value: "3h 45m", hint: "Avg last 7 days" },
    { label: "Sites Blocked", value: "18", hint: "Today" },
    { label: "Most Active Time", value: "18:00 – 21:00", hint: "Evening" },
    { label: "Devices Linked", value: "2", hint: "iPhone • iPad" },
]

const USAGE = [
    { label: "Social Media", percent: 50, key: "social" },
    { label: "Learning", percent: 30, key: "learning" },
    { label: "Gaming", percent: 20, key: "gaming" },
]

const FILTERS = ["All", "New", "Returning", "Mobile", "Desktop"]

const VISITS = [
    {
        timestamp: "8/9/2025, 5:14:05 PM",
        page: "/pricing",
        location: "London, Germany",
        device: "Tablet",
        deviceType: "tablet",
        ip: "214.80.74.248",
        duration: "10m 10s",
        type: "Returning",
    },
    {
        timestamp: "8/9/2025, 4:46:18 PM",
        page: "/about",
        location: "New York, Canada",
        device: "Desktop",
        deviceType: "desktop",
        ip: "97.9.220.20",
        duration: "4m 21s",
        type: "Returning",
    },
    {
        timestamp: "8/8/2025, 7:58:33 PM",
        page: "/about",
        location: "Tokyo, Australia",
        device: "Mobile",
        deviceType: "mobile",
        ip: "38.157.102.114",
        duration: "8m 35s",
        type: "Returning",
    },
    {
        timestamp: "8/8/2025, 12:48:19 PM",
        page: "/features",
        location: "Paris, France",
        device: "Tablet",
        deviceType: "tablet",
        ip: "163.182.51.25",
        duration: "8m 4s",
        type: "New",
    },
    {
        timestamp: "8/8/2025, 11:42:37 AM",
        page: "/about",
        location: "Berlin, Japan",
        device: "Tablet",
        deviceType: "tablet",
        ip: "53.235.233.160",
        duration: "6m 3s",
        type: "Returning",
    },
]

export default function Profile() {
    const [user, setUserState] = useState(null)
    const activeFilter = "All"

    useEffect(() => {
        setUserState(getUser())
    }, [])

    const email = user?.email || ""

    const fname = user?.firstName || ""

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

    return (
        <div className="profile-page">
            <Navbar />

            <main className="profile-main">
                {/* HEADER */}
                <header className="profile-header">
                    <div className="profile-header-left">
                    </div>

                    <div className="profile-header-right">
                        <span className="profile-chip profile-chip--ok">
                            <span className="chip-dot" /> Active
                        </span>
                        <span className="profile-chip">Last synced: 2 min ago</span>
                    </div>
                </header>

                {/* TOP CARD: AVATAR + INFO */}
                <section className="profile-card profile-top-card">
                    <div className="profile-avatar">
                        <span className="profile-avatar-initial">{initials}</span>
                    </div>

                    <div className="profile-top-content">
                        <div className="profile-name-row">
                            <h2 className="profile-name">{displayName}</h2>
                            <button type="button" className="profile-edit-button">
                                ✏ Edit
                            </button>
                        </div>
                        <p className="profile-role">{roleLabel}</p>

                        <div className="profile-meta-grid">
                            <div className="profile-meta-item">
                                <span className="profile-meta-label">Email</span>
                                <span className="profile-meta-value">
                                    {email}
                                </span>
                            </div>
                            <div className="profile-meta-item">
                                <span className="profile-meta-label">Phone</span>
                                <span className="profile-meta-value">060-888-8888</span>
                            </div>
                            <div className="profile-meta-item">
                                <span className="profile-meta-label">Primary Device</span>
                                <span className="profile-meta-value">iPhone-{fname}</span>
                            </div>
                            <div className="profile-meta-item">
                                <span className="profile-meta-label">Rules</span>
                                <span className="profile-meta-value">
                                    Education + Game mode
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* QUICK STATS */}
                <section className="profile-quick-grid">
                    {QUICK_STATS.map((s) => (
                        <article key={s.label} className="profile-quick-card">
                            <div className="profile-quick-main">
                                <span className="profile-quick-label">{s.label}</span>
                                <span className="profile-quick-value">{s.value}</span>
                            </div>
                            <span className="profile-quick-hint">{s.hint}</span>
                        </article>
                    ))}
                </section>

                {/* USAGE SUMMARY */}
                <section className="profile-card usage-card">
                    <div className="usage-header">
                        <h2>Usage Static</h2>
                        <span className="usage-period">Last 7 days</span>
                    </div>

                    <div className="usage-layout">
                        {/* Pie */}
                        <div className="usage-chart-wrapper">
                            <div className="usage-pie">
                                <div className="usage-slice usage-slice--social" />
                                <div className="usage-slice usage-slice--learning" />
                                <div className="usage-slice usage-slice--gaming" />
                                <div className="usage-pie-inner" />
                            </div>
                        </div>

                        {/* Legend */}
                        <div className="usage-legend">
                            {USAGE.map((u) => (
                                <div key={u.key} className="usage-row">
                                    <span
                                        className={
                                            "usage-dot usage-dot--" + u.key
                                        }
                                    />
                                    <span className="usage-label">{u.label}</span>
                                    <span className="usage-bar">
                                        <span
                                            className={
                                                "usage-bar-fill usage-bar-fill--" + u.key
                                            }
                                            style={{ width: `${u.percent}%` }}
                                        />
                                    </span>
                                    <span className="usage-percent">
                                        {u.percent}%
                                    </span>
                                </div>
                            ))}

                            <div className="usage-summary">
                                <div>
                                    <span className="usage-summary-label">
                                        Screen time
                                    </span>
                                    <span className="usage-summary-value">
                                        3h 45m / day
                                    </span>
                                </div>
                                <div>
                                    <span className="usage-summary-label">
                                        Most active
                                    </span>
                                    <span className="usage-summary-value">
                                        18:00 – 21:00
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FILTER + SEARCH */}
                <section className="profile-filters-row">
                    <div className="profile-filter-pills">
                        {FILTERS.map((f) => (
                            <button
                                key={f}
                                type="button"
                                className={
                                    "filter-pill" +
                                    (f === activeFilter ? " filter-pill--active" : "")
                                }
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    <div className="profile-search-box">
                        <input
                            className="profile-search-input"
                            placeholder="Search by page, country, IP…"
                        />
                    </div>
                </section>

                {/* RECENT VISITS */}
                <section className="profile-card profile-card--table">
                    <div className="profile-table-header">
                        <h2>Recent Visits (50)</h2>
                        <div className="profile-table-tools">
                            <div className="blind-toggle">
                                <span>Blind Mode</span>
                                <label className="switch">
                                    <input type="checkbox" />
                                    <span className="slider" />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="profile-table-wrapper">
                        <table className="profile-table">
                            <thead>
                                <tr>
                                    <th>Timestamp</th>
                                    <th>Page</th>
                                    <th>Location</th>
                                    <th>Device</th>
                                    <th>IP Address</th>
                                    <th>Duration</th>
                                    <th>Visitor Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {VISITS.map((v, idx) => (
                                    <tr key={idx}>
                                        <td>{v.timestamp}</td>
                                        <td className="profile-page-path">{v.page}</td>
                                        <td>{v.location}</td>
                                        <td>
                                            <span
                                                className={
                                                    "device-pill device-pill--" +
                                                    v.deviceType
                                                }
                                            >
                                                {v.device}
                                            </span>
                                        </td>
                                        <td className="mono">{v.ip}</td>
                                        <td>{v.duration}</td>
                                        <td>
                                            <span
                                                className={
                                                    "visitor-pill " +
                                                    (v.type === "New"
                                                        ? "visitor-pill--new"
                                                        : "visitor-pill--returning")
                                                }
                                            >
                                                {v.type}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    )
}
