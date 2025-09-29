import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

// Form data interfaces
export interface FounderData {
  // Personal Information
  name: string;
  email: string;
  role: string;
  
  // Company Information
  companyName: string;
  industry: string;
  stage: string;
  
  // Equity Terms
  totalEquity: number;
  vestingPeriod: number;
  
  // Compensation Terms
  hourlyRate: number;
  expectedHours: number;
  
  // Additional Terms
  hasExistingIP: boolean;
  requiresNonCompete: boolean;
  specialTerms: string;
}

export interface ContributorData {
  // Personal Information
  name: string;
  email: string;
  role: string;
  
  // Skills and Experience
  skills: string[];
  experience: string;
  availability: string;
  
  // Equity Terms
  requestedEquity: number;
  vestingPeriod: number;
  
  // Compensation Terms
  hourlyRate: number;
  expectedHours: number;
  
  // Additional Terms
  hasConflicts: boolean;
  agreesToTerms: boolean;
  specialRequests: string;
}

export interface TimesheetEntry {
  contributor: string;
  date: string;
  workDone: string;
  hours: number;
  rate: number;
  total: number;
}

export interface FormDataContextType {
  // Form data
  founderData: FounderData | null;
  contributorData: ContributorData | null;
  timesheetEntries: TimesheetEntry[];
  
  // Actions
  setFounderData: (data: FounderData | null) => void;
  setContributorData: (data: ContributorData | null) => void;
  addTimesheetEntry: (entry: TimesheetEntry) => void;
  updateTimesheetEntry: (index: number, entry: TimesheetEntry) => void;
  removeTimesheetEntry: (index: number) => void;
  clearAllData: () => void;
  
  // Computed values
  totalDeferredWages: number;
  totalHoursWorked: number;
  averageHourlyRate: number;
}

const FormDataContext = createContext<FormDataContextType | undefined>(undefined);

interface FormDataProviderProps {
  children: ReactNode;
}

export const FormDataProvider: React.FC<FormDataProviderProps> = ({ children }) => {
  const [founderData, setFounderData] = useState<FounderData | null>(null);
  const [contributorData, setContributorData] = useState<ContributorData | null>(null);
  const [timesheetEntries, setTimesheetEntries] = useState<TimesheetEntry[]>([]);

  const addTimesheetEntry = useCallback((entry: TimesheetEntry) => {
    setTimesheetEntries(prev => [...prev, entry]);
  }, []);

  const updateTimesheetEntry = useCallback((index: number, entry: TimesheetEntry) => {
    setTimesheetEntries(prev => prev.map((item, i) => i === index ? entry : item));
  }, []);

  const removeTimesheetEntry = useCallback((index: number) => {
    setTimesheetEntries(prev => prev.filter((_, i) => i !== index));
  }, []);

  const clearAllData = useCallback(() => {
    setFounderData(null);
    setContributorData(null);
    setTimesheetEntries([]);
  }, []);

  // Computed values
  const totalDeferredWages = timesheetEntries.reduce((sum, entry) => sum + entry.total, 0);
  const totalHoursWorked = timesheetEntries.reduce((sum, entry) => sum + entry.hours, 0);
  const averageHourlyRate = totalHoursWorked > 0 ? totalDeferredWages / totalHoursWorked : 0;

  const value: FormDataContextType = {
    founderData,
    contributorData,
    timesheetEntries,
    setFounderData,
    setContributorData,
    addTimesheetEntry,
    updateTimesheetEntry,
    removeTimesheetEntry,
    clearAllData,
    totalDeferredWages,
    totalHoursWorked,
    averageHourlyRate,
  };

  return (
    <FormDataContext.Provider value={value}>
      {children}
    </FormDataContext.Provider>
  );
};

export const useFormData = (): FormDataContextType => {
  const context = useContext(FormDataContext);
  if (context === undefined) {
    throw new Error('useFormData must be used within a FormDataProvider');
  }
  return context;
};
