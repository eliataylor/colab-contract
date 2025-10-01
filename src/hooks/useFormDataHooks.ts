import {useFormData as useFormDataInternal, type FounderData, type ContributorData} from '../contexts/FormDataContext';

// Re-export the main hook
export const useFormData = useFormDataInternal;

// Re-export specialized hooks
export const useContributorData = () => {
    const {contributorData, updateContributorData, isContributorDataComplete} = useFormDataInternal();
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
    } = useFormDataInternal();
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

export const useContractData = () => {
    const {founderData, contributorData, isContractReady} = useFormDataInternal();

    // Vesting calculations
    const getVestingData = () => {
        const vestingPeriodDays = contributorData.vestingPeriod * 365;
        const cliffDays = contributorData.cliffDays;
        const vestingExponent = contributorData.vestingExponent;

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

        return {
            VESTING_12_MONTHS: Number(calculateVestingPercentage(contributorData.totalEquityGranted, 365, vestingPeriodDays, cliffDays, vestingExponent).toFixed(2)),
            VESTING_18_MONTHS: Number(calculateVestingPercentage(contributorData.totalEquityGranted, 547, vestingPeriodDays, cliffDays, vestingExponent).toFixed(2)),
            VESTING_24_MONTHS: Number(calculateVestingPercentage(contributorData.totalEquityGranted, 730, vestingPeriodDays, cliffDays, vestingExponent).toFixed(2)),
            VESTING_30_MONTHS: Number(calculateVestingPercentage(contributorData.totalEquityGranted, 912, vestingPeriodDays, cliffDays, vestingExponent).toFixed(2)),
            VESTING_36_MONTHS: Number(calculateVestingPercentage(contributorData.totalEquityGranted, 1095, vestingPeriodDays, cliffDays, vestingExponent).toFixed(2)),
            VESTING_42_MONTHS: Number(calculateVestingPercentage(contributorData.totalEquityGranted, 1277, vestingPeriodDays, cliffDays, vestingExponent).toFixed(2)),
            VESTING_48_MONTHS: Number(calculateVestingPercentage(contributorData.totalEquityGranted, 1460, vestingPeriodDays, cliffDays, vestingExponent).toFixed(2))
        };
    };

    // Deferred compensation examples
    const getDeferredCompensationExamples = () => {
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
    };

    // Contract placeholder data
    const getContractPlaceholders = () => {
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
    };

    // Contract template replacement
    const populateContractTemplate = (template: string) => {
        const placeholders = getContractPlaceholders();
        let result = template;

        // Replace all placeholders with actual values
        Object.entries(placeholders).forEach(([key, value]) => {
            const placeholder = `{{${key}}}`;
            result = result.replace(new RegExp(placeholder, 'g'), String(value));
        });

        return result;
    };

    const setContractData = (container: string, placeholder: string, value: string | number) => {
        console.log(container, placeholder, value);
    }

    // Get a single placeholder by key
    const getPlaceholder = (key: string): string | number | undefined => {
        const placeholders = getContractPlaceholders();
        return placeholders[key as keyof typeof placeholders];
    };

    // Set a single placeholder by key (updates the underlying form data)
    const setPlaceholder = (key: string, value: string | number) => {
        const {updateFounderData, updateContributorData} = useFormDataInternal();
        
        // Map placeholder keys to their corresponding form data fields
        const founderFields: Record<string, keyof FounderData> = {
            'FOUNDER_NAMES': 'name',
            'FOUNDER_NAME': 'name',
            'FOUNDER_EMAIL': 'email',
            'FOUNDER_PHONE': 'phone',
            'FOUNDER_ADDRESS': 'address',
            'FOUNDER_HOURLY_RATE': 'deferredWageRate',
            'CUSTOM_IP_DEFINITION': 'customIPDefinition'
        };

        const contributorFields: Record<string, keyof ContributorData> = {
            'CONTRIBUTOR_NAMES': 'name',
            'CONTRIBUTOR_NAME': 'name',
            'CONTRIBUTOR_EMAIL': 'email',
            'CONTRIBUTOR_PHONE': 'phone',
            'CONTRIBUTOR_ADDRESS': 'address',
            'CONTRIBUTOR_HOURLY_RATE': 'deferredWageRate',
            'CONTRIBUTOR_EQUITY_PERCENTAGE': 'totalEquityGranted',
            'VESTING_PERIOD_YEARS': 'vestingPeriod',
            'CLIFF_DAYS': 'cliffDays',
            'VESTING_EXPONENT': 'vestingExponent'
        };

        // Update founder data if key matches
        if (founderFields[key]) {
            updateFounderData({ [founderFields[key]]: value as any });
        }
        // Update contributor data if key matches
        else if (contributorFields[key]) {
            updateContributorData({ [contributorFields[key]]: value as any });
        }
        // For computed values, we can't directly set them as they're calculated
        else {
            console.warn(`Cannot set computed placeholder: ${key}. This value is calculated from other form data.`);
        }
    };

    return {
        isContractReady,
        getVestingData,
        setContractData,
        getDeferredCompensationExamples,
        getContractPlaceholders,
        populateContractTemplate,
        getPlaceholder,
        setPlaceholder
    };
};
