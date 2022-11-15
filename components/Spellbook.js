import { useEffect, useState } from "react";
import localFont from "@next/font/local";
import axios from "axios";

const radianceFont = localFont({ src: "../public/Radiance-SemiBold.otf" });

export default function Spellbook({ ...rest }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [spells, setSpells] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/abilities.json")
      .then((res) => {
        if (res.status === 200) {
          setSpells(res.data);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="container" style={rest.style}>
        <BorderDecorTop />
        <div className="inner-container">
          <div className="sidebar">
            <div className="sidebar-title">FILTERS</div>
          </div>

          <div className="deck">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "0.2rem",
                marginBottom: "0.6rem",
              }}
            >
              <SearchInput
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: "min(100%,24rem)" }}
              />
            </div>
            {isLoading ? (
              <div>fetching spells..</div>
            ) : (
              <div className="spell-list">
                {spells.map(
                  (spell) =>
                    console.log(spell) || (
                      <div key={spell.icon} className="spell-icon-container">
                        <img
                          className="spell-icon"
                          src={`https://abilityarena.com/images/ability_icons/${spell.icon}.png`}
                        />
                        {spell.tags.includes("ultimate") && (
                          <div className="ultimate-tag">U</div>
                        )}
                      </div>
                    )
                )}
              </div>
            )}
          </div>
        </div>
        <BorderDecorBottom />
      </div>

      <style jsx>{`
        .container {
          max-width: 70rem;
          width: 100%;
          background: url("/cloud.bmp");
          background-size: 600px;
        }

        .inner-container {
          display: flex;
          flex-direction: row;

          backdrop-filter: grayscale(100%);
          background-color: rgba(18, 3, 30, 0.63);
          mix-blend-mode: hard-light;
        }

        .sidebar {
          width: 14rem;
          padding: 0 0.3rem;
          flex-shrink: 0;
        }

        .sidebar-title {
          color: var(--font-grey);
          font-size: 1.2rem;
          border-bottom: 1px solid var(--font-dim-grey);
          margin-top: 0.5rem;
          padding-bottom: 0.2rem;
        }

        .deck {
          width: 100%;
          padding: 0.4rem;
          background: rgb(0 0 0 / 44%);
        }

        .spacer {
          margin-bottom: 1rem;
        }

        .spell-list {
          display: flex;
          justify-content: center;
          flex-direction: row;
          flex-wrap: wrap;
        }

        .spell-icon-container {
          position: relative;
          width: 68px;
          height: 68px;
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

function SearchInput({ ...rest }) {
  return (
    <>
      <input
        className={`searchInput ${radianceFont.className}`}
        type="text"
        {...rest}
      />
      <style jsx>{`
        .searchInput {
          background: #3e3d4e;
          border: 1px solid rgb(159 127 211 / 70%);
          color: var(--font-white);
          font-size: 1.5rem;
          height: 2rem;
          padding: 0 0.4rem;
        }

        .searchInput:focus {
          outline: none;
          border-color: var(--font-gold);
        }
      `}</style>
    </>
  );
}

function BorderDecorTop() {
  return (
    <>
      <div className="decor-top">
        <div className="pointy-corner main">
          <div className="pointy-corner second">
            <div className="pointy-corner third">
              <div className="pointy-corner fourth"></div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .decor-top {
          //   border-top: 3px solid var(--font-gold);
          background: linear-gradient(
            90deg,
            rgba(113, 84, 40, 1) 0%,
            rgba(235, 170, 72, 1) 14%,
            rgba(230, 158, 47, 1) 41%,
            rgba(148, 102, 30, 1) 56%,
            rgba(138, 95, 28, 1) 63%,
            rgba(224, 166, 72, 1) 84%
          );
          height: 3px;
          position: relative;
        }
        .pointy-corner {
          position: absolute;
          left: 100%;
          bottom: 100%;
          height: 3px;
          background-color: var(--font-gold);
          transform-origin: bottom left;
        }
        .pointy-corner.main {
          transform: rotate(-45deg);
          bottom: 0;
          width: 11px;
        }
        .pointy-corner.second {
          transform: rotate(-90deg);
          width: 9px;
        }
        .pointy-corner.third {
          transform: rotate(-90deg);
          width: 6px;
        }
        .pointy-corner.fourth {
          transform: rotate(-90deg);
          width: 3px;
        }
      `}</style>
    </>
  );
}

function BorderDecorBottom() {
  return (
    <>
      <div className="decor-bottom">
        <div className="pointy-corner main">
          <div className="pointy-corner second">
            <div className="pointy-corner third">
              <div className="pointy-corner fourth"></div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .decor-bottom {
          border-top: 3px solid var(--font-gold);
          position: relative;
        }
        .pointy-corner {
          position: absolute;
          left: 100%;
          bottom: 100%;
          height: 3px;
          background-color: var(--font-gold);
          transform-origin: top left;
        }
        .pointy-corner.main {
          transform: rotate(45deg);
          width: 11px;
        }

        .pointy-corner.second,
        .pointy-corner.third,
        .pointy-corner.fourth {
          left: 100%;
          top: 100%;
          transform: rotate(90deg);
        }
        .pointy-corner.second {
          width: 9px;
        }
        .pointy-corner.third {
          width: 6px;
        }
        .pointy-corner.fourth {
          width: 3px;
        }
      `}</style>
    </>
  );
}
