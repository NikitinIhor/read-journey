import sprite from "../../assets/icons/sprite.svg";
import ok from "../../assets/images/ok.png";
import css from "./GoodJob.module.css";

interface GoodJobProps {
  toggleSubMenu: () => void;
}

const GoodJob: React.FC<GoodJobProps> = ({ toggleSubMenu }) => {
  return (
    <>
      <div className={css.overlay} onClick={toggleSubMenu}></div>
      <div className={css.modal}>
        <div className={css.body}>
          <button onClick={toggleSubMenu} className={css.close} type="button">
            <svg className={css.menu_close} width={28} height={28}>
              <use href={`${sprite}#icon-x`}></use>
            </svg>
          </button>
          <div className={css.content}>
            <img src={ok} alt="image of ok" />
            <h3>Good job</h3>
            <p>
              Your book is now in <span>the library!</span> The joy knows no
              bounds and now you can start your training
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default GoodJob;
