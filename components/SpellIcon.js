import Tippy from "@tippyjs/react/headless";
import SpellOverlay from "./SpellOverlay";

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
          user-select: none;
          font-weight: 700;
          font-size: 0.8rem;
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
