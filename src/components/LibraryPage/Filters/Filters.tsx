import { useDispatch, useSelector } from "react-redux";
import {
  filterByAuthor,
  filterByPages,
  filterByTitle,
  selectFilterByAPages,
  selectFilterByAuthor,
  selectFilterByTitle,
  selectFilterError,
  selectFilterLoading,
} from "../../../redux/filters/slice";
import { AppDispatch } from "../../../redux/store";
import Error from "../../Error/Error";
import Loader from "../../Loader/Loader";
import css from "./Filters.module.css";

interface FiltersProps {}

const Filters: React.FC<FiltersProps> = () => {
  const title = useSelector(selectFilterByTitle);
  const author = useSelector(selectFilterByAuthor);
  const pages = useSelector(selectFilterByAPages);

  const loading = useSelector(selectFilterLoading);
  const error = useSelector(selectFilterError);
  const dispatch = useDispatch<AppDispatch>();

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterByTitle(event.target.value));
  };

  const handleAuthor = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterByAuthor(event.target.value));
  };

  const handlePages = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterByPages(Number(event.target.value)));
  };

  if (loading) return <Loader />;
  if (error) return <Error />;

  return (
    <div>
      <h2 className={css.title}>Filters:</h2>
      <div className={css.filter}>
        <label>Book title:</label>
        <input
          type="text"
          name="title"
          value={title}
          placeholder="I See You Are Interested In The Dark"
          onChange={handleTitle}
        />
      </div>
      <div className={css.filter}>
        <label>The author:</label>
        <input
          type="text"
          name="author"
          value={author}
          placeholder="Hilarion Pavlyuk"
          onChange={handleAuthor}
        />
      </div>
      <div className={css.filter}>
        <label>Pages:</label>
        <input
          type="number"
          name="pages"
          value={pages}
          placeholder="664"
          onChange={handlePages}
        />
      </div>
      <button className={css.btn}>Add book</button>
    </div>
  );
};

export default Filters;
