//  import{useEffect,useRef} from "react"; 6.9k (gzipped: 2.7k)
 import logo from "../../assets/images/logo.png";
 import {navLink,Link} from 'react-router-dom'

const navLinks = [
  {
    path:'/home',
    display:'Home'
  },
  {
    path:'/doctor',
    display:'Find a Doctor'
  },
  {
    path:'/services',
    display:'services'
  },
  {
    path:'/contact',
    display:'Contact'
  },
]
const Header = () =>{
  return(
    <header classNAme="header flex items-center">
      <div className="container">
        <div className="flex items-center justify-between">
          <div>
            <img src={logo} alt=""/>
          </div>
          <div className="navigation">
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLink.map((link,index) => (
                <li key={index}>
                  <navLink
                  to={link.path}
                  className={navClass =>
                    navClass.isActive
                    ? " text-primaryColor text-[16px] leading-7font-[600]"
                    : "text-textColor text-[16px] leading-7 font-[500]"
                  }
                  >{link.display}
                  </navLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;