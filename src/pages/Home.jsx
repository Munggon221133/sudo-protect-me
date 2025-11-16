import Navbar from '../components/navbar/Navbar'
import padlock from '../assets/padlock.png'
import ModeCard from '../components/modecard/ModeCard'
import '../styles/Home.css'

export default function Home() {
    return (
        <div className="home-page">
            <Navbar />
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
            <section className="home-modes">
                <div className="home-modes-header">
                    <div>
                        <h2 className="home-modes-title">Protection modes</h2>
                        <p className="home-modes-subtitle">Choose how strict FamilyNet Shield should be.</p>
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

                </div>
            </section>
        </div>
    )
}
