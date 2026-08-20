# market-integration Specification

## Purpose
This specification defines the standards and data requirements for integrating the `conxian-market` repository and its underlying Neon Postgres database (`small-math-44741750`) into the primary `conxian_ui` business frontend.

## Requirements

### Requirement: Market & Operational Telemetry
The system SHALL surface operational metrics, treasury runway data, and affiliate conversion statuses fetched from the `conxian-market` API surface or direct read queries.

#### Scenario: Display Market Operational Metrics
- **WHEN** an institutional user views the Overview or Network telemetry pages
- **THEN** the system SHALL include aggregated operational metrics and runway estimates sourced from `conxian-market` (`cnx_bos.operational_metrics` and `cnx_bos.treasury_runway`)

### Requirement: ERP & L2 Settlement Insights
The system SHALL provide access to mock ERP settlement data, compliance cases, and agent budget decisions for enterprise auditing.

#### Scenario: View Enterprise Compliance Cases
- **WHEN** an operator accesses enterprise compliance views
- **THEN** the system SHALL retrieve compliance case status and settlement logs from `conxian-market` (`erp_mock.compliance_cases` and `erp_mock.l2_settlements`)

### Requirement: Service Endpoint Resolution
The system SHALL resolve the `conxian-market` base URL dynamically using configuration environment variable `NEXT_PUBLIC_MARKET_URL` with a standard fallback (`https://market.conxian.org`).

#### Scenario: Market API Call
- **WHEN** the application invokes `MarketApi` methods
- **THEN** requests SHALL target `AppConfig.marketUrl` with appropriate headers and resilient fallback handling
