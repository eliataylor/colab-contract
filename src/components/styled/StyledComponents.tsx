import {styled} from '@mui/material/styles';
import {Box, Button, Card, CardContent, Paper, Typography} from '@mui/material';

// Spacing constants
export const SPACING = {
    xs: 1,    // 8px
    sm: 2,    // 16px
    md: 3,    // 24px
    lg: 4,    // 32px
    xl: 6,    // 48px
    xxl: 8,   // 64px
} as const;

// Layout components
export const PageContainer = styled(Box)(({theme}) => ({
    padding: theme.spacing(SPACING.md),
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
}));

export const SectionContainer = styled(Box)(({theme}) => ({
    marginBottom: theme.spacing(SPACING.lg),
}));

export const FlexContainer = styled(Box)(({theme}) => ({
    display: 'flex',
    gap: theme.spacing(SPACING.md),
    flexWrap: 'wrap',
}));

export const FlexColumn = styled(Box)(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(SPACING.md),
}));

export const FlexRow = styled(Box)(({theme}) => ({
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(SPACING.md),
    alignItems: 'center',
}));

export const FlexCenter = styled(Box)(({theme}) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing(SPACING.md),
}));

export const FlexBetween = styled(Box)(({theme}) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing(SPACING.md),
}));

// Card components
export const StyledCard = styled(Card)(({theme}) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
}));

export const CardHeader = styled(Box)(({theme}) => ({
    padding: theme.spacing(SPACING.md),
    paddingBottom: theme.spacing(SPACING.sm),
}));

export const CardBody = styled(CardContent)(({theme}) => ({
    flex: 1,
    padding: theme.spacing(SPACING.md),
    '&:last-child': {
        paddingBottom: theme.spacing(SPACING.md),
    },
}));

export const CardFooter = styled(Box)(({theme}) => ({
    padding: theme.spacing(SPACING.md),
    paddingTop: theme.spacing(SPACING.sm),
}));

// Typography components
export const PageTitle = styled(Typography)(({theme}) => ({
    marginBottom: theme.spacing(SPACING.md),
}));

export const MainPageTitle = styled(Typography)(({theme}) => ({
    marginBottom: theme.spacing(SPACING.md),
    textAlign: 'center',
}));

export const SectionTitle = styled(Typography)(({theme}) => ({
    marginBottom: theme.spacing(SPACING.sm),
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(SPACING.xs),
}));

export const CardTitle = styled(Typography)(({theme}) => ({
    marginBottom: theme.spacing(SPACING.sm),
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(SPACING.xs),
}));

export const Description = styled(Typography)(({theme}) => ({
    marginBottom: theme.spacing(SPACING.md),
    color: theme.palette.text.secondary,
}));

// Button components
export const PrimaryButton = styled(Button)(({theme}) => ({
    minWidth: 200,
    padding: theme.spacing(SPACING.sm, SPACING.lg),
}));

export const SecondaryButton = styled(Button)(({theme}) => ({
    minWidth: 200,
    padding: theme.spacing(SPACING.sm, SPACING.lg),
}));

export const ActionButton = styled(Button)(({theme}) => ({
    minWidth: 120,
}));

// Layout grid components
export const TwoColumnGrid = styled(Box)(({theme}) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: theme.spacing(SPACING.md),
    [theme.breakpoints.down('md')]: {
        gridTemplateColumns: '1fr',
    },
}));

export const ThreeColumnGrid = styled(Box)(({theme}) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: theme.spacing(SPACING.md),
    [theme.breakpoints.down('lg')]: {
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    },
    [theme.breakpoints.down('md')]: {
        gridTemplateColumns: '1fr',
    },
}));

// Hero section
export const HeroSection = styled(Paper)(({theme}) => ({
    padding: theme.spacing(SPACING.xxl),
    marginBottom: theme.spacing(SPACING.lg),
    textAlign: 'center',
    background: 'linear-gradient(135deg, #d97705 0%, #ea580c 50%, #b45309 100%)',
    color: 'white',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, rgba(217, 119, 5, 0.9) 0%, rgba(234, 88, 12, 0.9) 50%, rgba(180, 83, 9, 0.9) 100%)',
        zIndex: 1,
    },
    '& > *': {
        position: 'relative',
        zIndex: 2,
    },
}));

// Chip container
export const ChipContainer = styled(Box)(({theme}) => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(SPACING.sm),
    justifyContent: 'center',
    marginTop: theme.spacing(SPACING.md),
}));

// Form components
export const FormContainer = styled(Paper)(({theme}) => ({
    padding: theme.spacing(SPACING.lg),
    maxWidth: 600,
    margin: '0 auto',
}));

export const FormSection = styled(Box)(({theme}) => ({
    marginBottom: theme.spacing(SPACING.lg),
}));

export const FormActions = styled(Box)(({theme}) => ({
    display: 'flex',
    justifyContent: 'flex-end',
    gap: theme.spacing(SPACING.sm),
    marginTop: theme.spacing(SPACING.lg),
}));

// List components
export const StyledList = styled(Box)(({theme}) => ({
    '& .MuiListItem-root': {
        padding: theme.spacing(SPACING.sm),
        borderRadius: 0,
        marginBottom: theme.spacing(SPACING.xs),
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}));

// Status components
export const StatusContainer = styled(Box)(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(SPACING.sm),
    marginTop: theme.spacing(SPACING.md),
}));

// Responsive utilities
export const HideOnMobile = styled(Box)(({theme}) => ({
    [theme.breakpoints.down('md')]: {
        display: 'none',
    },
}));

export const ShowOnMobile = styled(Box)(({theme}) => ({
    display: 'none',
    [theme.breakpoints.down('md')]: {
        display: 'block',
    },
}));

// Animation utilities
export const FadeIn = styled(Box)(({theme}) => ({
    animation: 'fadeIn 0.3s ease-in-out',
    '@keyframes fadeIn': {
        from: {
            opacity: 0,
            transform: 'translateY(10px)',
        },
        to: {
            opacity: 1,
            transform: 'translateY(0)',
        },
    },
}));

export const SlideIn = styled(Box)(({theme}) => ({
    animation: 'slideIn 0.3s ease-out',
    '@keyframes slideIn': {
        from: {
            transform: 'translateX(-20px)',
            opacity: 0,
        },
        to: {
            transform: 'translateX(0)',
            opacity: 1,
        },
    },
}));
