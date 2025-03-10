import Header from "../../components/Header/Header";
import MyLibrary from "../../components/LibraryPage/MyLibrary/MyLibrary";
import RecommendedBooks from "../../components/LibraryPage/RecommendedBooks/RecommendedBooks";
import css from "./LibraryPage.module.css";

interface LibraryPageProps {}

const LibraryPage: React.FC<LibraryPageProps> = () => {
  return (
    <div className="container">
      <Header />
      <div className={css.container}>
        <div className={css.filter_body}>
          {/* <Filters /> */}
          <RecommendedBooks />
        </div>
        <MyLibrary />
      </div>
    </div>
  );
};

export default LibraryPage;
