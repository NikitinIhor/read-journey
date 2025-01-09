import Header from "../../components/Header/Header";
import css from "./LibraryPage.module.css";

interface LibraryPageProps {}

const LibraryPage: React.FC<LibraryPageProps> = () => {
  return (
    <div className={css.container}>
      <div className="container">
        <Header />
      </div>
    </div>
  );
};

export default LibraryPage;
