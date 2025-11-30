import { getUser } from "../lib/storage"
import { useState, useEffect } from "react"
import Navbar from "../components/navbar/Navbar"
import "../styles/Profile.css"

const QUICK_STATS = [
    { label: "Daily Screen Time", value: "5h 20m", hint: "Avg last 7 days" },
    { label: "YouTube Time", value: "3h 05m", hint: "Game streams + music" },
    { label: "Flagged Clips", value: "12", hint: "Strong language / violence" },
    { label: "Devices Linked", value: "iPad-Kid • SmartTV", hint: "Living room" },
]

const USAGE = [
    { label: "Social / Video", percent: 70, key: "social" },   // YouTube, TikTok, etc.
    { label: "Learning", percent: 15, key: "learning" },       // School / edu content
    { label: "Gaming", percent: 15, key: "gaming" },           // Game streams & game sites
]

// You can keep the FILTERS the same
const FILTERS = ["All", "New", "Returning", "Mobile", "tablet"]

const VISITS = [
    // --- 11/29 ---
    {
        timestamp: "11/29/2025, 8:20:11 PM",
        page: "youtube.com/@GameBeatMelody/live",
        location: "Bangkok, Thailand",
        device: "iPad-Kid",
        deviceType: "tablet",
        ip: "192.168.0.12",
        duration: "41m 12s",
        type: "Returning",
    },
    {
        timestamp: "11/29/2025, 7:32:44 PM",
        page: "youtube.com/watch?v=GBM-new-song-cover",
        location: "Bangkok, Thailand",
        device: "iPad-Kid",
        deviceType: "tablet",
        ip: "192.168.0.12",
        duration: "12m 02s",
        type: "Returning",
    },

    // --- 11/28 ---
    {
        timestamp: "11/28/2025, 7:58:10 PM",
        page: "youtube.com/@GameBeatMelody",
        location: "Bangkok, Thailand",
        device: "iPad-Kid",
        deviceType: "tablet",
        ip: "192.168.0.12",
        duration: "6m 15s",
        type: "Returning",
    },
    {
        timestamp: "11/28/2025, 7:48:10 PM",
        page: "youtube.com/@GameBeatMelody/live",
        location: "Bangkok, Thailand",
        device: "iPad-Kid",
        deviceType: "tablet",
        ip: "192.168.0.12",
        duration: "32m 11s",
        type: "Returning",
    },
    {
        timestamp: "11/28/2025, 7:12:03 PM",
        page: "youtube.com/watch?v=GBM-OP-song01",
        location: "Bangkok, Thailand",
        device: "iPad-Kid",
        deviceType: "tablet",
        ip: "192.168.0.12",
        duration: "14m 45s",
        type: "Returning",
    },
    {
        timestamp: "11/28/2025, 6:45:22 PM",
        page: "youtube.com/@GameBeatMelody",
        location: "Bangkok, Thailand",
        device: "iPad-Kid",
        deviceType: "tablet",
        ip: "192.168.0.15",
        duration: "25m 02s",
        type: "Returning",
    },
    {
        timestamp: "11/28/2025, 5:20:44 PM",
        page: "youtube.com/watch?v=GBM-rage-moments",
        location: "Bangkok, Thailand",
        device: "iPad-Kid",
        deviceType: "tablet",
        ip: "192.168.0.12",
        duration: "11m 57s",
        type: "Returning",
    },
    {
        timestamp: "11/28/2025, 5:12:19 PM",
        page: "youtube.com/results?search_query=gamebeatmelody+song",
        location: "Bangkok, Thailand",
        device: "iPad-Kid",
        deviceType: "tablet",
        ip: "192.168.0.12",
        duration: "4m 08s",
        type: "Returning",
    },

    // --- 11/27 ---
    {
        timestamp: "11/27/2025, 8:12:01 PM",
        page: "youtube.com/watch?v=GBM-karaoke01",
        location: "Bangkok, Thailand",
        device: "iPad-Kid",
        deviceType: "tablet",
        ip: "192.168.0.15",
        duration: "19m 05s",
        type: "Returning",
    },
    {
        timestamp: "11/27/2025, 7:41:29 PM",
        page: "youtube.com/watch?v=GBM-funny-clips",
        location: "Bangkok, Thailand",
        device: "iPad-Kid",
        deviceType: "tablet",
        ip: "192.168.0.12",
        duration: "9m 21s",
        type: "Returning",
    },
    {
        timestamp: "11/27/2025, 7:10:17 PM",
        page: "youtube.com/@GameBeatMelody",
        location: "Bangkok, Thailand",
        device: "iPad-Kid",
        deviceType: "tablet",
        ip: "192.168.0.12",
        duration: "8m 44s",
        type: "Returning",
    },

    // --- 11/26 ---
    {
        timestamp: "11/26/2025, 8:22:39 PM",
        page: "youtube.com/watch?v=GBM-18plus-warning",
        location: "Bangkok, Thailand",
        device: "iPad-Kid",
        deviceType: "tablet",
        ip: "192.168.0.12",
        duration: "7m 18s",
        type: "Returning",
    },
    {
        timestamp: "11/26/2025, 7:55:02 PM",
        page: "karaoke.com/pop-song-favorite",
        location: "Bangkok, Thailand",
        device: "iPad-Kid",
        deviceType: "tablet",
        ip: "192.168.0.12",
        duration: "15m 40s",
        type: "Returning",
    },
    {
        timestamp: "11/26/2025, 7:40:19 PM",
        page: "youtube.com/@GameBeatMelody",
        location: "Bangkok, Thailand",
        device: "iPad-Kid",
        deviceType: "tablet",
        ip: "192.168.0.12",
        duration: "5m 55s",
        type: "New",
    },
];


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
