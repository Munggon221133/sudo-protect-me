import { useState } from "react"
import Navbar from "../components/navbar/Navbar"
import "../styles/Report.css"

const seedBlacklist = [
    { date: "01-08-25", url: "ads-tracker.example.com" },
    { date: "31-07-25", url: "adult-site.xxx" },
    { date: "30-07-25", url: "gamble-now.example" },
]

const seedWhitelist = [
    { date: "01-08-25", url: "schoolportal.edu" },
    { date: "31-07-25", url: "kid-math-game.com" },
    { date: "30-07-25", url: "online-classroom.app" },
]

const seedReports = [
    {
        time: "22:49",
        device: "PC-Room1",
        mac: "F8:27:93:88:6C:10",
        url: "freegift-apple.com",
        type: "Scam",
    },
    {
        time: "21:12",
        device: "iPad-Kid",
        mac: "3C:15:C2:A9:42:B1",
        url: "gameapp-freeplay.io",
        type: "Phishing",
    },
    {
        time: "19:55",
        device: "iPhone-Chai",
        mac: "28:CF:DA:9B:4B:3E",
        url: "bank-login-secure.co",
        type: "Phishing",
    },
    {
        time: "18:43",
        device: "Laptop-Work",
        mac: "3C:45:67:8B:99:2F",
        url: "claim-your-prize-now-luckyspin.com/winner/form",
        type: "Scam",
    },
    {
        time: "17:29",
        device: "PC-Gaming",
        mac: "1A:88:77:4B:20:19",
        url: "free-antivirus-update-secure.net/download/setup",
        type: "Malware",
    },
]

const threatTypes = ["Phishing", "Scam", "Malware", "Inappropriate", "Other"]
const devices = ["iPad-Kid", "iPhone-Chai", "PC-Room1", "Laptop-Work", "PC-Gaming"]

export default function Report() {
    const [blacklist, setBlacklist] = useState(seedBlacklist)
    const [whitelist, setWhitelist] = useState(seedWhitelist)
    const [blackUrl, setBlackUrl] = useState("")
    const [whiteUrl, setWhiteUrl] = useState("")
    const [form, setForm] = useState({
        url: "",
        threatType: "",
        device: "",
        description: "",
    })
    const [previousReports, setPreviousReports] = useState(seedReports)
    const [formMsg, setFormMsg] = useState(null)

    const handleAddList = (type) => {
        const value = type === "black" ? blackUrl.trim() : whiteUrl.trim()
        if (!value) return

        const entry = {
            date: new Date().toLocaleDateString("th-TH"),
            url: value,
        }

        if (type === "black") {
            setBlacklist((prev) => [entry, ...prev].slice(0, 5))
            setBlackUrl("")
        } else {
            setWhitelist((prev) => [entry, ...prev].slice(0, 5))
            setWhiteUrl("")
        }
    }

    const handleFormChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormMsg(null)

        if (!form.url || !form.threatType || !form.device) {
            setFormMsg({ type: "error", text: "Please fill all required fields." })
            return
        }

        const newReport = {
            time: new Date().toLocaleTimeString("th-TH", {
                hour: "2-digit",
                minute: "2-digit",
            }),
            device: form.device,
            mac: "XX:XX:XX:XX:XX:XX",
            url: form.url,
            type: form.threatType,
        }
        setPreviousReports((prev) => [newReport, ...prev])
        setForm({
            url: "",
            threatType: "",
            device: "",
            description: "",
        })
        setFormMsg({ type: "success", text: "Thank you. Your report has been submitted." })
    }

    return (
        <div className="report-page">
            <Navbar />

            <main className="report-main">
                {/* PAGE HEADER */}
                <header className="report-header">
                    <div>
                        <p className="report-subtitle">
                            Manage blacklist / whitelist and report suspicious or harmful websites.
                        </p>
                    </div>

                    <div className="report-header-meta">
                        <span className="report-chip report-chip--ok">
                            <span className="chip-dot" />
                            Protection active
                        </span>
                        <span className="report-chip">
                            Last updated just now
                        </span>
                    </div>
                </header>

                {/* TOP GRID: BLACKLIST / WHITELIST */}
                <section className="report-grid-top">
                    {/* Blacklist column */}
                    <div className="list-column">
                        <article className="report-card report-card--compact">
                            <div className="card-header">
                                <h2>Blacklist</h2>
                            </div>
                            <div className="list-input-row">
                                <input
                                    className="report-input"
                                    placeholder="Enter URL to block"
                                    value={blackUrl}
                                    onChange={(e) => setBlackUrl(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="list-add-btn"
                                    onClick={() => handleAddList("black")}
                                >
                                    Add
                                </button>
                            </div>
                            <p className="card-hint">
                                Sites in this list will be blocked on all protected devices.
                            </p>
                        </article>

                        <article className="report-card report-card--list">
                            <div className="card-header card-header--tight">
                                <h3>Recent blacklist entries</h3>
                                <button className="link-button">View all blacklist</button>
                            </div>
                            <ul className="list-items">
                                {blacklist.map((item, idx) => (
                                    <li key={idx}>
                                        <span className="list-date">{item.date}</span>
                                        <span className="list-url">{item.url}</span>
                                    </li>
                                ))}
                            </ul>
                        </article>
                    </div>

                    {/* Whitelist column */}
                    <div className="list-column">
                        <article className="report-card report-card--compact">
                            <div className="card-header">
                                <h2>Whitelist</h2>
                            </div>
                            <div className="list-input-row">
                                <input
                                    className="report-input"
                                    placeholder="Enter URL to always allow"
                                    value={whiteUrl}
                                    onChange={(e) => setWhiteUrl(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="list-add-btn"
                                    onClick={() => handleAddList("white")}
                                >
                                    Add
                                </button>
                            </div>
                            <p className="card-hint">
                                Use this for trusted sites that should bypass content filters.
                            </p>
                        </article>

                        <article className="report-card report-card--list">
                            <div className="card-header card-header--tight">
                                <h3>Recent whitelist entries</h3>
                                <button className="link-button">View all whitelist</button>
                            </div>
                            <ul className="list-items">
                                {whitelist.map((item, idx) => (
                                    <li key={idx}>
                                        <span className="list-date">{item.date}</span>
                                        <span className="list-url">{item.url}</span>
                                    </li>
                                ))}
                            </ul>
                        </article>
                    </div>
                </section>

                {/* REPORT MALICIOUS FORM */}
                <section className="report-card report-card--form">
                    <div className="card-header">
                        <h2>Report Malicious Website</h2>
                    </div>
                    <p className="card-subtitle">
                        Help keep your family safe. Tell us about websites that look
                        suspicious, unsafe, or inappropriate.
                    </p>

                    {formMsg && (
                        <div
                            className={
                                "report-alert " +
                                (formMsg.type === "success"
                                    ? "report-alert--success"
                                    : "report-alert--error")
                            }
                        >
                            {formMsg.text}
                        </div>
                    )}

                    <form className="report-form" onSubmit={handleSubmit} noValidate>
                        <label className="report-field">
                            <span className="report-label">
                                Website URL <span className="field-required">*</span>
                            </span>
                            <input
                                className="report-input"
                                name="url"
                                placeholder="https://example.com/..."
                                value={form.url}
                                onChange={handleFormChange}
                            />
                        </label>

                        <div className="report-field-row">
                            <label className="report-field">
                                <span className="report-label">
                                    Threat Type <span className="field-required">*</span>
                                </span>
                                <select
                                    className="report-select"
                                    name="threatType"
                                    value={form.threatType}
                                    onChange={handleFormChange}
                                >
                                    <option value="">Select threat type</option>
                                    {threatTypes.map((t) => (
                                        <option key={t} value={t}>
                                            {t}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label className="report-field">
                                <span className="report-label">
                                    Device <span className="field-required">*</span>
                                </span>
                                <select
                                    className="report-select"
                                    name="device"
                                    value={form.device}
                                    onChange={handleFormChange}
                                >
                                    <option value="">Select device</option>
                                    {devices.map((d) => (
                                        <option key={d} value={d}>
                                            {d}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>

                        <label className="report-field">
                            <span className="report-label">Description (optional)</span>
                            <textarea
                                className="report-textarea"
                                name="description"
                                placeholder="Add any details that might help (what happened, who was using the device, etc.)"
                                rows={3}
                                value={form.description}
                                onChange={handleFormChange}
                            />
                        </label>

                        <button className="report-submit-btn" type="submit">
                            Submit report
                        </button>
                    </form>
                </section>

                {/* PREVIOUSLY REPORTED SITES TABLE */}
                <section className="report-card report-card--table">
                    <div className="card-header">
                        <h2>Previously Reported Sites</h2>
                    </div>

                    <div className="table-wrapper">
                        <table className="simple-table report-table">
                            <thead>
                                <tr>
                                    <th>Time</th>
                                    <th>Device</th>
                                    <th>MAC</th>
                                    <th>Website</th>
                                    <th>Type</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {previousReports.map((r, idx) => (
                                    <tr key={idx}>
                                        <td>{r.time}</td>
                                        <td>{r.device}</td>
                                        <td className="mono">{r.mac}</td>
                                        <td className="report-url-cell">{r.url}</td>
                                        <td>
                                            <span className="threat-pill">{r.type}</span>
                                        </td>
                                        <td>
                                            <span className="lock-icon" aria-hidden="true">
                                                🔒
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
