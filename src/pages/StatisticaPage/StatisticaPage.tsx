import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import clock from "../../assets/icons/clock.png";
import menu from "../../assets/icons/menu.png";
import Header from "../../components/Header/Header";
import Diary from "../../components/StatisticaPage/Diary/Diary";
import Progress from "../../components/StatisticaPage/Progress/Progress";
import { selectLibrary } from "../../redux/books/slice";
import css from "./StatisticaPage.module.css";

interface StatisticaPageProps {}

const StatisticaPage: React.FC<StatisticaPageProps> = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const [start, setStart] = useState(false);
  const [subMenu, setSubMenu] = useState(false);

  const handleStart = () => {
    setStart((prev) => !prev);
  };

  const handleSubMenu = () => {
    setSubMenu((prev) => !prev);
  };

  const books = useSelector(selectLibrary);

  const selectedBook = books.find((book) => book._id === bookId);

  if (!selectedBook) {
    return <div>Book not found</div>;
  }

  return (
    <div className={css.container}>
      <div className="container">
        <Header />
        <div className={css.wrapper}>
          <div className={css.top}>
            <div className={css.header}>
              <h3>Start page:</h3>
              <div className={css.page}>
                <p>Page number:</p>
                <span>0</span>
              </div>
              <button onClick={handleStart} className={css.btn}>
                {start ? "To stop" : "To start"}
              </button>

              {start ? (
                <div className={css.info}>
                  <h2>Diary</h2>
                  <div className={css.info_btns}>
                    <button onClick={handleSubMenu}>
                      <img src={clock} alt="image of clock" />
                    </button>
                    <button onClick={handleSubMenu}>
                      <img src={menu} alt="image of menu" />
                    </button>
                  </div>
                </div>
              ) : (
                <Progress />
              )}
            </div>

            {start && <Diary />}
          </div>
          <div className={css.bottom}>
            <h2>My reading</h2>
            <div className={css.item}>
              <img src={selectedBook.imageUrl} alt={selectedBook.title} />
              <div className={css.content}>
                <h2>{selectedBook.title}</h2>
                <p>{selectedBook.author}</p>
              </div>
              <button onClick={handleStart} className={css.start_btn}>
                {start ? (
                  <span className={css.stop}></span>
                ) : (
                  <span className={css.start}></span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticaPage;
