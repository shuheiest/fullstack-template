import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';

const loadingCounterAtom = atom(0);

export const useLoadingState = () => {
  const [loading, setLoading] = useAtom(loadingCounterAtom);

  return {
    loading: loading > 0,
    setLoading: useCallback(
      (enable: boolean) => setLoading((c) => c + (enable ? 1 : -1)),
      [setLoading],
    ),
  };
};
