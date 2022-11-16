import { useEffect, useState } from "react";
import axios from "axios";
import { debounce } from "lodash";
import BorderDecorTop from "./BorderDecorTop";
import BorderDecorBottom from "./BorderDecorBottom";
import SpellIcon from "./SpellIcon";
import localFont from "@next/font/local";
const radianceRegularFont = localFont({ src: "../public/Radiance.ttf" });

// enabled abilities will refer to https://double-edge-studios-llc.github.io/enabled_abilities.txt

export default function Spellbook({ ...rest }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [spells, setSpells] = useState([]);
  const [enabledSpells, setEnabledSpells] = useState([]);
  const [filteredSpells, setFilteredSpells] = useState([]);
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
        if (res.status === 200) {
          setEnabledSpellsList(
            res.data.split("\n").filter((s) => s[0] !== "#" && s[0] !== "!")
          );
        }
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

  useEffect(() => {
    const q = searchQuery?.toLowerCase();
    if (q?.length > 0) {
      const filtered = enabledSpells.filter(
        (spell) =>
          spell.id.toLowerCase().includes(q) ||
          spell.name.toLowerCase().includes(q) ||
          spell.tags.reduce((acc, curr) => {
            if (!acc) {
              acc = curr.toLowerCase().includes(q);
            }
            return acc;
          }, false)
      );
      setFilteredSpells(filtered);
    } else {
      setFilteredSpells(enabledSpells);
    }
  }, [searchQuery, enabledSpells]);

  return (
    <>
      <div className="container" style={rest.style}>
        <BorderDecorTop />
        <div className="inner-container">
          {/* <div className="sidebar-desktop">
            <FilterSidebar />
          </div> */}

          <div className="deck">
            <div className="search-container">
              <input
                onChange={debounce((e) => setSearchQuery(e.target.value), 100)}
                className={`search-input ${radianceRegularFont.className}`}
                type="text"
                {...rest}
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
                {filteredSpells.map((spell) => (
                  <SpellIcon spell={spell} key={spell.icon} />
                ))}
              </div>
            )}
          </div>
        </div>
        <BorderDecorBottom />
      </div>

      <style jsx>{`
        .container {
          max-width: calc(100vw - 48px);
          width: 1000px;
          background: url("/cloud.bmp");
          background-size: 600px;
        }

        .inner-container {
          display: flex;
          width: 100%;
          flex-direction: row;
          backdrop-filter: grayscale(100%);
          background-color: rgba(18, 3, 30, 0.63);
          min-height: calc(100vh - 100px);
        }

        @media (max-width: 780px) {
          .sidebar-desktop {
            display: none;
          }
        }

        .deck {
          width: 100%;
          padding: 0.8rem;
          background: rgb(0 0 0 / 35%);
        }

        .search-container {
          display: flex;
          justify-content: center;
          position: sticky;
          top: 0;
          z-index: 10;
          background: linear-gradient(
            180deg,
            rgba(35, 29, 40, 1) 0%,
            rgba(35, 29, 40, 1) 20%,
            rgba(36, 29, 37, 0.8) 70%,
            rgba(42, 27, 17, 0) 100%
          );

          margin: -0.8rem;
          padding: 0.8rem;
          margin-bottom: 0rem;
        }

        .search-input {
          background: #3e3d4e;
          border: 1px solid rgb(159 127 211 / 70%);
          color: var(--font-white);
          font-size: 1.1rem;
          height: 2.3rem;
          padding: 0.1rem 0.4rem 0;
          width: 410px;
        }
        .search-input:focus {
          outline: none;
          background: #4f4e60;
          border-color: var(--font-gold);
        }
        @media (max-width: 480px) {
          .search-input {
            width: 100%;
          }
        }

        .spell-list {
          display: grid;
          grid-gap: 12px;
          grid-template-columns: repeat(auto-fit, 64px);
          justify-content: center;
        }

        @media (max-width: 480px) {
          .spell-list {
            justify-content: space-between;
          }
        }
      `}</style>
    </>
  );
}

function FilterSidebar({}) {
  return (
    <>
      <div className="sidebar">
        <div className="sidebar-title">FILTERS</div>
      </div>
      <style jsx>{`
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
      `}</style>
    </>
  );
}
