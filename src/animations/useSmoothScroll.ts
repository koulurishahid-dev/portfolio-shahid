import { createContext, useContext } from 'react';
import type Lenis from 'lenis';

export interface SmoothScrollContextType {
  getLenis: () => Lenis | null;
  scrollTo: (
    target: string | number | HTMLElement,
    options?: { offset?: number; duration?: number }
  ) => void;
  refresh: () => void;
}

export const SmoothScrollContext = createContext<SmoothScrollContextType>({
  getLenis: () => null,
  scrollTo: () => {},
  refresh: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);
