import css from "./Error.module.css";

interface ErrorProps {}

const Error: React.FC<ErrorProps> = () => {
  return (
    <div className={css.container}>
      <p className={css.text}>
        Ooops... something went wrong, please, reload the page
      </p>
    </div>
  );
};

export default Error;
