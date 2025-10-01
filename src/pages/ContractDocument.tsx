import React, {useEffect, useState} from 'react';
import {Box, Button, CardHeader, Collapse, Divider, IconButton, Typography} from '@mui/material';
import {Business, Download, ExpandLess, ExpandMore, MonetizationOn, Security, Edit} from '@mui/icons-material';
import {useContractData} from '../hooks/useFormDataHooks';
import EditableIPDefinition from '../components/EditableIPDefinition.tsx';
import EditableHourlyRate from '../components/EditableHourlyRate.tsx';
import {useScrollToHash} from '../hooks/useScrollToHash.ts';
import SimpleVestingCalculator from '../components/SimpleVestingCalculator.tsx';
import VestingFormula from '../components/VestingFormula.tsx';
import FounderModal from '../components/FounderModal.tsx';
import ContributorModal from '../components/ContributorModal.tsx';
import {useLocation} from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import ShareButton from '../components/ShareButton.tsx';
import SimpleDeferredCompensationCalculator from '../components/SimpleDeferredCompensationCalculator.tsx';
import { useTheme } from '../contexts/ThemeContext.tsx';
import { Link } from 'react-router-dom';

const ContractDocument: React.FC = () => {
    const {setMode} = useTheme();
    const {getContractPlaceholders, setPlaceholder} = useContractData();
    const placeholders = getContractPlaceholders();
    const [founderModalOpen, setFounderModalOpen] = useState(false);
    const [contributorModalOpen, setContributorModalOpen] = useState(false);

    const [protectionsOpen, setProtectionsOpen] = useState(false);
    const [deferredOpen, setDeferredOpen] = useState(false);
    const [vestingOpen, setVestingOpen] = useState(false);
    const [exampleScenariosOpen, setExampleScenariosOpen] = useState(true);

    const location = useLocation();

    // Use the scroll to hash hook
    useScrollToHash();

    // Auto-expand accordion based on hash
    useEffect(() => {
        const hash = location.hash.replace('#', '');

        // Map hash values to accordion panel names
        const hashToPanelMap: { [key: string]: string } = {
            'overview': 'overview',
            'protections': 'protections',
            'compensation': 'compensation',
            'vesting': 'vesting',
            'deferred-wage': 'deferred-wage',
            'founder-contact': 'founder-contact',
            'contributor-contact': 'contributor-contact'
        };

        if (hash && hashToPanelMap[hash]) {
            const panelToExpand = hashToPanelMap[hash];

            // For contact sections, open the appropriate modal
            if (panelToExpand === 'founder-contact') {
                setFounderModalOpen(true);
            } if (panelToExpand === 'contributor-contact') {
                setContributorModalOpen(true);
            } else {
                if (panelToExpand === 'protections') {
                    setProtectionsOpen(true);
                } else if (panelToExpand === 'vesting') {
                    setVestingOpen(true);
                } else if (panelToExpand === 'deferred-wage') {
                    setDeferredOpen(true);
                }
            }
        }
    }, [location.hash]);

    const generatePDF = async () => {
        try {
            // Expand all accordions for PDF generation
            setProtectionsOpen(true);
            setVestingOpen(true);
            setDeferredOpen(true);
            setMode('light');

            // Wait a bit for accordions to expand
            await new Promise(resolve => setTimeout(resolve, 500));

            // Get the contract content element
            const element = document.getElementById('contract-content');
            if (!element) {
                console.error('Contract content element not found');
                return;
            }

            // Generate canvas from HTML
            const canvas = await html2canvas(element, {
                scale: 2, // Higher quality
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff',
                scrollX: 0,
                scrollY: 0,
                width: element.scrollWidth,
                height: element.scrollHeight
            });

            // Create PDF
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');

            const imgWidth = 210; // A4 width in mm
            const pageHeight = 295; // A4 height in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;

            let position = 0;

            // Add first page
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            // Add additional pages if needed
            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            // Download the PDF
            const fileName = `Founding-Contributor-Engagement-Agreement-${new Date().toISOString().split('T')[0]}.pdf`;
            pdf.save(fileName);

        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Error generating PDF. Please try again.');
        }
    };

    return (
        <Box sx={{margin: '0 auto', padding: 3}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3}}>
                <Typography variant="h3" component="h1" color="primary">
                    <strong>Founding Contributor Engagement Agreement</strong>
                </Typography>
                <Box sx={{display: 'flex', gap: 1}}>
                    <Button
                        variant="contained"
                        size="small"
                        startIcon={<Download/>}
                        onClick={generatePDF}
                        color="secondary"
                    >
                        Download PDF
                    </Button>
                    <ShareButton/>
                </Box>
            </Box>

            <div id="contract-content">
                <Typography variant="body1"  >
                    This agreement is made between <strong>{placeholders.FOUNDER_NAMES}</strong> (collectively,
                    "Founders")
                    and <strong>{placeholders.CONTRIBUTOR_NAMES}</strong> (collectively, "Contributors") to define the
                    terms
                    for ownership, compensation, and shared commitment in building a product together.
                </Typography>

                <Typography variant="body1"  >
                    All parties agree that the following terms shall apply to the entire scope of ownership,
                    compensation,
                    and protections within the IP Holding Company ("Company") and any subsidiary corporations or
                    business
                    entities.
                </Typography>

                <Typography
                    id="overview"
                    variant="h4"
                    component="h2"
                    gutterBottom
                    sx={{mt: 4, mb: 2}}
                    color="primary"
                >
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                        <Business color="primary"/>
                        <strong>Overview</strong>
                    </Box>
                </Typography>

                <Typography variant="body1"  gutterBottom>
                    This agreement is built on two core principles:
                </Typography>

                <Typography variant="h6"  >
                1. Protections:
                </Typography>
                <Box component="ul" sx={{pl: 3}}>
                        <Typography component="li" >
                        To protect each Founder's brand ownership, Company IP and
                        ensure they have final authority in the direction of the Company
                        </Typography>
                        <Typography component="li">
                        To protect each Contributor's
                        freedom
                        to pursue other opportunities as a founder or contributor in other projects so long they
                        honor all
                        terms in this agreement.</Typography>
                    <Typography component="li">Ensure mutual commitment and accountability.</Typography>
                </Box>


                <Typography variant="h6"  >
                2. Compensation:
                </Typography>
                <Box component="ul" sx={{pl: 3}}>
                    <Typography component="li">To grant each Contributor a transparent path to earning
                        minority
                        equity holdings in the Company. </Typography>
                    <Typography component="li">To ensure everyone is reimbursed for unpaid time if the
                        company
                        is sold or starts to earn enough profit.
                    </Typography>
                </Box>

                <CardHeader
                    onClick={() => setProtectionsOpen(!protectionsOpen)}
                    id="protections"
                    sx={{pl:0, cursor: 'pointer'}}
                    avatar={<Security color="primary"/>}
                    title={<Typography variant="h4" component="h2" color="primary">
                        Protections
                    </Typography>}
                    action={<IconButton size="large" color="primary" 
                        onClick={() => setProtectionsOpen(!protectionsOpen)}>{protectionsOpen ? <ExpandMore fontSize="large" /> : <ExpandLess fontSize="large" />}</IconButton>}   

                />

                <Collapse in={protectionsOpen} timeout="auto" unmountOnExit>
                    <Typography variant="body1" >
                        This section is meant to protect the Founder's Intellectual Property as well as the Founding Contributor's freedom to pursue other opportunities after the engagement ends.
                    </Typography>

                    <Typography variant="h5" component="h3" gutterBottom sx={{mt: 3, mb: 2}} color="primary">
                        <strong>Definitions</strong>
                    </Typography>

                    <Typography variant="body1" >
                        For the purpose of this agreement, "IP" is defined as a specific set of proprietary assets
                        critical to
                        the business: 
                    </Typography>

                    <Box sx={{my: 2}}>
                    <EditableIPDefinition value={placeholders.CUSTOM_IP_DEFINITION}/>
                    </Box>
                    <Typography variant="body1" >   
                        This definition expressly excludes the Contributors' general skills, experience, and knowledge, as well as general software code, algorithms, and development methodologies that are not proprietary to the Company's core IP.
                    </Typography>

                    <Typography variant="h5" component="h3" gutterBottom sx={{mt: 3, mb: 2}} color="primary">
                        <strong>Mutual Commitment and Impact</strong>
                    </Typography>

                    <Typography variant="body1" >
                        Both Founders and Contributors agree to a mutual commitment to consistent, high-impact work.
                        This is the
                        foundation upon which this agreement is built.
                    </Typography>

                    <Box component="ul" sx={{pl: 3}}>
                        <Typography component="li" >
                            <strong>Performance Review:</strong> Contributions will be evaluated quarterly based on
                            the
                            agreed-upon goals to ensure all parties are aligned and committed to the shared goal.
                        </Typography>
                        <Typography component="li" >
                            <strong>At-Will Engagement:</strong> This engagement is at-will. Either party may
                            terminate
                            the
                            engagement at any time, with or without cause, and without prior notice. The termination
                            of
                            this
                            engagement will not affect the Contributor's right to any vested equity or earned
                            deferred
                            wages up
                            to the date of termination.
                        </Typography>
                    </Box>

                    <Typography variant="h5" component="h3" gutterBottom sx={{mt: 3, mb: 2}} color="primary">
                        <strong>Non-Solicitation</strong>
                    </Typography>

                    <Typography variant="body1"  >
                        To protect the relationships we've built, the Contributor agrees that for a period
                        of <strong>twelve
                        (12) months</strong> following their departure from the Company, they will not, either
                        directly
                        or
                        indirectly:
                    </Typography>

                    <Box component="ul" sx={{pl: 3}}>
                        <Typography component="li" >
                            Solicit, entice, or persuade any employee or independent contractor of the Company to
                            leave
                            their
                            employment or engagement.
                        </Typography>
                        <Typography component="li" >
                            Solicit any customer of the Company with whom they had direct contact during their
                            engagement, for
                            the purpose of providing services or products that are competitive with the Company's
                            business.
                        </Typography>
                    </Box>

                    <Typography variant="h5" component="h3" gutterBottom sx={{mt: 3, mb: 2}} color="primary">
                        <strong>Code Reuse & Competitive Projects</strong>
                    </Typography>

                    <Typography variant="body1"  >
                        As defined above, the Company's IP does not include general software code or algorithms.
                        However, to
                        protect the Founder's market positioning, the Contributor agrees to copy and rebrand the codebase 
                        to compete with Company directly or indirectly.
                    </Typography>
                </Collapse>

                <CardHeader
                    id="compensation"
                    sx={{pl:0}}
                    avatar={<MonetizationOn color="primary"/>}
                    title={<Typography variant="h4" component="h2" color="primary">
                        Compensation
                    </Typography>}
                />

                <CardHeader
                    onClick={() => setVestingOpen(!vestingOpen)}
                    id="vesting"
                    sx={{alignItems: 'flex-start', pl: 5, cursor: 'pointer'}}
                    title={<Typography variant="h5" component="h2" color="primary">
                        Vesting Equity
                    </Typography>}
                    subheader={
                        <Typography variant="body1">
                            A founding contributor ("Contributor") will be granted stock and/or membership units
                            representing <strong>{placeholders.CONTRIBUTOR_EQUITY_PERCENTAGE}%</strong> of the
                            fully-diluted
                            equity
                            in both the C-Corporation and the IP Holding Company. This equity grant is not contingent on
                            any
                            separate capital contribution.
                        </Typography>
                    }
                    action={<IconButton size="large" color="primary" 
                        onClick={() => setVestingOpen(!vestingOpen)}>{vestingOpen ? <ExpandMore fontSize="large" /> : <ExpandLess fontSize="large" />}</IconButton>}   
                />

                <Collapse in={vestingOpen} timeout="auto" unmountOnExit>
                    <Box component="ul" sx={{pl: 3}}>
                        <Typography component="li" >
                            <strong>Vesting
                                Schedule:</strong> The <strong>{placeholders.CONTRIBUTOR_EQUITY_PERCENTAGE}%</strong> equity
                            allocation shall vest over a <strong>{placeholders.VESTING_PERIOD_YEARS}</strong>-year
                            period
                            (<strong>{placeholders.VESTING_PERIOD_DAYS}</strong> months). The vesting rate will
                            accelerate over
                            time, rewarding sustained commitment.
                        </Typography>
                        <Typography component="li" >
                            <strong>Vesting Formula:</strong> The amount of vested equity will be calculated using
                            the
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
                        <Typography component="li" >
                            <strong>Example Vesting Schedule:</strong> Below is an example of
                            a <strong>{placeholders.CONTRIBUTOR_EQUITY_PERCENTAGE}%</strong> equity grant vesting
                            over <strong>{placeholders.VESTING_PERIOD_YEARS}</strong> years
                            (<strong>{placeholders.VESTING_PERIOD_DAYS}</strong> days), showing the accelerating
                            growth
                            of
                            vested equity over time.
                        </Typography>
                    </Box>

                    <SimpleVestingCalculator/>

                    <Box component="ul" sx={{pl: 3, }}>
                        <Typography component="li" >
                            <strong>Leaving the Company:</strong> If a Contributor's engagement ends before
                            the {Math.round(placeholders.CLIFF_DAYS / 30.44)}-month cliff,
                            no equity will have vested, and the entire equity grant will be returned to the Company.
                            If
                            a
                            Contributor leaves after the {Math.round(placeholders.CLIFF_DAYS / 30.44)}-month cliff,
                            they
                            will retain all equity vested up to that point.
                        </Typography>
                    </Box>
                </Collapse>

                <CardHeader
                    onClick={() => setDeferredOpen(!deferredOpen)}
                    id="deferred-wage"
                    sx={{alignItems: 'flex-start', pl: 5, cursor: 'pointer'}}
                    title={<Typography variant="h5" component="h2" color="primary">
                        Deferred Wages
                    </Typography>}
                    subheader={
                        <Typography variant="body1">
                            The purpose of the deferred wage is to protect all parties from a sale where only
                            some
                            equity
                            holders
                            will be reimbursed for unpaid efforts invested in the Company.
                        </Typography>
                    }
                    action={<IconButton size="large" color="primary" 
                        onClick={() => setDeferredOpen(!deferredOpen)}>{deferredOpen ? <ExpandMore fontSize="large" /> : <ExpandLess fontSize="large" />}</IconButton>}   
                />


                <Collapse in={deferredOpen} timeout="auto" unmountOnExit>

                    <Box component="ul" sx={{pl: 3}}>

                        <Typography variant='h6' sx={{mt:2}} >
                            Rates
                        </Typography>
                        <Typography variant='body1' gutterBottom>
                            The hourly rates for the Founders and Contributors are as follows:
                            <Box sx={{mt: 1}}>
                                    <EditableHourlyRate
                                        label={placeholders.FOUNDER_NAME as string}
                                        value={placeholders.FOUNDER_HOURLY_RATE as number}
                                        onSave={(newValue) => setPlaceholder('FOUNDER_HOURLY_RATE', newValue)}
                                    />
                            </Box>
                            <Box sx={{mt: 1}}>
                                    <EditableHourlyRate
                                        label={placeholders.CONTRIBUTOR_NAME as string}
                                        value={placeholders.CONTRIBUTOR_HOURLY_RATE as number}
                                        onSave={(newValue) => setPlaceholder('CONTRIBUTOR_HOURLY_RATE', newValue)}
                                    />
                            </Box>
                        </Typography>

                        <Typography variant='h6' sx={{mt:2}} >
                            Accrual
                        </Typography>
                        <Typography variant='body1' gutterBottom>
                            This deferred hourly wage begins accumulating upon signing and
                            continues
                            until the Company is able to negotiate a standard salary paid monthly. It shall be
                            considered a debt
                            on the balance sheet of the Company.
                        </Typography>

                        <Typography variant='h6' sx={{mt:2}} >
                            Conditions for Payment
                        </Typography>

                        <Typography variant='body1' >
                            Payment shall be made at the end of any month
                            in
                            which the
                            following conditions are met:
                            <Box component="ul" sx={{pl: 3, mt: 1}}>
                                <Typography component="li">All operating expenses for the current and past months
                                    have
                                    been
                                    paid.</Typography>
                                <Typography component="li">All other employee and contractor wages have been
                                    paid.</Typography>
                                <Typography component="li">The company maintains a minimum cash reserve equal to
                                    three
                                    (3)
                                    months of average monthly operating expenses. "Cash Reserve" shall be based on the median of monthly operating expenses and employee wages.</Typography>
                            </Box>
                        </Typography>



                        <Typography variant='h6' sx={{mt:2}} >
                            Pro-Rata Payment
                        </Typography>
                        <Typography variant='body1' gutterBottom>
                            Accrued deferred wages shall be paid from net
                            income (as
                            defined by GAAP accounting standards) on a monthly basis if payment conditions are met. Payments shall be made on a pro-rata basis, calculated as
                            the available profit to distribute divided by the total accrued deferred wages, times each party's total deferred wages. See example below:
                        </Typography>


                        <Box sx={{my: 3}}>
                        <Button variant="text" 
                        onClick={() => setExampleScenariosOpen(!exampleScenariosOpen)}>
                                {exampleScenariosOpen ? 'Hide Example Scenarios' : 'Show Example Scenarios'}
                        </Button>
                        <Collapse in={exampleScenariosOpen} timeout="auto" unmountOnExit>
                            <SimpleDeferredCompensationCalculator />
                        </Collapse>
                        </Box>

                        <Typography variant='h6' sx={{mt:2}} >
                            Time Tracking
                        </Typography>

                        <Typography variant='body1' >
                            Both parties agree to maintain accurate time records for deffered wages in
                            a
                            shared <Link to="/timesheets">digital log</Link>.  as a spreadsheet with the following headings: Contributor Name, Date, Work
                            Done, Hours,
                            Rate ($/hr), Total.
                        </Typography>

                        <Typography variant='h6' sx={{mt:2}} >
                            Disputes
                        </Typography>
                        <Typography variant='body1' >
                            Any Founder or Contributor may dispute any log entry for
                            another
                            within
                            14 days. They must provide written reasoning and offer a way to remedy the dispute in
                            order
                            to earn
                            those hours permanently.
                        </Typography>

                        <Typography variant='h6' sx={{mt:2}} >
                            Rate Changes
                        </Typography>
                        <Typography variant='body1' >
                            Once the Company has cleared all debts and can afford a
                            salary
                            guarantee, the Founders may propose a standard salary for the Contributors. The
                            Company's
                            operating
                            body, through majority vote, may at any point decide to hire other workers rather than
                            pay a
                            Parties' deferred rate. If the Founders or Contributors choose not to accept a standard
                            salary in
                            lieu of deferred wages, their paid position may be re-allocated by the Company.
                        </Typography>
                    </Box>
                </Collapse>

                <Divider sx={{my: 4}}/>

                {/* Signature Sections */}
                <Box sx={{ display: 'flex', gap: 4, mb: 4 }}>
                    {/* Founder Signature Section */}
                    <Box sx={{ flex: 1, border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="h6" component="h3" color="primary">
                                <strong>Founder Signature</strong>
                            </Typography>
                            <IconButton
                                size="small"
                                onClick={() => setFounderModalOpen(true)}
                            >
                                <Edit />
                            </IconButton>
                        </Box>
                        
                        <Box sx={{ mb: 3, minHeight: '80px', borderBottom: '1px solid', borderColor: 'divider' }}>
                            {/* Signature line placeholder */}
                        </Box>
                        
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                <strong>Name:</strong> {placeholders.FOUNDER_NAME}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                <strong>Email:</strong> {placeholders.FOUNDER_EMAIL}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                <strong>Phone:</strong> {placeholders.FOUNDER_PHONE}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <strong>Address:</strong> {placeholders.FOUNDER_ADDRESS}
                            </Typography>
                        </Box>
                        
                        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                            Date: _______________
                        </Typography>
                    </Box>

                    {/* Contributor Signature Section */}
                    <Box sx={{ flex: 1, border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="h6" component="h3" color="primary">
                                <strong>Contributor Signature</strong>
                            </Typography>
                            <IconButton
                                size="small"
                                onClick={() => setContributorModalOpen(true)}
                            >
                                <Edit />
                            </IconButton>
                        </Box>
                        
                        <Box sx={{ mb: 3, minHeight: '80px', borderBottom: '1px solid', borderColor: 'divider' }}>
                            {/* Signature line placeholder */}
                        </Box>
                        
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                <strong>Name:</strong> {placeholders.CONTRIBUTOR_NAME}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                <strong>Email:</strong> {placeholders.CONTRIBUTOR_EMAIL}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                <strong>Phone:</strong> {placeholders.CONTRIBUTOR_PHONE}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <strong>Address:</strong> {placeholders.CONTRIBUTOR_ADDRESS}
                            </Typography>
                        </Box>
                        
                        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                            Date: _______________
                        </Typography>
                    </Box>
                </Box>


                <Typography variant="body1" 
                            sx={{ mt: 3, fontStyle: 'italic'}}>
                    This agreement serves as a living document of our shared commitment.
                </Typography>
                <Typography variant="h5" component="h3" gutterBottom color="primary">
                    <strong>Agreement Date:</strong> {placeholders.AGREEMENT_DATE}
                </Typography>
            </div>

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


        </Box>
    )
        ;
};

export default ContractDocument;
