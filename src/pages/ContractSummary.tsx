import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Alert,
    Box,
    Card,
    CardContent,
    Chip,
    Divider,
    List,
    ListItem,
    ListItemText,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import {AttachMoney, ExpandMore, Gavel, Schedule, Security, TrendingUp} from '@mui/icons-material';
import {
    CardBody,
    CardTitle,
    Description,
    FadeIn,
    StyledCard,
    TwoColumnGrid
} from '../components/styled/StyledComponents';
import {useFormData} from '../contexts/FormDataContext';
import FounderModal from '../components/FounderModal';
import ContributorModal from '../components/ContributorModal';

const ContractSummary: React.FC = () => {
    const [expanded, setExpanded] = useState<Set<string>>(new Set(['principles']));
    const location = useLocation();
    const {
        founderData,
        contributorData,
        timesheetEntries,
        totalDeferredWages,
        totalHoursWorked,
        averageHourlyRate
    } = useFormData();

    const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(prev => {
            const newSet = new Set(prev);
            if (isExpanded) {
                newSet.add(panel);
            } else {
                newSet.delete(panel);
            }
            return newSet;
        });
    };

    // Also listen to React Router location changes
    useEffect(() => {
        const hash = location.hash.substring(1); // Remove the # symbol
        console.log('Location changed, hash:', hash);
        if (hash && ['principles', 'protections', 'compensation', 'vesting', 'deferred'].includes(hash)) {
            setExpanded(prev => new Set([...prev, hash]));
            // Scroll to the accordion after a short delay to ensure it's rendered
            setTimeout(() => {
                const element = document.getElementById(`accordion-${hash}`);
                if (element) {
                    element.scrollIntoView({behavior: 'smooth', block: 'start'});
                }
            }, 100);
        }
    }, [location]);

    return (
        <>
            <FadeIn>

                {/* Form Data Summary */}
                {(founderData || contributorData || timesheetEntries.length > 0) && (
                    <StyledCard sx={{mb: 3}}>
                        <CardBody>
                            <CardTitle variant="h5" color="primary">
                                Form Data Summary
                            </CardTitle>

                            <Box sx={{mb: 2}}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    mb: 1
                                }}>
                                    <Typography variant="h6">Founder Information</Typography>
                                    <FounderModal
                                        layout="button"
                                        buttonText="Edit Founder Info"
                                        buttonVariant="outlined"
                                        buttonColor="primary"
                                    />
                                </Box>
                                {founderData && (founderData.name || founderData.email || founderData.phone || founderData.address) ? (
                                    <Box sx={{display: 'flex', gap: 1, flexWrap: 'wrap'}}>
                                        {founderData.name && <Chip label={`Name: ${founderData.name}`} color="primary"
                                                                   variant="outlined"/>}
                                        {founderData.email &&
                                            <Chip label={`Email: ${founderData.email}`} color="primary"
                                                  variant="outlined"/>}
                                        {founderData.phone &&
                                            <Chip label={`Phone: ${founderData.phone}`} color="primary"
                                                  variant="outlined"/>}
                                        {founderData.deferredWageRate &&
                                            <Chip label={`Rate: $${founderData.deferredWageRate.toFixed(2)}/hr`} color="primary"
                                                  variant="outlined"/>}
                                    </Box>
                                ) : (
                                    <Typography variant="body2" color="text.secondary" sx={{fontStyle: 'italic'}}>
                                        No founder information entered yet. Click "Edit Founder Info" to get started.
                                    </Typography>
                                )}
                            </Box>

                            <Box sx={{mb: 2}}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    mb: 1
                                }}>
                                    <Typography variant="h6">Contributor Information</Typography>
                                    <ContributorModal
                                        layout="button"
                                        buttonText="Edit Contributor Info"
                                        buttonVariant="outlined"
                                        buttonColor="secondary"
                                    />
                                </Box>
                                {contributorData && (contributorData.name || contributorData.email || contributorData.phone || contributorData.address) ? (
                                    <Box sx={{display: 'flex', gap: 1, flexWrap: 'wrap'}}>
                                        {contributorData.name &&
                                            <Chip label={`Name: ${contributorData.name}`} color="secondary"
                                                  variant="outlined"/>}
                                        {contributorData.email &&
                                            <Chip label={`Email: ${contributorData.email}`} color="secondary"
                                                  variant="outlined"/>}
                                        {contributorData.totalEquityGranted &&
                                            <Chip label={`Equity: ${contributorData.totalEquityGranted.toFixed(2)}%`}
                                                  color="secondary" variant="outlined"/>}
                                        {contributorData.deferredWageRate &&
                                            <Chip label={`Rate: $${contributorData.deferredWageRate.toFixed(2)}/hr`}
                                                  color="secondary" variant="outlined"/>}
                                    </Box>
                                ) : (
                                    <Typography variant="body2" color="text.secondary" sx={{fontStyle: 'italic'}}>
                                        No contributor information entered yet. Click "Edit Contributor Info" to get
                                        started.
                                    </Typography>
                                )}
                            </Box>

                            {timesheetEntries.length > 0 && (
                                <Box>
                                    <Typography variant="h6" gutterBottom>Timesheet Summary</Typography>
                                    <Box sx={{display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2}}>
                                        <Chip label={`Total Hours: ${totalHoursWorked}`} color="default"
                                              variant="outlined"/>
                                        <Chip label={`Total Deferred: $${totalDeferredWages.toFixed(2)}`}
                                              color="default" variant="outlined"/>
                                        <Chip label={`Avg Rate: $${averageHourlyRate.toFixed(2)}/hr`} color="default"
                                              variant="outlined"/>
                                    </Box>

                                    <TableContainer component={Paper} sx={{maxHeight: 200}}>
                                        <Table size="small">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Contributor</TableCell>
                                                    <TableCell>Date</TableCell>
                                                    <TableCell>Hours</TableCell>
                                                    <TableCell>Rate</TableCell>
                                                    <TableCell>Total</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {timesheetEntries.slice(0, 5).map((entry, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell>{entry.contributor}</TableCell>
                                                        <TableCell>{entry.date}</TableCell>
                                                        <TableCell>{entry.hours}</TableCell>
                                                        <TableCell>${entry.rate.toFixed(2)}</TableCell>
                                                        <TableCell>${entry.total.toFixed(2)}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    {timesheetEntries.length > 5 && (
                                        <Typography variant="body2" color="text.secondary" sx={{mt: 1}}>
                                            ... and {timesheetEntries.length - 5} more entries
                                        </Typography>
                                    )}
                                </Box>
                            )}
                        </CardBody>
                    </StyledCard>
                )}

                {/* Contract Content */}
                <StyledCard>
                    <CardBody>
                        {/* Introduction */}
                        <CardTitle variant="h5" color="primary">
                            Founding Contributor Engagement Agreement
                        </CardTitle>
                        <Description>
                            This agreement is made between <strong>[Founders' Names]</strong> (collectively, "Founders")
                            and <strong>[Contributors' Names]</strong> (collectively, "Contributors") to define the
                            terms
                            for ownership, compensation, and shared commitment in building a product together.
                        </Description>
                        <Description>
                            All parties agree that the following terms shall apply to the entire scope of ownership,
                            compensation, and protections within the IP Holding Company ("Company") and any subsidiary
                            corporations or business entities.
                        </Description>

                        {/* Core Principles */}
                        <Accordion
                            id="accordion-principles"
                            expanded={expanded.has('principles')}
                            onChange={handleChange('principles')}
                        >
                            <AccordionSummary expandIcon={<ExpandMore/>}>
                                <CardTitle variant="h6">
                                    <Security/> The Twofold Principles of this Agreement
                                </CardTitle>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Description>
                                    This agreement is built on two core principles:
                                </Description>

                                <TwoColumnGrid>
                                    <Card variant="outlined">
                                        <CardContent>
                                            <CardTitle variant="h6" color="primary">
                                                1. Protections
                                            </CardTitle>
                                            <List dense>
                                                <ListItem>
                                                    <ListItemText
                                                        primary="A. Protect each Founder's brand ownership and Company IP"
                                                        secondary="Ensure final authority in Company direction"
                                                    />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText
                                                        primary="B. Protect each Contributor's freedom"
                                                        secondary="Pursue other opportunities while honoring agreement terms"
                                                    />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText
                                                        primary="C. Ensure mutual commitment and accountability"
                                                        secondary="Consistent, high-impact contributions"
                                                    />
                                                </ListItem>
                                            </List>
                                        </CardContent>
                                    </Card>

                                    <Card variant="outlined">
                                        <CardContent>
                                            <CardTitle variant="h6" color="primary">
                                                2. Compensation
                                            </CardTitle>
                                            <List dense>
                                                <ListItem>
                                                    <ListItemText
                                                        primary="A. Transparent path to minority equity"
                                                        secondary="Clear equity holdings in the Company"
                                                    />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText
                                                        primary="B. Reimbursement for unpaid time"
                                                        secondary="When company is sold or earns sufficient profit"
                                                    />
                                                </ListItem>
                                            </List>
                                        </CardContent>
                                    </Card>
                                </TwoColumnGrid>
                            </AccordionDetails>
                        </Accordion>

                        {/* Protections */}
                        <Accordion
                            id="accordion-protections"
                            expanded={expanded.has('protections')}
                            onChange={handleChange('protections')}
                        >
                            <AccordionSummary expandIcon={<ExpandMore/>}>
                                <CardTitle variant="h6">
                                    <Gavel/> 1. Protections
                                </CardTitle>
                            </AccordionSummary>
                            <AccordionDetails>
                                <CardTitle variant="h6">
                                    Intellectual Property (IP) Definition
                                </CardTitle>
                                <Description>
                                    "IP" is defined as a specific set of proprietary assets critical to the business:
                                </Description>
                                <List>
                                    <ListItem>
                                        <ListItemText primary="• Proprietary user data and customer lists"/>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="• Content, created or curated uniquely to the Company"/>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary="• Trade secrets related to business strategies, financial information, and customer data"/>
                                    </ListItem>
                                </List>

                                <Alert severity="info">
                                    <Description variant="body2">
                                        <strong>Excluded:</strong> Contributors' general skills, experience, and
                                        knowledge,
                                        as well as general software code, algorithms, and development methodologies that
                                        are
                                        not proprietary to the Company's core IP.
                                    </Description>
                                </Alert>

                                <Divider sx={{my: 3}}/>

                                <CardTitle variant="h6">
                                    Mutual Commitment and Impact
                                </CardTitle>
                                <List>
                                    <ListItem>
                                        <ListItemText
                                            primary="Performance Review"
                                            secondary="Contributions evaluated quarterly based on agreed-upon goals"
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary="Accountability"
                                            secondary="Right to re-evaluate roles, vesting schedule, or engagement if commitments not met"
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary="At-Will Engagement"
                                            secondary="Either party may terminate at any time, with or without cause"
                                        />
                                    </ListItem>
                                </List>

                                <Divider sx={{my: 3}}/>

                                <CardTitle variant="h6">
                                    Non-Solicitation
                                </CardTitle>
                                <Description>
                                    For <strong>twelve (12) months</strong> following departure, Contributors agree not
                                    to:
                                </Description>
                                <List>
                                    <ListItem>
                                        <ListItemText
                                            primary="• Solicit employees or independent contractors to leave"/>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary="• Solicit customers for competitive services or products"/>
                                    </ListItem>
                                </List>

                                <Divider sx={{my: 3}}/>

                                <CardTitle variant="h6">
                                    Code Reuse & Competitive Projects
                                </CardTitle>
                                <Description>
                                    For <strong>twelve (12) months</strong> following departure, Contributors agree not
                                    to use
                                    software code, algorithms, or development methodologies developed for the Company on
                                    competing products or services within the same industry.
                                </Description>
                            </AccordionDetails>
                        </Accordion>

                        {/* Compensation */}
                        <Accordion
                            id="accordion-compensation"
                            expanded={expanded.has('compensation')}
                            onChange={handleChange('compensation')}
                        >
                            <AccordionSummary expandIcon={<ExpandMore/>}>
                                <CardTitle variant="h6">
                                    <AttachMoney/> 2. Compensation
                                </CardTitle>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Description>
                                    This section provides a clear and transparent path to earning equity and fair
                                    compensation
                                    for all contributions.
                                </Description>
                            </AccordionDetails>
                        </Accordion>

                        {/* Vesting Equity */}
                        <Accordion
                            id="accordion-vesting"
                            expanded={expanded.has('vesting')}
                            onChange={handleChange('vesting')}
                        >
                            <AccordionSummary expandIcon={<ExpandMore/>}>
                                <CardTitle variant="h6">
                                    <Schedule/> Vesting Equity
                                </CardTitle>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Description>
                                    A founding contributor will be granted stock and/or membership units representing
                                    <strong> [___%]</strong> of the fully-diluted equity in both the C-Corporation and
                                    the IP Holding Company. This equity grant is not contingent on any separate capital
                                    contribution.
                                </Description>

                                <CardTitle variant="h6">
                                    Vesting Schedule
                                </CardTitle>
                                <Description>
                                    The equity allocation shall vest over a <strong>4-year period (48 months)</strong>.
                                    The vesting rate will accelerate over time, rewarding sustained commitment.
                                </Description>

                                <CardTitle variant="h6">
                                    Vesting Formula
                                </CardTitle>
                                <Card variant="outlined" sx={{p: 2, mb: 2, bgcolor: 'grey.50'}}>
                                    <Description fontFamily="monospace">
                                        Vested Equity = Total Equity Granted × ((Days Worked - Cliff Days) / (Total
                                        Vesting Days - Cliff Days))²
                                    </Description>
                                </Card>

                                <Alert severity="warning" sx={{mb: 2}}>
                                    <Description variant="body2">
                                        <strong>6-month cliff period:</strong> No equity vests before completing 180
                                        days of work.
                                    </Description>
                                </Alert>

                                <CardTitle variant="h6">
                                    Example Vesting Schedule (25% equity over 4 years)
                                </CardTitle>
                                <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 1}}>
                                    {[
                                        {months: 6, days: 180, equity: 0.00},
                                        {months: 12, days: 365, equity: 0.52},
                                        {months: 18, days: 547, equity: 2.05},
                                        {months: 24, days: 730, equity: 4.61},
                                        {months: 30, days: 912, equity: 8.17},
                                        {months: 36, days: 1095, equity: 12.77},
                                        {months: 42, days: 1277, equity: 18.36},
                                        {months: 48, days: 1460, equity: 25.00}
                                    ].map((row) => (
                                        <Card variant="outlined" sx={{p: 1, textAlign: 'center', minWidth: 100}}>
                                            <Description variant="body2" color="text.secondary">
                                                {row.months} months
                                            </Description>
                                            <CardTitle variant="h6" color="primary">
                                                {row.equity}%
                                            </CardTitle>
                                        </Card>
                                    ))}
                                </Box>
                            </AccordionDetails>
                        </Accordion>

                        {/* Deferred Compensation */}
                        <Accordion
                            id="accordion-deferred"
                            expanded={expanded.has('deferred')}
                            onChange={handleChange('deferred')}
                        >
                            <AccordionSummary expandIcon={<ExpandMore/>}>
                                <CardTitle variant="h6">
                                    <TrendingUp/> Deferred Compensation
                                </CardTitle>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Description>
                                    The purpose of deferred wages is to protect all parties from a sale where only some
                                    equity holders will be reimbursed for unpaid efforts invested in the Company.
                                </Description>

                                <CardTitle variant="h6">
                                    Accrual
                                </CardTitle>
                                <Description>
                                    Deferred hourly wages begin accumulating upon signing and continue until the Company
                                    can negotiate a standard salary paid monthly. This shall be considered a debt on the
                                    balance sheet of the Company.
                                </Description>

                                <CardTitle variant="h6">
                                    Payment Conditions
                                </CardTitle>
                                <List>
                                    <ListItem>
                                        <ListItemText
                                            primary="All operating expenses paid"
                                            secondary="Current and past months"
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary="All employee and contractor wages paid"
                                            secondary="Priority over deferred wages"
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary="3-month cash reserve maintained"
                                            secondary="Minimum operating expense buffer"
                                        />
                                    </ListItem>
                                </List>

                                <CardTitle variant="h6">
                                    Pro-Rata Payment
                                </CardTitle>
                                <Description>
                                    Accrued deferred wages shall be paid from monthly net income on a pro-rata basis.
                                    Each party's share is calculated as their total accrued deferred wages divided by
                                    the total accrued deferred wages of all parties.
                                </Description>

                                <Alert severity="info" sx={{my: 2}}>
                                    <Description variant="body2">
                                        <strong>Example:</strong> Total Owed: $5,000 (Contributor) + $1,000 (Founder) =
                                        $6,000<br/>
                                        Available Profit: $1,000<br/>
                                        Distribution: 16.67% to each party
                                    </Description>
                                </Alert>

                                <CardTitle variant="h6">
                                    Time Tracking
                                </CardTitle>
                                <Description>
                                    Both parties agree to maintain accurate time records in a shared digital log with
                                    the following headings: Contributor Name, Date, Work Done, Hours, Rate ($/hr),
                                    Total.
                                </Description>

                                <CardTitle variant="h6">
                                    Disputes
                                </CardTitle>
                                <Description>
                                    Any Founder or Contributor may dispute any log entry within 14 days. They must
                                    provide written reasoning and offer a way to remedy the dispute to earn those hours.
                                </Description>
                            </AccordionDetails>
                        </Accordion>
                    </CardBody>
                </StyledCard>
            </FadeIn>

        </>
    );
};

export default ContractSummary;
