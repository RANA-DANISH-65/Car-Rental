import React, { useState, useRef, useEffect } from "react";
import {
  Menu,
  X,
  Heart,
  Calendar,
  Inbox,
  User,
  CreditCard,
  CarFront,
  HelpCircle,
  FileText,
  LogOut,
  UserPlus,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const SideMenu = ({ isOpen, onClose }) => {
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleMenuItemClick = (itemText) => {
    switch (itemText) {
      case "Login":
        navigate("/login");
        break;
      case "Sign Up":
        navigate("/signup");
        break;
      case "Become a host":
        navigate("/rental-signup");
        break;
      case "Favorites":
        navigate("/favorites");
        break;
      case "Trips":
        navigate("/trips");
        break;
      case "Inbox":
        navigate("/inbox");
        break;
      case "Account":
        navigate("/account");
        break;
      case "Legal":
        navigate("/legal");
        break;
      case "How Drive Fleet works":
        navigate("/how-it-works");
        break;
      case "Contact support":
        navigate("/contact");
        break;
      case "Log out":
        console.log("Logging out");
        navigate("/");
        break;
      default:
        break;
    }
    onClose();
  };

  const menuItems = [
    // NEW: Login and Sign Up added first
    { icon: User, text: "Login" },
    { icon: UserPlus, text: "Sign Up" },
    // Divider line will appear below
    "divider",
    { icon: Heart, text: "Favorites" },
    { icon: Calendar, text: "Trips" },
    { icon: Inbox, text: "Inbox" },
    { icon: User, text: "Account" },
    { icon: CarFront, text: "Become a host" },
    { icon: HelpCircle, text: "How Drive Fleet works" },
    { icon: HelpCircle, text: "Contact support" },
    { icon: FileText, text: "Legal" },
    { icon: LogOut, text: "Log out" },
  ];

  return (
    <div
      ref={menuRef}
      className={`fixed inset-y-16 right-0 w-64 bg-[#1a1a1a] shadow-lg transform transition-transform duration-300 ease-in-out
    ${
      isOpen ? "translate-x-0" : "translate-x-full"
    } z-50 overflow-y-auto max-h-[calc(100vh-8rem)]`}
    >
      <div className="py-2">
        {menuItems.map((item, index) => {
          if (item === "divider") {
            return (
              <hr key={`divider-${index}`} className="my-2 border-gray-200" />
            );
          }
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex items-center px-4 py-3 text-white cursor-pointer transition-all duration-300 rounded-lg hover:bg-[rgba(255,255,255,0.05)] hover:backdrop-blur-md hover:shadow-lg"
              onClick={() => handleMenuItemClick(item.text)}
            >
              <Icon className="mr-3 text-[#1ecb15]" size={20} />
              <span className="text-sm">{item.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const goToHome = () => {
    navigate("/");
  };

  const goToBecomeHost = () => {
    navigate("/rental-signup");
  };

  return (
    <>
      <header className="bg-[#1a1a1a] ">
        <div className="flex justify-between items-center px-4 py-3">
          <div
            className="text-5xl text-[#1ecb15]  font-medium cursor-pointer"
            onClick={goToHome}
          >
            Drive Fleet
          </div>
          <div className="flex items-center space-x-4">
            <button
              className="text-sm font-medium text-white bg-green-700 hover:bg-green-500 px-3 py-2 rounded"
              onClick={goToBecomeHost}
            >
              Become a host
            </button>
            <button
              onClick={toggleMenu}
              className="text-[#fff] hover:bg-[green] bg-[#1ECB15] p-2 rounded transition-colors duration-200"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {isMenuOpen && <div className="fixed inset-0 bg-opacity-50 z-40" />}
    </>
  );
};

export default Header;
