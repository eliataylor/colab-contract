import React, {useState, useEffect} from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
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
import {AttachMoney, Business, ExpandMore, Gavel, Payment, Security, Timeline} from '@mui/icons-material';
import {useContractData} from '../contexts/FormDataContext';
import EditableIPDefinition from './EditableIPDefinition';
import {useScrollToHash} from '../hooks/useScrollToHash';
import SimpleVestingCalculator from './SimpleVestingCalculator';
import VestingFormula from './VestingFormula';
import FounderModal from './FounderModal';
import ContributorModal from './ContributorModal';
import {useLocation} from 'react-router-dom';

const ContractDocument: React.FC = () => {
    const {getContractPlaceholders} = useContractData();
    const placeholders = getContractPlaceholders();
    const [expanded, setExpanded] = useState<Set<string>>(new Set(['principles']));
    const [founderModalOpen, setFounderModalOpen] = useState(false);
    const [contributorModalOpen, setContributorModalOpen] = useState(false);
    const location = useLocation();

    // Use the scroll to hash hook
    useScrollToHash();

    // Auto-expand accordion based on hash
    useEffect(() => {
        const hash = location.hash.replace('#', '');
        
        // Map hash values to accordion panel names
        const hashToPanelMap: { [key: string]: string } = {
            'principles': 'principles',
            'protections': 'protections', 
            'compensation': 'compensation',
            'vesting': 'vesting',
            'deferred-wage': 'deferred',
            'founder-contact': 'founder-contact',
            'contributor-contact': 'contributor-contact'
        };

        if (hash && hashToPanelMap[hash]) {
            const panelToExpand = hashToPanelMap[hash];
            
            // For contact sections, open the appropriate modal
            if (panelToExpand === 'founder-contact') {
                setFounderModalOpen(true);
            } else if (panelToExpand === 'contributor-contact') {
                setContributorModalOpen(true);
            } else {
                // For accordion sections, expand the panel
                setExpanded(prev => {
                    const newSet = new Set(prev);
                    newSet.add(panelToExpand);
                    return newSet;
                });
            }
        }
    }, [location.hash]);

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

    const toggleAll = () => {
        const allPanels = ['principles', 'protections', 'compensation', 'vesting', 'deferred'];
        if (expanded.size === allPanels.length) {
            setExpanded(new Set());
        } else {
            setExpanded(new Set(allPanels));
        }
    };

    return (
        <Box sx={{margin: '0 auto', padding: 3}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3}}>
                <Typography variant="h3" component="h1" color="primary">
                    <strong>Founding Contributor Engagement Agreement</strong>
                </Typography>
                <Button
                    variant="outlined"
                    size="small"
                    onClick={toggleAll}
                    sx={{ml: 2}}
                >
                    {expanded.size === 5 ? 'Collapse All' : 'Expand All'}
                </Button>
            </Box>

            <Typography variant="body1" paragraph sx={{fontSize: '1.1rem', lineHeight: 1.6}}>
                This agreement is made between <strong>{placeholders.FOUNDER_NAMES}</strong> (collectively, "Founders")
                and <strong>{placeholders.CONTRIBUTOR_NAMES}</strong> (collectively, "Contributors") to define the terms
                for ownership, compensation, and shared commitment in building a product together.
            </Typography>

            <Typography variant="body1" paragraph sx={{fontSize: '1.1rem', lineHeight: 1.6}}>
                All parties agree that the following terms shall apply to the entire scope of ownership, compensation,
                and protections within the IP Holding Company ("Company") and any subsidiary corporations or business
                entities.
            </Typography>

            <Typography
                id="background"
                variant="h4"
                component="h2"
                gutterBottom
                sx={{mt: 4, mb: 2}}
                color="primary"
            >
                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                    <Business color="primary"/>
                    <strong>Shared Purpose and Background</strong>
                </Box>
            </Typography>

            <Typography variant="body1" paragraph sx={{fontSize: '1.1rem', lineHeight: 1.6}}>
                Building a company is an act of shared creation. Our goal with this agreement is to transparently define
                the value we are creating together, ensuring fairness and security for every individual involved. This
                document is designed to protect our shared vision and the contributions that bring it to life.
            </Typography>

            <Accordion
                id="principles"
                expanded={expanded.has('principles')}
                onChange={handleChange('principles')}
            >
                <AccordionSummary expandIcon={<ExpandMore/>}>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                        <Gavel color="primary" fontSize="small"/>
                        <Typography variant="h4" component="h2" color="primary">
                            The Twofold Principles of this Agreement
                        </Typography>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body1" paragraph sx={{fontSize: '1.1rem', lineHeight: 1.6}}>
                        This agreement is built on two core principles:
                    </Typography>

                    <Box component="ol" sx={{pl: 3, fontSize: '1.1rem', lineHeight: 1.6}}>
                        <Typography component="li" paragraph>
                            <strong>Protections:</strong> A. To protect each Founder's brand ownership, Company IP and
                            ensure
                            they have final authority in the direction of the Company B. To protect each Contributor's
                            freedom
                            to pursue other opportunities as a founder or contributor in other projects so long they
                            honor all
                            terms in this agreement. C. Ensure mutual commitment and accountability.
                        </Typography>
                        <Typography component="li" paragraph>
                            <strong>Compensation:</strong> A. To grant each Contributor a transparent path to earning
                            minority
                            equity holdings in the Company. B. To ensure everyone is reimbursed for unpaid time if the
                            company
                            is sold or starts to earn enough profit.
                        </Typography>
                    </Box>
                </AccordionDetails>
            </Accordion>

            <Accordion
                id="protections"
                expanded={expanded.has('protections')}
                onChange={handleChange('protections')}
            >
                <AccordionSummary expandIcon={<ExpandMore/>}>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1, pl: 2.5}}>
                        <Security color="primary" fontSize="small"/>
                        <Typography variant="h4" component="h2" color="primary">
                            Protections
                        </Typography>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body1" paragraph sx={{fontSize: '1.1rem', lineHeight: 1.6}}>
                        This section is dedicated to protecting the shared business vision and ensuring consistent,
                        high-impact
                        contributions.
                    </Typography>

                    <Typography variant="h5" component="h3" gutterBottom sx={{mt: 3, mb: 2}} color="primary">
                        <strong>Definitions</strong>
                    </Typography>

                    <Typography variant="body1" paragraph sx={{fontSize: '1.1rem', lineHeight: 1.6}}>
                        For the purpose of this agreement, "IP" is defined as a specific set of proprietary assets
                        critical to
                        the business. This includes:
                    </Typography>

                    <EditableIPDefinition value={placeholders.CUSTOM_IP_DEFINITION}/>

                    <Typography variant="body1" paragraph sx={{fontSize: '1.1rem', lineHeight: 1.6, mt: 2}}>
                        <em>This definition expressly excludes the Contributors' general skills, experience, and
                            knowledge, as
                            well as general software code, algorithms, and development methodologies that are not
                            proprietary to
                            the Company's core IP.</em>
                    </Typography>

                    <Typography variant="h5" component="h3" gutterBottom sx={{mt: 3, mb: 2}} color="primary">
                        <strong>Mutual Commitment and Impact</strong>
                    </Typography>

                    <Typography variant="body1" paragraph sx={{fontSize: '1.1rem', lineHeight: 1.6}}>
                        Both Founders and Contributors agree to a mutual commitment to consistent, high-impact work.
                        This is the
                        foundation upon which this agreement is built.
                    </Typography>

                    <Box component="ul" sx={{pl: 3, fontSize: '1.1rem', lineHeight: 1.6}}>
                        <Typography component="li" paragraph>
                            <strong>Performance Review:</strong> Contributions will be evaluated quarterly based on the
                            agreed-upon goals.
                        </Typography>
                        <Typography component="li" paragraph>
                            <strong>Accountability:</strong> If a Contributor is not meeting their agreed-upon
                            commitments, the
                            Founders reserve the right to work with the Contributor to re-evaluate their role, vesting
                            schedule,
                            or engagement with the Company, ensuring that all parties are aligned and committed to the
                            shared
                            goal.
                        </Typography>
                        <Typography component="li" paragraph>
                            <strong>At-Will Engagement:</strong> This engagement is at-will. Either party may terminate
                            the
                            engagement at any time, with or without cause, and without prior notice. The termination of
                            this
                            engagement will not affect the Contributor's right to any vested equity or earned deferred
                            wages up
                            to the date of termination.
                        </Typography>
                    </Box>

                    <Typography variant="h5" component="h3" gutterBottom sx={{mt: 3, mb: 2}} color="primary">
                        <strong>Non-Solicitation</strong>
                    </Typography>

                    <Typography variant="body1" paragraph sx={{fontSize: '1.1rem', lineHeight: 1.6}}>
                        To protect the relationships we've built, the Contributor agrees that for a period of <strong>twelve
                        (12) months</strong> following their departure from the Company, they will not, either directly
                        or
                        indirectly:
                    </Typography>

                    <Box component="ul" sx={{pl: 3, fontSize: '1.1rem', lineHeight: 1.6}}>
                        <Typography component="li" paragraph>
                            Solicit, entice, or persuade any employee or independent contractor of the Company to leave
                            their
                            employment or engagement.
                        </Typography>
                        <Typography component="li" paragraph>
                            Solicit any customer of the Company with whom they had direct contact during their
                            engagement, for
                            the purpose of providing services or products that are competitive with the Company's
                            business.
                        </Typography>
                    </Box>

                    <Typography variant="h5" component="h3" gutterBottom sx={{mt: 3, mb: 2}} color="primary">
                        <strong>Code Reuse & Competitive Projects</strong>
                    </Typography>

                    <Typography variant="body1" paragraph sx={{fontSize: '1.1rem', lineHeight: 1.6}}>
                        As defined above, the Company's IP does not include general software code or algorithms.
                        However, to
                        protect the Founder's market positioning, the Contributor agrees that for a period of <strong>twelve
                        (12) months</strong> following their departure from the Company, they will not, either directly
                        or
                        indirectly, use software code, algorithms, or development methodologies developed for the
                        Company to
                        work on a new product or service within the same industry that directly competes with the
                        Company's
                        business.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion
                id="compensation"
                expanded={expanded.has('compensation')}
                onChange={handleChange('compensation')}
            >
                <AccordionSummary expandIcon={<ExpandMore/>}>

                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1, pl: 2.5}}>
                        <AttachMoney color="primary"/>
                        <Typography variant="h4" component="h2" color="primary">
                            Compensation
                        </Typography>
                    </Box>

                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body1" paragraph sx={{fontSize: '1.1rem', lineHeight: 1.6}}>
                        This section is dedicated to providing a clear and transparent path to earning equity and fair
                        compensation for all contributions.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion
                id="vesting"
                expanded={expanded.has('vesting')}
                onChange={handleChange('vesting')}
            >
                <AccordionSummary expandIcon={<ExpandMore/>}>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1, pl: 6}}>
                        <Timeline color="primary" fontSize="small"/>
                        <Typography variant="h6" component="h2" color="primary">
                            Equity Vesting Schedule
                        </Typography>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body1" paragraph sx={{fontSize: '1.1rem', lineHeight: 1.6}}>
                        A founding contributor ("Contributor") will be granted stock and/or membership units
                        representing <strong>{placeholders.CONTRIBUTOR_EQUITY_PERCENTAGE}%</strong> of the fully-diluted
                        equity
                        in both the C-Corporation and the IP Holding Company. This equity grant is not contingent on any
                        separate capital contribution.
                    </Typography>

                    <Box component="ul" sx={{pl: 3, fontSize: '1.1rem', lineHeight: 1.6}}>
                        <Typography component="li" paragraph>
                            <strong>Vesting
                                Schedule:</strong> The <strong>{placeholders.CONTRIBUTOR_EQUITY_PERCENTAGE}%</strong> equity
                            allocation shall vest over a <strong>{placeholders.VESTING_PERIOD_YEARS}</strong>-year
                            period
                            (<strong>{placeholders.VESTING_PERIOD_DAYS}</strong> months). The vesting rate will
                            accelerate over
                            time, rewarding sustained commitment.
                        </Typography>
                        <Typography component="li" paragraph>
                            <strong>Vesting Formula:</strong> The amount of vested equity will be calculated using the
                            following
                            formula: This vesting formula is applicable only after the Contributor has
                            successfully completed the initial <strong>{Math.round(placeholders.CLIFF_DAYS / 30.44)}-month
                            cliff period</strong>. If the Contributor leaves
                            before this period, no equity will have vested.
                        </Typography>
                        <VestingFormula
                            totalEquity={placeholders.CONTRIBUTOR_EQUITY_PERCENTAGE}
                            vestingDays={placeholders.VESTING_PERIOD_DAYS}
                            cliffDays={placeholders.CLIFF_DAYS}
                            vestingExponent={placeholders.VESTING_EXPONENT}
                            variant="body1"
                            sx={{mt: 1, mb: 2, p: 2, borderRadius: 1}}
                        />
                        <Typography component="li" paragraph>
                            <strong>Example Vesting Schedule:</strong> Below is an example of
                            a <strong>{placeholders.CONTRIBUTOR_EQUITY_PERCENTAGE}%</strong> equity grant vesting
                            over <strong>{placeholders.VESTING_PERIOD_YEARS}</strong> years
                            (<strong>{placeholders.VESTING_PERIOD_DAYS}</strong> days), showing the accelerating growth
                            of
                            vested equity over time.
                        </Typography>
                    </Box>

                    <SimpleVestingCalculator/>

                    <Divider sx={{my: 2}}/>

                    <TableContainer component={Paper} sx={{mt: 2, mb: 2}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>Time (Months)</strong></TableCell>
                                    <TableCell><strong>Days Worked</strong></TableCell>
                                    <TableCell><strong>Vested Equity</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell><strong>6</strong></TableCell>
                                    <TableCell>180</TableCell>
                                    <TableCell>0.00%</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>12</strong></TableCell>
                                    <TableCell>365</TableCell>
                                    <TableCell><strong>{placeholders.VESTING_12_MONTHS}%</strong></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>18</strong></TableCell>
                                    <TableCell>547</TableCell>
                                    <TableCell><strong>{placeholders.VESTING_18_MONTHS}%</strong></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>24</strong></TableCell>
                                    <TableCell>730</TableCell>
                                    <TableCell><strong>{placeholders.VESTING_24_MONTHS}%</strong></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>30</strong></TableCell>
                                    <TableCell>912</TableCell>
                                    <TableCell><strong>{placeholders.VESTING_30_MONTHS}%</strong></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>36</strong></TableCell>
                                    <TableCell>1095</TableCell>
                                    <TableCell><strong>{placeholders.VESTING_36_MONTHS}%</strong></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>42</strong></TableCell>
                                    <TableCell>1277</TableCell>
                                    <TableCell><strong>{placeholders.VESTING_42_MONTHS}%</strong></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>48</strong></TableCell>
                                    <TableCell>1460</TableCell>
                                    <TableCell><strong>{placeholders.VESTING_48_MONTHS}%</strong></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Box component="ul" sx={{pl: 3, fontSize: '1.1rem', lineHeight: 1.6}}>
                        <Typography component="li" paragraph>
                            <strong>Leaving the Company:</strong> If a Contributor's engagement ends before
                            the {Math.round(placeholders.CLIFF_DAYS / 30.44)}-month cliff,
                            no equity will have vested, and the entire equity grant will be returned to the Company. If
                            a
                            Contributor leaves after the {Math.round(placeholders.CLIFF_DAYS / 30.44)}-month cliff, they
                            will retain all equity vested up to that point.
                        </Typography>
                    </Box>
                </AccordionDetails>
            </Accordion>

            <Accordion
                id="deferred-wage"
                expanded={expanded.has('deferred')}
                onChange={handleChange('deferred')}
            >
                <AccordionSummary expandIcon={<ExpandMore/>}>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1, pl: 6}}>
                        <Payment color="primary" fontSize="small"/>
                        <Typography variant="h6" component="h2" color="primary">
                            Deferred Compensation
                        </Typography>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body1" paragraph sx={{fontSize: '1.1rem', lineHeight: 1.6}}>
                        The purpose of the deferred wage is to protect all parties from a sale where only some equity
                        holders
                        will be reimbursed for unpaid efforts invested in the Company.
                    </Typography>

                    <Box component="ul" sx={{pl: 3, fontSize: '1.1rem', lineHeight: 1.6}}>
                        <Typography component="li" paragraph>
                            <strong>Accrual:</strong> This deferred hourly wage begins accumulating upon signing and
                            continues
                            until the Company is able to negotiate a standard salary paid monthly. It shall be
                            considered a debt
                            on the balance sheet of the Company.
                        </Typography>
                        <Typography component="li" paragraph>
                            <strong>Rates:</strong> Both the Founders and the Contributors shall be entitled to deferred
                            wages
                            at the rates below:
                            <Box component="ul" sx={{pl: 3, mt: 1}}>
                                <Typography component="li">
                                    <strong>{placeholders.FOUNDER_NAME}:</strong> ${placeholders.FOUNDER_HOURLY_RATE} /
                                    hour
                                </Typography>
                                <Typography component="li">
                                    <strong>{placeholders.CONTRIBUTOR_NAME}:</strong> ${placeholders.CONTRIBUTOR_HOURLY_RATE} /
                                    hour
                                </Typography>
                            </Box>
                        </Typography>
                        <Typography component="li" paragraph>
                            <strong>Pro-Rata Payment:</strong> Accrued deferred wages shall be paid from monthly net
                            income (as
                            defined by GAAP accounting standards) on a pro-rata basis. The pro-rata share for each party
                            shall
                            be calculated as their total accrued deferred wages divided by the total accrued deferred
                            wages of
                            all parties.
                        </Typography>
                        <Typography component="li" paragraph>
                            <strong>Conditions for Payment:</strong> Payment shall be made at the end of any month in
                            which the
                            following conditions are met:
                            <Box component="ul" sx={{pl: 3, mt: 1}}>
                                <Typography component="li">All operating expenses for the current and past months have
                                    been
                                    paid.</Typography>
                                <Typography component="li">All other employee and contractor wages have been
                                    paid.</Typography>
                                <Typography component="li">The company maintains a minimum cash reserve equal to three
                                    (3)
                                    months of average monthly operating expenses.</Typography>
                            </Box>
                        </Typography>
                        <Typography component="li" paragraph>
                            <strong>Example Calculation:</strong>
                            <Box component="ul" sx={{pl: 3, mt: 1}}>
                                <Typography component="li"><strong>Total
                                    Owed:</strong> ${placeholders.EXAMPLE_CONTRIBUTOR_TOTAL} (Contributor) +
                                    ${placeholders.EXAMPLE_FOUNDER_TOTAL} (Founder) = ${placeholders.EXAMPLE_TOTAL_OWED}
                                </Typography>
                                <Typography component="li"><strong>Available
                                    Profit:</strong> ${placeholders.EXAMPLE_AVAILABLE_PROFIT}</Typography>
                                <Typography component="li"><strong>Distribution
                                    Percentage:</strong> ${placeholders.EXAMPLE_AVAILABLE_PROFIT} /
                                    ${placeholders.EXAMPLE_TOTAL_OWED} = {placeholders.EXAMPLE_DISTRIBUTION_PERCENTAGE}%</Typography>
                                <Typography component="li"><strong>Contributor's
                                    Payment:</strong> ${placeholders.EXAMPLE_CONTRIBUTOR_TOTAL} × {placeholders.EXAMPLE_DISTRIBUTION_PERCENTAGE}%
                                    = ${placeholders.EXAMPLE_CONTRIBUTOR_PAYMENT}</Typography>
                                <Typography component="li"><strong>Founder's
                                    Payment:</strong> ${placeholders.EXAMPLE_FOUNDER_TOTAL} × {placeholders.EXAMPLE_DISTRIBUTION_PERCENTAGE}%
                                    = ${placeholders.EXAMPLE_FOUNDER_PAYMENT}</Typography>
                            </Box>
                        </Typography>
                        <Typography component="li" paragraph>
                            <strong>Time Tracking:</strong> Both parties agree to maintain accurate time records in a
                            shared
                            digital log, as a spreadsheet with the following headings: Contributor Name, Date, Work
                            Done, Hours,
                            Rate ($/hr), Total.
                        </Typography>
                        <Typography component="li" paragraph>
                            <strong>Disputes:</strong> Any Founder or Contributor may dispute any log entry for another
                            within
                            14 days. They must provide written reasoning and offer a way to remedy the dispute in order
                            to earn
                            those hours.
                        </Typography>
                        <Typography component="li" paragraph>
                            <strong>Rate Changes:</strong> Once the Company has cleared all debts and can afford a
                            salary
                            guarantee, the Founders may propose a standard salary for the Contributors. The Company's
                            operating
                            body, through majority vote, may at any point decide to hire other workers rather than pay a
                            Parties' deferred rate. If the Founders or Contributors choose not to accept a standard
                            salary in
                            lieu of deferred wages, their position may be re-evaluated by the Company.
                        </Typography>
                    </Box>
                </AccordionDetails>
            </Accordion>

            <Typography variant="body1" paragraph
                        sx={{fontSize: '1.1rem', lineHeight: 1.6, mt: 3, fontStyle: 'italic'}}>
                This agreement serves as a living document of our shared commitment.
            </Typography>

            <Divider sx={{my: 4}}/>

            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2}}>
                <Typography variant="h5" component="h3" color="primary">
                    <strong>Founder Contact Information:</strong>
                </Typography>
                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => setFounderModalOpen(true)}
                    sx={{ml: 2}}
                >
                    Edit
                </Button>
            </Box>
            <List dense>
                <ListItem>
                    <ListItemText primary="Name" secondary={placeholders.FOUNDER_NAME}/>
                </ListItem>
                <ListItem>
                    <ListItemText primary="Email" secondary={placeholders.FOUNDER_EMAIL}/>
                </ListItem>
                <ListItem>
                    <ListItemText primary="Phone" secondary={placeholders.FOUNDER_PHONE}/>
                </ListItem>
                <ListItem>
                    <ListItemText primary="Address" secondary={placeholders.FOUNDER_ADDRESS}/>
                </ListItem>
            </List>

            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, mt: 3}}>
                <Typography variant="h5" component="h3" color="primary">
                    <strong>Contributor Contact Information:</strong>
                </Typography>
                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => setContributorModalOpen(true)}
                    sx={{ml: 2}}
                >
                    Edit
                </Button>
            </Box>
            <List dense>
                <ListItem>
                    <ListItemText primary="Name" secondary={placeholders.CONTRIBUTOR_NAME}/>
                </ListItem>
                <ListItem>
                    <ListItemText primary="Email" secondary={placeholders.CONTRIBUTOR_EMAIL}/>
                </ListItem>
                <ListItem>
                    <ListItemText primary="Phone" secondary={placeholders.CONTRIBUTOR_PHONE}/>
                </ListItem>
                <ListItem>
                    <ListItemText primary="Address" secondary={placeholders.CONTRIBUTOR_ADDRESS}/>
                </ListItem>
            </List>

            <Typography variant="h5" component="h3" gutterBottom color="primary" sx={{mt: 3}}>
                <strong>Agreement Date:</strong> {placeholders.AGREEMENT_DATE}
            </Typography>



            {/* Modals */}
            <div id="founder-contact">
            <FounderModal
                layout="dialog"
                open={founderModalOpen}
                onClose={() => setFounderModalOpen(false)}
            />
            </div>
            <div id="contributor-contact">
            <ContributorModal
                layout="dialog"
                open={contributorModalOpen}
                onClose={() => setContributorModalOpen(false)}
            />
            </div>
        å</Box>
    );
};

export default ContractDocument;
