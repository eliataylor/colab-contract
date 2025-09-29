import React from 'react';
import { Business } from '@mui/icons-material';
import FounderModal from '../components/FounderModal';
import FormPageLayout from '../components/shared/FormPageLayout';

const FounderPage: React.FC = () => {
  const requirements = [
    {
      primary: "Contact information",
      secondary: "Name, email, phone, and address for the contract"
    },
    {
      primary: "Custom IP definition",
      secondary: "Define what constitutes intellectual property for your company"
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
      severity: "warning" as const,
      title: "IP Definition",
      description: "Clearly define what constitutes intellectual property to protect your interests."
    },
    {
      severity: "success" as const,
      title: "Deferred Compensation",
      description: "Wages accrue until the company can afford regular payments, protecting all parties."
    }
  ];

  const processSteps = [
    "Enter your contact information",
    "Define your IP protection requirements",
    "Set your deferred wage rate",
    "Review and save your information",
    "Use the contract preview to see the results"
  ];

  return (
    <FormPageLayout
      title="Founder Contact Information"
      description="Enter your contact details and preferences for the collaboration agreement"
      icon={<Business />}
      formTitle="Founder Setup"
      formDescription="Complete your founder information to personalize the collaboration agreement. This includes your contact details, IP protection preferences, and compensation terms."
      requirements={requirements}
      keyPoints={keyPoints}
      processSteps={processSteps}
    >
      <FounderModal layout="page" />
    </FormPageLayout>
  );
};

export default FounderPage;
