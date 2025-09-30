/// <reference types="vite/client" />

import { RewardsApiResponse } from './types/api/rewards';

declare global {
  interface Window {
    testRewards: (rewards: RewardsApiResponse) => void;
  }
}