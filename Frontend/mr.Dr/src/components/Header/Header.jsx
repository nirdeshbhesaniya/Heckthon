import { useRef, useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import logo from "../../assets/images/logo.png";
import defaultUserImg from "../../assets/images/avatar-icon.png"; // Default avatar

const navLinks = [
  { path: "/home", display: "Home" },
  { path: "/doctor", display: "Find a Doctor" },
  { path: "/services", display: "Services" },
  { path: "/contact", display: "Contact" },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userImage, setUserImage] = useState(defaultUserImg); // Default image

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    if (token) {
      fetchUserProfile();
    }
  }, []);

   // Function to fetch user profile
   const fetchUserProfile = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/profile", {
        method: "GET",
        credentials: "include", // Ensure cookies are sent
        headers: { "Content-Type": "application/json" }
      });
  
      if (!response.ok) throw new Error("Failed to fetch user data");
      
      const data = await response.json();
      if (data && data.data?.photo) setUserImage(data.data.photo);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };
  
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserImage(defaultUserImg); // Reset to default image
    window.location.reload();
  };

  const handleStickyHeader = () => {
    if (window.scrollY > 80) {
      headerRef.current?.classList.add("sticky__header");
    } else {
      headerRef.current?.classList.remove("sticky__header");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyHeader);
    return () => {
      window.removeEventListener("scroll", handleStickyHeader);
    };
  }, []);

  const toggleMenu = () => {
    menuRef.current?.classList.toggle("show__menu");
  };

  return (
    <header ref={headerRef} className="header flex items-center">
      <div className="container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div>
            <img src={logo} alt="Logo" />
          </div>

          {/* Navigation */}
          <div className="navigation hidden md:block">
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      isActive
                        ? "text-primaryColor text-[16px] leading-7 font-[600]"
                        : "text-textColor text-[16px] leading-7 font-[500]"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* User & Menu Icons */}
          <div className="flex items-center gap-4">
            {/* User Avatar */}
            {isLoggedIn && (
              <div className="hidden md:block">
                <Link to="/profile">
                  <figure className="w-[35px] h-[35px] rounded-full cursor-pointer">
                    <img
                      src={userImage} // Show Cloudinary image
                      className="w-full h-full rounded-full object-cover"
                      alt="User"
                    />
                  </figure>
                </Link>
              </div>
            )}

            {/* Login / Logout Button */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]"
              >
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
                  Login
                </button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
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
