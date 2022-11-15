export default function BorderDecorTop() {
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
          border-bottom: 1px solid rgba(0, 0, 0, 0.8);
          box-sizing: content-box;
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
