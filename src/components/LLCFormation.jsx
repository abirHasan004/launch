import React from 'react';
import {
  Box,
  Typography,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Paper,
  Grid,
  IconButton,
  Menu
} from '@mui/material';
import { FaRocket } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';

const steps = [
  { number: 1, text: 'Select your State' },
  { number: 2, text: 'Submit your business details' },
  { number: 3, text: 'Let our experts handle the rest!' }
];

const LLCForm = () => {
  const [state, setState] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setState(event.target.value);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuItems = ['Home', 'Services', 'Pricing', 'Contact'];

  return (
    <Box sx={{ background: 'linear-gradient(#fce8d3, #fff)', minHeight: '100%', p: 4 }}>
      {/* Top Bar */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center" gap={1}>
          <FaRocket color="red" size={28} />
          <Typography variant="h5" fontWeight="bold">
            LAUNCH
          </Typography>
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

      {/* Main Content */}
      <Grid container spacing={4} mt={4} alignItems="center" justifyContent="center">
        {/* Left Image */}
        <Grid item xs={12} md={5}>
          <img
            src="https://www.tailorbrands.com/wp-content/uploads/2021/12/Header-Types-of-LLCs.jpeg"
            alt="People"
            style={{ width: '100%', borderRadius: 10 }}
          />
        </Grid>

        {/* Right Form */}
        <Grid item xs={12} md={5}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            LLC Formation Made Simple!
          </Typography>

          {steps.map((step) => (
            <Paper key={step.number} elevation={2} sx={{ display: 'flex', alignItems: 'center', p: 2, mb: 2 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  backgroundColor: '#000',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2,
                  fontWeight: 'bold'
                }}
              >
                {step.number}
              </Box>
              <Typography>{step.text}</Typography>
            </Paper>
          ))}

          {/* Dropdown */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Choose your LLC State</InputLabel>
            <Select value={state} label="Choose your LLC State" onChange={handleChange}>
              <MenuItem value="California">California</MenuItem>
              <MenuItem value="Texas">Texas</MenuItem>
              <MenuItem value="New York">New York</MenuItem>
              {/* Add more states if needed */}
            </Select>
          </FormControl>

          {/* Get Started Button */}
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: 'red',
              color: '#fff',
              borderRadius: '30px',
              px: 4,
              '&:hover': { backgroundColor: '#cc0000' }
            }}
          >
            Get Started
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LLCForm;
