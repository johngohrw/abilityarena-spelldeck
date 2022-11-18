import { useEffect, useState } from "react";
import axios from "axios";
import { debounce } from "lodash";
import BorderDecorTop from "./BorderDecorTop";
import BorderDecorBottom from "./BorderDecorBottom";
import SpellIcon from "./SpellIcon";
import localFont from "@next/font/local";
const radianceRegularFont = localFont({ src: "../public/Radiance.ttf" });

// enabled abilities will refer to https://double-edge-studios-llc.github.io/enabled_abilities.txt

const initialFilters = {
  attackDamage: { label: "Attack Damage", checked: false },
  attackModifier: { label: "Attack Modifier", checked: false },
  attackRange: { label: "Attack Range", checked: false },
  attackSpeed: { label: "Attack Speed", checked: false },
  break: { label: "Break", checked: false },
  buff: { label: "Buff", checked: false },
  damageAmplification: { label: "Damage Amplification", checked: false },
  dispel: { label: "Dispel", checked: false },
  displacement: { label: "Displacement", checked: false },
  healing: { label: "Healing", checked: false },
  instantAttack: { label: "Instant Attack", checked: false },
  lifesteal: { label: "Lifesteal", checked: false },
  magicDamage: { label: "Magic Damage", checked: false },
  magicImmunity: { label: "Magic Immunity", checked: false },
  manaRegeneration: { label: "Mana Regeneration", checked: false },
  mobility: { label: "Mobility", checked: false },
  passive: { label: "Passive", checked: false },
  silence: { label: "Silence", checked: false },
  spam: { label: "Spam", checked: false },
  stats: { label: "Stats", checked: false },
  stun: { label: "Stun", checked: false },
  summons: { label: "Summons", checked: false },
  ultimate: { label: "Ultimate", checked: false },
};

export default function Spellbook({ ...rest }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [spells, setSpells] = useState([]);
  const [enabledSpells, setEnabledSpells] = useState([]);
  const [filteredSpells, setFilteredSpells] = useState([]);
  const [disabledSpells, setDisabledSpells] = useState([]); // TODO: do something with this
  const [enabledSpellsList, setEnabledSpellsList] = useState([]);

  const [isLoadingSpells, setIsLoadingSpells] = useState(true);
  const [isLoadingEnabledList, setIsLoadingEnabledList] = useState(true);
  const [filters, setFilters] = useState(initialFilters);

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
    let filtered = [...enabledSpells];

    const q = searchQuery?.toLowerCase();
    if (q?.length > 0) {
      filtered = filtered.filter(
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
    }

    const enabledFilters = Object.entries(filters).reduce((acc, curr) => {
      const [key, obj] = curr;
      if (obj.checked) {
        acc.push(key);
      }
      return acc;
    }, []);

    if (enabledFilters.length > 0) {
      filtered = filtered.filter((spell) =>
        spell.tags.reduce((acc, curr) => {
          if (!acc) {
            acc = enabledFilters.includes(curr);
          }
          return acc;
        }, false)
      );
    }

    setFilteredSpells(filtered);
  }, [searchQuery, enabledSpells, filters]);

  return (
    <>
      <div className="container" style={rest.style}>
        <BorderDecorTop />
        <div className="inner-container">
          <div className="sidebar-desktop">
            <FilterSidebar filters={filters} setter={setFilters} />
          </div>

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
                  <SpellIcon
                    spell={spell}
                    key={spell.icon}
                    inheritedFontClassName={radianceRegularFont.className}
                  />
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

function FilterSidebar({ filters, setter }) {
  const handleCheck = (key) => {
    const newFilters = { ...filters };
    newFilters[key].checked = !newFilters[key].checked;
    setter(newFilters);
  };
  return (
    <>
      <div className="sidebar">
        <div className="sidebar-title">FILTERS</div>
        <div className="sidebar-button-container">
          {Object.entries(filters).map(([key, obj]) => {
            return (
              <button
                key={key}
                className={`filter-button ${radianceRegularFont.className} ${
                  obj.checked && "checked"
                }`}
                onClick={() => handleCheck(key)}
              >
                <input readOnly type="checkbox" checked={obj.checked} />
                {obj.label}
              </button>
            );
          })}
        </div>
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

        .sidebar-button-container {
          display: flex;
          flex-direction: column;
          margin-top: 0.5rem;
        }
        .filter-button {
          display: flex;
          align-items: center;
          border: 0;
          background: none;
          padding: 0.2rem 0rem;
          text-align: left;
          font-size: 1rem;
          color: #ccc;
          cursor: pointer;
        }
        .filter-button input {
          margin-right: 0.4rem;
        }
        .filter-button.checked input {
          background: #bb98ff;
        }
        .filter-button.checked {
          color: #bb98ff;
        }
      `}</style>
    </>
  );
}
