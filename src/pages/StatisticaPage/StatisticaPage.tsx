import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import clock from "../../assets/icons/clock.png";
import menu from "../../assets/icons/menu.png";
import Header from "../../components/Header/Header";
import Diary from "../../components/StatisticaPage/Diary/Diary";
import Progress from "../../components/StatisticaPage/Progress/Progress";
import Statistics from "../../components/StatisticaPage/Statistics/Statistics";
import { selectLibrary } from "../../redux/books/slice";
import css from "./StatisticaPage.module.css";

interface StatisticaPageProps {}

const StatisticaPage: React.FC<StatisticaPageProps> = () => {
  const { bookId } = useParams<{ bookId: string }>();

  const [firstShowProgress, setfirstShowProgress] = useState(false);
  const [start, setStart] = useState(false);
  const [subMenu, setSubMenu] = useState(false);

  const handleStart = () => {
    if (!firstShowProgress) {
      setfirstShowProgress(true);
    }
    setStart((prev) => !prev);
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
            </div>
            <div>
              {firstShowProgress && (
                <div className={css.info}>
                  {subMenu ? <h2>Diary</h2> : <h2>Statistics</h2>}

                  <div className={css.info_imgs}>
                    <div className={`${!subMenu ? css.info_img : ""}`}>
                      <img src={clock} alt="image of clock" />
                    </div>
                    <div className={`${subMenu ? css.info_img : ""}`}>
                      <img src={menu} alt="image of menu" />
                    </div>
                  </div>
                </div>
              )}

              <p className={css.sub_text}>
                Each page, each chapter is a new round of knowledge, a new step
                towards understanding. By rewriting statistics, we create our
                own reading history.
              </p>

              {!firstShowProgress && <Progress />}

              {firstShowProgress && (start ? <Diary /> : <Statistics />)}
            </div>
          </div>
          <div className={css.bottom}>
            <h2>
              My reading {!start && <span>6 hours and 23 minutes left</span>}
            </h2>

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
