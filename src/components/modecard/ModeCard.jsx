import { useState } from "react";

export default function ModeCard({
    icon,
    title,
    description,
    badges,
    footerOn,
    footerOff,
    defaultOn,
    className
}) {
    const [isOn, setIsOn] = useState(defaultOn);

    return (
        <article className={`mode-card ${className}`}>
            <div className="mode-main">
                <div className="mode-icon">{icon}</div>

                <div className="mode-text">
                    <div className="mode-title">
                        <h3>{title}</h3>

                        {/* SWITCH */}
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={isOn}
                                onChange={() => setIsOn(!isOn)}
                            />
                            <span className="slider" />
                        </label>
                    </div>

                    <p>{description}</p>

                    <div className="mode-meta">
                        {badges.map((b, idx) => (
                            <span key={idx} className={b.class}>
                                {b.text}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* FOOTER — AUTOMATICALLY CHANGES */}
            <div className="mode-footer">
                <span
                    className={`mode-status-dot ${isOn ? "mode-status-dot--on" : "mode-status-dot--off"
                        }`}
                />
                <span className="mode-status-text">
                    {isOn ? footerOn : footerOff}
                </span>
            </div>
        </article>
    );
}
