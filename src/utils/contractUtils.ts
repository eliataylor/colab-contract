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
