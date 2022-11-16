import Head from "next/head";
import localFont from "@next/font/local";
import Spellbook from "../components/Spellbook";

const radianceRegularFont = localFont({
  src: "../public/Radiance.ttf",
});

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Ability Arena Spell Deck</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`content ${radianceRegularFont.className}`}>
        <div>
          <h1 className="title">ABILITY ARENA SPELL DECK</h1>
          <Spellbook />
          <footer>
            Made by <a href="https://john.shiksha">Rengwu</a>
          </footer>
        </div>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0.5rem 1rem;
        }

        .container {
          display: flex;
          flex-direction: column;
        }

        .content {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-grow: 1;
        }

        .title {
          color: var(--font-gold);
          margin-bottom: 0;
        }

        @media (max-width: 480px) {
          .title {
            font-size: 1.4rem;
          }
        }

        footer {
          color: grey;
          width: 100%;
        }

        footer a {
          color: grey;
        }
      `}</style>

      <style jsx global>{`
        :root {
          --font-gold: #e8ab4f;
          --font-white: rgba(255, 255, 255, 0.9);
          --font-grey: rgba(255, 255, 255, 0.7);
          --font-dim-grey: rgba(200, 200, 200, 0.5);
          --font-overlay-dim-purple: rgb(139 107 229 / 80%);
          --font-overlay-dim-white: rgb(255 255 255 / 74%);
          --font-overlay-dim-grey: rgb(149 149 149);

          --bg-dark: #020320;
          --bg-dark-2: rgb(42, 27, 47);
          --bg-dark-3: rgb(49, 31, 57);
        }

        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }

        body,
        #__next {
          min-height: 100vh;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          margin-top: 0;
        }

        body {
          background-color: var(--bg-dark);
          color: var(--font-white);
        }
      `}</style>
    </div>
  );
}
