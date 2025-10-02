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
    fontScale: number;
    setFontScale: (scale: number) => void;
    resetFontScale: () => void;
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

    // Add font scale state
    const [fontScale, setFontScale] = useState<number>(() => {
        const savedScale = localStorage.getItem('fontScale');
        return savedScale ? parseFloat(savedScale) : 1.2;
    });

    // Base font sizes (these will be scaled)
    const baseFontSizes = {
        h1: 2.5,
        h2: 2.0,
        h3: 1.75,
        h4: 1.5,
        h5: 1.25,
        h6: 1.0,
        body1: 1.0,
        body2: 0.875,
    };

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
            action: {
                disabled: mode === 'light' ? 'rgba(0, 0, 0, 0.26)' : 'rgba(255, 255, 255, 0.26)',
                disabledBackground: mode === 'light' ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)',
                hover: mode === 'light' ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.04)',
                selected: mode === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)',
            },
        },
        shape: {
            borderRadius: 0, // Consistent border radius
        },
        spacing: 8, // Base spacing unit
        typography: {
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            h1: {
                fontSize: `${baseFontSizes.h1}rem`,
                fontWeight: 600,
                lineHeight: 1.2,
            },
            h2: {
                fontSize: `${baseFontSizes.h2}rem`,
                fontWeight: 600,
                lineHeight: 1.3,
            },
            h3: {
                fontSize: `${baseFontSizes.h3}rem`,
                fontWeight: 600,
                lineHeight: 1.3,
            },
            h4: {
                fontSize: `${baseFontSizes.h4}rem`,
                fontWeight: 600,
                lineHeight: 1.4,
            },
            h5: {
                fontSize: `${baseFontSizes.h5}rem`,
                fontWeight: 600,
                lineHeight: 1.4,
            },
            h6: {
                fontSize: `${baseFontSizes.h6}rem`,
                fontWeight: 600,
                lineHeight: 1.4,
            },
            body1: {
                fontSize: `${baseFontSizes.body1}rem`,
                lineHeight: 1.5,
            },
            body2: {
                fontSize: `${baseFontSizes.body2}rem`,
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
            MuiButtonBase: {
                styleOverrides: {
                    root: {
                        '&.Mui-disabled': {
                            color: mode === 'light' ? 'rgba(0, 0, 0, 0.26)' : 'rgba(255, 255, 255, 0.26)',
                            backgroundColor: mode === 'light' ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)',
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

    // Add font scale control functions
    const handleSetFontScale = (scale: number) => {
        const clampedScale = Math.max(0.5, Math.min(2.0, scale)); // Clamp between 0.5x and 2.0x
        setFontScale(clampedScale);
        localStorage.setItem('fontScale', clampedScale.toString());
    };

    const resetFontScale = () => {
        setFontScale(1.0);
        localStorage.setItem('fontScale', '1.0');
    };

    // Save theme preference to localStorage whenever mode changes
    useEffect(() => {
        localStorage.setItem('themeMode', mode);
    }, [mode]);

    // Save font scale preference to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('fontScale', fontScale.toString());
    }, [fontScale]);

    // Inject CSS custom properties for font scaling
    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--font-scale', fontScale.toString());

        // Create or update the font scaling CSS
        let styleElement = document.getElementById('font-scaling-styles');
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = 'font-scaling-styles';
            document.head.appendChild(styleElement);
        }

        styleElement.textContent = `
            .font-scalable {
                --h1-size: ${baseFontSizes.h1}rem;
                --h2-size: ${baseFontSizes.h2}rem;
                --h3-size: ${baseFontSizes.h3}rem;
                --h4-size: ${baseFontSizes.h4}rem;
                --h5-size: ${baseFontSizes.h5}rem;
                --h6-size: ${baseFontSizes.h6}rem;
                --body1-size: ${baseFontSizes.body1}rem;
                --body2-size: ${baseFontSizes.body2}rem;
            }
            
            .font-scalable h1 { font-size: calc(var(--h1-size) * var(--font-scale, 1)) !important; }
            .font-scalable h2 { font-size: calc(var(--h2-size) * var(--font-scale, 1)) !important; }
            .font-scalable h3 { font-size: calc(var(--h3-size) * var(--font-scale, 1)) !important; }
            .font-scalable h4 { font-size: calc(var(--h4-size) * var(--font-scale, 1)) !important; }
            .font-scalable h5 { font-size: calc(var(--h5-size) * var(--font-scale, 1)) !important; }
            .font-scalable h6 { font-size: calc(var(--h6-size) * var(--font-scale, 1)) !important; }
            .font-scalable p { font-size: calc(var(--body1-size) * var(--font-scale, 1)) !important; }
            .font-scalable .MuiTypography-body1 { font-size: calc(var(--body1-size) * var(--font-scale, 1)) !important; }
            .font-scalable .MuiTypography-body2 { font-size: calc(var(--body2-size) * var(--font-scale, 1)) !important; }
            .font-scalable .MuiTypography-h1 { font-size: calc(var(--h1-size) * var(--font-scale, 1)) !important; }
            .font-scalable .MuiTypography-h2 { font-size: calc(var(--h2-size) * var(--font-scale, 1)) !important; }
            .font-scalable .MuiTypography-h3 { font-size: calc(var(--h3-size) * var(--font-scale, 1)) !important; }
            .font-scalable .MuiTypography-h4 { font-size: calc(var(--h4-size) * var(--font-scale, 1)) !important; }
            .font-scalable .MuiTypography-h5 { font-size: calc(var(--h5-size) * var(--font-scale, 1)) !important; }
            .font-scalable .MuiTypography-h6 { font-size: calc(var(--h6-size) * var(--font-scale, 1)) !important; }
        `;
    }, [fontScale, baseFontSizes]);

    const value: ThemeContextType = {
        mode,
        setMode,
        toggleTheme,
        theme,
        fontScale,
        setFontScale: handleSetFontScale,
        resetFontScale,
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

