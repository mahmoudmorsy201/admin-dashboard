import useMediaQuery from 'beautiful-react-hooks/useMediaQuery';
import { useMemo } from 'react';

export interface UseWindowSizeOptions {
  minSmallPhoneWidth?: number;
  minPhoneWidth?: number;
  minTabletWidth?: number;
  minDesktopWidth?: number;
  minDesktopLargeWidth?: number;
  minDesktopExtraLargeWidth?: number;
}

const defaultOptions: UseWindowSizeOptions = {
  minSmallPhoneWidth: 375,
  minPhoneWidth: 440,
  minTabletWidth: 768,
  minDesktopWidth: 960,
  minDesktopLargeWidth: 1200,
  minDesktopExtraLargeWidth: 1440,
};

export const useWindowSize = (options?: UseWindowSizeOptions) => {
  const opts = useMemo(() => ({ ...defaultOptions, ...options }), [options]);

  const isExtraSmallMobile = useMediaQuery(`(max-width: ${(opts.minSmallPhoneWidth ?? 375) - 1}px)`);
  const isSmallMobile = useMediaQuery(`(max-width: ${(opts.minPhoneWidth ?? 440) - 1}px)`);
  const isMobile = useMediaQuery(`(max-width: ${(opts.minTabletWidth ?? 768) - 1}px)`);
  const isTablet = useMediaQuery(
    `(min-width: ${(opts.minTabletWidth ?? 768)}px) and (max-width: ${(opts.minDesktopWidth ?? 960) - 1}px)`,
  );
  const isDesktop = useMediaQuery(`(min-width: ${(opts.minDesktopWidth ?? 960)}px)`);
  const isDesktopSmall = useMediaQuery(
    `(min-width: ${(opts.minDesktopWidth ?? 960)}px) and (max-width: ${(opts.minDesktopLargeWidth ?? 1200) - 1}px)`,
  );
  const isDesktopLarge = useMediaQuery(
    `(min-width: ${(opts.minDesktopLargeWidth ?? 1200)}px) and (max-width: ${(opts.minDesktopExtraLargeWidth ?? 1440) - 1}px)`,
  );
  const isDesktopExtraLarge = useMediaQuery(`(min-width: ${(opts.minDesktopExtraLargeWidth ?? 1440)}px)`);
  
  const isPortrait = useMediaQuery('(orientation: portrait)');
  const isLandscape = useMediaQuery('(orientation: landscape)');
  const isHoverDevice = useMediaQuery('(hover: hover)');

  return useMemo(
    () => ({
      isExtraSmallMobile,
      isSmallMobile,
      isMobile,
      isTablet,
      isDesktop,
      isDesktopSmall,
      isDesktopLarge,
      isDesktopExtraLarge,
      isPortrait,
      isLandscape,
      isHoverDevice,
    }),
    [
      isDesktop,
      isDesktopExtraLarge,
      isDesktopLarge,
      isDesktopSmall,
      isExtraSmallMobile,
      isHoverDevice,
      isLandscape,
      isMobile,
      isPortrait,
      isSmallMobile,
      isTablet,
    ],
  );
};
