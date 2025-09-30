import type {ReactNode} from 'react';
import React, {createContext, useCallback, useContext, useMemo, useState} from 'react';

// Query parameter parsing utilities
const parseQueryParams = (): Record<string, string> => {
    if (typeof window === 'undefined') return {};
    
    const params = new URLSearchParams(window.location.search);
    const result: Record<string, string> = {};
    
    params.forEach((value, key) => {
        result[key] = value;
    });
    
    return result;
};

const getQueryParamValue = (params: Record<string, string>, key: string, defaultValue: string = ''): string => {
    return params[key] || defaultValue;
};

const getQueryParamNumber = (params: Record<string, string>, key: string, defaultValue: number): number => {
    const value = params[key];
    if (!value) return defaultValue;
    
    const parsed = parseFloat(value);
    return isNaN(parsed) ? defaultValue : parsed;
};

// Simplified data interfaces matching contract template
export interface FounderData {
    name: string;
    email: string;
    phone: string;
    address: string;
    customIPDefinition: string;
    deferredWageRate: number;
}

export interface ContributorData {
    name: string;
    email: string;
    phone: string;
    address: string;
    totalEquityGranted: number;
    vestingPeriod: number; // in years
    deferredWageRate: number;
    cliffDays: number; // cliff period in days
    vestingExponent: number; // exponent for vesting calculation (default 2)
}

export interface TimesheetEntry {
    contributor: string;
    date: string;
    workDone: string;
    hours: number;
    rate: number;
    total: number;
}

// Function to get default values with query parameter overrides
const getDefaultFounderData = (): FounderData => {
    const queryParams = parseQueryParams();
    
    return {
        name: getQueryParamValue(queryParams, 'founderName'),
        email: getQueryParamValue(queryParams, 'founderEmail'),
        phone: getQueryParamValue(queryParams, 'founderPhone'),
        address: getQueryParamValue(queryParams, 'founderAddress'),
        customIPDefinition: getQueryParamValue(queryParams, 'customIPDefinition', `* Proprietary user data and customer lists.
* Content, created or curated uniquely to the Company.
* Trade secrets related to business strategies, financial information, and customer data.\n
_This definition expressly excludes the Contributors' general skills, experience, and knowledge, as well as general software code, algorithms, and development methodologies that are not proprietary to the Company's core IP._`),
        deferredWageRate: getQueryParamNumber(queryParams, 'founderDeferredWageRate', 75)
    };
};

const getDefaultContributorData = (): ContributorData => {
    const queryParams = parseQueryParams();
    
    return {
        name: getQueryParamValue(queryParams, 'contributorName'),
        email: getQueryParamValue(queryParams, 'contributorEmail'),
        phone: getQueryParamValue(queryParams, 'contributorPhone'),
        address: getQueryParamValue(queryParams, 'contributorAddress'),
        totalEquityGranted: getQueryParamNumber(queryParams, 'totalEquityGranted', 25),
        vestingPeriod: getQueryParamNumber(queryParams, 'vestingPeriod', 2),
        deferredWageRate: getQueryParamNumber(queryParams, 'contributorDeferredWageRate', 75),
        cliffDays: getQueryParamNumber(queryParams, 'cliffDays', 180),
        vestingExponent: getQueryParamNumber(queryParams, 'vestingExponent', 2)
    };
};

export interface FormDataContextType {
    // Form data
    founderData: FounderData;
    contributorData: ContributorData;
    timesheetEntries: TimesheetEntry[];

    // User interaction tracking
    founderFieldsModified: Set<keyof FounderData>;
    contributorFieldsModified: Set<keyof ContributorData>;

    // Query parameter tracking
    hasQueryParams: boolean;
    queryParamsUsed: Set<string>;

    // Actions
    updateFounderData: (updates: Partial<FounderData>) => void;
    updateContributorData: (updates: Partial<ContributorData>) => void;
    addTimesheetEntry: (entry: TimesheetEntry) => void;
    updateTimesheetEntry: (index: number, entry: TimesheetEntry) => void;
    removeTimesheetEntry: (index: number) => void;
    clearAllData: () => void;

    // Computed values
    totalDeferredWages: number;
    totalHoursWorked: number;
    averageHourlyRate: number;

    // Validation
    isFounderDataComplete: boolean;
    isContributorDataComplete: boolean;
    isContractReady: boolean;
}

const FormDataContext = createContext<FormDataContextType | undefined>(undefined);

interface FormDataProviderProps {
    children: ReactNode;
}

// Vesting calculation utility
const calculateVestingPercentage = (
    totalEquity: number,
    daysWorked: number,
    totalVestingDays: number,
    cliffDays: number,
    vestingExponent: number = 2
): number => {
    if (daysWorked < cliffDays) return 0;

    const vestingRatio = Math.pow(
        (daysWorked - cliffDays) / (totalVestingDays - cliffDays),
        vestingExponent
    );

    return Math.min(totalEquity * vestingRatio, totalEquity);
};

export const FormDataProvider: React.FC<FormDataProviderProps> = ({children}) => {
    // Initialize with query parameters
    const [founderData, setFounderData] = useState<FounderData>(() => getDefaultFounderData());
    const [contributorData, setContributorData] = useState<ContributorData>(() => getDefaultContributorData());
    const [timesheetEntries, setTimesheetEntries] = useState<TimesheetEntry[]>([]);
    const [founderFieldsModified, setFounderFieldsModified] = useState<Set<keyof FounderData>>(new Set());
    const [contributorFieldsModified, setContributorFieldsModified] = useState<Set<keyof ContributorData>>(new Set());
    
    // Track query parameters
    const [queryParamsUsed] = useState<Set<string>>(() => {
        const params = parseQueryParams();
        return new Set(Object.keys(params));
    });
    const [hasQueryParams] = useState<boolean>(() => {
        const params = parseQueryParams();
        return Object.keys(params).length > 0;
    });

    // Update functions
    const updateFounderData = useCallback((updates: Partial<FounderData>) => {
        setFounderData(prev => ({...prev, ...updates}));
        // Track which fields have been modified
        setFounderFieldsModified(prev => {
            const newSet = new Set(prev);
            Object.keys(updates).forEach(key => {
                newSet.add(key as keyof FounderData);
            });
            return newSet;
        });
    }, []);

    const updateContributorData = useCallback((updates: Partial<ContributorData>) => {
        setContributorData(prev => ({...prev, ...updates}));
        // Track which fields have been modified
        setContributorFieldsModified(prev => {
            const newSet = new Set(prev);
            Object.keys(updates).forEach(key => {
                newSet.add(key as keyof ContributorData);
            });
            return newSet;
        });
    }, []);

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
        setFounderData(getDefaultFounderData());
        setContributorData(getDefaultContributorData());
        setTimesheetEntries([]);
        setFounderFieldsModified(new Set());
        setContributorFieldsModified(new Set());
    }, []);

    // Computed values
    const totalDeferredWages = useMemo(() =>
            timesheetEntries.reduce((sum, entry) => sum + entry.total, 0),
        [timesheetEntries]
    );

    const totalHoursWorked = useMemo(() =>
            timesheetEntries.reduce((sum, entry) => sum + entry.hours, 0),
        [timesheetEntries]
    );

    const averageHourlyRate = useMemo(() =>
            totalHoursWorked > 0 ? totalDeferredWages / totalHoursWorked : 0,
        [totalDeferredWages, totalHoursWorked]
    );

    // Validation
    const isFounderDataComplete = useMemo(() =>
            !!(founderData.name && founderData.email && founderData.phone && founderData.address),
        [founderData]
    );

    const isContributorDataComplete = useMemo(() =>
            !!(contributorData.name && contributorData.email && contributorData.phone && contributorData.address),
        [contributorData]
    );

    const isContractReady = useMemo(() =>
            isFounderDataComplete && isContributorDataComplete,
        [isFounderDataComplete, isContributorDataComplete]
    );

    const value: FormDataContextType = {
        founderData,
        contributorData,
        timesheetEntries,
        founderFieldsModified,
        contributorFieldsModified,
        hasQueryParams,
        queryParamsUsed,
        updateFounderData,
        updateContributorData,
        addTimesheetEntry,
        updateTimesheetEntry,
        removeTimesheetEntry,
        clearAllData,
        totalDeferredWages,
        totalHoursWorked,
        averageHourlyRate,
        isFounderDataComplete,
        isContributorDataComplete,
        isContractReady
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

// Specialized hooks with computed methods
export const useFounderData = () => {
    const {founderData, updateFounderData, isFounderDataComplete} = useFormData();
    return {founderData, updateFounderData, isFounderDataComplete};
};

export const useContributorData = () => {
    const {contributorData, updateContributorData, isContributorDataComplete} = useFormData();
    return {contributorData, updateContributorData, isContributorDataComplete};
};

export const useTimesheetData = () => {
    const {
        timesheetEntries,
        addTimesheetEntry,
        updateTimesheetEntry,
        removeTimesheetEntry,
        totalDeferredWages,
        totalHoursWorked,
        averageHourlyRate
    } = useFormData();
    return {
        timesheetEntries,
        addTimesheetEntry,
        updateTimesheetEntry,
        removeTimesheetEntry,
        totalDeferredWages,
        totalHoursWorked,
        averageHourlyRate
    };
};

// Contract data hook with computed methods
export const useContractData = () => {
    const {founderData, contributorData, isContractReady} = useFormData();

    // Vesting calculations
    const getVestingData = useCallback(() => {
        const vestingPeriodDays = contributorData.vestingPeriod * 365;
        const cliffDays = contributorData.cliffDays;
        const vestingExponent = contributorData.vestingExponent;

        return {
            VESTING_12_MONTHS: Number(calculateVestingPercentage(contributorData.totalEquityGranted, 365, vestingPeriodDays, cliffDays, vestingExponent).toFixed(2)),
            VESTING_18_MONTHS: Number(calculateVestingPercentage(contributorData.totalEquityGranted, 547, vestingPeriodDays, cliffDays, vestingExponent).toFixed(2)),
            VESTING_24_MONTHS: Number(calculateVestingPercentage(contributorData.totalEquityGranted, 730, vestingPeriodDays, cliffDays, vestingExponent).toFixed(2)),
            VESTING_30_MONTHS: Number(calculateVestingPercentage(contributorData.totalEquityGranted, 912, vestingPeriodDays, cliffDays, vestingExponent).toFixed(2)),
            VESTING_36_MONTHS: Number(calculateVestingPercentage(contributorData.totalEquityGranted, 1095, vestingPeriodDays, cliffDays, vestingExponent).toFixed(2)),
            VESTING_42_MONTHS: Number(calculateVestingPercentage(contributorData.totalEquityGranted, 1277, vestingPeriodDays, cliffDays, vestingExponent).toFixed(2)),
            VESTING_48_MONTHS: Number(calculateVestingPercentage(contributorData.totalEquityGranted, 1460, vestingPeriodDays, cliffDays, vestingExponent).toFixed(2))
        };
    }, [contributorData.totalEquityGranted, contributorData.vestingPeriod, contributorData.cliffDays, contributorData.vestingExponent]);

    // Deferred compensation examples
    const getDeferredCompensationExamples = useCallback(() => {
        const exampleContributorTotal = 5000; // From contract template
        const exampleFounderTotal = 1000; // From contract template
        const exampleTotalOwed = exampleContributorTotal + exampleFounderTotal;
        const exampleAvailableProfit = 1000; // From contract template
        const exampleDistributionPercentage = (exampleAvailableProfit / exampleTotalOwed) * 100;

        return {
            EXAMPLE_CONTRIBUTOR_TOTAL: exampleContributorTotal,
            EXAMPLE_FOUNDER_TOTAL: exampleFounderTotal,
            EXAMPLE_TOTAL_OWED: exampleTotalOwed,
            EXAMPLE_AVAILABLE_PROFIT: exampleAvailableProfit,
            EXAMPLE_DISTRIBUTION_PERCENTAGE: Number(exampleDistributionPercentage.toFixed(2)),
            EXAMPLE_CONTRIBUTOR_PAYMENT: Number(((exampleContributorTotal * exampleDistributionPercentage) / 100).toFixed(2)),
            EXAMPLE_FOUNDER_PAYMENT: Number(((exampleFounderTotal * exampleDistributionPercentage) / 100).toFixed(2))
        };
    }, []);

    // Contract placeholder data
    const getContractPlaceholders = useCallback(() => {
        const vestingData = getVestingData();
        const deferredExamples = getDeferredCompensationExamples();

        return {
            // User-entered data
            FOUNDER_NAMES: founderData.name || '[Founders\' Names]',
            CONTRIBUTOR_NAMES: contributorData.name || '[Contributors\' Names]',
            CUSTOM_IP_DEFINITION: founderData.customIPDefinition,
            CONTRIBUTOR_EQUITY_PERCENTAGE: contributorData.totalEquityGranted,
            VESTING_PERIOD_YEARS: contributorData.vestingPeriod,
            VESTING_PERIOD_DAYS: contributorData.vestingPeriod * 365,
            CLIFF_DAYS: contributorData.cliffDays,
            VESTING_EXPONENT: contributorData.vestingExponent,
            FOUNDER_NAME: founderData.name || 'Founder A',
            CONTRIBUTOR_NAME: contributorData.name || 'Contributor A',
            FOUNDER_HOURLY_RATE: founderData.deferredWageRate,
            CONTRIBUTOR_HOURLY_RATE: contributorData.deferredWageRate,
            FOUNDER_EMAIL: founderData.email || '[Founder Email]',
            FOUNDER_PHONE: founderData.phone || '[Founder Phone]',
            FOUNDER_ADDRESS: founderData.address || '[Founder Address]',
            CONTRIBUTOR_EMAIL: contributorData.email || '[Contributor Email]',
            CONTRIBUTOR_PHONE: contributorData.phone || '[Contributor Phone]',
            CONTRIBUTOR_ADDRESS: contributorData.address || '[Contributor Address]',
            AGREEMENT_DATE: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),

            // Computed data
            ...vestingData,
            ...deferredExamples
        };
    }, [founderData, contributorData, getVestingData, getDeferredCompensationExamples]);

    // Contract template replacement
    const populateContractTemplate = useCallback((template: string) => {
        const placeholders = getContractPlaceholders();
        let result = template;

        // Replace all placeholders with actual values
        Object.entries(placeholders).forEach(([key, value]) => {
            const placeholder = `{{${key}}}`;
            result = result.replace(new RegExp(placeholder, 'g'), String(value));
        });

        return result;
    }, [getContractPlaceholders]);

    return {
        isContractReady,
        getVestingData,
        getDeferredCompensationExamples,
        getContractPlaceholders,
        populateContractTemplate
    };
};

// Contract template placeholder replacement utility
export const replaceContractPlaceholders = (template: string, placeholders: Record<string, any>): string => {
    let result = template;

    // Replace all placeholders with actual values
    Object.entries(placeholders).forEach(([key, value]) => {
        const placeholder = `{{${key}}}`;
        result = result.replace(new RegExp(placeholder, 'g'), String(value));
    });

    return result;
};

// Utility to generate shareable URL with query parameters
export const generateShareableUrl = (founderData: FounderData, contributorData: ContributorData, baseUrl?: string): string => {
    const params = new URLSearchParams();
    
    // Add founder data
    if (founderData.name) params.set('founderName', founderData.name);
    if (founderData.email) params.set('founderEmail', founderData.email);
    if (founderData.phone) params.set('founderPhone', founderData.phone);
    if (founderData.address) params.set('founderAddress', founderData.address);
    if (founderData.deferredWageRate !== 75) params.set('founderDeferredWageRate', founderData.deferredWageRate.toString());
    
    // Add contributor data
    if (contributorData.name) params.set('contributorName', contributorData.name);
    if (contributorData.email) params.set('contributorEmail', contributorData.email);
    if (contributorData.phone) params.set('contributorPhone', contributorData.phone);
    if (contributorData.address) params.set('contributorAddress', contributorData.address);
    if (contributorData.totalEquityGranted !== 25) params.set('totalEquityGranted', contributorData.totalEquityGranted.toString());
    if (contributorData.vestingPeriod !== 2) params.set('vestingPeriod', contributorData.vestingPeriod.toString());
    if (contributorData.deferredWageRate !== 75) params.set('contributorDeferredWageRate', contributorData.deferredWageRate.toString());
    if (contributorData.cliffDays !== 180) params.set('cliffDays', contributorData.cliffDays.toString());
    if (contributorData.vestingExponent !== 2) params.set('vestingExponent', contributorData.vestingExponent.toString());
    
    const queryString = params.toString();
    const url = baseUrl || (typeof window !== 'undefined' ? window.location.origin + window.location.pathname : '');
    
    return queryString ? `${url}?${queryString}` : url;
};