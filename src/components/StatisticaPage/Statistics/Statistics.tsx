import css from "./Statistics.module.css";

interface StatisticsProps {}

const Statistics: React.FC<StatisticsProps> = () => {
  return (
    <div className={css.container}>
      <div className={css.main}>
        <span>100%</span>
      </div>
      <div className={css.bottom}>
        <div className={css.green}></div>
        <div className={css.contect}>
          <p className={css.procent}>19.14%</p>
          <p className={css.text}>171 pages read</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
