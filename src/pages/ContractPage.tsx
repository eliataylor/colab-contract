import React from 'react';
import {FadeIn} from '../components/styled/StyledComponents';
import ContractDocument from '../components/ContractDocument';

const ContractPage: React.FC = () => {

    return (
        <FadeIn>
            <ContractDocument/>
        </FadeIn>
    );
};

export default ContractPage;
