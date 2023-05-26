import {
  DEFAULT_SKIP, MAX_WIDTH, SMALL_DESK_WIDTH, TABLET_WIDTH,
} from '@constants/carousel';
import { useWindowWidth } from '@hooks/useWindowWidth';

export const getWindowWidthRange = () => {
  const windowWidth = useWindowWidth();

  if (windowWidth < TABLET_WIDTH) {
    return 1;
  }

  if (windowWidth < SMALL_DESK_WIDTH) {
    return 2;
  }

  if (windowWidth < MAX_WIDTH) {
    return 3;
  }

  return DEFAULT_SKIP;
};
