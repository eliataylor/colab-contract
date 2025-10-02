import React, {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {
    Box,
    Collapse,
    Divider,
    Drawer,
    Fab,
    FormControlLabel,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Slider,
    Switch,
    Typography
} from '@mui/material';
import {FadeIn} from '../components/styled/StyledComponents';
import {
    Brightness4,
    Brightness7,
    Calculate,
    ExpandLess,
    ExpandMore,
    Gavel,
    Menu as MenuIcon,
    Schedule,
    TrendingUp
} from '@mui/icons-material';
import {useTheme as useCustomTheme} from '../hooks/useThemeHook';
import ContractProgressStepper from './ContractProgressStepper';
import Footer from './Footer';

const drawerWidth = 250;

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [calculatorsOpen, setCalculatorsOpen] = useState(false);
    const {mode, toggleTheme, fontScale, setFontScale} = useCustomTheme();
    const location = useLocation();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleCalculatorsToggle = () => {
        setCalculatorsOpen(!calculatorsOpen);
    };


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
        return <ListItem key={item.text} disablePadding>
            <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                sx={{
                    '&.Mui-selected': {
                        backgroundColor: item.text === 'Colab Contract' ? 'secondary.main' : 'primary.main',
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
                <ListItemText primary={item.text}/>
            </ListItemButton>
        </ListItem>
    }

    const menuItems = {
        contract: {text: 'Colab Contract', path: '/', icon: <Gavel/>},
        timesheet: {text: 'Timesheet', path: '/timesheets', icon: <Schedule/>},
    };

    const calculatorItems = [
        {text: 'Vesting Schedule', path: '/vesting', icon: <Calculate/>},
        {text: 'Deferred Wages', path: '/deferred-wage', icon: <TrendingUp/>},
    ];

    const drawer = (
        <Box>

            {/* Contract Preview */}
            {renderMenuItem(menuItems.contract)}

            <ContractProgressStepper/>

            <List>

                {/* Calculators with nested items */}
                <ListItem id="MenuCalculatorButtons" disablePadding>
                    <ListItemButton
                        onClick={() => {
                            handleCalculatorsToggle();
                        }}
                    >
                        <ListItemIcon>
                            <Calculate/>
                        </ListItemIcon>
                        <ListItemText primary="Calculators"/>
                        {calculatorsOpen ? <ExpandLess/> : <ExpandMore/>}
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
                                    <ListItemText primary={item.text}/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Collapse>

                {renderMenuItem(menuItems.timesheet)}

            </List>

            <Divider/>

            <FormControlLabel
                control={
                    <Switch
                        checked={mode === 'dark'}
                        onChange={toggleTheme}
                        icon={<Brightness7 fontSize={'small'}/>}
                        checkedIcon={<Brightness4 fontSize={'small'}/>}
                    />
                }
                label={
                    mode === 'light' ? 'Light' :
                        mode === 'dark' ? 'Dark' :
                            'System'
                }
                sx={{display: 'flex', justifyContent: 'center', mt: 2}}
            />

            <Divider sx={{my: 2}}/>

            {/* Font Size Controller */}
            <Box sx={{px: 4, pb: 2}}>
                <Typography variant="subtitle2" gutterBottom sx={{textAlign: 'center'}}>
                    Font Size
                </Typography>
                <Slider
                    value={fontScale}
                    onChange={(_, value) => setFontScale(value as number)}
                    min={0.5}
                    max={2.0}
                    step={0.1}
                    marks={[
                        {value: 0.5, label: '50%'},
                        {value: 1.0, label: '100%'},
                        {value: 1.5, label: '150%'},
                        {value: 2.0, label: '200%'},
                    ]}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `${Math.round(value * 100)}%`}
                    sx={{mb: 1}}
                />
            </Box>
        </Box>
    );

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
            <Box sx={{display: 'flex', flexGrow: 1}}>
                <Fab
                    aria-label="open drawer"
                    size="small"
                    color="primary"
                    onClick={handleDrawerToggle}
                    style={{position: 'absolute', top: 8, right: 8}}
                    sx={{display: {md: 'none'}}}
                    className="no-print"
                >
                    <MenuIcon/>
                </Fab>

                <Box
                    className="no-print"
                    component="nav"
                    sx={{width: {md: drawerWidth}, flexShrink: {md: 0}}}
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
                            display: {xs: 'block', md: 'none'},
                            '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: {xs: 'none', md: 'block'},
                            '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
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
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <FadeIn>
                        {children}
                    </FadeIn>
                    <Footer/>
                </Box>
            </Box>
        </Box>
    );
};

export default Layout;
