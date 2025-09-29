import React from 'react';
import { People } from '@mui/icons-material';
import ContributorModal from '../components/ContributorModal';
import FormPageLayout from '../components/shared/FormPageLayout';

const ContributorPage: React.FC = () => {
  const requirements = [
    {
      primary: "Contact information",
      secondary: "Name, email, phone, and address for the contract"
    },
    {
      primary: "Total equity granted",
      secondary: "Percentage of equity you'll receive as a contributor"
    },
    {
      primary: "Vesting period",
      secondary: "Time period over which your equity will vest"
    },
    {
      primary: "Deferred wage rate",
      secondary: "Hourly rate for deferred compensation calculation"
    }
  ];

  const keyPoints = [
    {
      severity: "info" as const,
      title: "Contact Details",
      description: "Your contact information will be used in the collaboration agreement and contract."
    },
    {
      severity: "success" as const,
      title: "Deferred Compensation",
      description: "Wages accrue until the company can afford regular payments, protecting all parties."
    },
    {
      severity: "warning" as const,
      title: "6-Month Cliff",
      description: "No equity vests before completing 6 months of work, ensuring mutual commitment."
    }
  ];

  const processSteps = [
    "Enter your contact information",
    "Set your equity and vesting terms",
    "Define your deferred wage rate",
    "Review and save your information",
    "Use the contract preview to see the results"
  ];

  return (
    <FormPageLayout
      title="Contributor Contact Information"
      description="Enter your contact details and preferences for the collaboration agreement"
      icon={<People />}
      formTitle="Contributor Setup"
      formDescription="Complete your contributor information to personalize the collaboration agreement. This includes your contact details, equity terms, and compensation preferences."
      requirements={requirements}
      keyPoints={keyPoints}
      processSteps={processSteps}
    >
      <ContributorModal layout="page" />
    </FormPageLayout>
  );
};

export default ContributorPage;
