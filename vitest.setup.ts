import { vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    StacksProvider?: any;
  }
}

process.env.VITEST = 'true';

vi.mock('@/lib/wallet', () => ({
  userSession: {
    isUserSignedIn: vi.fn().mockReturnValue(true),
    loadUserData: vi.fn().mockReturnValue({
      profile: {
        stxAddress: {
          mainnet: 'SP3FBR2AGK5H9QPNVFJWC7636X22Y620S00000000',
        },
      },
    }),
  },
}));
