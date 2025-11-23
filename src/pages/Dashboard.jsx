import Navbar from '../components/navbar/Navbar'
import '../styles/Dashboard.css'

const devices = [
    { name: "iPad-Kid", mac: "3C:15:C2:A9:42:B1", status: "Online", type: "Tablet" },
    { name: "iPhone-Chai", mac: "28:CF:DA:9B:4B:3E", status: "Online", type: "Phone" },
    { name: "PC-Room1", mac: "F8:27:93:88:6C:10", status: "Online", type: "PC" },
    { name: "SmartTV-LG", mac: "A4:5E:60:11:FF:21", status: "Offline", type: "TV" },
]

const events = [
    {
        time: "10:15",
        device: "iPad-Kid",
        mac: "3C:15:C2:A9:42:B1",
        desc: "Access blocked: tiktok.com",
        risk: "high",
    },
    {
        time: "11:02",
        device: "iPhone-Chai",
        mac: "28:CF:DA:9B:4B:3E",
        desc: "Suspicious login page detected: login-banking.com",
        risk: "high",
    },
    {
        time: "13:27",
        device: "PC-Room1",
        mac: "F8:27:93:88:6C:10",
        desc: "Unknown tracking script blocked: intrack.js",
        risk: "medium",
    },
    {
        time: "22:49",
        device: "PC-Room1",
        mac: "F8:27:93:88:6C:10",
        desc: "Game site limited: garena.com/th/",
        risk: "low",
    },
]

export default function Dashboard() {
    const totalDevices = devices.length
    const onlineDevices = devices.filter(d => d.status === "Online").length
    const offlineDevices = totalDevices - onlineDevices
    const totalEvents = events.length
    const highRiskEvents = events.filter(e => e.risk === "high").length

    return (
        <div className="dashboard-page">
            <Navbar />

            <main className="dashboard-main">
                {/* HEADER */}
                <header className="dashboard-header">
                    <div>
                        <p className="dashboard-subtitle">
                            Overview of your gateway health, connected devices, and traffic.
                        </p>
                    </div>

                    <div className="dashboard-header-meta">
                        <span className="dashboard-chip dashboard-chip--ok">
                            <span className="chip-dot" /> Healthy
                        </span>
                        <span className="dashboard-chip">Last updated · just now</span>
                    </div>
                </header>

                <section className="dashboard-overview">
                    {/* ONLINE DEVICES */}
                    <article className="overview-card overview-card--primary">
                        <div className="overview-icon">📶</div>
                        <div className="overview-body">
                            <div className="overview-main">
                                <span className="overview-label">Online Devices</span>
                                <span className="overview-value">
                                    {onlineDevices}/{totalDevices}
                                </span>
                            </div>
                            <p className="overview-meta">
                                {offlineDevices === 0
                                    ? "All devices online"
                                    : `${offlineDevices} device${offlineDevices > 1 ? "s" : ""} offline`}
                            </p>
                        </div>
                    </article>

                    {/* SECURITY EVENTS */}
                    <article className="overview-card">
                        <div className="overview-icon">🛡️</div>
                        <div className="overview-body">
                            <div className="overview-main">
                                <span className="overview-label">Security Events Today</span>
                                <span className="overview-value">{totalEvents}</span>
                            </div>
                            <p className="overview-meta">
                                {highRiskEvents} high-risk alert
                                {highRiskEvents !== 1 ? "s" : ""} detected
                            </p>
                        </div>
                    </article>

                    {/* DATA RECEIVED */}
                    <article className="overview-card">
                        <div className="overview-icon">⬇️</div>
                        <div className="overview-body">
                            <div className="overview-main">
                                <span className="overview-label">Data Received</span>
                                <span className="overview-value">42 GB</span>
                            </div>
                            <p className="overview-meta">Last 24 hours</p>
                        </div>
                    </article>

                    {/* DATA SENT */}
                    <article className="overview-card">
                        <div className="overview-icon">⬆️</div>
                        <div className="overview-body">
                            <div className="overview-main">
                                <span className="overview-label">Data Sent</span>
                                <span className="overview-value">26 GB</span>
                            </div>
                            <p className="overview-meta">Last 24 hours</p>
                        </div>
                    </article>
                </section>

                {/* TOP GRID: DEVICE + INTERNET STATUS */}
                <section className="dashboard-grid dashboard-grid--top">
                    <article className="dash-card dash-card--info">
                        <div className="card-header">
                            <h2>Device Information</h2>
                        </div>

                        <div className="device-info-grid">
                            <div className="info-column">
                                <div className="info-row">
                                    <span className="info-label">Model Name</span>
                                    <span className="info-value">TE26Pro</span>
                                </div>
                                <div className="info-row">
                                    <span className="info-label">MAC Address</span>
                                    <span className="info-value">1E-32-3C-80-FB-16</span>
                                </div>
                                <div className="info-row">
                                    <span className="info-label">Hardware Version</span>
                                    <span className="info-value">V1.0</span>
                                </div>
                                <div className="info-row">
                                    <span className="info-label">Firmware Version</span>
                                    <span className="info-value">V10.0.7</span>
                                </div>
                            </div>

                            <div className="info-column">
                                <div className="info-row">
                                    <span className="info-label">GPON Serial Number</span>
                                    <span className="info-value info-value--muted">
                                        xxxxxxxxxxxxxx
                                    </span>
                                </div>
                                <div className="info-row">
                                    <span className="info-label">TRUE Serial Number</span>
                                    <span className="info-value info-value--muted">
                                        xxxxxxxxxxxxxx
                                    </span>
                                </div>
                                <div className="info-row">
                                    <span className="info-label">Device Serial Number</span>
                                    <span className="info-value info-value--muted">
                                        xxxxxxxxxxxxxx
                                    </span>
                                </div>
                                <div className="info-row">
                                    <span className="info-label">Compile Time</span>
                                    <span className="info-value">2025-08-08 10:00:55</span>
                                </div>
                            </div>
                        </div>
                    </article>

                    <article className="dash-card dash-card--info">
                        <div className="card-header">
                            <h2>Internet Status</h2>
                        </div>

                        <div className="internet-status-grid">
                            <div className="info-column">
                                <div className="info-row">
                                    <span className="info-label">Network Status</span>
                                    <span className="info-value info-value--link">
                                        Connected
                                    </span>
                                </div>
                                <div className="info-row">
                                    <span className="info-label">Subnet Mask</span>
                                    <span className="info-value">255.255.255.255
                                        
                                    </span>
                                </div>
                                <div className="info-row">
                                    <span className="info-label">MAC Address</span>
                                    <span className="info-value">1E-32-3C-80-FB-16</span>
                                </div>
                            </div>

                            <div className="info-column">
                                <div className="info-row">
                                    <span className="info-label">IP Address</span>
                                    <span className="info-value">192.168.1.1</span>
                                </div>
                                <div className="info-row">
                                    <span className="info-label">Primary DNS</span>
                                    <span className="info-value">8.8.8.8</span>
                                </div>
                                <div className="info-row">
                                    <span className="info-label">Secondary DNS</span>
                                    <span className="info-value">0.0.0.0</span>
                                </div>
                            </div>
                        </div>
                    </article>
                </section>

                {/* MIDDLE GRID: CONNECTED DEVICES + EVENTS */}
                <section className="dashboard-grid dashboard-grid--middle">
                    <article className="dash-card dash-card--table">
                        <div className="card-header">
                            <h2>Connected Devices</h2>
                            <button className="link-button">View all devices</button>
                        </div>

                        <div className="table-wrapper">
                            <table className="simple-table">
                                <thead>
                                    <tr>
                                        <th>Device Name</th>
                                        <th>Type</th>
                                        <th>MAC Address</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {devices.map((d) => (
                                        <tr key={d.mac}>
                                            <td>{d.name}</td>
                                            <td>{d.type}</td>
                                            <td className="mono">{d.mac}</td>
                                            <td>
                                                <span
                                                    className={
                                                        "status-pill " +
                                                        (d.status === "Online"
                                                            ? "status-pill--online"
                                                            : "status-pill--offline")
                                                    }
                                                >
                                                    {d.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </article>

                    <article className="dash-card dash-card--table dash-card--events">
                        <div className="card-header">
                            <h2>Events</h2>
                            <button className="link-button">View all events</button>
                        </div>

                        <div className="events-table-wrapper">
                            <table className="simple-table simple-table--events">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Time</th>
                                        <th>Device</th>
                                        <th>MAC</th>
                                        <th>Details</th>
                                        <th>Risk</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {events.map((e, idx) => (
                                        <tr
                                            key={idx}
                                            className={`event-row event-row--${e.risk}`}
                                        >
                                            <td>{e.time}</td>
                                            <td>{e.device}</td>
                                            <td className="mono">{e.mac}</td>
                                            <td className="events-cell">
                                                <span className="event-text">{e.desc}</span>
                                            </td>
                                            <td>
                                                <span
                                                    className={
                                                        "event-risk-label event-risk-label--" +
                                                        e.risk
                                                    }
                                                >
                                                    {e.risk === "high"
                                                        ? "High"
                                                        : e.risk === "medium"
                                                            ? "Medium"
                                                            : "Low"}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* top / bottom fade for scroll area */}
                            <div className="events-fade events-fade--top" />
                            <div className="events-fade events-fade--bottom" />
                        </div>

                        <div className="events-legend">
                            <span className="legend-title">Risk level</span>
                            <span className="legend-pill legend-pill--high">High</span>
                            <span className="legend-pill legend-pill--medium">Medium</span>
                            <span className="legend-pill legend-pill--low">Low</span>
                        </div>
                    </article>
                </section>

                {/* TRAFFIC SECTION */}
                <section className="dash-card dash-card--traffic">
                    <div className="card-header card-header--traffic">
                        <div>
                            <h2>Today&apos;s Traffic Statistics</h2>
                            <p className="card-subtitle">
                                Approximate downstream and upstream traffic in the last 24 hours.
                            </p>
                        </div>
                        <div className="traffic-totals">
                            <div className="traffic-total-chip traffic-total-chip--down">
                                <div>
                                    <span className="traffic-label">Received</span>
                                    <span className="traffic-value">42 GB</span>
                                </div>
                            </div>
                            <div className="traffic-total-chip traffic-total-chip--up">
                                <div>
                                    <span className="traffic-label">Sent</span>
                                    <span className="traffic-value">26 GB</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="traffic-chart">
                        <div className="traffic-chart-inner">
                            <div className="traffic-gridlines">
                                <span />
                                <span />
                                <span />
                                <span />
                            </div>

                            <div className="traffic-area traffic-area--down" />
                            <div className="traffic-area traffic-area--up" />
                        </div>

                        <div className="traffic-chart-footer">
                            <span>00:00</span>
                            <span>06:00</span>
                            <span>12:00</span>
                            <span>18:00</span>
                            <span>24:00</span>
                        </div>

                        <div className="traffic-legend">
                            <span className="traffic-dot traffic-dot--down" />
                            <span className="traffic-legend-label">Download</span>
                            <span className="traffic-dot traffic-dot--up" />
                            <span className="traffic-legend-label">Upload</span>
                        </div>
                    </div>

                    {/* NEW: detailed RX / TX stats under the chart */}
                    <div className="traffic-stats-grid">
                        <div className="traffic-stats-header">
                            <span />
                            <span>Current</span>
                            <span>Avg</span>
                            <span>Peak</span>
                        </div>

                        {/* RX (Download) */}
                        <div className="traffic-stats-row">
                            <div className="traffic-stats-label traffic-stats-label--down">
                                <span className="traffic-stats-direction">RX ↓</span>
                            </div>
                            <div className="traffic-stats-value">
                                <span className="traffic-stats-main">3012.36 kbit/s</span>
                                <span className="traffic-stats-sub">(367.72 KB/s)</span>
                            </div>
                            <div className="traffic-stats-value">
                                <span className="traffic-stats-main">1754.23 kbit/s</span>
                                <span className="traffic-stats-sub">(214.14 KB/s)</span>
                            </div>
                            <div className="traffic-stats-value">
                                <span className="traffic-stats-main">6270.38 kbit/s</span>
                                <span className="traffic-stats-sub">(765.43 KB/s)</span>
                            </div>
                        </div>

                        {/* TX (Upload) */}
                        <div className="traffic-stats-row">
                            <div className="traffic-stats-label traffic-stats-label--up">
                                <span className="traffic-stats-direction">TX ↑</span>
                            </div>
                            <div className="traffic-stats-value">
                                <span className="traffic-stats-main">31.13 kbit/s</span>
                                <span className="traffic-stats-sub">(3.80 KB/s)</span>
                            </div>
                            <div className="traffic-stats-value">
                                <span className="traffic-stats-main">21.72 kbit/s</span>
                                <span className="traffic-stats-sub">(2.65 KB/s)</span>
                            </div>
                            <div className="traffic-stats-value">
                                <span className="traffic-stats-main">87.63 kbit/s</span>
                                <span className="traffic-stats-sub">(10.70 KB/s)</span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
