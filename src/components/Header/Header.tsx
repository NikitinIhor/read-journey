import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import sprite from "../../assets/icons/sprite.svg";
import logo from "../../assets/images/Logo.png";
import Wrapper from "../Wrapper/Wrapper";
import css from "./Header.module.css";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const [menu, setMenu] = useState(false);

  const openMenu = () => {
    setMenu(true);
  };
  const closeMenu = () => {
    setMenu(false);
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
              <span>I</span>
            </div>
            <span className={css.user_name}>Ilona Ratushniak</span>
          </div>
          <button className={css.burger} type="button">
            <svg className={css.menu} width={28} height={28}>
              <use href={`${sprite}#icon-menu`}></use>
            </svg>
          </button>
          <button onClick={openMenu} className={css.logout}>
            Log out
          </button>
        </div>
      </div>
      {menu && (
        <div className={css.burger_wrapper}>
          <div className={css.burger_body}>
            <button className={css.burger_close} type="button">
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
            <button onClick={closeMenu} className={css.menu_logout}>
              Log out
            </button>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default Header;
