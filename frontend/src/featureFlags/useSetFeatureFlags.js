import { useLocation } from 'react-router-dom';

export function useSetFeatureFlags() {
  const { search } = useLocation();
  const setParam = new URLSearchParams(search).get('set');
  setParam?.split(',').forEach((param) => {
    sessionStorage.setItem(param, 'true');
  });
}
