import React, { useState } from 'react';
import {
  AppBar, Box, CssBaseline, Drawer, IconButton, List, ListItem, ListItemButton,
  ListItemIcon, ListItemText, Toolbar, Typography, createTheme, ThemeProvider,
  Paper, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TablePagination, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  Grid, Divider, Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import {
    Dashboard as DashboardIcon, ShoppingCart as ShoppingCartIcon, People as PeopleIcon,
    Settings as SettingsIcon, Menu as MenuIcon, Info as InfoIcon,
    ExpandMore as ExpandMoreIcon, AccountCircle, CorporateFare, LocationOn,
    BusinessCenter
} from '@mui/icons-material';
import { format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#90caf9' },
    secondary: { main: '#f48fb1' },
    background: { default: '#121212', paper: '#1e1e1e' },
    text: { primary: '#e0e0e0', secondary: '#b3b3b3' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h6: { fontWeight: 600 },
    subtitle1: { color: '#90caf9' },
  },
  components: {
    MuiPaper: {
        styleOverrides: {
            root: {
                backgroundImage: 'none',
            }
        }
    },
    MuiTableRow: {
        styleOverrides: {
            root: {
                '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.05) !important',
                }
            }
        }
    },
    MuiTableCell: {
        styleOverrides: {
            head: {
                backgroundColor: '#272727',
                fontWeight: 'bold',
            }
        }
    }
  }
});

const drawerWidth = 240;

const DetailItem = ({ label, value }) => (
    value ? <Typography variant="body2" color="text.secondary"><strong>{label}:</strong> {value}</Typography> : null
);

function OrderList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['orders', page, rowsPerPage],
    queryFn: async () => {
      const res = await axios.get(`/api/admin/business-orders`, {
        params: { page: page + 1, limit: rowsPerPage },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  const handleViewDetails = (order) => setSelectedOrder(order);
  const handleCloseDetails = () => setSelectedOrder(null);
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const getStatusChip = (status) => {
    const color = status === 'paid' ? 'success' : status === 'pending' ? 'warning' : 'error';
    return <Chip label={status.charAt(0).toUpperCase() + status.slice(1)} color={color} size="small" variant="outlined"/>;
  };

  if (isLoading) return <Paper sx={{p:4, textAlign:'center'}}>Loading...</Paper>;
  if (isError) return <Paper sx={{p:4, textAlign:'center', color:'error.main'}}>Error: {error.message}</Paper>;

  const { orders = [], total = 0, limit = rowsPerPage, page: currentPage = page + 1 } = data || {};

  return (
    <>
      <Paper elevation={3} sx={{ width: '100%', overflow: 'hidden', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom component="div" sx={{ p: 2, mb: 0 }}>
          Business Orders
        </Typography>
        <TableContainer sx={{ maxHeight: 'calc(100vh - 250px)' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead><TableRow>
              <TableCell>Company Name</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow></TableHead>
            <TableBody>
              {(orders.length > 0 ? orders : []).map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id || row.id}>
                  <TableCell component="th" scope="row">{row.CompanyInfo?.CompanyDesiredName}</TableCell>
                  <TableCell>
                      <Box>
                          <Typography variant="body2">{`${row.Contact?.ContactFirstName || ''} ${row.Contact?.ContactLastName || ''}`}</Typography>
                          <Typography variant="caption" color="text.secondary">{row.Contact?.ContactEmail}</Typography>
                      </Box>
                  </TableCell>
                  <TableCell>{getStatusChip(row.paymentStatus)}</TableCell>
                  <TableCell align="right">${row.selectedPackage?.totalPrice?.toFixed(2) ?? '0.00'}</TableCell>
                  <TableCell>{row.createdAt ? format(new Date(row.createdAt), 'MMM dd, yyyy') : ''}</TableCell>
                   <TableCell align="center">
                    <IconButton size="small" onClick={() => handleViewDetails(row)}><InfoIcon fontSize="inherit" /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination rowsPerPageOptions={[5, 10, 25]} component="div" count={total} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
      </Paper>

       {selectedOrder && (
        <Dialog open={!!selectedOrder} onClose={handleCloseDetails} maxWidth="md" fullWidth>
          <DialogTitle sx={{ borderBottom: '1px solid #303030' }}>Order Details: {selectedOrder.CompanyInfo?.CompanyDesiredName}</DialogTitle>
          <DialogContent dividers sx={{ p:0 }}>
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="subtitle1">Company Information</Typography></AccordionSummary>
                <AccordionDetails><Grid container spacing={1}>
                    <Grid item xs={12} sm={6}><DetailItem label="Alternative Name" value={selectedOrder.CompanyInfo?.CompanyAlternativeName} /></Grid>
                    <Grid item xs={12} sm={6}><DetailItem label="Business Category" value={selectedOrder.CompanyInfo?.CompanyBusinessCategory} /></Grid>
                    <Grid item xs={12}><DetailItem label="Description" value={selectedOrder.CompanyInfo?.CompanyBusinessDescription} /></Grid>
                </Grid></AccordionDetails>
            </Accordion>
            <Accordion><AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="subtitle1">Contact & Address</Typography></AccordionSummary>
                <AccordionDetails><Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" fontSize="1rem" gutterBottom>Primary Contact</Typography>
                        <DetailItem label="Name" value={`${selectedOrder.Contact?.ContactFirstName || ''} ${selectedOrder.Contact?.ContactLastName || ''}`} />
                        <DetailItem label="Email" value={selectedOrder.Contact?.ContactEmail} />
                        <DetailItem label="Phone" value={selectedOrder.Contact?.ContactPhone} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" fontSize="1rem" gutterBottom>Business Address</Typography>
                        <DetailItem label="Address" value={`${selectedOrder.BusinessAddress?.BusinessAddressAddress1 || ''}, ${selectedOrder.BusinessAddress?.BusinessAddressAddress2 || ''}`} />
                        <DetailItem label="City" value={selectedOrder.BusinessAddress?.BusinessAddressCity} />
                        <DetailItem label="State/Zip" value={`${selectedOrder.BusinessAddress?.BusinessAddressState || ''} ${selectedOrder.BusinessAddress?.BusinessAddressZip || ''}`} />
                    </Grid>
                </Grid></AccordionDetails>
            </Accordion>
            <Accordion><AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="subtitle1">Participants</Typography></AccordionSummary>
                <AccordionDetails>{selectedOrder.CompanyParticipants?.map((p, i) => (
                    <Box key={i} sx={{ mb: i < selectedOrder.CompanyParticipants.length - 1 ? 2 : 0 }}><Grid container spacing={1}>
                        <Grid item xs={12} sm={4}><DetailItem label="Name" value={`${p.FirstName} ${p.LastName}`} /></Grid>
                        <Grid item xs={12} sm={4}><DetailItem label="Titles" value={p.Titles?.join(', ')} /></Grid>
                        <Grid item xs={12} sm={4}><DetailItem label="Ownership" value={`${p.OwnershipPercentage}%`} /></Grid>
                    </Grid>{ i < selectedOrder.CompanyParticipants.length - 1 && <Divider sx={{my: 1}} />}</Box>
                ))}</AccordionDetails>
            </Accordion>
            <Accordion><AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="subtitle1">Package & Payment</Typography></AccordionSummary>
                <AccordionDetails><Grid container spacing={1}>
                    <Grid item xs={12} sm={4}><DetailItem label="Package" value={selectedOrder.selectedPackage?.name} /></Grid>
                    <Grid item xs={12} sm={4}><DetailItem label="Filing Speed" value={selectedOrder.filingSpeed} /></Grid>
                    <Grid item xs={12} sm={4}><Typography variant="body2" sx={{display: 'flex', alignItems: 'center', gap: 1}}><strong>Status:</strong> {getStatusChip(selectedOrder.paymentStatus)}</Typography></Grid>
                </Grid></AccordionDetails>
            </Accordion>
          </DialogContent>
          <DialogActions sx={{ p: '16px 24px' }}><Button onClick={handleCloseDetails} variant="contained">Close</Button></DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default function AdminPanle(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('Orders');

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  
  const menuItems = [
      { text: 'Dashboard', icon: <DashboardIcon />},
      { text: 'Orders', icon: <ShoppingCartIcon />},
      { text: 'Customers', icon: <PeopleIcon />},
      { text: 'Settings', icon: <SettingsIcon />}
  ];

  const drawer = (
    <div>
      <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" noWrap component="div" sx={{ color: 'primary.main', fontWeight: 'bold' }}>Admin Panel</Typography>
      </Toolbar>
      <List>{menuItems.map((item) => (
          <ListItem key={item.text} disablePadding><ListItemButton selected={selectedMenu === item.text} onClick={() => setSelectedMenu(item.text)} sx={{ '&.Mui-selected': { background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)', color: '#fff', borderRight: '4px solid #90caf9', '&:hover': { background: 'linear-gradient(90deg, #1565c0 0%, #64b5f6 100%)' } }, m: '4px 8px', borderRadius: '4px' }}>
              <ListItemIcon sx={{ color: selectedMenu === item.text ? '#fff' : 'text.primary', minWidth: '40px' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
          </ListItemButton></ListItem>
      ))}</List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  const renderContent = () => {
      switch(selectedMenu) {
          case 'Orders': return <OrderList />;
          case 'Dashboard': return <Typography variant="h4" sx={{p: 2}}>Dashboard Content</Typography>;
          case 'Customers': return <Typography variant="h4" sx={{p: 2}}>Customers Content</Typography>;
          case 'Settings': return <Typography variant="h4" sx={{p: 2}}>Settings Content</Typography>;
          default: return <OrderList />;
      }
  }

  return (
    
      <Box sx={{ display: 'flex' }}>
       <AppBar position="fixed" elevation={0} sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` }, backgroundColor: 'background.paper', borderBottom: '1px solid #303030' }}>
          <Toolbar>
            <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}><MenuIcon /></IconButton>
            <Typography variant="h6" noWrap component="div">{selectedMenu}</Typography>
          </Toolbar>
        </AppBar>
        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
          <Drawer container={container} variant="temporary" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }} sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, background: 'linear-gradient(180deg, #232526 0%, #414345 100%)', boxShadow: '2px 0 16px 0 rgba(33, 150, 243, 0.15)', borderRight: 'none' } }}>{drawer}</Drawer>
          <Drawer variant="permanent" sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, background: 'linear-gradient(180deg, #232526 0%, #414345 100%)', boxShadow: '2px 0 16px 0 rgba(33, 150, 243, 0.15)', borderRight: 'none' } }} open>{drawer}</Drawer>
        </Box>
        <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}><Toolbar />{renderContent()}</Box>
      </Box>
 
  );
}
