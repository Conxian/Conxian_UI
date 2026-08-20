import { ContractInteractions } from './contract-interactions';
import { MarketApi } from './market-api';

// --- API Service Wrapper ---

export class ApiService {
  // --- DEX ---
  static getPair = ContractInteractions.getPair;
  static createPair = ContractInteractions.createPair;
  static getLiquidityProviderShare = ContractInteractions.getLiquidityProviderShare;
  static deposit = ContractInteractions.deposit;

  // --- Oracle ---
  static getPrice = ContractInteractions.getPrice;

  // --- Token ---
  static getTokenBalance = ContractInteractions.getTokenBalance;
  static getTokenTotalSupply = ContractInteractions.getTokenTotalSupply;
  static getDecimals = ContractInteractions.getDecimals;
  static getAllowance = ContractInteractions.getAllowance;

  // --- Vault & Bond ---
  static getVaultBalance = ContractInteractions.getVaultBalance;
  static createBond = ContractInteractions.createBond;

  // --- AMM ---
  static getAmmInfo = ContractInteractions.getAmmInfo;

  // --- Flash Loan ---
  static executeFlashLoan = ContractInteractions.executeFlashLoan;

  // --- Security ---
  static getCircuitBreakerStatus = ContractInteractions.getCircuitBreakerStatus;
  static isContractPaused = ContractInteractions.isContractPaused;

  // --- Governance & Staking ---
  static verifyGovernanceSignature = ContractInteractions.verifyGovernanceSignature;
  static getStakingInfo = ContractInteractions.getStakingInfo;

  // --- Monitoring & Metrics ---
  static getSystemHealth = ContractInteractions.getSystemHealth;
  static getAggregatedMetrics = ContractInteractions.getAggregatedMetrics;
  static getFinancialMetrics = ContractInteractions.getFinancialMetrics;
  static getDashboardData = ContractInteractions.getDashboardData;
  static getPerformanceRecommendations = ContractInteractions.getPerformanceRecommendations;
  static getDashboardMetrics = ContractInteractions.getDashboardMetrics;

  // --- Market & ERP Telemetry ---
  static getMarketMetrics = MarketApi.getMarketMetrics;
  static getAffiliateConversions = MarketApi.getAffiliateConversions;
  static getErpSettlements = MarketApi.getErpSettlements;
  static getTreasuryRunway = MarketApi.getTreasuryRunway;

  // --- Enterprise ---
  static getEnterpriseConfig = ContractInteractions.getEnterpriseConfig;

  // --- Yield ---
  static getYieldStrategies = ContractInteractions.getYieldStrategies;

  // --- Transactions ---
  static swap = ContractInteractions.swap;
  static addLiquidity = ContractInteractions.addLiquidity;
  static removeLiquidity = ContractInteractions.removeLiquidity;
  static executeIntent = ContractInteractions.executeIntent;
  static setAllowance = ContractInteractions.setAllowance;

  // --- Account ---
  static getBalance = ContractInteractions.getBalance;
  static getTokenInfo = ContractInteractions.getTokenInfo;
  static getRouterInfo = ContractInteractions.getRouterInfo;
  static estimateSwap = ContractInteractions.estimateSwap;
  static getPoolDetails = ContractInteractions.getPoolDetails;
  static getPositions = ContractInteractions.getPositions;

  // --- Shielded Wallet ---
  static createNewWallet = ContractInteractions.createNewWallet;
  static fetchUserWallets = ContractInteractions.fetchUserWallets;
  static fetchWalletBalance = ContractInteractions.fetchWalletBalance;
  static sendFunds = ContractInteractions.sendFunds;
  static receiveFunds = ContractInteractions.receiveFunds;
}
