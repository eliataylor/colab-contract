import type {ReactNode} from 'react';
import React, {createContext, useContext, useEffect, useState} from 'react';
import {createTheme, type Theme, ThemeProvider as MuiThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
    mode: ThemeMode;
    setMode: (mode: ThemeMode) => void;
    toggleTheme: () => void;
    theme: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
    children: ReactNode;
}

// Internal hook - exported for use in hooks file
// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
    const [mode, setMode] = useState<ThemeMode>(() => {
        // Check localStorage for saved theme preference, default to system
        const savedTheme = localStorage.getItem('themeMode') as ThemeMode | null;
        return savedTheme ? savedTheme : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });

    // Create MUI theme based on actual mode
    const theme = createTheme({
        palette: {
            mode: mode,
            primary: {
                main: mode === 'light' ? '#d97705' : '#f59e0b',
                light: mode === 'light' ? '#cf7a1a' : '#fb9e24',
                dark: mode === 'light' ? '#b45309' : '#d97705',
                contrastText: '#ffffff',
            },
            secondary: {
                main: mode === 'light' ? '#137108' : '#137108',
                light: mode === 'light' ? '#299f1b' : '#299f1b',
                contrastText: '#ffffff',
            },
            background: {
                default: mode === 'light' ? '#ffffff' : '#0f0f0f',
                paper: mode === 'light' ? '#fefff7' : '#1a1a1a',
            },
            text: {
                primary: mode === 'light' ? 'rgba(0, 0, 0, 0.87)' : 'rgba(255, 255, 255, 0.87)',
                secondary: mode === 'light' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)',
            },
            error: {
                main: mode === 'light' ? '#dc2626' : '#ef4444',
                light: mode === 'light' ? '#fca5a5' : '#fca5a5',
                dark: mode === 'light' ? '#b91c1c' : '#dc2626',
                contrastText: '#ffffff',
            },
            warning: {
                main: mode === 'light' ? '#d97705' : '#f59e0b',
                light: mode === 'light' ? '#fed7aa' : '#fde68a',
                dark: mode === 'light' ? '#b45309' : '#d97705',
                contrastText: '#ffffff',
            },
            info: {
                main: mode === 'light' ? '#0ea5e9' : '#38bdf8',
                light: mode === 'light' ? '#7dd3fc' : '#7dd3fc',
                dark: mode === 'light' ? '#0284c7' : '#0ea5e9',
                contrastText: '#ffffff',
            },
            success: {
                main: mode === 'light' ? '#16a34a' : '#22c55e',
                light: mode === 'light' ? '#86efac' : '#86efac',
                dark: mode === 'light' ? '#15803d' : '#16a34a',
                contrastText: '#ffffff',
            },
        },
        shape: {
            borderRadius: 0, // Consistent border radius
        },
        spacing: 8, // Base spacing unit
        typography: {
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            h1: {
                fontSize: '2.5rem',
                fontWeight: 600,
                lineHeight: 1.2,
            },
            h2: {
                fontSize: '2rem',
                fontWeight: 600,
                lineHeight: 1.3,
            },
            h3: {
                fontSize: '1.75rem',
                fontWeight: 600,
                lineHeight: 1.3,
            },
            h4: {
                fontSize: '1.5rem',
                fontWeight: 600,
                lineHeight: 1.4,
            },
            h5: {
                fontSize: '1.25rem',
                fontWeight: 600,
                lineHeight: 1.4,
            },
            h6: {
                fontSize: '1rem',
                fontWeight: 600,
                lineHeight: 1.4,
            },
            body1: {
                fontSize: '1rem',
                lineHeight: 1.5,
            },
            body2: {
                fontSize: '0.875rem',
                lineHeight: 1.43,
            },
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        scrollbarColor: mode === 'light' ? '#d97705 #fef7ed' : '#f59e0b #1a1a1a',
                        '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                            width: 8,
                        },
                        '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                            borderRadius: 8,
                            backgroundColor: mode === 'light' ? '#d97705' : '#f59e0b',
                        },
                        '&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track': {
                            borderRadius: 8,
                            backgroundColor: mode === 'light' ? '#fef7ed' : '#1a1a1a',
                        },
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        borderRadius: 0,
                        boxShadow: mode === 'light'
                            ? '0 2px 8px rgba(0,0,0,0.1)'
                            : '0 2px 8px rgba(0,0,0,0.3)',
                        '&:hover': {
                            boxShadow: mode === 'light'
                                ? '0 4px 16px rgba(0,0,0,0.15)'
                                : '0 4px 16px rgba(0,0,0,0.4)',
                        },
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 4,
                        textTransform: 'none',
                        fontWeight: 500,
                        padding: '8px 16px',
                    },
                    contained: {
                        boxShadow: mode === 'light'
                            ? '0 2px 4px rgba(0,0,0,0.1)'
                            : '0 2px 4px rgba(0,0,0,0.3)',
                        '&:hover': {
                            boxShadow: mode === 'light'
                                ? '0 4px 8px rgba(0,0,0,0.15)'
                                : '0 4px 8px rgba(0,0,0,0.4)',
                        },
                    },
                },
            },
            MuiChip: {
                styleOverrides: {
                    root: {
                        borderRadius: 8,
                    },
                },
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 3,
                        },
                    },
                },
            },
            MuiDialog: {
                styleOverrides: {
                    paper: {
                        borderRadius: 12,
                    },
                },
            },
            MuiAccordion: {
                styleOverrides: {
                    root: {
                        borderRadius: '0 0 12px 0 !important',
                        '&:before': {
                            display: 'none',
                        },
                        '&.Mui-expanded': {
                            margin: '0',
                        },
                    },
                },
            },
            MuiTypography: {
                styleOverrides: {
                    root: {
                        maxWidth: '900px'
                    },
                },
            },
        },
    });

    const toggleTheme = () => {
        setMode((prevMode) => {
            let newMode: ThemeMode;
            if (prevMode === 'light') {
                newMode = 'dark';
            } else {
                newMode = 'light';
            }
            localStorage.setItem('themeMode', newMode);
            return newMode;
        });
    };

    // Save theme preference to localStorage whenever mode changes
    useEffect(() => {
        localStorage.setItem('themeMode', mode);
    }, [mode]);

    const value: ThemeContextType = {
        mode,
        setMode,
        toggleTheme,
        theme,
    };

    return (
        <ThemeContext.Provider value={value}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline/>
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};

