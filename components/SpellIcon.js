import Tippy from "@tippyjs/react/headless";
import localFont from "@next/font/local";

const radianceFont = localFont({ src: "../public/Radiance.ttf" });
const radianceBoldFont = localFont({ src: "../public/Radiance-SemiBold.otf" });
const reaverFont = localFont({ src: "../public/Reaver-Regular.woff" });
const reaverBoldFont = localFont({ src: "../public/Reaver-Bold.woff" });

export default function SpellIcon({ spell, ...rest }) {
  return (
    <>
      <HeadlessTippy
        placement="bottom"
        delay={[0, 0]}
        content={<SpellOverlay spell={spell} />}
      >
        <div {...rest} className="spell-icon-container">
          <img
            className="spell-icon"
            src={`https://abilityarena.com/images/ability_icons/${spell.icon}.png`}
          />
          {spell.tags.includes("ultimate") && (
            <div className="ultimate-tag">U</div>
          )}
        </div>
      </HeadlessTippy>
      <style jsx>{`
        .spell-icon-container {
          position: relative;
          width: 64px;
          height: 64px;
          padding: 0.2rem;
          background: linear-gradient(
            117deg,
            rgba(255, 255, 255, 0.2) 0%,
            rgba(100, 100, 100, 0.2) 23%,
            rgba(180, 170, 170, 0.1) 71%,
            rgba(100, 100, 100, 0.2) 100%
          );
          flex-shrink: 0;
          margin: 0 0.5rem 1rem 0.5rem;
          border: 1px solid #6868682e;
          cursor: pointer;
        }

        .spell-icon {
          width: 100%;
          height: 100%;
        }

        .ultimate-tag {
          position: absolute;
          bottom: 0.2rem;
          right: 0.5rem;
        }
      `}</style>
    </>
  );
}

const HeadlessTippy = ({ content, ...rest }) => (
  <Tippy render={(attrs) => content} {...rest}>
    {rest.children}
  </Tippy>
);

function SpellOverlay({ spell }) {
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
              {spell?.categories?.map((line) => (
                <div className="category-line">{line}</div>
              ))}
            </div>
            <div className="description">{spell.description}</div>
            <div className="values">
              {spell?.values?.map((line) => {
                const split = line.split(":");
                return (
                  <div className="value-line">
                    <span className="value-line-key">{split[0]}:</span>
                    <span className="value-line-value">{split[1]}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .overlay-container {
          border: 2px solid rgb(86, 80, 158);
          background-color: rgb(28, 20, 50);
          width: 380px;
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
          padding-left: 3px;
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
      `}</style>
    </>
  );
}
