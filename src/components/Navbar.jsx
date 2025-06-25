import React from 'react';
import {
  Box,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import { FiMenu } from 'react-icons/fi';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

 
  const menuItems = [
    { label: 'Home', url: '/' },
    { label: 'Services', url: '/services' },
    { label: 'Pricing', url: '/pricing' },
    { label: 'Contact', url: '/contact' }
  ];
 
  const handleMenuItemClick = (url) => {
    window.location.href = url;
    handleMenuClose();
  };

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" >
      <Box display="flex" alignItems="center" gap={1}>
        <img onClick={()=>window.location.href='/'} src="/mainlogo-3-2.png" alt="Company Logo" style={{ height: 48, width: 'auto', cursor: 'pointer' }} />
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
          <MenuItem
            key={index}
            onClick={() => handleMenuItemClick(item.url)}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default Navbar; 