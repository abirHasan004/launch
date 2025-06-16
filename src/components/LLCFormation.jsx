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
  Grid
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const steps = [
  { number: 1, text: 'Select your State' },
  { number: 2, text: 'Submit your business details' },
  { number: 3, text: 'Let our experts handle the rest!' }
];

const LLCForm = () => {
  const [state, setState] = React.useState('');
  const navigate = useNavigate();
  
  const handleChange = (event) => {
    setState(event.target.value);
  };

  const usStates = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
    "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
    "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
    "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
    "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
    "New Hampshire", "New Jersey", "New Mexico", "New York",
    "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
    "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
    "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
    "West Virginia", "Wisconsin", "Wyoming"
  ];
  
  return (
    <Box sx={{ background: 'linear-gradient(#fce8d3, #fff)', minHeight: '100%', p: 4 }}>
      <Navbar />

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

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Choose your LLC State</InputLabel>
          <Select
            value={state}
            label="Choose your LLC State"
            onChange={handleChange}
          >
            {usStates.map((stateName) => (
              <MenuItem key={stateName} value={stateName}>
                {stateName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

          {/* Get Started Button */}
          <Button
            variant="contained"
            size="large"
            onClick={()=>navigate('/business-form')}
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
