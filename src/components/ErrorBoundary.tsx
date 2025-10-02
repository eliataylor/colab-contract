import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { Refresh } from '@mui/icons-material';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
    errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
        this.setState({
            error,
            errorInfo,
        });
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: undefined, errorInfo: undefined });
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '100vh',
                        p: 3,
                        backgroundColor: '#f5f5f5',
                    }}
                >
                    <Paper
                        sx={{
                            p: 4,
                            maxWidth: 600,
                            textAlign: 'center',
                            boxShadow: 3,
                        }}
                    >
                        <Typography variant="h4" color="error" gutterBottom>
                            Something went wrong
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 3 }}>
                            We encountered an error while loading the application. This might be due to a theme or component initialization issue.
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<Refresh />}
                            onClick={this.handleRetry}
                            sx={{ mr: 2 }}
                        >
                            Try Again
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => window.location.reload()}
                        >
                            Reload Page
                        </Button>
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <Box sx={{ mt: 3, textAlign: 'left' }}>
                                <Typography variant="h6" gutterBottom>
                                    Error Details (Development):
                                </Typography>
                                <Typography
                                    variant="body2"
                                    component="pre"
                                    sx={{
                                        backgroundColor: '#f0f0f0',
                                        p: 2,
                                        borderRadius: 1,
                                        overflow: 'auto',
                                        fontSize: '0.75rem',
                                    }}
                                >
                                    {this.state.error.toString()}
                                    {this.state.errorInfo?.componentStack}
                                </Typography>
                            </Box>
                        )}
                    </Paper>
                </Box>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
