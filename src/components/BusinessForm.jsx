import React from 'react';
import {
  Box,
  TextField,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Typography,
  Paper,
  Divider,
  FormLabel, // Added for static labels
  InputAdornment, // Added for icons in TextFields
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

// Material UI Icons (Import the ones you need)
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import LocalPostOfficeOutlinedIcon from '@mui/icons-material/LocalPostOfficeOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';


// --- Constants for select options ---
const categories = ['Automobile', 'Technology', 'Retail', 'Finance', 'Healthcare', 'Education', 'Manufacturing', 'Other'];
const states = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
  'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
  'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
  'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
  'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];


// --- Validation Schema for Business Details Form ---
const validationSchema = Yup.object().shape({
  firstName: Yup.string().trim().required('First name is required'),
  lastName: Yup.string().trim().required('Last name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  phone: Yup.string().matches(/^[0-9]{10,15}$/, 'Phone number must be 10-15 digits').required('Phone is required'),
  companyName: Yup.string().trim().required('Company desired name is required'),
  companyAltName: Yup.string().trim(),
  category: Yup.string().required('Business category is required'),
  description: Yup.string().trim().min(10, 'Description too short (min 10 chars)').required('Company description is required'),
  address: Yup.string().trim().required('Business address is required'),
  city: Yup.string().trim().required('City is required'),
  state: Yup.string().required('State is required'),
  zipCode: Yup.string().matches(/^[0-9]{5}(?:-[0-9]{4})?$/, 'Invalid zip code').required('Zip code is required'),
  filingSpeed: Yup.string().required('Please select a filing speed'),
});

const BusinessForm = () => {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
    companyAltName: '',
    category: '',
    description: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    filingSpeed: 'standard',
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log('Business Form Data:', values);
    setTimeout(() => {
      alert('Business details submitted! (Check console for data)');
      setSubmitting(false);
    }, 1000);
  };

  // Styles for static FormLabel
  const formLabelStyles = {
    display: 'block',
    marginBottom: '8px', // Increased space between label and field
    fontWeight: 500, // Slightly bolder
    fontSize: '0.925rem', // Slightly larger
    color: '#374151', // Darker label color (Tailwind gray-700)
    lineHeight: '1.4',
    textAlign: 'left', // Ensure labels are left-aligned
  };

  // Enhanced TextField styling
  const textFieldStyles = {
    backgroundColor: '#fcfdfd', 
    borderRadius: '10px', 
    '& .MuiOutlinedInput-root': {
        borderRadius: '10px', 
        backgroundColor: '#fcfdfd', // Ensure input background is consistent
        '& fieldset': { 
            borderColor: '#d1d5db', 
            transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        },
        '&:hover fieldset': {
            borderColor: '#9ca3af', 
        },
        '&.Mui-focused fieldset': {
            borderColor: '#1d4ed8', 
            boxShadow: '0 0 0 3.5px rgba(29, 78, 216, 0.15)', 
        },
        // Style for input adornments (icons)
        '& .MuiInputAdornment-root .MuiSvgIcon-root': {
            color: '#6b7280', // Icon color (Tailwind gray-500)
            fontSize: '1.25rem', // Adjust icon size if needed
        },
    },
    // Removed MuiInputLabel-outlined as we are using FormLabel now
    '& .MuiInputBase-input::placeholder': { 
        color: '#9ca3af', 
        opacity: 1,
        fontSize: '0.95rem',
    },
    '& .MuiFormHelperText-root': { 
        fontSize: '0.8rem',
        marginLeft: '4px', 
        fontWeight: 500,
        color: '#4b5563', 
    }
  };


  return (
    <Box sx={{ 
        bgcolor: '#f3f4f6', 
        py: {xs: 3, sm:5}, 
        minHeight: '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        fontFamily: 'Inter, sans-serif'
    }}>
      <Paper 
        elevation={3} // Slightly more pronounced shadow
        sx={{ 
            maxWidth: 680, 
            width: '100%', 
            mx: 'auto', 
            p: {xs: 3, sm: 4.5}, 
            bgcolor: '#ffffff', 
            borderRadius: '16px', 
            boxShadow: '0 12px 30px -8px rgba(0, 0, 0, 0.1), 0 20px 40px -20px rgba(0, 0, 0, 0.15)', // Refined shadow
        }}
      >
        <Typography 
            variant="h4" 
            align="center" 
            gutterBottom 
            fontWeight="700" 
            sx={{ mb: 4.5, color: '#111827' }} 
        >
          Submit Your Business Details
        </Typography>
        
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
            <Form>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                
                <Box>
                    <FormLabel htmlFor="firstName" sx={formLabelStyles}>First Name *</FormLabel>
                    <TextField
                        fullWidth
                        id="firstName"
                        name="firstName"
                        placeholder="Enter your first name"
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.firstName && Boolean(errors.firstName)}
                        helperText={touched.firstName && errors.firstName ? errors.firstName : " "}
                        variant="outlined"
                        sx={textFieldStyles}
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <PersonOutlineOutlinedIcon />
                            </InputAdornment>
                            ),
                        }}
                    />
                </Box>
                <Box>
                    <FormLabel htmlFor="lastName" sx={formLabelStyles}>Last Name *</FormLabel>
                    <TextField
                        fullWidth
                        id="lastName"
                        name="lastName"
                        placeholder="Enter your last name"
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.lastName && Boolean(errors.lastName)}
                        helperText={touched.lastName && errors.lastName ? errors.lastName : " "}
                        variant="outlined"
                        sx={textFieldStyles}
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <PersonOutlineOutlinedIcon />
                            </InputAdornment>
                            ),
                        }}
                    />
                </Box>
                <Box>
                    <FormLabel htmlFor="email" sx={formLabelStyles}>Email Address *</FormLabel>
                    <TextField
                        fullWidth
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email ? errors.email : " "}
                        variant="outlined"
                        sx={textFieldStyles}
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <MailOutlineOutlinedIcon />
                            </InputAdornment>
                            ),
                        }}
                    />
                </Box>
                <Box>
                    <FormLabel htmlFor="phone" sx={formLabelStyles}>Phone Number *</FormLabel>
                    <TextField
                        fullWidth
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.phone && Boolean(errors.phone)}
                        helperText={touched.phone && errors.phone ? errors.phone : " "}
                        variant="outlined"
                        sx={textFieldStyles}
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <PhoneOutlinedIcon />
                            </InputAdornment>
                            ),
                        }}
                    />
                </Box>
                
                <Box sx={{my:1.5, mx: -1}}><Divider sx={{borderColor: '#e5e7eb'}} /></Box>

                <Box>
                    <FormLabel htmlFor="companyName" sx={formLabelStyles}>Company Desired Name *</FormLabel>
                    <TextField
                        fullWidth
                        id="companyName"
                        name="companyName"
                        placeholder="Your Company LLC"
                        value={values.companyName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.companyName && Boolean(errors.companyName)}
                        helperText={touched.companyName && errors.companyName ? errors.companyName : " "}
                        variant="outlined"
                        sx={textFieldStyles}
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <BusinessOutlinedIcon />
                            </InputAdornment>
                            ),
                        }}
                    />
                </Box>
                <Box>
                    <FormLabel htmlFor="companyAltName" sx={formLabelStyles}>Company Alternative Name (Optional)</FormLabel>
                    <TextField
                        fullWidth
                        id="companyAltName"
                        name="companyAltName"
                        placeholder="Your Company Inc."
                        value={values.companyAltName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.companyAltName && Boolean(errors.companyAltName)}
                        helperText={touched.companyAltName && errors.companyAltName ? errors.companyAltName : " "}
                        variant="outlined"
                        sx={textFieldStyles}
                         InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <BusinessOutlinedIcon sx={{opacity: 0.7}}/>
                            </InputAdornment>
                            ),
                        }}
                    />
                </Box>
                <Box>
                    <FormLabel htmlFor="category" sx={formLabelStyles}>Business Category *</FormLabel>
                    <TextField
                        fullWidth
                        select
                        id="category"
                        name="category"
                        value={values.category}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.category && Boolean(errors.category)}
                        helperText={touched.category && errors.category ? errors.category : " "}
                        variant="outlined"
                        sx={{...textFieldStyles, '& .MuiSelect-select': {paddingLeft: '40px'}}} // Adjust select padding for icon
                        InputProps={{ // This is how you add adornment to select
                            startAdornment: (
                            <InputAdornment position="start" sx={{ml:1.5, mr: -1}}>
                                <CategoryOutlinedIcon />
                            </InputAdornment>
                            ),
                        }}
                        SelectProps={{ MenuProps: { PaperProps: { sx: { maxHeight: 260, borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' } } }, displayEmpty: true }}
                    >
                        <MenuItem value="" disabled sx={{fontStyle: 'italic', color: '#6b7280'}}>Select a category...</MenuItem>
                        {categories.map((cat) => (
                        <MenuItem key={cat} value={cat} sx={{fontSize: '0.95rem', '&:hover': {backgroundColor: 'rgba(29, 78, 216, 0.04)'}}}>
                            {cat}
                        </MenuItem>
                        ))}
                    </TextField>
                </Box>
                <Box>
                    <FormLabel htmlFor="description" sx={formLabelStyles}>Company Business Description *</FormLabel>
                    <TextField
                        fullWidth
                        id="description"
                        name="description"
                        placeholder="Describe your business activities, mission, and values..."
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.description && Boolean(errors.description)}
                        helperText={touched.description && errors.description ? errors.description : " "}
                        variant="outlined"
                        multiline
                        rows={4} 
                        sx={textFieldStyles}
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start" sx={{mt: -9, mr: 0.5}}> {/* Adjust icon position for multiline */}
                                <DescriptionOutlinedIcon />
                            </InputAdornment>
                            ),
                        }}
                    />
                </Box>

                <Box sx={{my:1.5, mx: -1}}><Divider sx={{borderColor: '#e5e7eb'}} /></Box>

                <Box>
                    <FormLabel htmlFor="address" sx={formLabelStyles}>Street Address *</FormLabel>
                    <TextField
                        fullWidth
                        id="address"
                        name="address"
                        placeholder="123 Main St, Suite 100"
                        value={values.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.address && Boolean(errors.address)}
                        helperText={touched.address && errors.address ? errors.address : " "}
                        variant="outlined"
                        sx={textFieldStyles}
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <LocationOnOutlinedIcon />
                            </InputAdornment>
                            ),
                        }}
                    />
                </Box>
                <Box>
                    <FormLabel htmlFor="city" sx={formLabelStyles}>City *</FormLabel>
                    <TextField
                        fullWidth
                        id="city"
                        name="city"
                        placeholder="Anytown"
                        value={values.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.city && Boolean(errors.city)}
                        helperText={touched.city && errors.city ? errors.city : " "}
                        variant="outlined"
                        sx={textFieldStyles}
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <LocationCityOutlinedIcon />
                            </InputAdornment>
                            ),
                        }}
                    />
                </Box>
                <Box>
                    <FormLabel htmlFor="state" sx={formLabelStyles}>State *</FormLabel>
                    <TextField
                        fullWidth
                        select
                        id="state"
                        name="state"
                        value={values.state}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.state && Boolean(errors.state)}
                        helperText={touched.state && errors.state ? errors.state : " "}
                        variant="outlined"
                        sx={{...textFieldStyles, '& .MuiSelect-select': {paddingLeft: '40px'}}}
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start" sx={{ml:1.5, mr: -1}}>
                                <MapOutlinedIcon />
                            </InputAdornment>
                            ),
                        }}
                        SelectProps={{ MenuProps: { PaperProps: { sx: { maxHeight: 260, borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'} } }, displayEmpty: true }}
                    >
                        <MenuItem value="" disabled sx={{fontStyle: 'italic', color: '#6b7280'}}>Select state...</MenuItem>
                        {states.map((stateOption) => (
                        <MenuItem key={stateOption} value={stateOption} sx={{fontSize: '0.95rem', '&:hover': {backgroundColor: 'rgba(29, 78, 216, 0.04)'}}}>
                            {stateOption}
                        </MenuItem>
                        ))}
                    </TextField>
                </Box>
                <Box>
                    <FormLabel htmlFor="zipCode" sx={formLabelStyles}>Zip Code *</FormLabel>
                    <TextField
                        fullWidth
                        id="zipCode"
                        name="zipCode"
                        placeholder="e.g., 90210"
                        value={values.zipCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.zipCode && Boolean(errors.zipCode)}
                        helperText={touched.zipCode && errors.zipCode ? errors.zipCode : " "}
                        variant="outlined"
                        sx={textFieldStyles}
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <LocalPostOfficeOutlinedIcon />
                            </InputAdornment>
                            ),
                        }}
                    />
                </Box>
                
                <Box sx={{my:1.5, mx: -1}}><Divider sx={{borderColor: '#e5e7eb'}} /></Box>
                
                <Box> 
                  <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: '600', color: '#1f2937' }}> 
                    Select Filing Speed *
                  </Typography>
                  <RadioGroup
                    name="filingSpeed"
                    value={values.filingSpeed}
                    onChange={handleChange}
                    sx={{ gap: 2 }} 
                  >
                    <FormControlLabel
                      value="express"
                      control={<Radio size="medium" sx={{ '&.Mui-checked': {color: '#1d4ed8'} }} />} 
                      label="Express +$150 (15-20 days)"
                      sx={{
                        border: '1.5px solid', 
                        borderColor: values.filingSpeed === 'express' ? '#1d4ed8' : '#d1d5db',
                        borderRadius: '12px', 
                        padding: '12px 20px', 
                        width: '100%',
                        transition: 'all 0.25s ease-in-out',
                        backgroundColor: values.filingSpeed === 'express' ? 'rgba(29, 78, 216, 0.07)' : '#fcfdfd',
                        boxShadow: values.filingSpeed === 'express' ? '0 0 0 2.5px rgba(29, 78, 216, 0.25)' : 'none',
                        '&:hover': {
                           borderColor: values.filingSpeed === 'express' ? '#1d4ed8' : '#9ca3af',
                           backgroundColor: values.filingSpeed === 'express' ? 'rgba(29, 78, 216, 0.1)' : 'rgba(0,0,0,0.03)',
                        },
                         '& .MuiFormControlLabel-label': { fontSize: '0.95rem', fontWeight: 500, color: '#111827' }
                      }}
                    />
                    <FormControlLabel
                      value="standard"
                      control={<Radio size="medium" sx={{ '&.Mui-checked': {color: '#1d4ed8'} }} />}
                      label="Standard (30-60 days)"
                       sx={{
                        border: '1.5px solid',
                        borderColor: values.filingSpeed === 'standard' ? '#1d4ed8' : '#d1d5db',
                        borderRadius: '12px',
                        padding: '12px 20px',
                        width: '100%',
                        transition: 'all 0.25s ease-in-out',
                        backgroundColor: values.filingSpeed === 'standard' ? 'rgba(29, 78, 216, 0.07)' : '#fcfdfd',
                        boxShadow: values.filingSpeed === 'standard' ? '0 0 0 2.5px rgba(29, 78, 216, 0.25)' : 'none',
                        '&:hover': {
                           borderColor: values.filingSpeed === 'standard' ? '#1d4ed8' : '#9ca3af',
                           backgroundColor: values.filingSpeed === 'standard' ? 'rgba(29, 78, 216, 0.1)' : 'rgba(0,0,0,0.03)',
                        },
                        '& .MuiFormControlLabel-label': { fontSize: '0.95rem', fontWeight: 500, color: '#111827' }
                      }}
                    />
                  </RadioGroup>
                  {touched.filingSpeed && errors.filingSpeed && (
                     <Typography color="error" variant="caption" sx={{ display: 'block', mt: 1, ml: '2px', fontWeight: 500 }}>{errors.filingSpeed}</Typography>
                  )}
                </Box>

                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    size="large" 
                    sx={{
                        bgcolor: '#1d4ed8', 
                        color: 'white',
                        textTransform: 'none', 
                        fontWeight: '600',
                        padding: '12px 36px', 
                        borderRadius: '10px', 
                        fontSize: '1rem',
                        minWidth: '240px', 
                        boxShadow: '0 4px 10px -2px rgba(29, 78, 216, 0.3), 0 2px 4px -2px rgba(29, 78, 216, 0.2)',
                        transition: 'all 0.25s ease-in-out',
                        '&:hover': { 
                            bgcolor: '#1e40af', 
                            boxShadow: '0 6px 14px -3px rgba(29, 78, 216, 0.35), 0 3px 6px -3px rgba(29, 78, 216, 0.25)',
                            transform: 'translateY(-1px)',
                        },
                         '&:active': {
                            bgcolor: '#1e3a8a',
                            transform: 'translateY(0px)',
                        }
                    }}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </Button>
                </Box>

              </Box> 
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default BusinessForm;
