import localFont from "@next/font/local";
const radianceRegularFont = localFont({ src: "../public/Radiance.ttf" });

export default function SearchInput({ ...rest }) {
  return (
    <>
      <input
        className={`searchInput ${radianceRegularFont.className}`}
        type="text"
        {...rest}
      />
      <style jsx>{`
        .searchInput {
          background: #3e3d4e;
          border: 1px solid rgb(159 127 211 / 70%);
          color: var(--font-white);
          font-size: 1.1rem;
          height: 2rem;
          padding: 0.1rem 0.4rem 0;
        }
        .searchInput:focus {
          outline: none;
          background: #4f4e60;
          border-color: var(--font-gold);
        }
      `}</style>
    </>
  );
}
