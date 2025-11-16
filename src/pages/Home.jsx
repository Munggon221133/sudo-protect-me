import { useState } from "react"
import Navbar from "../components/navbar/Navbar"
import padlock from "../assets/padlock.png"
import ModeCard from "../components/modecard/ModeCard"
import "../styles/Home.css"

const DAY_SECONDS = 24 * 60 * 60

const formatTime = (seconds) => {
    const clamped = Math.max(0, Math.min(DAY_SECONDS, Number(seconds) || 0))
    const h = Math.floor(clamped / 3600)
    const m = Math.floor((clamped % 3600) / 60)
    const s = clamped % 60
    return [h, m, s].map(n => String(n).padStart(2, "0")).join(":")
}

const SCHEDULE_ROWS = [
    { key: "education", label: "Education Mode", thumbClass: "schedule-range-input--edu" },
    { key: "game", label: "Game Mode", thumbClass: "schedule-range-input--game" },
    { key: "normal", label: "Normal Mode", thumbClass: "schedule-range-input--normal" },
]

export default function Home() {
    const [schedule, setSchedule] = useState({
        education: { start: 8 * 3600, end: 21 * 3600 },          // 08:00–21:00
        game: { start: 18 * 3600, end: 21 * 3600 },              // 18:00–21:00
        normal: { start: 0, end: 23 * 3600 + 59 * 60 },          // 00:00–23:59
    })

    const updateRange = (key, which, value) => {
        const MIN_GAP = 60
        const v = Number(value)

        setSchedule(prev => {
            const { start, end } = prev[key]
            let nextStart = start
            let nextEnd = end

            if (which === "start") {
                nextStart = Math.min(v, end - MIN_GAP)
            } else {
                nextEnd = Math.max(v, start + MIN_GAP)
            }

            return {
                ...prev,
                [key]: { start: nextStart, end: nextEnd },
            }
        })
    }

    return (
        <div className="home-page">
            <Navbar />

            {/* ================= BANNER ================= */}
            <header className="home-banner">
                <div className="banner-content">
                    <img
                        src={padlock}
                        alt="padlock"
                        className="banner-icon"
                    />
                    <h1 className="banner-title">
                        FamilyNet <span className="title-accent">Shield</span>
                    </h1>
                    <p className="banner-subtitle">
                        Because your family deserves a safer internet.
                    </p>
                </div>
            </header>

            {/* ================= PROTECTION MODES + SCHEDULE ================= */}
            <section className="home-modes">
                <div className="home-modes-header">
                    <div>
                        <h2 className="home-modes-title">Protection modes</h2>
                        <p className="home-modes-subtitle">
                            Choose how strict FamilyNet Shield should be.
                        </p>
                    </div>

                    <div className="home-modes-hint">
                        <span>Changes apply instantly to connected devices.</span>
                    </div>
                </div>

                <div className="mode-grid">
                    <ModeCard
                        icon="🎓"
                        title="Education Mode"
                        description="Blocks adult content, gambling, and violence. Keeps focus on learning websites."
                        badges={[
                            { text: "Recommended for kids", class: "mode-badge mode-badge--primary" },
                            { text: "School hours", class: "mode-tag" }
                        ]}
                        footerOn="On · All child profiles"
                        footerOff="Off · Tap to enable"
                        defaultOn={true}
                        className="mode-card--education"
                    />

                    <ModeCard
                        icon="🎮"
                        title="Game Mode"
                        description="Limits playtime and blocks unsafe game sites while allowing approved platforms."
                        badges={[
                            { text: "Evening only", class: "mode-badge mode-badge--soft" },
                            { text: "Balance & fun", class: "mode-tag" }
                        ]}
                        footerOn="On · Time limits active"
                        footerOff="Off · Tap to enable"
                        defaultOn={true}
                        className="mode-card--game"
                    />

                    <ModeCard
                        icon="🏠"
                        title="Normal Mode"
                        description="Standard protection for everyday browsing. Blocks dangerous and adult websites."
                        badges={[
                            { text: "Default", class: "mode-badge mode-badge--outline" },
                            { text: "Whole family", class: "mode-tag" }
                        ]}
                        footerOn="On · Active"
                        footerOff="Off · Tap to enable"
                        defaultOn={false}
                        className="mode-card--normal"
                    />

                    {/* ================= SCHEDULE CARD (FULL WIDTH) ================= */}
                    <div className="schedule-card">
                        <div className="schedule-header">
                            <h2 className="schedule-title">Schedule Settings</h2>
                            <p className="schedule-subtitle">
                                Set allowed time ranges for each mode (24-hour, HH:MM:SS).
                            </p>
                        </div>

                        <div className="schedule-rows">
                            {SCHEDULE_ROWS.map(row => {
                                const { key, label, thumbClass } = row
                                const { start, end } = schedule[key]

                                return (
                                    <div className="schedule-row" key={key}>
                                        <div className="schedule-label">{label}</div>

                                        <div className="schedule-track-wrap">
                                            <div className="schedule-time schedule-time--start">
                                                {formatTime(start)}
                                            </div>
                                            <div className="schedule-time schedule-time--end">
                                                {formatTime(end)}
                                            </div>

                                            <div className="schedule-range">
                                                <div className="schedule-track" />

                                                <input
                                                    type="range"
                                                    min="0"
                                                    max={DAY_SECONDS}
                                                    step="60"
                                                    value={start}
                                                    onChange={e =>
                                                        updateRange(key, "start", e.target.value)
                                                    }
                                                    className={
                                                        "schedule-range-input schedule-range-input--start " +
                                                        thumbClass
                                                    }
                                                />

                                                <input
                                                    type="range"
                                                    min="0"
                                                    max={DAY_SECONDS}
                                                    step="60"
                                                    value={end}
                                                    onChange={e =>
                                                        updateRange(key, "end", e.target.value)
                                                    }
                                                    className={
                                                        "schedule-range-input schedule-range-input--end " +
                                                        thumbClass
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
