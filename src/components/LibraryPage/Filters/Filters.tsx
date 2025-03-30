import toast from "react-hot-toast";
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
    const value = event.target.value;
    if (value === "") {
      dispatch(filterByPages(null));
    } else {
      dispatch(filterByPages(Number(value)));
    }
  };

  if (loading) return <Loader />;

  if (error) {
    toast.error(error, {
      duration: 4000,
      position: "top-right",
    });
  }

  return (
    <div>
      <h2 className={css.title}>Filters:</h2>
      <div className={css.filter}>
        <label>Book title:</label>
        <input
          type="text"
          name="title"
          value={title}
          placeholder="Enter text"
          onChange={handleTitle}
        />
      </div>
      <div className={css.filter}>
        <label>The author:</label>
        <input
          type="text"
          name="author"
          value={author}
          placeholder="Enter text"
          onChange={handleAuthor}
        />
      </div>
      <div className={css.filter}>
        <label>Pages:</label>
        <input
          type="number"
          name="pages"
          value={pages ?? ""}
          placeholder="0"
          onChange={handlePages}
        />
      </div>
      <button className={css.btn}>Add book</button>
    </div>
  );
};

export default Filters;
