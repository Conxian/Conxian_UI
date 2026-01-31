
import { ApiService } from './api-services';

// --- API Client ---

export const apiClient = {
  // --- DEX ---
  getPair: ApiService.getPair,
  createPair: ApiService.createPair,
  getLiquidityProviderShare: ApiService.getLiquidityProviderShare,
  removeLiquidity: ApiService.removeLiquidity,
  deposit: ApiService.deposit,

  // --- Oracle ---
  getPrice: ApiService.getPrice,

  // --- Token ---
  getTokenBalance: ApiService.getTokenBalance,
  getTokenTotalSupply: ApiService.getTokenTotalSupply,

  // --- Vault ---
  getVaultBalance: ApiService.getVaultBalance,

  // --- Bond ---
  createBond: ApiService.createBond,

  // --- Flash Loan ---
  executeFlashLoan: ApiService.executeFlashLoan,

  // --- Security ---
  getCircuitBreakerStatus: ApiService.getCircuitBreakerStatus,
  isContractPaused: ApiService.isContractPaused,

  // --- Governance ---
  verifyGovernanceSignature: ApiService.verifyGovernanceSignature,

  // --- Staking ---
  getStakingInfo: ApiService.getStakingInfo,

  // --- Monitoring ---
  getSystemHealth: ApiService.getSystemHealth,
  getAggregatedMetrics: ApiService.getAggregatedMetrics,
  getFinancialMetrics: ApiService.getFinancialMetrics,
  getDashboardData: ApiService.getDashboardData,
  getPerformanceRecommendations: ApiService.getPerformanceRecommendations,
  getDashboardMetrics: ApiService.getDashboardMetrics,

  // --- Enterprise ---
  getEnterpriseConfig: ApiService.getEnterpriseConfig,

  // --- Yield Optimizer ---
  getYieldStrategies: ApiService.getYieldStrategies,

  // --- Shielded Wallet ---
  createNewWallet: ApiService.createNewWallet,
  fetchUserWallets: ApiService.fetchUserWallets,
  fetchWalletBalance: ApiService.fetchWalletBalance,
  sendFunds: ApiService.sendFunds,
  receiveFunds: ApiService.receiveFunds,

  // --- Banking ---
  executeIntent: ApiService.executeIntent,

  // --- Positions ---
  getPositions: ApiService.getPositions,
};

// --- Data Fetching Hooks (for use in UI components) ---

export const useApi = () => {
  return apiClient;
};
