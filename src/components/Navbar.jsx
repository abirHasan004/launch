import React from 'react';
import {
  Box,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import { FiMenu } from 'react-icons/fi';
import mainLogo from '../../public/mainlogo-3-2.png';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuItems = ['Home', 'Services', 'Pricing', 'Contact'];

  return (
    <Box display="flex" justifyContent="space-between"  alignItems="center" >
      <Box display="flex" alignItems="center" gap={1}>
        <img src={mainLogo} alt="Company Logo" />
      </Box>

      <IconButton onClick={handleMenuClick}>
        <FiMenu size={24} />
      </IconButton>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {menuItems.map((item, index) => (
          <MenuItem key={index} onClick={handleMenuClose}>
            {item}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default Navbar; 