import Navbar from '../components/navbar/Navbar'
import padlock from '../assets/padlock.png'
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
                <div className="mode-card">
                    <img src="https://images.unsplash.com/photo-1593642532400-2682810df593" alt="" />
                    <div className="mode-info">
                        <span>Education Mode</span>
                        <label className="switch">
                            <input type="checkbox" defaultChecked />
                            <span className="slider"></span>
                        </label>
                    </div>
                </div>

                <div className="mode-card">
                    <img src="https://images.unsplash.com/photo-1605201104331-81f6fba5d2c4" alt="" />
                    <div className="mode-info">
                        <span>Game Mode</span>
                        <label className="switch">
                            <input type="checkbox" defaultChecked />
                            <span className="slider"></span>
                        </label>
                    </div>
                </div>

                <div className="mode-card">
                    <img src="https://images.unsplash.com/photo-1587825140608-4e964503a8e6" alt="" />
                    <div className="mode-info">
                        <span>Normal Mode</span>
                        <label className="switch">
                            <input type="checkbox" />
                            <span className="slider"></span>
                        </label>
                    </div>
                </div>
            </section>
        </div>
    )
}
