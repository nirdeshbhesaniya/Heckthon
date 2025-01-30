//  import{useEffect,useRef} from "react"; 6.9k (gzipped: 2.7k)
import logo from "../../assets/images/logo.png";
import userImg from '../../assets/images/avatar-icon.png';
import { navLink, Link } from 'react-router-dom';
import { BiMenu } from "react-icons/bi";
import { useEffect } from "react";

const navLinks = [
  {
    path: '/home',
    display: 'Home'
  },
  {
    path: '/doctor',
    display: 'Find a Doctor'
  },
  {
    path: '/services',
    display: 'services'
  },
  {
    path: '/contact',
    display: 'Contact'
  },
]
const Header = () => {

  const HeaderRef = useRef(null)
  const menuRef = useRef(null)

  const handleStickyHeader = () => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        HeaderRef.current.classList.add('sticky__header');
      } else {
        HeaderRef.current.classList.remove('sticky__header');
      }
    });
  };

  useEffect(() => {
    handleStickyHeader()
    return () => window.removeEventListener('scroll', handleStickyHeader);
  });
  const toggleMenu = () => menuRef.current.classList.toggle('show__menu');

  return (
    <header classNAme="header flex items-center ref={headerRef}">
      <div className="container">
        <div className="flex items-center justify-between">
          <div>
            <img src={logo} alt="" />
          </div>
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLink.map((link, index) => (
                <li key={index}>
                  <navLink
                    to={link.path}
                    className={navClass =>
                      navClass.isActive
                        ? " text-primaryColor text-[16px] leading-7font-[600]"
                        : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                    }
                  >{link.display}
                  </navLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden">
              <link to='/'>
                <figure className="w-[35px] h-[35px] rounded-full cursor-pointer">
                  <img src={userImg} className="w-full rounded-full" alt="" />
                </figure>

              </link>
            </div>
            <link to="/login">
              <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">Login</button>
            </link>

            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>



          </div>





        </div>
      </div>
    </header>
  );
};
export default Header;