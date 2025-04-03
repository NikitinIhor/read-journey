import css from "./Progress.module.css";

import star from "../../../assets/images/star.png";

const Progress: React.FC = () => {
  return (
    <div className={css.progress}>
      <h3>Progress</h3>
      <p>
        Here you will see when and how much you read. To record, click on the
        red button above.
      </p>
      <div className={css.star}>
        <img src={star} alt="image of star" />
      </div>
    </div>
  );
};

export default Progress;
