import { useRef, useEffect, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import logo from "../../assets/images/logo.png";
import defaultUserImg from "../../assets/images/avatar-icon.png";
import { UserContext } from "../../userContext";

const navLinks = [
  { path: "/home", display: "Home" },
  { path: "/doctor", display: "Find a Doctor" },
  { path: "/services", display: "Services" },
  { path: "/contact", display: "Contact" },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);

  // Get user data from context
  const { user, role, token, dispatch } = useContext(UserContext);

  // Derived state from context (React will re-render when context updates)
  const isLoggedIn = !!token;
  const userImage = user?.photo || defaultUserImg;

  useEffect(() => {
    if (token) {
      fetchUserProfile();
    }
  }, [token]); // Fetch user data when token changes

  const fetchUserProfile = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    try {
      const response = await fetch(`http://localhost:8000/api/v1/users/${userId}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch user data");

      const data = await response.json();

      // Update user data in context
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { user: data, token, role: data.role },
      });
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleLogout = () => {
    // Clear storage
    localStorage.clear();
    sessionStorage.clear();

    // Update context state (this will trigger re-render)
    dispatch({ type: "LOGOUT" });

    // No need to manually update isLoggedIn or userImage, since context will update it
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
    return () => window.removeEventListener("scroll", handleStickyHeader);
  }, []);

  const toggleMenu = () => menuRef.current?.classList.toggle("show__menu");

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
                <Link to={role === "doctor" ? "/doctor/profile" : "/user/profile"}>
                  <figure className="w-[35px] h-[35px] rounded-full cursor-pointer">
                    <img
                      src={userImage}
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
