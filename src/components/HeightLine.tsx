interface IHeightLine {
  number: number;
  numberOfHeightLines: number;
}
const HeightLine = ({ number, numberOfHeightLines }: IHeightLine) => {
  return (
    <div
      className={`height-line`}
      key={`height-line-${number}`}
      style={{
        width: `${0}%`,
        animationDelay: `${number * 0.1}s`,
        height: `${number > 0 ? 100 / numberOfHeightLines - 1 : 0}%`,
      }}
    >
      {numberOfHeightLines > 6 ? (
        number % 2 === 0 ? (
          <span
            className="number"
            style={{ opacity: 0, animationDelay: `${number * 0.1}s` }}
          >
            {number}
          </span>
        ) : null
      ) : (
        <span
          className="number"
          style={{ opacity: 0, animationDelay: `${number * 0.1}s` }}
        >
          {number}
        </span>
      )}
      <span className="line"></span>
    </div>
  );
};

export default HeightLine;
