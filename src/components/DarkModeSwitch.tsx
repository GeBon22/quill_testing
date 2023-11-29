import React, { useState, useEffect } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const DarkModeSwitch: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    localStorage.getItem('darkMode') === 'true'
  );

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);

    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevDarkMode) => !prevDarkMode);
  };

  return (
    <Tooltip title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'} arrow>
      <IconButton
        onClick={toggleDarkMode}
        style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          zIndex: 9999,
        }}
      >
        {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Tooltip>
  );
};

export default DarkModeSwitch;
