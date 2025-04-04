import diagrama from "../../../assets/icons/block.png";
import trash from "../../../assets/icons/trash.png";
import css from "./Diary.module.css";

interface DiaryProps {}

const Diary: React.FC<DiaryProps> = () => {
  return (
    <ul className={css.list}>
      <li className={css.item}>
        <div className={css.left}>
          <div className={css.header}>
            <div className={css.icon}>
              <span></span>
            </div>
            <div className={css.data}>21.10.2023</div>
          </div>
          <p className={css.procent}>7.6%</p>
          <p className={css.time}>29 minutes</p>
        </div>
        <div className={css.right}>
          <p className={css.pages}>42 pages</p>
          <div className={css.diargama}>
            <div className={css.content}>
              <img src={diagrama} alt="image of diagrama" />
              <p>45 pages per hour</p>
            </div>
            <button>
              <img src={trash} alt="image of trash" />
            </button>
          </div>
        </div>
      </li>
      <li className={css.item}>
        <div className={css.left}>
          <div className={css.header}>
            <div className={css.icon}>
              <span></span>
            </div>
            <div className={css.data}>21.10.2023</div>
          </div>
          <p className={css.procent}>7.6%</p>
          <p className={css.time}>29 minutes</p>
        </div>
        <div className={css.right}>
          <p className={css.pages}>42 pages</p>
          <div className={css.diargama}>
            <div className={css.content}>
              <img src={diagrama} alt="image of diagrama" />
              <p>45 pages per hour</p>
            </div>
            <button>
              <img src={trash} alt="image of trash" />
            </button>
          </div>
        </div>
      </li>
      <li className={css.item}>
        <div className={css.left}>
          <div className={css.header}>
            <div className={css.icon}>
              <span></span>
            </div>
            <div className={css.data}>21.10.2023</div>
          </div>
          <p className={css.procent}>7.6%</p>
          <p className={css.time}>29 minutes</p>
        </div>
        <div className={css.right}>
          <p className={css.pages}>42 pages</p>
          <div className={css.diargama}>
            <div className={css.content}>
              <img src={diagrama} alt="image of diagrama" />
              <p>45 pages per hour</p>
            </div>
            <button>
              <img src={trash} alt="image of trash" />
            </button>
          </div>
        </div>
      </li>
    </ul>
  );
};

export default Diary;
