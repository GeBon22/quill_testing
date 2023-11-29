import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import { Tooltip } from "@mui/material";

const ScrollButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsVisible(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Tooltip title="up" arrow>
      <IconButton
        onClick={scrollToTop}
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          visibility: isVisible ? "visible" : "hidden",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s ease-in-out",
          borderRadius: "0.5rem",
          padding: "0.5rem",
          backgroundColor: "#9fc043",
          color: "white",
          boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
        }}
        className={`${
          isVisible ? "animate-fade-in" : "animate-fade-out"
        } transition-opacity`}
      >
        <KeyboardArrowUpRoundedIcon />
      </IconButton>
    </Tooltip>
  );
};

export default ScrollButton;
