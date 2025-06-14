// import React from 'react';
// import {
//   Box,
//   TextField,
//   MenuItem,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
//   Button,
//   Typography,
//   Paper,
//   Divider,
//   FormLabel, // Added for static labels
//   InputAdornment, // Added for icons in TextFields
// } from '@mui/material';
// import { Formik, Form } from 'formik';
// import * as Yup from 'yup';
// import { loadStripe } from '@stripe/stripe-js';

// // Material UI Icons (Import the ones you need)
// import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
// import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
// import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
// import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
// import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
// import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
// import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
// import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
// import LocalPostOfficeOutlinedIcon from '@mui/icons-material/LocalPostOfficeOutlined';
// import MapOutlinedIcon from '@mui/icons-material/MapOutlined';


// // --- Constants for select options ---
// const categories = ['Automobile', 'Technology', 'Retail', 'Finance', 'Healthcare', 'Education', 'Manufacturing', 'Other'];
// const states = [
//   'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
//   'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
//   'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
//   'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
//   'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
// ];


// // --- Validation Schema for Business Details Form ---
// const validationSchema = Yup.object().shape({
//   firstName: Yup.string().trim().required('First name is required'),
//   lastName: Yup.string().trim().required('Last name is required'),
//   email: Yup.string().email('Invalid email format').required('Email is required'),
//   phone: Yup.string().matches(/^[0-9]{10,15}$/, 'Phone number must be 10-15 digits').required('Phone is required'),
//   companyName: Yup.string().trim().required('Company desired name is required'),
//   companyAltName: Yup.string().trim(),
//   category: Yup.string().required('Business category is required'),
//   description: Yup.string().trim().min(10, 'Description too short (min 10 chars)').required('Company description is required'),
//   address: Yup.string().trim().required('Business address is required'),
//   city: Yup.string().trim().required('City is required'),
//   state: Yup.string().required('State is required'),
//   zipCode: Yup.string().matches(/^[0-9]{5}(?:-[0-9]{4})?$/, 'Invalid zip code').required('Zip code is required'),
//   filingSpeed: Yup.string().required('Please select a filing speed'),
// });

// const BusinessForm = () => {
//   const initialValues = {
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     companyName: '',
//     companyAltName: '',
//     category: '',
//     description: '',
//     address: '',
//     city: '',
//     state: '',
//     zipCode: '',
//     filingSpeed: 'standard',
//   };

 
//   const stripePromise = loadStripe('pk_test_51OSP8aDveVeGQ2eWXx6zkeKcL3tXCaUn6qjpUA04ZUQ8uKHkm0JdXcRvRcv0haXiOsp19mNJBBXviwJjJzTuCzcp00Mv1xtSm8');
  
//   const handleSubmit = async (values, { setSubmitting, setErrors }) => {
//     console.log('Submitting Form Data:', values);
//     setSubmitting(true);

//     try {
      
//       const response = await fetch('https://lauchbackend-31561078355.europe-west1.run.app/api/create-checkout-session', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(values),  
//       });

//       if (!response.ok) {
//         throw new Error('Server responded with an error.');
//       }

//       const session = await response.json();

   
//       const stripe = await stripePromise;
//       const result = await stripe.redirectToCheckout({
//         sessionId: session.id,
//       });

//       if (result.error) {
   
         
//         console.error(result.error.message);
//         setErrors({ submit: result.error.message });
//       }
//     } catch (error) {
//       console.error('Error during submission:', error);
//       // Display a generic error on the form
//       setErrors({ submit: 'Submission failed. Please try again.' });
//       setSubmitting(false); // Allow user to try again if submission fails before redirect
//     }
//     // No need to setSubmitting(false) on success, as the user is navigating away.
//   };
  

//   // Styles for static FormLabel
//   const formLabelStyles = {
//     display: 'block',
//     marginBottom: '8px', // Increased space between label and field
//     fontWeight: 500, // Slightly bolder
//     fontSize: '0.925rem', // Slightly larger
//     color: '#374151', // Darker label color (Tailwind gray-700)
//     lineHeight: '1.4',
//     textAlign: 'left', // Ensure labels are left-aligned
//   };

//   // Enhanced TextField styling
//   const textFieldStyles = {
//     backgroundColor: '#fcfdfd', 
//     borderRadius: '10px', 
//     '& .MuiOutlinedInput-root': {
//         borderRadius: '10px', 
//         backgroundColor: '#fcfdfd', // Ensure input background is consistent
//         '& fieldset': { 
//             borderColor: '#d1d5db', 
//             transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
//         },
//         '&:hover fieldset': {
//             borderColor: '#9ca3af', 
//         },
//         '&.Mui-focused fieldset': {
//             borderColor: '#1d4ed8', 
//             boxShadow: '0 0 0 3.5px rgba(29, 78, 216, 0.15)', 
//         },
//         // Style for input adornments (icons)
//         '& .MuiInputAdornment-root .MuiSvgIcon-root': {
//             color: '#6b7280', // Icon color (Tailwind gray-500)
//             fontSize: '1.25rem', // Adjust icon size if needed
//         },
//     },
//     // Removed MuiInputLabel-outlined as we are using FormLabel now
//     '& .MuiInputBase-input::placeholder': { 
//         color: '#9ca3af', 
//         opacity: 1,
//         fontSize: '0.95rem',
//     },
//     '& .MuiFormHelperText-root': { 
//         fontSize: '0.8rem',
//         marginLeft: '4px', 
//         fontWeight: 500,
//         color: '#4b5563', 
//     }
//   };


//   return (
//     <Box sx={{ 
//         bgcolor: '#f3f4f6', 
//         py: {xs: 3, sm:5}, 
//         minHeight: '100vh', 
//         display: 'flex', 
//         justifyContent: 'center', 
//         alignItems: 'center', 
//         fontFamily: 'Inter, sans-serif'
//     }}>
//       <Paper 
//         elevation={3} // Slightly more pronounced shadow
//         sx={{ 
//             maxWidth: 680, 
//             width: '100%', 
//             mx: 'auto', 
//             p: {xs: 3, sm: 4.5}, 
//             bgcolor: '#ffffff', 
//             borderRadius: '16px', 
//             boxShadow: '0 12px 30px -8px rgba(0, 0, 0, 0.1), 0 20px 40px -20px rgba(0, 0, 0, 0.15)', // Refined shadow
//         }}
//       >
//         <Typography 
//             variant="h4" 
//             align="center" 
//             gutterBottom 
//             fontWeight="700" 
//             sx={{ mb: 4.5, color: '#111827' }} 
//         >
//           Submit Your Business Details
//         </Typography>
        
//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//         >
//           {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
//             <Form>
//               <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                
//                 <Box>
//                     <FormLabel htmlFor="firstName" sx={formLabelStyles}>First Name *</FormLabel>
//                     <TextField
//                         fullWidth
//                         id="firstName"
//                         name="firstName"
//                         placeholder="Enter your first name"
//                         value={values.firstName}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         error={touched.firstName && Boolean(errors.firstName)}
//                         helperText={touched.firstName && errors.firstName ? errors.firstName : " "}
//                         variant="outlined"
//                         sx={textFieldStyles}
//                         InputProps={{
//                             startAdornment: (
//                             <InputAdornment position="start">
//                                 <PersonOutlineOutlinedIcon />
//                             </InputAdornment>
//                             ),
//                         }}
//                     />
//                 </Box>
//                 <Box>
//                     <FormLabel htmlFor="lastName" sx={formLabelStyles}>Last Name *</FormLabel>
//                     <TextField
//                         fullWidth
//                         id="lastName"
//                         name="lastName"
//                         placeholder="Enter your last name"
//                         value={values.lastName}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         error={touched.lastName && Boolean(errors.lastName)}
//                         helperText={touched.lastName && errors.lastName ? errors.lastName : " "}
//                         variant="outlined"
//                         sx={textFieldStyles}
//                         InputProps={{
//                             startAdornment: (
//                             <InputAdornment position="start">
//                                 <PersonOutlineOutlinedIcon />
//                             </InputAdornment>
//                             ),
//                         }}
//                     />
//                 </Box>
//                 <Box>
//                     <FormLabel htmlFor="email" sx={formLabelStyles}>Email Address *</FormLabel>
//                     <TextField
//                         fullWidth
//                         id="email"
//                         name="email"
//                         type="email"
//                         placeholder="you@example.com"
//                         value={values.email}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         error={touched.email && Boolean(errors.email)}
//                         helperText={touched.email && errors.email ? errors.email : " "}
//                         variant="outlined"
//                         sx={textFieldStyles}
//                         InputProps={{
//                             startAdornment: (
//                             <InputAdornment position="start">
//                                 <MailOutlineOutlinedIcon />
//                             </InputAdornment>
//                             ),
//                         }}
//                     />
//                 </Box>
//                 <Box>
//                     <FormLabel htmlFor="phone" sx={formLabelStyles}>Phone Number *</FormLabel>
//                     <TextField
//                         fullWidth
//                         id="phone"
//                         name="phone"
//                         type="tel"
//                         placeholder="(555) 123-4567"
//                         value={values.phone}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         error={touched.phone && Boolean(errors.phone)}
//                         helperText={touched.phone && errors.phone ? errors.phone : " "}
//                         variant="outlined"
//                         sx={textFieldStyles}
//                         InputProps={{
//                             startAdornment: (
//                             <InputAdornment position="start">
//                                 <PhoneOutlinedIcon />
//                             </InputAdornment>
//                             ),
//                         }}
//                     />
//                 </Box>
                
//                 <Box sx={{my:1.5, mx: -1}}><Divider sx={{borderColor: '#e5e7eb'}} /></Box>

//                 <Box>
//                     <FormLabel htmlFor="companyName" sx={formLabelStyles}>Company Desired Name *</FormLabel>
//                     <TextField
//                         fullWidth
//                         id="companyName"
//                         name="companyName"
//                         placeholder="Your Company LLC"
//                         value={values.companyName}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         error={touched.companyName && Boolean(errors.companyName)}
//                         helperText={touched.companyName && errors.companyName ? errors.companyName : " "}
//                         variant="outlined"
//                         sx={textFieldStyles}
//                         InputProps={{
//                             startAdornment: (
//                             <InputAdornment position="start">
//                                 <BusinessOutlinedIcon />
//                             </InputAdornment>
//                             ),
//                         }}
//                     />
//                 </Box>
//                 <Box>
//                     <FormLabel htmlFor="companyAltName" sx={formLabelStyles}>Company Alternative Name (Optional)</FormLabel>
//                     <TextField
//                         fullWidth
//                         id="companyAltName"
//                         name="companyAltName"
//                         placeholder="Your Company Inc."
//                         value={values.companyAltName}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         error={touched.companyAltName && Boolean(errors.companyAltName)}
//                         helperText={touched.companyAltName && errors.companyAltName ? errors.companyAltName : " "}
//                         variant="outlined"
//                         sx={textFieldStyles}
//                          InputProps={{
//                             startAdornment: (
//                             <InputAdornment position="start">
//                                 <BusinessOutlinedIcon sx={{opacity: 0.7}}/>
//                             </InputAdornment>
//                             ),
//                         }}
//                     />
//                 </Box>
//                 <Box>
//                     <FormLabel htmlFor="category" sx={formLabelStyles}>Business Category *</FormLabel>
//                     <TextField
//                         fullWidth
//                         select
//                         id="category"
//                         name="category"
//                         value={values.category}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         error={touched.category && Boolean(errors.category)}
//                         helperText={touched.category && errors.category ? errors.category : " "}
//                         variant="outlined"
//                         sx={{...textFieldStyles, '& .MuiSelect-select': {paddingLeft: '40px'}}} // Adjust select padding for icon
//                         InputProps={{ // This is how you add adornment to select
//                             startAdornment: (
//                             <InputAdornment position="start" sx={{ml:1.5, mr: -1}}>
//                                 <CategoryOutlinedIcon />
//                             </InputAdornment>
//                             ),
//                         }}
//                         SelectProps={{ MenuProps: { PaperProps: { sx: { maxHeight: 260, borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' } } }, displayEmpty: true }}
//                     >
//                         <MenuItem value="" disabled sx={{fontStyle: 'italic', color: '#6b7280'}}>Select a category...</MenuItem>
//                         {categories.map((cat) => (
//                         <MenuItem key={cat} value={cat} sx={{fontSize: '0.95rem', '&:hover': {backgroundColor: 'rgba(29, 78, 216, 0.04)'}}}>
//                             {cat}
//                         </MenuItem>
//                         ))}
//                     </TextField>
//                 </Box>
//                 <Box>
//                     <FormLabel htmlFor="description" sx={formLabelStyles}>Company Business Description *</FormLabel>
//                     <TextField
//                         fullWidth
//                         id="description"
//                         name="description"
//                         placeholder="Describe your business activities, mission, and values..."
//                         value={values.description}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         error={touched.description && Boolean(errors.description)}
//                         helperText={touched.description && errors.description ? errors.description : " "}
//                         variant="outlined"
//                         multiline
//                         rows={4} 
//                         sx={textFieldStyles}
//                         InputProps={{
//                             startAdornment: (
//                             <InputAdornment position="start" sx={{mt: -9, mr: 0.5}}> {/* Adjust icon position for multiline */}
//                                 <DescriptionOutlinedIcon />
//                             </InputAdornment>
//                             ),
//                         }}
//                     />
//                 </Box>

//                 <Box sx={{my:1.5, mx: -1}}><Divider sx={{borderColor: '#e5e7eb'}} /></Box>

//                 <Box>
//                     <FormLabel htmlFor="address" sx={formLabelStyles}>Street Address *</FormLabel>
//                     <TextField
//                         fullWidth
//                         id="address"
//                         name="address"
//                         placeholder="123 Main St, Suite 100"
//                         value={values.address}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         error={touched.address && Boolean(errors.address)}
//                         helperText={touched.address && errors.address ? errors.address : " "}
//                         variant="outlined"
//                         sx={textFieldStyles}
//                         InputProps={{
//                             startAdornment: (
//                             <InputAdornment position="start">
//                                 <LocationOnOutlinedIcon />
//                             </InputAdornment>
//                             ),
//                         }}
//                     />
//                 </Box>
//                 <Box>
//                     <FormLabel htmlFor="city" sx={formLabelStyles}>City *</FormLabel>
//                     <TextField
//                         fullWidth
//                         id="city"
//                         name="city"
//                         placeholder="Anytown"
//                         value={values.city}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         error={touched.city && Boolean(errors.city)}
//                         helperText={touched.city && errors.city ? errors.city : " "}
//                         variant="outlined"
//                         sx={textFieldStyles}
//                         InputProps={{
//                             startAdornment: (
//                             <InputAdornment position="start">
//                                 <LocationCityOutlinedIcon />
//                             </InputAdornment>
//                             ),
//                         }}
//                     />
//                 </Box>
//                 <Box>
//                     <FormLabel htmlFor="state" sx={formLabelStyles}>State *</FormLabel>
//                     <TextField
//                         fullWidth
//                         select
//                         id="state"
//                         name="state"
//                         value={values.state}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         error={touched.state && Boolean(errors.state)}
//                         helperText={touched.state && errors.state ? errors.state : " "}
//                         variant="outlined"
//                         sx={{...textFieldStyles, '& .MuiSelect-select': {paddingLeft: '40px'}}}
//                         InputProps={{
//                             startAdornment: (
//                             <InputAdornment position="start" sx={{ml:1.5, mr: -1}}>
//                                 <MapOutlinedIcon />
//                             </InputAdornment>
//                             ),
//                         }}
//                         SelectProps={{ MenuProps: { PaperProps: { sx: { maxHeight: 260, borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'} } }, displayEmpty: true }}
//                     >
//                         <MenuItem value="" disabled sx={{fontStyle: 'italic', color: '#6b7280'}}>Select state...</MenuItem>
//                         {states.map((stateOption) => (
//                         <MenuItem key={stateOption} value={stateOption} sx={{fontSize: '0.95rem', '&:hover': {backgroundColor: 'rgba(29, 78, 216, 0.04)'}}}>
//                             {stateOption}
//                         </MenuItem>
//                         ))}
//                     </TextField>
//                 </Box>
//                 <Box>
//                     <FormLabel htmlFor="zipCode" sx={formLabelStyles}>Zip Code *</FormLabel>
//                     <TextField
//                         fullWidth
//                         id="zipCode"
//                         name="zipCode"
//                         placeholder="e.g., 90210"
//                         value={values.zipCode}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         error={touched.zipCode && Boolean(errors.zipCode)}
//                         helperText={touched.zipCode && errors.zipCode ? errors.zipCode : " "}
//                         variant="outlined"
//                         sx={textFieldStyles}
//                         InputProps={{
//                             startAdornment: (
//                             <InputAdornment position="start">
//                                 <LocalPostOfficeOutlinedIcon />
//                             </InputAdornment>
//                             ),
//                         }}
//                     />
//                 </Box>
                
//                 <Box sx={{my:1.5, mx: -1}}><Divider sx={{borderColor: '#e5e7eb'}} /></Box>
                
//                 <Box> 
//                   <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: '600', color: '#1f2937' }}> 
//                     Select Filing Speed *
//                   </Typography>
//                   <RadioGroup
//                     name="filingSpeed"
//                     value={values.filingSpeed}
//                     onChange={handleChange}
//                     sx={{ gap: 2 }} 
//                   >
//                     <FormControlLabel
//                       value="express"
//                       control={<Radio size="medium" sx={{ '&.Mui-checked': {color: '#1d4ed8'} }} />} 
//                       label="Express +$150 (15-20 days)"
//                       sx={{
//                         border: '1.5px solid', 
//                         borderColor: values.filingSpeed === 'express' ? '#1d4ed8' : '#d1d5db',
//                         borderRadius: '12px', 
//                         padding: '12px 20px', 
//                         width: '100%',
//                         transition: 'all 0.25s ease-in-out',
//                         backgroundColor: values.filingSpeed === 'express' ? 'rgba(29, 78, 216, 0.07)' : '#fcfdfd',
//                         boxShadow: values.filingSpeed === 'express' ? '0 0 0 2.5px rgba(29, 78, 216, 0.25)' : 'none',
//                         '&:hover': {
//                            borderColor: values.filingSpeed === 'express' ? '#1d4ed8' : '#9ca3af',
//                            backgroundColor: values.filingSpeed === 'express' ? 'rgba(29, 78, 216, 0.1)' : 'rgba(0,0,0,0.03)',
//                         },
//                          '& .MuiFormControlLabel-label': { fontSize: '0.95rem', fontWeight: 500, color: '#111827' }
//                       }}
//                     />
//                     <FormControlLabel
//                       value="standard"
//                       control={<Radio size="medium" sx={{ '&.Mui-checked': {color: '#1d4ed8'} }} />}
//                       label="Standard (30-60 days)"
//                        sx={{
//                         border: '1.5px solid',
//                         borderColor: values.filingSpeed === 'standard' ? '#1d4ed8' : '#d1d5db',
//                         borderRadius: '12px',
//                         padding: '12px 20px',
//                         width: '100%',
//                         transition: 'all 0.25s ease-in-out',
//                         backgroundColor: values.filingSpeed === 'standard' ? 'rgba(29, 78, 216, 0.07)' : '#fcfdfd',
//                         boxShadow: values.filingSpeed === 'standard' ? '0 0 0 2.5px rgba(29, 78, 216, 0.25)' : 'none',
//                         '&:hover': {
//                            borderColor: values.filingSpeed === 'standard' ? '#1d4ed8' : '#9ca3af',
//                            backgroundColor: values.filingSpeed === 'standard' ? 'rgba(29, 78, 216, 0.1)' : 'rgba(0,0,0,0.03)',
//                         },
//                         '& .MuiFormControlLabel-label': { fontSize: '0.95rem', fontWeight: 500, color: '#111827' }
//                       }}
//                     />
//                   </RadioGroup>
//                   {touched.filingSpeed && errors.filingSpeed && (
//                      <Typography color="error" variant="caption" sx={{ display: 'block', mt: 1, ml: '2px', fontWeight: 500 }}>{errors.filingSpeed}</Typography>
//                   )}
//                 </Box>

//                 <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
//                   <Button
//                     type="submit"
//                     variant="contained"
//                     disabled={isSubmitting}
//                     size="large" 
//                     sx={{
//                         bgcolor: '#1d4ed8', 
//                         color: 'white',
//                         textTransform: 'none', 
//                         fontWeight: '600',
//                         padding: '12px 36px', 
//                         borderRadius: '10px', 
//                         fontSize: '1rem',
//                         minWidth: '240px', 
//                         boxShadow: '0 4px 10px -2px rgba(29, 78, 216, 0.3), 0 2px 4px -2px rgba(29, 78, 216, 0.2)',
//                         transition: 'all 0.25s ease-in-out',
//                         '&:hover': { 
//                             bgcolor: '#1e40af', 
//                             boxShadow: '0 6px 14px -3px rgba(29, 78, 216, 0.35), 0 3px 6px -3px rgba(29, 78, 216, 0.25)',
//                             transform: 'translateY(-1px)',
//                         },
//                          '&:active': {
//                             bgcolor: '#1e3a8a',
//                             transform: 'translateY(0px)',
//                         }
//                     }}
//                   >
//                     {isSubmitting ? 'Submitting...' : 'Submit Application'}
//                   </Button>
//                 </Box>

//               </Box> 
//             </Form>
//           )}
//         </Formik>
//       </Paper>
//     </Box>
//   );
// };

// export default BusinessForm;
import React, { useState } from 'react';
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
    FormLabel,
    InputAdornment,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    CircularProgress,
    Card,
    CardContent,
    FormControl,
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { loadStripe } from 'https://esm.sh/@stripe/stripe-js';
import axios from 'axios'
// Material UI Icons
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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// --- Constants and Mappings ---

const categories = ['Automobile', 'Technology', 'Retail', 'Finance', 'Healthcare', 'Education', 'Manufacturing', 'Other'];
const states = {
    'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR', 'California': 'CA', 'Colorado': 'CO', 'Connecticut': 'CT',
    'Delaware': 'DE', 'Florida': 'FL', 'Georgia': 'GA', 'Hawaii': 'HI', 'Idaho': 'ID', 'Illinois': 'IL', 'Indiana': 'IN',
    'Iowa': 'IA', 'Kansas': 'KS', 'Kentucky': 'KY', 'Louisiana': 'LA', 'Maine': 'ME', 'Maryland': 'MD', 'Massachusetts': 'MA',
    'Michigan': 'MI', 'Minnesota': 'MN', 'Mississippi': 'MS', 'Missouri': 'MO', 'Montana': 'MT', 'Nebraska': 'NE', 'Nevada': 'NV',
    'New Hampshire': 'NH', 'New Jersey': 'NJ', 'New Mexico': 'NM', 'New York': 'NY', 'North Carolina': 'NC', 'North Dakota': 'ND',
    'Ohio': 'OH', 'Oklahoma': 'OK', 'Oregon': 'OR', 'Pennsylvania': 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC',
    'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT', 'Vermont': 'VT', 'Virginia': 'VA', 'Washington': 'WA',
    'West Virginia': 'WV', 'Wisconsin': 'WI', 'Wyoming': 'WY'
};

const stateOptions = Object.keys(states);

// --- Validation Schema ---
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

// --- Package Selection Modal Component ---
const PackageModal = ({ open, onClose, packages, onContinue, apiError }) => {
    const [selectedPackageId, setSelectedPackageId] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Effect to set the default selected package
    React.useEffect(() => {
        if (packages) {
            const defaultPackage = packages.find(p => p.isDefaultPackage);
            if (defaultPackage) {
                setSelectedPackageId(defaultPackage.id);
            }
        }
    }, [packages]);

    const handleContinue = async () => {
        setIsSubmitting(true);
        const selectedPackage = packages.find(p => p.id === selectedPackageId);
        await onContinue(selectedPackage);
        // isSubmitting will remain true as the user is redirected
    };

    const renderDescription = (htmlString) => {
        // Use dangerouslySetInnerHTML to render HTML content from the API
        return { __html: htmlString };
    };

    return (
        <Dialog open={open} onClose={!isSubmitting ? onClose : () => {}} fullWidth maxWidth="md">
            <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.75rem', pb: 1 }}>
                Select Your Package
            </DialogTitle>
            <DialogContent>
                {apiError && (
                    <Typography color="error" align="center" sx={{ my: 3 }}>
                        {`An error occurred: ${apiError}. Please try again.`}
                    </Typography>
                )}
                {!apiError && packages && (
                    <FormControl component="fieldset" fullWidth>
                        <RadioGroup
                            aria-label="package-selection"
                            name="package-selection"
                            value={selectedPackageId}
                            onChange={(e) => setSelectedPackageId(e.target.value)}
                            sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, mt: 2 }}
                        >
                            {packages.map((pkg) => (
                                <Card
                                    key={pkg.id}
                                    variant="outlined"
                                    sx={{
                                        flex: 1,
                                        cursor: 'pointer',
                                        borderRadius: '12px',
                                        border: selectedPackageId === pkg.id ? '2px solid' : '1px solid',
                                        borderColor: selectedPackageId === pkg.id ? 'primary.main' : 'grey.300',
                                        boxShadow: selectedPackageId === pkg.id ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
                                        transition: 'all 0.2s ease-in-out',
                                        '&:hover': {
                                            borderColor: 'primary.light',
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                                        }
                                    }}
                                    onClick={() => setSelectedPackageId(pkg.id)}
                                >
                                    <CardContent sx={{ p: 3, textAlign: 'center' }}>
                                        <FormControlLabel
                                            value={pkg.id}
                                            control={<Radio sx={{ mb: 1 }} />}
                                            label={
                                                <Typography variant="h5" component="div" fontWeight="bold">
                                                    {pkg.name}
                                                </Typography>
                                            }
                                            sx={{ justifyContent: 'center', width: '100%', ml: 0 }}
                                        />
                                        <Typography variant="h4" color="primary.main" sx={{ my: 1, fontWeight: '700' }}>
                                            {pkg.totalPrice}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {`Package: ${pkg.price} + State Fee: ${pkg.stateFees}`}
                                        </Typography>
                                        <Box sx={{ my: 2, textAlign: 'left', px: 1 }}>
                                            {pkg.featureGroups.find(fg => fg.groupName === 'What You Get!')?.groupFeatures
                                                .filter(feat => feat.includeCategory === 1)
                                                .map(feature => (
                                                    <Box key={feature.featureId} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                        <CheckCircleIcon color="success" sx={{ fontSize: '1.1rem', mr: 1 }} />
                                                        <Typography variant="body2" dangerouslySetInnerHTML={renderDescription(feature.name)} />
                                                    </Box>
                                                ))}
                                        </Box>
                                    </CardContent>
                                </Card>
                            ))}
                        </RadioGroup>
                    </FormControl>
                )}
            </DialogContent>
            <DialogActions sx={{ p: 3, justifyContent: 'center', gap: 2 }}>
                <Button onClick={onClose} color="secondary" disabled={isSubmitting} sx={{ textTransform: 'none', fontSize: '1rem' }}>
                    Cancel
                </Button>
                <Button
                    onClick={handleContinue}
                    variant="contained"
                    color="primary"
                    disabled={!selectedPackageId || isSubmitting}
                    sx={{ textTransform: 'none', fontSize: '1rem', px: 4 }}
                >
                    {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Continue to Payment'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

// --- Main Business Form Component ---
const BusinessForm = () => {
    // State management
    const [isModalOpen, setModalOpen] = useState(false);
    const [packagesData, setPackagesData] = useState(null);
    const [formValues, setFormValues] = useState(null);
    const [packageApiError, setPackageApiError] = useState(null);
    const [isFetchingPackages, setIsFetchingPackages] = useState(false);

    const initialValues = {
        firstName: '', lastName: '', email: '', phone: '',
        companyName: '', companyAltName: '', category: '', description: '',
        address: '', city: '', state: '', zipCode: '',
        filingSpeed: 'standard',
    };

    const stripePromise = loadStripe('pk_test_51OSP8aDveVeGQ2eWXx6zkeKcL3tXCaUn6qjpUA04ZUQ8uKHkm0JdXcRvRcv0haXiOsp19mNJBBXviwJjJzTuCzcp00Mv1xtSm8');

    // Step 1: Handle form submission to fetch packages
    const handleFormSubmit = async (values, { setErrors }) => {
        setIsFetchingPackages(true);
        setPackageApiError(null);
        setFormValues(values);  

        const stateAbbr = states[values.state];
        const filingSpeed = values?.filingSpeed;
       console.log(stateAbbr,filingSpeed,'filingSpeed')
        try {
          const response = await axios(`https://staging22api.corpnet.com/api/business-formation/package?entityType=llc&state=${stateAbbr}&filing=${filingSpeed}`, {
            headers: {
              Authorization: `Bearer B3FD30BB85103E34BB5369D4A5E8DD3D85A196C1303B8044F7196AFE6FAA41F75BF06996652A657AA7C1EF4481D1B9F360A6`
            }
          });
          
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `API request failed with status ${response.status}`);
            }
            const data = await response.json();
            if (data.statusCode === 200 && data.data && data.data.packages) {
                setPackagesData(data.data.packages);
                setModalOpen(true);
            } else {
                throw new Error("Invalid data structure received from API.");
            }
        } catch (error) {
            console.error('Error fetching packages:', error);
            setPackageApiError(error.message);
            // Optionally open the modal to show the error
            setModalOpen(true);
        } finally {
            setIsFetchingPackages(false);
        }
    };

    // Step 2: Handle continuation to payment after package selection
    const handleContinueToPayment = async (selectedPackage) => {
        if (!formValues || !selectedPackage) {
            console.error("Missing form values or selected package.");
            return;
        }

        const payload = {
            ...formValues,
            selectedPackage: {
                id: selectedPackage.id,
                name: selectedPackage.name,
                price: selectedPackage.price,
                totalPrice: selectedPackage.totalPrice,
            }
        };

        console.log('Final Payload to Create Checkout Session:', payload);

        try {
            // This is where you call your backend to create a Stripe session
            const response = await fetch('https://lauchbackend-31561078355.europe-west1.run.app/api/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error('Server responded with an error.');

            const session = await response.json();
            const stripe = await stripePromise;
            const result = await stripe.redirectToCheckout({ sessionId: session.id });

            if (result.error) {
                console.error(result.error.message);
                // Handle Stripe redirection error if needed, maybe show on the modal
                setPackageApiError(`Payment Error: ${result.error.message}`);
            }
        } catch (error) {
            console.error('Error during payment submission:', error);
            setPackageApiError(`Submission failed. Please try again. ${error.message}`);
        }
        // No need to set submitting to false as we expect a redirect
    };

    // Styles
    const formLabelStyles = {
        display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.925rem',
        color: '#374151', lineHeight: '1.4', textAlign: 'left',
    };
    const textFieldStyles = {
        backgroundColor: '#fcfdfd', borderRadius: '10px',
        '& .MuiOutlinedInput-root': {
            borderRadius: '10px', backgroundColor: '#fcfdfd',
            '& fieldset': { borderColor: '#d1d5db', transition: 'border-color 0.2s, box-shadow 0.2s' },
            '&:hover fieldset': { borderColor: '#9ca3af' },
            '&.Mui-focused fieldset': { borderColor: '#1d4ed8', boxShadow: '0 0 0 3.5px rgba(29, 78, 216, 0.15)' },
            '& .MuiInputAdornment-root .MuiSvgIcon-root': { color: '#6b7280', fontSize: '1.25rem' },
        },
        '& .MuiInputBase-input::placeholder': { color: '#9ca3af', opacity: 1, fontSize: '0.95rem' },
        '& .MuiFormHelperText-root': { fontSize: '0.8rem', marginLeft: '4px', fontWeight: 500, color: '#4b5563' }
    };

    return (
        <>
            <PackageModal
                open={isModalOpen}
                onClose={() => setModalOpen(false)}
                packages={packagesData}
                onContinue={handleContinueToPayment}
                apiError={packageApiError}
            />
            <Box sx={{
                bgcolor: '#f3f4f6', py: { xs: 3, sm: 5 }, minHeight: '100vh',
                display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'Inter, sans-serif'
            }}>
                <Paper
                    elevation={3}
                    sx={{
                        maxWidth: 680, width: '100%', mx: 'auto', p: { xs: 3, sm: 4.5 },
                        bgcolor: '#ffffff', borderRadius: '16px',
                        boxShadow: '0 12px 30px -8px rgba(0,0,0,0.1), 0 20px 40px -20px rgba(0,0,0,0.15)',
                    }}
                >
                    <Typography variant="h4" align="center" gutterBottom fontWeight="700" sx={{ mb: 4.5, color: '#111827' }}>
                        Submit Your Business Details
                    </Typography>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleFormSubmit}
                    >
                        {({ values, errors, touched, handleChange, handleBlur }) => (
                            <Form>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                                    {/* Personal Information */}
                                    <Box><FormLabel htmlFor="firstName" sx={formLabelStyles}>First Name *</FormLabel><TextField fullWidth id="firstName" name="firstName" placeholder="Enter your first name" value={values.firstName} onChange={handleChange} onBlur={handleBlur} error={touched.firstName && !!errors.firstName} helperText={touched.firstName && errors.firstName ? errors.firstName : " "} variant="outlined" sx={textFieldStyles} InputProps={{ startAdornment: (<InputAdornment position="start"><PersonOutlineOutlinedIcon /></InputAdornment>) }} /></Box>
                                    <Box><FormLabel htmlFor="lastName" sx={formLabelStyles}>Last Name *</FormLabel><TextField fullWidth id="lastName" name="lastName" placeholder="Enter your last name" value={values.lastName} onChange={handleChange} onBlur={handleBlur} error={touched.lastName && !!errors.lastName} helperText={touched.lastName && errors.lastName ? errors.lastName : " "} variant="outlined" sx={textFieldStyles} InputProps={{ startAdornment: (<InputAdornment position="start"><PersonOutlineOutlinedIcon /></InputAdornment>) }} /></Box>
                                    <Box><FormLabel htmlFor="email" sx={formLabelStyles}>Email Address *</FormLabel><TextField fullWidth id="email" name="email" type="email" placeholder="you@example.com" value={values.email} onChange={handleChange} onBlur={handleBlur} error={touched.email && !!errors.email} helperText={touched.email && errors.email ? errors.email : " "} variant="outlined" sx={textFieldStyles} InputProps={{ startAdornment: (<InputAdornment position="start"><MailOutlineOutlinedIcon /></InputAdornment>) }} /></Box>
                                    <Box><FormLabel htmlFor="phone" sx={formLabelStyles}>Phone Number *</FormLabel><TextField fullWidth id="phone" name="phone" type="tel" placeholder="(555) 123-4567" value={values.phone} onChange={handleChange} onBlur={handleBlur} error={touched.phone && !!errors.phone} helperText={touched.phone && errors.phone ? errors.phone : " "} variant="outlined" sx={textFieldStyles} InputProps={{ startAdornment: (<InputAdornment position="start"><PhoneOutlinedIcon /></InputAdornment>) }} /></Box>
                                    <Box sx={{ my: 1.5, mx: -1 }}><Divider sx={{ borderColor: '#e5e7eb' }} /></Box>
                                    {/* Company Information */}
                                    <Box><FormLabel htmlFor="companyName" sx={formLabelStyles}>Company Desired Name *</FormLabel><TextField fullWidth id="companyName" name="companyName" placeholder="Your Company LLC" value={values.companyName} onChange={handleChange} onBlur={handleBlur} error={touched.companyName && !!errors.companyName} helperText={touched.companyName && errors.companyName ? errors.companyName : " "} variant="outlined" sx={textFieldStyles} InputProps={{ startAdornment: (<InputAdornment position="start"><BusinessOutlinedIcon /></InputAdornment>) }} /></Box>
                                    <Box><FormLabel htmlFor="companyAltName" sx={formLabelStyles}>Company Alternative Name (Optional)</FormLabel><TextField fullWidth id="companyAltName" name="companyAltName" placeholder="Your Company Inc." value={values.companyAltName} onChange={handleChange} onBlur={handleBlur} error={touched.companyAltName && !!errors.companyAltName} helperText={touched.companyAltName && errors.companyAltName ? errors.companyAltName : " "} variant="outlined" sx={textFieldStyles} InputProps={{ startAdornment: (<InputAdornment position="start"><BusinessOutlinedIcon sx={{ opacity: 0.7 }} /></InputAdornment>) }} /></Box>
                                    <Box><FormLabel htmlFor="category" sx={formLabelStyles}>Business Category *</FormLabel><TextField fullWidth select id="category" name="category" value={values.category} onChange={handleChange} onBlur={handleBlur} error={touched.category && !!errors.category} helperText={touched.category && errors.category ? errors.category : " "} variant="outlined" sx={{ ...textFieldStyles, '& .MuiSelect-select': { paddingLeft: '40px' } }} InputProps={{ startAdornment: (<InputAdornment position="start" sx={{ ml: 1.5, mr: -1 }}><CategoryOutlinedIcon /></InputAdornment>) }} SelectProps={{ MenuProps: { PaperProps: { sx: { maxHeight: 260, borderRadius: '10px' } } }, displayEmpty: true }}><MenuItem value="" disabled>Select a category...</MenuItem>{categories.map((cat) => (<MenuItem key={cat} value={cat}>{cat}</MenuItem>))}</TextField></Box>
                                    <Box><FormLabel htmlFor="description" sx={formLabelStyles}>Company Business Description *</FormLabel><TextField fullWidth id="description" name="description" placeholder="Describe your business activities..." value={values.description} onChange={handleChange} onBlur={handleBlur} error={touched.description && !!errors.description} helperText={touched.description && errors.description ? errors.description : " "} variant="outlined" multiline rows={4} sx={textFieldStyles} InputProps={{ startAdornment: (<InputAdornment position="start" sx={{ mt: -9, mr: 0.5 }}><DescriptionOutlinedIcon /></InputAdornment>) }} /></Box>
                                    <Box sx={{ my: 1.5, mx: -1 }}><Divider sx={{ borderColor: '#e5e7eb' }} /></Box>
                                    {/* Address Information */}
                                    <Box><FormLabel htmlFor="address" sx={formLabelStyles}>Street Address *</FormLabel><TextField fullWidth id="address" name="address" placeholder="123 Main St, Suite 100" value={values.address} onChange={handleChange} onBlur={handleBlur} error={touched.address && !!errors.address} helperText={touched.address && errors.address ? errors.address : " "} variant="outlined" sx={textFieldStyles} InputProps={{ startAdornment: (<InputAdornment position="start"><LocationOnOutlinedIcon /></InputAdornment>) }} /></Box>
                                    <Box><FormLabel htmlFor="city" sx={formLabelStyles}>City *</FormLabel><TextField fullWidth id="city" name="city" placeholder="Anytown" value={values.city} onChange={handleChange} onBlur={handleBlur} error={touched.city && !!errors.city} helperText={touched.city && errors.city ? errors.city : " "} variant="outlined" sx={textFieldStyles} InputProps={{ startAdornment: (<InputAdornment position="start"><LocationCityOutlinedIcon /></InputAdornment>) }} /></Box>
                                    <Box><FormLabel htmlFor="state" sx={formLabelStyles}>State *</FormLabel><TextField fullWidth select id="state" name="state" value={values.state} onChange={handleChange} onBlur={handleBlur} error={touched.state && !!errors.state} helperText={touched.state && errors.state ? errors.state : " "} variant="outlined" sx={{ ...textFieldStyles, '& .MuiSelect-select': { paddingLeft: '40px' } }} InputProps={{ startAdornment: (<InputAdornment position="start" sx={{ ml: 1.5, mr: -1 }}><MapOutlinedIcon /></InputAdornment>) }} SelectProps={{ MenuProps: { PaperProps: { sx: { maxHeight: 260, borderRadius: '10px' } } }, displayEmpty: true }}><MenuItem value="" disabled>Select state...</MenuItem>{stateOptions.map((state) => (<MenuItem key={state} value={state}>{state}</MenuItem>))}</TextField></Box>
                                    <Box><FormLabel htmlFor="zipCode" sx={formLabelStyles}>Zip Code *</FormLabel><TextField fullWidth id="zipCode" name="zipCode" placeholder="e.g., 90210" value={values.zipCode} onChange={handleChange} onBlur={handleBlur} error={touched.zipCode && !!errors.zipCode} helperText={touched.zipCode && errors.zipCode ? errors.zipCode : " "} variant="outlined" sx={textFieldStyles} InputProps={{ startAdornment: (<InputAdornment position="start"><LocalPostOfficeOutlinedIcon /></InputAdornment>) }} /></Box>
                                    <Box sx={{ my: 1.5, mx: -1 }}><Divider sx={{ borderColor: '#e5e7eb' }} /></Box>
                                    {/* Filing Speed */}
                                    <Box><Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: '600', color: '#1f2937' }}>Select Filing Speed *</Typography><RadioGroup name="filingSpeed" value={values.filingSpeed} onChange={handleChange} sx={{ gap: 2 }}>
                                        <FormControlLabel value="express" control={<Radio size="medium" sx={{ '&.Mui-checked': { color: '#1d4ed8' } }} />} label="Express +$150 (15-20 days)" sx={{ border: '1.5px solid', borderColor: values.filingSpeed === 'express' ? '#1d4ed8' : '#d1d5db', borderRadius: '12px', p: '12px 20px', width: '100%', transition: 'all 0.25s', backgroundColor: values.filingSpeed === 'express' ? 'rgba(29,78,216,0.07)' : '#fcfdfd', boxShadow: values.filingSpeed === 'express' ? '0 0 0 2.5px rgba(29,78,216,0.25)' : 'none', '&:hover': { borderColor: values.filingSpeed === 'express' ? '#1d4ed8' : '#9ca3af', backgroundColor: values.filingSpeed === 'express' ? 'rgba(29,78,216,0.1)' : 'rgba(0,0,0,0.03)' }, '& .MuiFormControlLabel-label': { fontSize: '0.95rem', fontWeight: 500 } }} />
                                        <FormControlLabel value="standard" control={<Radio size="medium" sx={{ '&.Mui-checked': { color: '#1d4ed8' } }} />} label="Standard (30-60 days)" sx={{ border: '1.5px solid', borderColor: values.filingSpeed === 'standard' ? '#1d4ed8' : '#d1d5db', borderRadius: '12px', p: '12px 20px', width: '100%', transition: 'all 0.25s', backgroundColor: values.filingSpeed === 'standard' ? 'rgba(29,78,216,0.07)' : '#fcfdfd', boxShadow: values.filingSpeed === 'standard' ? '0 0 0 2.5px rgba(29,78,216,0.25)' : 'none', '&:hover': { borderColor: values.filingSpeed === 'standard' ? '#1d4ed8' : '#9ca3af', backgroundColor: values.filingSpeed === 'standard' ? 'rgba(29,78,216,0.1)' : 'rgba(0,0,0,0.03)' }, '& .MuiFormControlLabel-label': { fontSize: '0.95rem', fontWeight: 500 } }} />
                                    </RadioGroup>{touched.filingSpeed && errors.filingSpeed && (<Typography color="error" variant="caption" sx={{ display: 'block', mt: 1, ml: '2px', fontWeight: 500 }}>{errors.filingSpeed}</Typography>)}</Box>
                                    {/* Submit Button */}
                                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                                        <Button type="submit" variant="contained" disabled={isFetchingPackages} size="large" sx={{ bgcolor: '#1d4ed8', color: 'white', textTransform: 'none', fontWeight: '600', p: '12px 36px', borderRadius: '10px', fontSize: '1rem', minWidth: '240px', boxShadow: '0 4px 10px -2px rgba(29,78,216,0.3)', transition: 'all 0.25s', '&:hover': { bgcolor: '#1e40af', boxShadow: '0 6px 14px -3px rgba(29,78,216,0.35)', transform: 'translateY(-1px)' } }}>
                                            {isFetchingPackages ? <CircularProgress size={24} color="inherit" /> : 'Select Package & Continue'}
                                        </Button>
                                    </Box>
                                </Box>
                            </Form>
                        )}
                    </Formik>
                </Paper>
            </Box>
        </>
    );
};

export default BusinessForm;
