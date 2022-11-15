import localFont from "@next/font/local";
const radianceFont = localFont({ src: "../public/Radiance-SemiBold.otf" });

export default function SearchInput({ ...rest }) {
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
          background: #4f4e60;
          border-color: var(--font-gold);
        }
      `}</style>
    </>
  );
}
