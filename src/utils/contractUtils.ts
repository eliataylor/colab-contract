import type {ContributorData, FounderData} from '../contexts/FormDataContext';

// Contract template placeholder replacement utility
export const replaceContractPlaceholders = (template: string, placeholders: Record<string, string | number>): string => {
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

    // Add all founder data (regardless of default values)
    params.set('founderName', founderData.name);
    params.set('founderEmail', founderData.email);
    params.set('founderPhone', founderData.phone);
    params.set('founderAddress', founderData.address);
    params.set('companyName', founderData.companyName);
    params.set('customIPDefinition', founderData.customIPDefinition);
    params.set('founderDeferredWageRate', founderData.deferredWageRate.toString());
    params.set('tasksAllowed', founderData.tasksAllowed);
    params.set('tasksNotAllowed', founderData.tasksNotAllowed);

    // Add all contributor data (regardless of default values)
    params.set('contributorName', contributorData.name);
    params.set('contributorEmail', contributorData.email);
    params.set('contributorPhone', contributorData.phone);
    params.set('contributorAddress', contributorData.address);
    params.set('totalEquityGranted', contributorData.totalEquityGranted.toString());
    params.set('vestingPeriod', contributorData.vestingPeriod.toString());
    params.set('contributorDeferredWageRate', contributorData.deferredWageRate.toString());
    params.set('cliffDays', contributorData.cliffDays.toString());
    params.set('vestingExponent', contributorData.vestingExponent.toString());

    const queryString = params.toString();
    const url = baseUrl || (typeof window !== 'undefined' ? window.location.origin + window.location.pathname : '');

    return queryString ? `${url}?${queryString}` : url;
};
