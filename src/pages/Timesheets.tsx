import React from 'react';
import {Description, PageContainer, PageTitle,} from '../components/styled/StyledComponents';
import DeferredWageTimesheet from '../components/DeferredWageTimesheet';

const Timesheets: React.FC = () => {

    return (
        <PageContainer>
            <PageTitle variant="h4" color="primary">
                Deferred Wage Timesheet
            </PageTitle>

            <Description>
                Track hours worked and deferred compensation for all contributors
            </Description>

            <DeferredWageTimesheet/>
        </PageContainer>
    );
};

export default Timesheets;
