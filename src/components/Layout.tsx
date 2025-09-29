import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Switch,
  FormControlLabel,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  IconButton,
  Divider,
  Collapse
} from '@mui/material';
import {
  Brightness4,
  Brightness7,
  Menu as MenuIcon,
  Home,
  Calculate,
  TrendingUp,
  Description,
  Schedule,
  Security,
  Gavel,
  AttachMoney,
  ExpandLess,
  ExpandMore
} from '@mui/icons-material';
import { useTheme as useCustomTheme } from '../contexts/ThemeContext';
import ContractProgressStepper from './ContractProgressStepper';
import ContractPreviewButton from './ContractPreviewButton';
import Footer from './Footer';

const drawerWidth = 240;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [contractTocOpen, setContractTocOpen] = useState(false);
  const [calculatorsOpen, setCalculatorsOpen] = useState(false);
  const { mode, toggleTheme } = useCustomTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleContractTocToggle = () => {
    setContractTocOpen(!contractTocOpen);
  };

  const handleCalculatorsToggle = () => {
    setCalculatorsOpen(!calculatorsOpen);
  };

  // Auto-open sections based on current page
  useEffect(() => {
    if (location.pathname === '/contract') {
      setContractTocOpen(true);
    } else {
      setContractTocOpen(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === '/vesting' || location.pathname === '/compensation') {
      setCalculatorsOpen(true);
    } else if (location.pathname === '/contract') {
      // Don't close calculators when on contract page
    } else {
      setCalculatorsOpen(false);
    }
  }, [location.pathname]);

  
  const renderMenuItem = (item: { text: string; path: string; icon: React.ReactNode }) => {
    return  <ListItem key={item.text} disablePadding>
    <ListItemButton
      component={Link}
      to={item.path}
      selected={location.pathname === item.path}
      sx={{
        '&.Mui-selected': {
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          '&:hover': {
            backgroundColor: 'primary.dark',
          },
          '& .MuiListItemIcon-root': {
            color: 'primary.contrastText',
          },
        },
      }}
    >
      <ListItemIcon>
        {item.icon}
      </ListItemIcon>
      <ListItemText primary={item.text} />
    </ListItemButton>
  </ListItem>
  }

  const menuItems = {
    overview: { text: 'Overview', path: '/', icon: <Home /> },
//    { text: 'Founder Form', path: '/founder', icon: <Business /> },
//    { text: 'Contributor Form', path: '/contributor', icon: <People /> },
    timesheet: { text: 'Timesheet', path: '/timesheet', icon: <Schedule /> },
  };

  const calculatorItems = [
    { text: 'Vesting Calculator', path: '/vesting', icon: <Calculate /> },
    { text: 'Deferred Wage Calculator', path: '/compensation', icon: <TrendingUp /> },
  ];

  const contractTocItems = [
    { text: 'Core Principles', hash: '#principles', icon: <Security /> },
    { text: 'Protections', hash: '#protections', icon: <Gavel /> },
    { text: 'Compensations', hash: '#compensations', icon: <AttachMoney /> },
    { text: 'Vesting Equity', hash: '#vesting', icon: <Schedule /> },
    { text: 'Deferred Compensation', hash: '#deferred', icon: <TrendingUp /> },
  ];

  const drawer = (
    <Box>
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold' }}>
          Colab Contract
        </Typography>
      </Toolbar>
      <Divider />
      
      {/* Contract Preview */}
      <ContractPreviewButton />
              
      <ContractProgressStepper />
        
      <Divider />
      
      <List>
        {/* Overview */}
        {renderMenuItem(menuItems.overview)}        
        
        {/* Calculators with nested items */}
        <ListItem id="MenuCalculatorButtons" disablePadding>
          <ListItemButton
            selected={location.pathname === '/vesting' || location.pathname === '/compensation'}
            onClick={() => {
              if (location.pathname !== '/vesting' && location.pathname !== '/compensation') {
                // Navigate to first calculator if not on any calculator page
                navigate('/vesting');
              } else {
                // Toggle the calculators menu
                handleCalculatorsToggle();
              }
            }}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
                '& .MuiListItemIcon-root': {
                  color: 'primary.contrastText',
                },
              },
            }}
          >
            <ListItemIcon>
              <Calculate />
            </ListItemIcon>
            <ListItemText primary="Calculators" />
            {calculatorsOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        
        <Collapse in={calculatorsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {calculatorItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  selected={location.pathname === item.path}
                  sx={{ 
                    pl: 4,
                    '&.Mui-selected': {
                      backgroundColor: 'primary.main',
                      color: 'primary.contrastText',
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                      },
                      '& .MuiListItemIcon-root': {
                        color: 'primary.contrastText',
                      },
                    },
                  }}
                >
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>
        
        {/* Contract Details with nested Table of Contents */}
        <ListItem id="MenuContractButtons" disablePadding>
          <ListItemButton
            selected={location.pathname === '/contract'}
            onClick={() => {
              if (location.pathname !== '/contract') {
                // Navigate to contract page
                navigate('/contract');
              } else {
                // Toggle the table of contents
                handleContractTocToggle();
              }
            }}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
                '& .MuiListItemIcon-root': {
                  color: 'primary.contrastText',
                },
              },
            }}
          >
            <ListItemIcon>
              <Description />
            </ListItemIcon>
            <ListItemText primary="Contract Details" />
            {contractTocOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        
        <Collapse in={contractTocOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {contractTocItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  component={Link}
                  to={`/contract${item.hash}`}
                  sx={{ pl: 4 }}
                >
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>

        {renderMenuItem(menuItems.timesheet)}        

      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <AppBar
          position="fixed"
          sx={{
            width: { md: `calc(100% - ${drawerWidth}px)` },
            ml: { md: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              Founding Contributor Agreement
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={mode === 'dark'}
                  onChange={toggleTheme}
                  icon={<Brightness7 />}
                  checkedIcon={<Brightness4 />}
                />
              }
              label={
                mode === 'light' ? 'Light' : 
                mode === 'dark' ? 'Dark' : 
                'System'
              }
              sx={{ color: 'white' }}
            />
          </Toolbar>
        </AppBar>

        <Box
          component="nav"
          sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
          aria-label="navigation"
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', md: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: { md: `calc(100% - ${drawerWidth}px)` },
            mt: 8, // Account for AppBar height
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            {children}
          </Box>
          <Footer />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
