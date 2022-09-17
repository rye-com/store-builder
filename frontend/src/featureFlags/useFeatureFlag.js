export function useFeatureFlag(flagName) {
  return !!sessionStorage.getItem(flagName);
}

export const featureFlags = {
  enableCheckout: 'enable-checkout',
};
