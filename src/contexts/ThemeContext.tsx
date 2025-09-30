import type {ReactNode} from 'react';
import React, {createContext, useContext, useEffect, useState} from 'react';
import {createTheme, ThemeProvider as MuiThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
    mode: ThemeMode;
    toggleTheme: () => void;
    theme: any; // Using any to avoid Theme type issues in MUI v7
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
    const [mode, setMode] = useState<ThemeMode>(() => {
        // Check localStorage for saved theme preference, default to system
        const savedTheme = localStorage.getItem('themeMode');
        return (savedTheme as ThemeMode) || 'system';
    });

    // Get the actual theme mode (resolving 'system' to light/dark)
    const getActualMode = (): 'light' | 'dark' => {
        if (mode === 'system') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return mode as 'light' | 'dark';
    };

    const actualMode = getActualMode();

    // Create MUI theme based on actual mode
    const theme = createTheme({
        palette: {
            mode: actualMode,
            primary: {
                main: actualMode === 'light' ? '#d97705' : '#f59e0b',
                light: actualMode === 'light' ? '#ea580c' : '#fbbf24',
                dark: actualMode === 'light' ? '#b45309' : '#d97705',
                contrastText: '#ffffff',
            },
            secondary: {
                main: actualMode === 'light' ? '#7c3aed' : '#a78bfa',
                light: actualMode === 'light' ? '#8b5cf6' : '#c4b5fd',
                dark: actualMode === 'light' ? '#6d28d9' : '#7c3aed',
                contrastText: '#ffffff',
            },
            background: {
                default: actualMode === 'light' ? '#fef7ed' : '#0f0f0f',
                paper: actualMode === 'light' ? '#ffffff' : '#1a1a1a',
            },
            text: {
                primary: actualMode === 'light' ? 'rgba(0, 0, 0, 0.87)' : 'rgba(255, 255, 255, 0.87)',
                secondary: actualMode === 'light' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)',
            },
            error: {
                main: actualMode === 'light' ? '#dc2626' : '#ef4444',
                light: actualMode === 'light' ? '#fca5a5' : '#fca5a5',
                dark: actualMode === 'light' ? '#b91c1c' : '#dc2626',
                contrastText: '#ffffff',
            },
            warning: {
                main: actualMode === 'light' ? '#d97705' : '#f59e0b',
                light: actualMode === 'light' ? '#fed7aa' : '#fde68a',
                dark: actualMode === 'light' ? '#b45309' : '#d97705',
                contrastText: '#ffffff',
            },
            info: {
                main: actualMode === 'light' ? '#0ea5e9' : '#38bdf8',
                light: actualMode === 'light' ? '#7dd3fc' : '#7dd3fc',
                dark: actualMode === 'light' ? '#0284c7' : '#0ea5e9',
                contrastText: '#ffffff',
            },
            success: {
                main: actualMode === 'light' ? '#16a34a' : '#22c55e',
                light: actualMode === 'light' ? '#86efac' : '#86efac',
                dark: actualMode === 'light' ? '#15803d' : '#16a34a',
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
                        scrollbarColor: actualMode === 'light' ? '#d97705 #fef7ed' : '#f59e0b #1a1a1a',
                        '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                            width: 8,
                        },
                        '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                            borderRadius: 8,
                            backgroundColor: actualMode === 'light' ? '#d97705' : '#f59e0b',
                        },
                        '&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track': {
                            borderRadius: 8,
                            backgroundColor: actualMode === 'light' ? '#fef7ed' : '#1a1a1a',
                        },
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        borderRadius: 0,
                        boxShadow: actualMode === 'light'
                            ? '0 2px 8px rgba(0,0,0,0.1)'
                            : '0 2px 8px rgba(0,0,0,0.3)',
                        '&:hover': {
                            boxShadow: actualMode === 'light'
                                ? '0 4px 16px rgba(0,0,0,0.15)'
                                : '0 4px 16px rgba(0,0,0,0.4)',
                        },
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        borderRadius: 0,
                    },
                    elevation1: {
                        boxShadow: actualMode === 'light'
                            ? '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
                            : '0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.4)',
                    },
                    elevation2: {
                        boxShadow: actualMode === 'light'
                            ? '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
                            : '0 3px 6px rgba(0,0,0,0.4), 0 3px 6px rgba(0,0,0,0.5)',
                    },
                    elevation3: {
                        boxShadow: actualMode === 'light'
                            ? '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
                            : '0 10px 20px rgba(0,0,0,0.5), 0 6px 6px rgba(0,0,0,0.6)',
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
                        boxShadow: actualMode === 'light'
                            ? '0 2px 4px rgba(0,0,0,0.1)'
                            : '0 2px 4px rgba(0,0,0,0.3)',
                        '&:hover': {
                            boxShadow: actualMode === 'light'
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
        },
    });

    const toggleTheme = () => {
        setMode((prevMode) => {
            let newMode: ThemeMode;
            if (prevMode === 'light') {
                newMode = 'dark';
            } else if (prevMode === 'dark') {
                newMode = 'system';
            } else {
                newMode = 'light';
            }
            localStorage.setItem('themeMode', newMode);
            return newMode;
        });
    };

    // Listen for system theme changes when mode is 'system'
    useEffect(() => {
        if (mode === 'system') {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handleChange = () => {
                // Force re-render when system theme changes
                setMode('system');
            };

            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        }
    }, [mode]);

    // Save theme preference to localStorage whenever mode changes
    useEffect(() => {
        localStorage.setItem('themeMode', mode);
    }, [mode]);

    const value: ThemeContextType = {
        mode,
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

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
