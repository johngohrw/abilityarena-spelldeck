import { useEffect, useState } from "react";
import axios from "axios";
import BorderDecorTop from "./BorderDecorTop";
import SearchInput from "./SearchInput";
import BorderDecorBottom from "./BorderDecorBottom";

// enabled abilities will refer to https://double-edge-studios-llc.github.io/enabled_abilities.txt

export default function Spellbook({ ...rest }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [spells, setSpells] = useState([]);
  const [enabledSpells, setEnabledSpells] = useState([]);
  const [disabledSpells, setDisabledSpells] = useState([]);
  const [enabledSpellsList, setEnabledSpellsList] = useState([]);

  const [isLoadingSpells, setIsLoadingSpells] = useState(true);
  const [isLoadingEnabledList, setIsLoadingEnabledList] = useState(true);

  useEffect(() => {
    axios
      .get("/abilities.json")
      .then((res) => {
        if (res.status === 200) {
          setSpells(res.data);
        }
      })
      .finally(() => {
        setIsLoadingSpells(false);
      });

    axios
      .get("https://double-edge-studios-llc.github.io/enabled_abilities.txt")
      .then((res) => {
        setEnabledSpellsList(
          res.data.split("\n").filter((s) => s[0] !== "#" && s[0] !== "!")
        );
      })
      .finally(() => {
        setIsLoadingEnabledList(false);
      });
  }, []);

  useEffect(() => {
    if (spells?.length > 0 && enabledSpellsList?.length > 0) {
      const enabledSpells = spells.filter((spell) =>
        enabledSpellsList.includes(spell.id)
      );
      const disabledSpells = spells.filter(
        (spell) => !enabledSpellsList.includes(spell.id)
      );
      setEnabledSpells(enabledSpells);
      setDisabledSpells(disabledSpells);
    }
  }, [spells, enabledSpellsList]);

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
            {isLoadingSpells ||
            isLoadingEnabledList ||
            enabledSpellsList.length === 0 ? (
              <div>
                {isLoadingSpells && <div>fetching spells..</div>}
                {isLoadingEnabledList && (
                  <div>fetching enabled abilities list..</div>
                )}
                {!isLoadingSpells &&
                  !isLoadingEnabledList &&
                  enabledSpellsList.length === 0 && (
                    <div>filtering enabled spells..</div>
                  )}
              </div>
            ) : (
              <div className="spell-list">
                {enabledSpells.map((spell) => (
                  <div key={spell.icon} className="spell-icon-container">
                    <img
                      className="spell-icon"
                      src={`https://abilityarena.com/images/ability_icons/${spell.icon}.png`}
                    />
                    {spell.tags.includes("ultimate") && (
                      <div className="ultimate-tag">U</div>
                    )}
                  </div>
                ))}
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
          padding: 0 0.5rem;
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

          overflow-y: scroll;
          height: calc(100vh - 140px);
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
