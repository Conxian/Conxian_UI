import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import ConnectWallet from '@/components/ConnectWallet';
import { useWallet } from '@/lib/wallet';

import { vi } from 'vitest';

// Mock the useWallet hook
vi.mock('@/lib/wallet', () => ({
  useWallet: vi.fn(),
}));

describe('ConnectWallet', () => {
  it('should copy the address to clipboard when the copy button is clicked', async () => {
    // Arrange
    const stxAddress = 'SP2J6S06C600A0C9A1S04S8T0A2P0K3F5G4R1J5N';
    (useWallet as ReturnType<typeof vi.fn>).mockReturnValue({
      stxAddress,
      connectWallet: vi.fn(),
      signOut: vi.fn(),
    });

    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn(),
      },
    });

    render(<ConnectWallet />);

    // Act
    const copyButton = screen.getByLabelText('Copy address to clipboard');
    fireEvent.click(copyButton);

    // Assert
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(stxAddress);

    // Check for the CheckIcon
    await waitFor(() => {
      expect(screen.getByTestId('check-icon')).toBeInTheDocument();
    });
  });
});