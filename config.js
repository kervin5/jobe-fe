// This is client side config only - don't put anything in here that shouldn't be public!

function getBasePath(localBasePath, remoteBasePath) {
  if (process.env.NODE_ENV === "production") {
    return remoteBasePath;
  } else {
    return localBasePath;
  }
}

const localBasePath = "http://localhost:3000";
const remoteBasePath = process.env.NEXT_PUBLIC_PATH;
export const basePath = getBasePath(localBasePath, remoteBasePath);
export const endpoint = `${basePath}/graphql`;
export const eEmpactIntegrationEnabled = !!process.env
  .NEXT_PUBLIC_ENABLE_EEMPACT_INTEGRATION;

export const take = 10;
export const companyInfo = {
  name: process.env.NEXT_PUBLIC_COMPANY_NAME ?? "Job Board",
};

export const jobsSettings = {
  showJobType: !!process.env.NEXT_PUBLIC_SHOW_JOB_TYPE_ON_LIST,
  showPayRate: !!process.env.NEXT_PUBLIC_SHOW_PAY_RATE_ON_LIST,
};

console.log(process.env.NEXT_PUBLIC_LANGUAGE);
export const systemLanguage = process.env.NEXT_PUBLIC_LANGUAGE ?? "en";
export const currency = process.env.NEXT_PUBLIC_CURRENCY ?? "$";
