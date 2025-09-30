import React, {useState} from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography
} from '@mui/material';
import {AttachMoney, ExpandMore, Gavel, Schedule, Security, TrendingUp} from '@mui/icons-material';

const ContractDetails: React.FC = () => {
    const [expanded, setExpanded] = useState<string | false>('principles');

    const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom align="center" color="primary">
                Full Contract Details
            </Typography>

            <Typography variant="body1" paragraph align="center" color="text.secondary" sx={{mb: 4}}>
                Complete terms and conditions of the Founding Contributor Engagement Agreement
            </Typography>

            {/* Contract Content */}
            <Box>
                {/* Introduction */}
                <Paper elevation={2} sx={{p: 3, mb: 3}}>
                    <Typography variant="h5" gutterBottom color="primary">
                        Founding Contributor Engagement Agreement
                    </Typography>
                    <Typography variant="body1" paragraph>
                        This agreement is made between <strong>[Founders' Names]</strong> (collectively, "Founders")
                        and <strong>[Contributors' Names]</strong> (collectively, "Contributors") to define the terms
                        for ownership, compensation, and shared commitment in building a product together.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        All parties agree that the following terms shall apply to the entire scope of ownership,
                        compensation, and protections within the IP Holding Company ("Company") and any subsidiary
                        corporations or business entities.
                    </Typography>

                    <Typography variant="h6" gutterBottom sx={{mt: 3}}>
                        Shared Purpose and Background
                    </Typography>
                    <Typography variant="body1">
                        Building a company is an act of shared creation. Our goal with this agreement is to
                        transparently define the value we are creating together, ensuring fairness and security
                        for every individual involved. This document is designed to protect our shared vision
                        and the contributions that bring it to life.
                    </Typography>
                </Paper>

                {/* Core Principles */}
                <Accordion expanded={expanded === 'principles'} onChange={handleChange('principles')}>
                    <AccordionSummary expandIcon={<ExpandMore/>}>
                        <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                            <Security color="primary"/>
                            <Typography variant="h6">The Twofold Principles of this Agreement</Typography>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box>
                            <Typography variant="body1" paragraph>
                                This agreement is built on two core principles:
                            </Typography>

                            <Box sx={{display: 'flex', gap: 3, flexWrap: 'wrap'}}>
                                <Card variant="outlined" sx={{flex: 1, minWidth: 300}}>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom color="primary">
                                            1. Protections
                                        </Typography>
                                        <Typography variant="body2" paragraph>
                                            A. To protect each Founder's brand ownership, Company IP and ensure they
                                            have final authority in the direction of the Company
                                        </Typography>
                                        <Typography variant="body2" paragraph>
                                            B. To protect each Contributor's freedom to pursue other opportunities as a
                                            founder or contributor in other projects so long they honor all terms in
                                            this agreement.
                                        </Typography>
                                        <Typography variant="body2">
                                            C. Ensure mutual commitment and accountability.
                                        </Typography>
                                    </CardContent>
                                </Card>

                                <Card variant="outlined" sx={{flex: 1, minWidth: 300}}>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom color="primary">
                                            2. Compensation
                                        </Typography>
                                        <Typography variant="body2" paragraph>
                                            A. To grant each Contributor a transparent path to earning minority equity
                                            holdings in the Company.
                                        </Typography>
                                        <Typography variant="body2">
                                            B. To ensure everyone is reimbursed for unpaid time if the company is sold
                                            or starts to earn enough profit.
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                        </Box>
                    </AccordionDetails>
                </Accordion>

                {/* Protections */}
                <Accordion expanded={expanded === 'protections'} onChange={handleChange('protections')}>
                    <AccordionSummary expandIcon={<ExpandMore/>}>
                        <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                            <Gavel color="primary"/>
                            <Typography>1. Protections</Typography>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box>
                            <Typography variant="body1" paragraph>
                                This section is dedicated to protecting the shared business vision and ensuring
                                consistent, high-impact contributions.
                            </Typography>

                            <Typography variant="h6" gutterBottom>
                                Definitions
                            </Typography>
                            <Typography variant="body1" paragraph>
                                For the purpose of this agreement, "IP" is defined as a specific set of proprietary
                                assets critical to the business. This includes:
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemText primary="• Proprietary user data and customer lists."/>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="• Content, created or curated uniquely to the Company."/>
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="• Trade secrets related to business strategies, financial information, and customer data."/>
                                </ListItem>
                            </List>

                            <Alert severity="info" sx={{my: 2}}>
                                <Typography variant="body2">
                                    <strong>Excluded:</strong> This definition expressly excludes the Contributors'
                                    general skills, experience, and knowledge, as well as general software code,
                                    algorithms, and development methodologies that are not proprietary to the Company's
                                    core IP.
                                </Typography>
                            </Alert>

                            <Divider sx={{my: 3}}/>

                            <Typography variant="h6" gutterBottom>
                                Mutual Commitment and Impact
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Both Founders and Contributors agree to a mutual commitment to consistent, high-impact
                                work. This is the foundation upon which this agreement is built.
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemText
                                        primary="Performance Review"
                                        secondary="Contributions will be evaluated quarterly based on the agreed-upon goals."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Accountability"
                                        secondary="If a Contributor is not meeting their agreed-upon commitments, the Founders reserve the right to work with the Contributor to re-evaluate their role, vesting schedule, or engagement with the Company, ensuring that all parties are aligned and committed to the shared goal."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="At-Will Engagement"
                                        secondary="This engagement is at-will. Either party may terminate the engagement at any time, with or without cause, and without prior notice. The termination of this engagement will not affect the Contributor's right to any vested equity or earned deferred wages up to the date of termination."
                                    />
                                </ListItem>
                            </List>

                            <Divider sx={{my: 3}}/>

                            <Typography variant="h6" gutterBottom>
                                Non-Solicitation
                            </Typography>
                            <Typography variant="body1" paragraph>
                                To protect the relationships we've built, the Contributor agrees that for a period
                                of <strong>twelve (12) months</strong> following their departure from the Company, they
                                will not, either directly or indirectly:
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemText
                                        primary="• Solicit, entice, or persuade any employee or independent contractor of the Company to leave their employment or engagement."/>
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="• Solicit any customer of the Company with whom they had direct contact during their engagement, for the purpose of providing services or products that are competitive with the Company's business."/>
                                </ListItem>
                            </List>

                            <Divider sx={{my: 3}}/>

                            <Typography variant="h6" gutterBottom>
                                Code Reuse & Competitive Projects
                            </Typography>
                            <Typography variant="body1" paragraph>
                                As defined above, the Company's IP does not include general software code or algorithms.
                                However, to protect the Founder's market positioning, the Contributor agrees that for a
                                period of <strong>twelve (12) months</strong> following their departure from the
                                Company, they will not, either directly or indirectly, use software code, algorithms, or
                                development methodologies developed for the Company to work on a new product or service
                                within the same industry that directly competes with the Company's business.
                            </Typography>
                        </Box>
                    </AccordionDetails>
                </Accordion>

                {/* Compensation */}
                <Accordion expanded={expanded === 'compensation'} onChange={handleChange('compensation')}>                    

                    <AccordionSummary expandIcon={<ExpandMore/>}>
                        <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                            <AttachMoney color="primary"/>
                            <Typography>Compensation</Typography>
                        </Box>
                    </AccordionSummary>

                    <AccordionDetails>
                        <Typography variant="body1" paragraph>
                            This section is dedicated to providing a clear and transparent path to earning equity and
                            fair compensation for all contributions.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                {/* Vesting Equity */}
                <Accordion expanded={expanded === 'vesting'} onChange={handleChange('vesting')}>
                    <AccordionSummary expandIcon={<ExpandMore/>}>
                        <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                            <Schedule color="primary"/>
                            <Typography variant="h6">Vesting Equity</Typography>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box>
                            <Typography variant="body1" paragraph>
                                A founding contributor ("Contributor") will be granted stock and/or membership units
                                representing <strong>[___%]</strong> of the fully-diluted equity in both the
                                C-Corporation and the IP Holding Company. This equity grant is not contingent on any
                                separate capital contribution.
                            </Typography>

                            <Typography variant="h6" gutterBottom>
                                Vesting Schedule
                            </Typography>
                            <Typography variant="body1" paragraph>
                                The <strong>[___%]</strong> equity allocation shall vest over a 4-year period (48
                                months). The vesting rate will accelerate over time, rewarding sustained commitment.
                            </Typography>

                            <Typography variant="h6" gutterBottom>
                                Vesting Formula
                            </Typography>
                            <Typography variant="body1" paragraph>
                                The amount of vested equity will be calculated using the following formula:
                            </Typography>
                            <Paper variant="outlined" sx={{p: 2, mb: 2, bgcolor: 'grey.50'}}>
                                <Typography variant="body1" fontFamily="monospace">
                                    Vested Equity = Total Equity Granted * ( (Days Worked - Cliff Days) / (Total Vesting
                                    Days - Cliff Days) )^2
                                </Typography>
                            </Paper>
                            <Typography variant="body1" paragraph>
                                This vesting formula is applicable only after the Contributor has successfully completed
                                the initial <strong>6-month cliff period</strong>. If the Contributor leaves before this
                                period, no equity will have vested.
                            </Typography>

                            <Typography variant="h6" gutterBottom>
                                Example Vesting Schedule
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Below is an example of a <strong>25%</strong> equity grant vesting over <strong>4
                                years</strong> (1460 days), showing the accelerating growth of vested equity over time.
                            </Typography>

                            <Box sx={{overflowX: 'auto', mb: 2}}>
                                <table style={{width: '100%', borderCollapse: 'collapse'}}>
                                    <thead>
                                    <tr style={{backgroundColor: '#f5f5f5'}}>
                                        <th style={{padding: '8px', border: '1px solid #ddd', textAlign: 'left'}}>Time
                                            (Months)
                                        </th>
                                        <th style={{padding: '8px', border: '1px solid #ddd', textAlign: 'left'}}>Days
                                            Worked
                                        </th>
                                        <th style={{padding: '8px', border: '1px solid #ddd', textAlign: 'left'}}>Vested
                                            Equity
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {[
                                        {months: 6, days: 180, equity: '0.00%'},
                                        {months: 12, days: 365, equity: '0.52%'},
                                        {months: 18, days: 547, equity: '2.05%'},
                                        {months: 24, days: 730, equity: '4.61%'},
                                        {months: 30, days: 912, equity: '8.17%'},
                                        {months: 36, days: 1095, equity: '12.77%'},
                                        {months: 42, days: 1277, equity: '18.36%'},
                                        {months: 48, days: 1460, equity: '25.00%'}
                                    ].map((row, index) => (
                                        <tr key={index}>
                                            <td style={{padding: '8px', border: '1px solid #ddd'}}>
                                                <strong>{row.months}</strong></td>
                                            <td style={{padding: '8px', border: '1px solid #ddd'}}>{row.days}</td>
                                            <td style={{padding: '8px', border: '1px solid #ddd'}}>{row.equity}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </Box>

                            <Typography variant="h6" gutterBottom>
                                Leaving the Company
                            </Typography>
                            <Typography variant="body1" paragraph>
                                If a Contributor's engagement ends before the 6-month cliff, no equity will have vested,
                                and the entire equity grant will be returned to the Company. If a Contributor leaves
                                after the 6-month cliff, they will retain all equity vested up to that point.
                            </Typography>
                        </Box>
                    </AccordionDetails>
                </Accordion>

                {/* Deferred Compensation */}
                <Accordion expanded={expanded === 'deferred'} onChange={handleChange('deferred')}>
                    <AccordionSummary expandIcon={<ExpandMore/>}>
                        <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                            <TrendingUp color="primary"/>
                            <Typography variant="h6">Deferred Compensation</Typography>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box>
                            <Typography variant="body1" paragraph>
                                The purpose of the deferred wage is to protect all parties from a sale where only some
                                equity holders will be reimbursed for unpaid efforts invested in the Company.
                            </Typography>

                            <Typography variant="h6" gutterBottom>
                                Accrual
                            </Typography>
                            <Typography variant="body1" paragraph>
                                This deferred hourly wage begins accumulating upon signing and continues until the
                                Company is able to negotiate a standard salary paid monthly. It shall be considered a
                                debt on the balance sheet of the Company.
                            </Typography>

                            <Typography variant="h6" gutterBottom>
                                Rates
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Both the Founders and the Contributors shall be entitled to deferred wages at the rates
                                below:
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemText primary="• Founder A: $[___] / hour"/>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="• Contributor A: $[___] / hour"/>
                                </ListItem>
                            </List>

                            <Typography variant="h6" gutterBottom>
                                Pro-Rata Payment
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Accrued deferred wages shall be paid from monthly net income (as defined by GAAP
                                accounting standards) on a pro-rata basis. The pro-rata share for each party shall be
                                calculated as their total accrued deferred wages divided by the total accrued deferred
                                wages of all parties.
                            </Typography>

                            <Typography variant="h6" gutterBottom>
                                Conditions for Payment
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Payment shall be made at the end of any month in which the following conditions are met:
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemText
                                        primary="All operating expenses for the current and past months have been paid."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="All other employee and contractor wages have been paid."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="The company maintains a minimum cash reserve equal to three (3) months of average monthly operating expenses."
                                    />
                                </ListItem>
                            </List>

                            <Typography variant="h6" gutterBottom>
                                Example Calculation
                            </Typography>
                            <Box sx={{bgcolor: 'grey.50', p: 2, borderRadius: 1, mb: 2}}>
                                <Typography variant="body2" paragraph>
                                    <strong>Total Owed:</strong> $5,000 (Contributor) + $1,000 (Founder) = $6,000<br/>
                                    <strong>Available Profit:</strong> $1,000<br/>
                                    <strong>Distribution Percentage:</strong> $1,000 / $6,000 = 16.67%<br/>
                                    <strong>Contributor's Payment:</strong> $5,000 * 16.67% = $833.33<br/>
                                    <strong>Founder's Payment:</strong> $1,000 * 16.67% = $166.67
                                </Typography>
                            </Box>

                            <Typography variant="h6" gutterBottom>
                                Time Tracking
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Both parties agree to maintain accurate time records in a shared digital log, as a
                                spreadsheet with the following headings: Contributor Name, Date, Work Done, Hours, Rate
                                ($/hr), Total.
                            </Typography>

                            <Typography variant="h6" gutterBottom>
                                Disputes
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Any Founder or Contribute may dispute any log entry for another within 14 days. They
                                must provide written reasoning and offer a way to remedy the dispute in order to earn
                                those hours.
                            </Typography>

                            <Typography variant="h6" gutterBottom>
                                Rate Changes
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Once the Company has cleared all debts and can afford a salary guarantee, the Founders
                                may propose a standard salary for the Contributors. The Company's operating body,
                                through majority vote, may at any point decide to hire other workers rather than pay a
                                Parties' deferred rate. If the Founders or Contributors choose not to accept a standard
                                salary in lieu of deferred wages, their position may be re-evaluated by the Company.
                            </Typography>
                        </Box>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Box>
    );
};

export default ContractDetails;
