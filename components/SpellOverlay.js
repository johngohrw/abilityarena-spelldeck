import localFont from "@next/font/local";

const radianceFont = localFont({ src: "../public/Radiance.ttf" });
const reaverBoldFont = localFont({ src: "../public/Reaver-Bold.woff" });

export default function SpellOverlay({ spell }) {
  return (
    <>
      <div className={`overlay-container ${radianceFont.className}`}>
        <div className="title-bar">
          <div className="level-corner-decor">
            <img src="/corner-decor.svg" className="corner-decor-svg" />
            <div className="level-corner-decor-number">0</div>
          </div>
          <div className={`title ${reaverBoldFont.className}`}>
            {spell?.name}
          </div>
        </div>
        <div className="content-outer">
          <div className="content-inner">
            <div className="categories">
              {spell?.categories?.map((line, i) => (
                <div key={`${line}-${i}`} className="category-line">
                  {line}
                </div>
              ))}
            </div>
            <div className="description">{spell?.description}</div>
            <div className="values">
              {spell?.values?.map((line, i) => {
                const split = line.split(":");
                return (
                  <div className="value-line" key={`${line}-${i}`}>
                    <span className="value-line-key">{split[0]}:</span>
                    <span className="value-line-value">{split[1]}</span>
                  </div>
                );
              })}
            </div>
            {(spell?.cooldowns?.length > 0 || spell?.manaCost?.length > 0) && (
              <div className="cost">
                <div className="cooldowns">
                  <div className="cooldown-icon">
                    <div className="cooldown-icon-rect-1" />
                    <div className="cooldown-icon-rect-2" />
                  </div>
                  {spell?.cooldowns.map((cd, i) => (
                    <div key={`${cd}-${i}`} className="cooldown-value">
                      {cd}
                    </div>
                  ))}
                </div>
                <div className="mana">
                  <div className="mana-icon" />
                  {spell?.manaCost.map((mana, i) => (
                    <div key={`${mana}-${i}`} className="mana-value">
                      {mana}
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="super">
              <span>Super: </span>
              {spell?.superUpgrade?.split(":")[1]}
            </div>
            <div className="gaben">
              <span>Gaben: </span>
              {spell?.gabenUpgrade?.split(":")[1]}
            </div>
            {spell?.differences?.length > 0 && (
              <div className="differences">
                Differences: {spell?.differences}
              </div>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        .overlay-container {
          border: 2px solid rgb(86, 80, 158);
          background-color: rgb(28, 20, 50);
          width: 400px;
          max-width: calc(100vw - 28px);
        }

        .title-bar {
          position: relative;
          display: flex;
          flex-direction: row;
          align-items: center;
          height: 40px;
          background-color: rgb(36, 28, 65);
        }
        .level-corner-decor {
          position: absolute;
          height: 44px;
          width: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          top: 0;
          left: 0;
        }

        .corner-decor-svg {
          position: absolute;
          left: -7px;
          top: -3px;
          width: 52px;
        }

        .level-corner-decor-number {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.2rem;
          color: rgb(250, 211, 170);
          font-weight: 600;
          margin-left: 0px;
          margin-top: -3px;
          padding-top: 2px;
          padding-left: 1px;
          position: absolute;
          width: 38px;
          height: 38px;
          background: linear-gradient(
            185deg,
            rgba(107, 87, 52, 1) 15%,
            rgba(42, 27, 17, 1) 41%
          );
          border-radius: 50%;
          border: 1px solid rgba(37, 27, 11, 0.4);
        }
        .title {
          margin-left: 54px;
          padding-top: 4px;
          font-size: 1.14rem;
          text-transform: uppercase;
          letter-spacing: -0.2px;
        }
        .content-outer {
          padding-left: 12px;
          background-color: rgb(21, 15, 38);
        }
        .content-inner {
          background-color: rgb(28, 20, 50);
          padding: 0.8rem;
          font-size: 0.92rem;
        }

        .categories {
          font-weight: 400;
          color: var(--font-overlay-dim-purple);
          padding-bottom: 0.7rem;
          border-bottom: 2px solid rgb(119 95 203 / 46%);
        }

        .category-line {
          margin-bottom: 0.1rem;
        }

        .description {
          padding-top: 1rem;
          color: var(--font-overlay-dim-white);
          margin-bottom: 1rem;
          line-height: 1.3;
        }

        .values {
        }

        .value-line {
          margin-bottom: 0.1rem;
        }

        .value-line-key {
          color: var(--font-overlay-dim-purple);
        }

        .value-line-value {
          color: var(--font-overlay-dim-grey);
        }

        .cost {
          display: flex;
          margin: 1rem 0;
        }

        .cooldown-icon,
        .mana-icon {
          height: 18px;
          width: 18px;
          border: 1px solid #111111;
          border-radius: 5px;
          margin-right: 0.2rem;
        }

        .cooldowns {
          display: flex;
          margin-right: 1.2rem;
        }

        .cooldown-icon {
          position: relative;
          background-color: rgb(179, 179, 179);
          overflow: hidden;
        }

        .cooldown-icon-rect-1 {
          position: absolute;
          top: 0;
          left: 0;
          width: 50%;
          height: 100%;
          background-color: rgb(59, 59, 59);
        }
        .cooldown-icon-rect-2 {
          position: absolute;
          background-color: rgb(59, 59, 59);
          width: 50%;
          height: 100%;
          transform: rotate(-45deg) translateY(50%) translateX(0%);
          transform-origin: right;
        }
        .cooldown-value {
        }

        .cooldown-value:not(:last-child)::after {
          content: "/";
        }
        .mana {
          display: flex;
          margin-right: 1.2rem;
        }
        .mana-icon {
          background-color: rgb(0, 147, 197);
        }
        .mana-value:not(:last-child)::after {
          content: "/";
        }

        .cooldown-value:not(:first-child),
        .cooldown-value:not(:last-child)::after,
        .mana-value:not(:first-child),
        .mana-value:not(:last-child)::after {
          margin-left: 0.2rem;
        }

        .super,
        .gaben {
          margin: 0.5rem -0.8rem;
          padding: 1rem 0.8rem;
          background-color: rgb(41, 34, 61);
          color: var(--font-overlay-dim-white);
        }

        .super {
          margin-bottom: 1rem;
        }

        .super span {
          color: rgb(90, 106, 231);
        }

        .gaben {
        }

        .gaben span {
          color: rgb(254, 166, 0);
        }

        .differences {
          color: var(--font-overlay-dim-grey);
          margin: 1rem 0 0.5rem;
        }
      `}</style>
    </>
  );
}
