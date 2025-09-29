import React, { useState } from 'react';
import { Business } from '@mui/icons-material';
import FounderModal from '../components/FounderModal';
import FormPageLayout from '../components/shared/FormPageLayout';

const FounderPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const requirements = [
    {
      primary: "Personal and company information",
      secondary: "Name, role, company details, and industry"
    },
    {
      primary: "Equity terms",
      secondary: "Total equity grant percentage and vesting period"
    },
    {
      primary: "Compensation structure",
      secondary: "Hourly rate for deferred compensation calculation"
    },
    {
      primary: "Protection requirements",
      secondary: "IP protection, non-compete, and special terms"
    }
  ];

  const keyPoints = [
    {
      severity: "warning" as const,
      title: "Equity Distribution",
      description: "Consider the total equity pool and how much to allocate to contributors vs. founders."
    },
    {
      severity: "info" as const,
      title: "Vesting Schedule",
      description: "The agreement uses an accelerating vesting schedule with a 6-month cliff period."
    },
    {
      severity: "success" as const,
      title: "Deferred Compensation",
      description: "Wages accrue until the company can afford regular payments, protecting all parties."
    }
  ];

  const processSteps = [
    "Complete the founder form",
    "Review and adjust terms as needed",
    "Share with potential contributors",
    "Negotiate final terms",
    "Execute the agreement"
  ];

  return (
    <FormPageLayout
      title="Founder Information"
      description="Define your terms and requirements as a founder in the collaboration agreement"
      icon={<Business />}
      formTitle="Founder Requirements"
      formDescription="As a founder, you'll define the core terms of the collaboration agreement. This includes equity distribution, compensation structure, and protection requirements."
      requirements={requirements}
      keyPoints={keyPoints}
      processSteps={processSteps}
      buttonText="Start Founder Form"
      onButtonClick={handleOpenModal}
    >
      <FounderModal open={modalOpen} onClose={handleCloseModal} />
    </FormPageLayout>
  );
};

export default FounderPage;
