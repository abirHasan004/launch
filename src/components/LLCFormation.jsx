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
  const usStatesWithPrices = [
    { name: "Alabama", label: "Alabama-Standard $1499.46" },
    { name: "Alaska", label: "Alaska-Standard $734.32" },
    { name: "Arizona", label: "Arizona-Standard $513.22" },
    { name: "Arkansas", label: "Arkansas-Standard $466.32" },
    { name: "California", label: "CA-Standard $516.23" },
    { name: "Colorado", label: "Colorado-Standard $439.52" },
    { name: "Connecticut", label: "Connecticut-Standard $598.98" },
    { name: "Delaware", label: "Delaware-Standard $709.9" },
    { name: "District of Columbia", label: "District of Columbia-Standard $547.86" },
    { name: "Florida", label: "Florida-Standard $580.22" },
    { name: "Georgia", label: "Georgia-Standard $506.52" },
    { name: "Hawaii", label: "Hawaii-Standard $466.32" },
    { name: "Idaho", label: "Idaho-Standard $533.32" },
    { name: "Illinois", label: "Illinois-Standard $493.12" },
    { name: "Indiana", label: "Indiana-Standard $533.32" },
    { name: "Iowa", label: "Iowa-Standard $466.32" },
    { name: "Kansas", label: "Kansas-Standard $586.92" },
    { name: "Kentucky", label: "Kentucky-Standard $473.02" },
    { name: "Louisiana", label: "Louisiana-Standard $565.48" },
    { name: "Maine", label: "Maine-Standard $633.82" },
    { name: "Maryland", label: "Maryland-Standard $694.12" },
    { name: "Massachusetts", label: "Massachusetts-Standard $1128.84" },
    { name: "Michigan", label: "Michigan-Standard $480.24" },
    { name: "Minnesota", label: "Minnesota-Standard $613.72" },
    { name: "Mississippi", label: "Mississippi-Standard $466.32" },
    { name: "Missouri", label: "Missouri-Standard $483" },
    { name: "Montana", label: "Montana-Standard $466.44" },
    { name: "Nebraska", label: "Nebraska-Standard $1040.52" },
    { name: "Nevada", label: "Nevada-Standard $1219.82" },
    { name: "New Hampshire", label: "New Hampshire-Standard $552" },
    { name: "New Jersey", label: "New Jersey-Standard $570.84" },
    { name: "New Mexico", label: "New Mexico-Standard $483" },
    { name: "New York", label: "New York-Standard $1250.22" },
    { name: "North Carolina", label: "North Carolina-Standard $587.88" },
    { name: "North Dakota", label: "North Dakota-Standard $597.54" },
    { name: "Ohio", label: "Ohio-Standard $547.86" },
    { name: "Oklahoma", label: "Oklahoma-Standard $563.04" },
    { name: "Oregon", label: "Oregon-Standard $549.24" },
    { name: "Pennsylvania", label: "Pennsylvania-Standard $566.82" },
    { name: "Rhode Island", label: "Rhode Island-Standard $626.52" },
    { name: "South Carolina", label: "South Carolina-Standard $612.72" },
    { name: "South Dakota", label: "South Dakota-Standard $618.24" },
    { name: "Tennessee", label: "Tennessee-Standard $808.32" },
    { name: "Texas", label: "Texas-Standard $1653.56" },
    { name: "Utah", label: "Utah-Standard $492.66" },
    { name: "Vermont", label: "Vermont-Standard $583.74" },
    { name: "Virginia", label: "Virginia-Standard $554.76" },
    { name: "Washington", label: "Washington-Standard $667.32" },
    { name: "West Virginia", label: "West Virginia-Standard $5833.74" },
    { name: "Wisconsin", label: "Wisconsin-Standard $590.64" },
    { name: "Wyoming", label: "Wyoming-Standard $554.76" },
  ];
  
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
            {usStatesWithPrices.map((stateName) => (
              <MenuItem key={stateName} value={stateName.label}>
                {stateName.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

      
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
