import diagrama from "../../../assets/icons/block.png";
import clock from "../../../assets/icons/clock.png";
import menu from "../../../assets/icons/menu.png";
import trash from "../../../assets/icons/trash.png";
import css from "./Diary.module.css";

interface DiaryProps {}

const Diary: React.FC<DiaryProps> = () => {
  return (
    <div className={css.dairy}>
      <div className={css.header}>
        <h2>Diary</h2>
        <div className={css.btns}>
          <button>
            <img src={clock} alt="image of clock" />
          </button>
          <button>
            <img src={menu} alt="image of menu" />
          </button>
        </div>
      </div>
      <ul className={css.list}>
        <li className={css.item}>
          <div className={css.left}>
            <div className={css.icon}>
              <span></span>
            </div>
            <p className={css.data}>21.10.2023</p>
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
    </div>
  );
};

export default Diary;
