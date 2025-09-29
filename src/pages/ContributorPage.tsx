import React, { useState } from 'react';
import { People } from '@mui/icons-material';
import ContributorModal from '../components/ContributorModal';
import FormPageLayout from '../components/shared/FormPageLayout';

const ContributorPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const requirements = [
    {
      primary: "Personal information and skills",
      secondary: "Name, role, experience, and technical skills"
    },
    {
      primary: "Equity expectations",
      secondary: "Requested equity percentage and vesting preferences"
    },
    {
      primary: "Compensation terms",
      secondary: "Expected hourly rate and time commitment"
    },
    {
      primary: "Availability and commitment",
      secondary: "Time availability and any potential conflicts"
    }
  ];

  const keyPoints = [
    {
      severity: "success" as const,
      title: "Fair Compensation",
      description: "Deferred wages ensure you're compensated for your time, even if the company isn't profitable yet."
    },
    {
      severity: "info" as const,
      title: "Equity Vesting",
      description: "Your equity vests over time with an accelerating schedule that rewards sustained commitment."
    },
    {
      severity: "warning" as const,
      title: "6-Month Cliff",
      description: "No equity vests before completing 6 months of work, ensuring mutual commitment."
    }
  ];

  const processSteps = [
    "Complete the contributor form",
    "Submit your application",
    "Founders review your profile",
    "Initial discussion and negotiation",
    "Agreement execution and onboarding"
  ];

  return (
    <FormPageLayout
      title="Contributor Information"
      description="Express your interest in joining as a contributor and define your contribution terms"
      icon={<People />}
      formTitle="Contributor Application"
      formDescription="As a contributor, you'll define your contribution level, skills, and compensation expectations. This helps founders understand how you can contribute to the project."
      requirements={requirements}
      keyPoints={keyPoints}
      processSteps={processSteps}
      buttonText="Start Contributor Form"
      onButtonClick={handleOpenModal}
    >
      <ContributorModal open={modalOpen} onClose={handleCloseModal} />
    </FormPageLayout>
  );
};

export default ContributorPage;
