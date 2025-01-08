import logo from "../../assets/images/Logo.png";
import Wrapper from "../Wrapper/Wrapper";
import css from "./Header.module.css";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <Wrapper>
      <div className={css.container}>
        <div className={css.logo}>
          <img src={logo} alt="image of logo" />
          <span>read journey</span>
        </div>
      </div>
    </Wrapper>
  );
};

export default Header;
