import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import sprite from "../../assets/icons/sprite.svg";
import logo from "../../assets/images/Logo.png";
import { signout } from "../../redux/auth/ops";
import { selectLoading, selectUser } from "../../redux/auth/slice";
import { AppDispatch } from "../../redux/store";
import Loader from "../Loader/Loader";
import Wrapper from "../Wrapper/Wrapper";
import css from "./Header.module.css";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const [menu, setMenu] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const user = useSelector(selectUser);

  if (loading || signingOut) return <Loader />;

  const toggleMenu = () => {
    setMenu((prev) => !prev);
  };

  const handleSignout = async () => {
    setSigningOut(true);
    await dispatch(signout());
    setSigningOut(false);
  };

  return (
    <Wrapper>
      <div className={css.container}>
        <Link to="/recommended" className={css.logo}>
          <img src={logo} alt="image of logo" />
          <span>read journey</span>
        </Link>
        <nav className={css.nav}>
          <ul className={css.list}>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? css.isActive : css.link
                }
                to="/recommended"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? css.isActive : css.link
                }
                to="/library"
              >
                My library
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className={css.info}>
          <div className={css.user}>
            <div className={css.user_icon}>
              <span>
                {user?.name ? user.name.slice(0, 1).toUpperCase() : "U"}
              </span>
            </div>
            <span className={css.user_name}>
              {user?.name
                ? user.name
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")
                : "Guest"}
            </span>
          </div>
          <button onClick={toggleMenu} className={css.burger} type="button">
            <svg className={css.menu} width={28} height={28}>
              <use href={`${sprite}#icon-menu`}></use>
            </svg>
          </button>
          <button onClick={handleSignout} className={css.logout}>
            Log out
          </button>
        </div>
      </div>
      {menu && (
        <div className={css.burger_wrapper}>
          <div className={css.burger_body}>
            <button
              onClick={toggleMenu}
              className={css.burger_close}
              type="button"
            >
              <svg className={css.menu_close} width={28} height={28}>
                <use href={`${sprite}#icon-x`}></use>
              </svg>
            </button>
            <nav className={css.menu_nav}>
              <ul className={css.menu_list}>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? css.isActive : css.link
                    }
                    to="/recommended"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? css.isActive : css.link
                    }
                    to="/library"
                  >
                    My library
                  </NavLink>
                </li>
              </ul>
            </nav>
            <button onClick={handleSignout} className={css.menu_logout}>
              Log out
            </button>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default Header;
