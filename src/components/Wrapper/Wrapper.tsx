import css from "./Wrapper.module.css";

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return <div className={css.container}> {children}</div>;
};

export default Wrapper;
