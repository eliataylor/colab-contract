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
}, getQueryParamValue = (params: Record<string, string>, key: string, defaultValue: string = ''): string => {
    return params[key] || defaultValue;
}, getQueryParamNumber = (params: Record<string, string>, key: string, defaultValue: number): number => {
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
    companyName: string;
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
    partner: string;
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
        companyName: getQueryParamValue(queryParams, 'companyName'),
        customIPDefinition: getQueryParamValue(queryParams, 'customIPDefinition', `* Proprietary user data and customer lists.
* Content, created or curated uniquely to the Company or it's users.
* Trade secrets related to business strategies, financial information, and customer data.`),
        deferredWageRate: getQueryParamNumber(queryParams, 'founderDeferredWageRate', 150)
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
        deferredWageRate: getQueryParamNumber(queryParams, 'contributorDeferredWageRate', 150),
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


// Internal hook - exported for use in hooks file
// eslint-disable-next-line react-refresh/only-export-components
export const useFormData = (): FormDataContextType => {
    const context = useContext(FormDataContext);
    if (context === undefined) {
        throw new Error('useFormData must be used within a FormDataProvider');
    }
    return context;
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
