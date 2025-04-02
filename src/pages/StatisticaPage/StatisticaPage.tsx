import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import star from "../../assets/images/star.png";
import Header from "../../components/Header/Header";
import { selectLibrary } from "../../redux/books/slice";
import css from "./StatisticaPage.module.css";

interface StatisticaPageProps {}

const StatisticaPage: React.FC<StatisticaPageProps> = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const [start, setStart] = useState(false);

  const handleStart = () => {
    setStart((prev) => !prev);
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
              <button className={css.btn}>To start</button>
            </div>
            <div className={css.footer}>
              <h3>Progress</h3>
              <p>
                Here you will see when and how much you read. To record, click
                on the red button above.
              </p>
              <div className={css.star}>
                <img src={star} alt="image of star" />
              </div>
            </div>
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
                  <span className={css.start}></span>
                ) : (
                  <span className={css.stop}></span>
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
