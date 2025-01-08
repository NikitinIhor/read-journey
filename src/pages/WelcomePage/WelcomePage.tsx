import { useState } from "react";
import image from "../../assets/images/iPhone.png";
import logo from "../../assets/images/Logo.png";
import SignInForm from "../../components/SignInForm/SignInForm";
import SignupForm from "../../components/SignupForm/SignupForm";
import Wrapper from "../../components/Wrapper/Wrapper";
import css from "./WelcomePage.module.css";

interface WelcomePageProps {}

const WelcomePage: React.FC<WelcomePageProps> = () => {
  const [login, setLogin] = useState(false);

  const handleChangeForm = () => {
    setLogin((prev) => !prev);
  };

  return (
    <div className={css.container}>
      <div className="container">
        <div className={css.body}>
          <Wrapper>
            <div className={css.content}>
              <div className={css.logo}>
                <img src={logo} alt="image of logo" />
                <span>read journey</span>
              </div>
              <h1 className={css.title}>
                Expand your mind, reading <span>a book</span>
              </h1>
              {login ? (
                <SignInForm login={login} handleChangeForm={handleChangeForm} />
              ) : (
                <SignupForm login={login} handleChangeForm={handleChangeForm} />
              )}
            </div>
          </Wrapper>
          <div className={css.image_wrapper}>
            <Wrapper>
              <div className={css.image}>
                <img src={image} alt="image of iphone" />
              </div>
            </Wrapper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
