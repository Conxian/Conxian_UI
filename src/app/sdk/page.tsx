'use client';

import React from 'react';
import Link from 'next/link';
import {
  CodeBracketIcon,
  BoltIcon,
  ShieldCheckIcon,
  CpuChipIcon,
  CircleStackIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import CopyButton from "@/components/CopyButton";

const installCommand = "cargo add conxian-sdk --features full";

const configSnippet = `{
  "core_api": "https://api.mainnet.hiro.so",
  "gateway_url": "https://gateway.conxian.org",
  "kms_endpoint": "https://vault.conxian.org",
  "nexus_url": "https://nexus.conxian.org",
  "auth": {
    "provider": "passkey",
    "required_attestation": true
  }
}`;

const repoCards = [
  {
    title: "lib-conxian-core",
    href: "https://github.com/Conxian/lib-conxian-core",
    description: "Rust primitives for sBTC bridging, BitVM verification, and Clarity value serialization.",
    badge: "Core Logic",
  },
  {
    title: "conxian-sdk-js",
    href: "https://github.com/Conxian/conxian-sdk-js",
    description: "Type-safe TypeScript SDK for integrating with protocol gateways, vaults, and Nexus.",
    badge: "Client Layer",
  },
  {
    title: "conxian-ui-components",
    href: "https://github.com/Conxian/conxian-ui-components",
    description: "Institutional-grade React components for treasury, liquidity, and governance surfaces.",
    badge: "Interface Layer",
  },
];

const offerCards = [
  {
    title: "sBTC & BitVM Verification",
    description: "Verify 2-way pegs and optimistic bridge state transitions using high-fidelity primitives.",
    icon: ShieldCheckIcon,
  },
  {
    title: "Managed Gateway API",
    description: "Integrate with Conxian-operated gateways for low-latency protocol access and managed telemetry.",
    icon: BoltIcon,
  },
  {
    title: "Institutional Auth",
    description: "Leverage Passkey-first registration and TEE-backed signing for sovereign asset control.",
    icon: CpuChipIcon,
  },
];

const renderCards = [
  {
    title: "API CREDENTIALS",
    description: "Provision and rotate API keys for authenticated institutional integration paths.",
  },
  {
    title: "PROTOCOL STATUS",
    description: "Real-time infrastructure health and synchronization metrics across all protocol layers.",
  },
  {
    title: "DEPLOYMENT PIPELINES",
    description: "Standardized CI/CD paths for moving institutional integrations from sandbox to production.",
  },
];

export default function SdkPage() {
  return (
    <div className="flex-1 flex flex-col bg-background terminal-text">
      <div className="bg-neutral-light text-ink py-2 px-6 flex justify-between items-center border-b border-accent/20">
        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Developer Integrations</span>
        <div className="flex gap-4 text-[10px] font-black uppercase tracking-[0.2em] opacity-60">
          <span>SDK_VERSION: v2.1.0-stable</span>
        </div>
      </div>

      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-10">
        <div className="flex justify-between items-end border-b border-accent/20 pb-6">
          <div>
            <h1 className="text-5xl font-black tracking-widest uppercase text-ink">SDK</h1>
            <p className="text-accent font-black uppercase tracking-widest text-xs mt-2">
              Institutional Integration primitives
            </p>
          </div>
          <div className="flex gap-4">
            <Button
              aria-label="Provision new API key"
              className="h-10 px-6 bg-ink text-background-paper font-black uppercase tracking-widest text-[10px]"
            >
              PROVISION API KEY
            </Button>
          </div>
        </div>

        <section className="machined-card overflow-hidden">
          <div className="machined-header">
            <div className="flex items-center gap-3">
              <CpuChipIcon className="w-3 h-3" />
              <span>INTEGRATION ARCHITECTURE</span>
            </div>
            <span className="opacity-50 font-mono">STATUS: PRODUCTION_READY</span>
          </div>
          <div className="grid gap-8 px-8 py-10 lg:grid-cols-[1.4fr_0.9fr]">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="font-black">CORE_PRIMITIVES</Badge>
                <Badge variant="outline" className="font-black border-accent/30 text-accent">
                  INSTITUTIONAL_AUTH
                </Badge>
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-black tracking-widest text-ink">SOVEREIGN BITCOIN INFRASTRUCTURE</h2>
                <p className="max-w-3xl text-xs leading-relaxed text-ink-light font-bold uppercase tracking-widest">
                  The Conxian SDK family provides institutional-grade building blocks for sBTC bridging, BitVM2/3 verification, and hardware-backed sovereign identity.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="https://github.com/Conxian/lib-conxian-core" target="_blank" rel="noreferrer">
                  <Button variant="outline" className="font-black tracking-widest uppercase text-[10px]">
                    Access Rust Core
                  </Button>
                </a>
                <Link href="/network">
                  <Button className="bg-ink text-background-paper font-black tracking-widest uppercase text-[10px]">
                    Live Telemetry
                  </Button>
                </Link>
              </div>
            </div>
            <Card className="bg-neutral-light border-accent/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-[10px] font-black uppercase tracking-widest text-accent">
                  TRUST_MODEL
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-[10px] leading-relaxed text-ink-light font-bold uppercase tracking-widest">
                <p>
                  <span className="text-ink">BITCOIN_FINALITY:</span> 100% security alignment via sBTC 2-way peg.
                </p>
                <p>
                  <span className="text-ink">MANAGED_ACCESS:</span> Attested gateway endpoints for scale.
                </p>
                <p>
                  <span className="text-ink">LOCAL_VERIFICATION:</span> Client-side state consignment checks (RGB).
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          {offerCards.map(({ title, description, icon: Icon }) => (
            <Card key={title} className="machined-card">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex w-fit rounded-sm border border-accent/20 bg-accent/5 p-3 text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-black uppercase tracking-widest text-ink mb-2">{title}</h3>
                <p className="text-[10px] leading-relaxed text-ink-light font-bold uppercase tracking-widest">
                  {description}
                </p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="machined-card">
            <div className="machined-header">
              <span>REPOSITORIES</span>
              <CircleStackIcon className="w-3 h-3" />
            </div>
            <CardContent className="space-y-4 p-6">
              {repoCards.map((repo) => (
                <div
                  key={repo.title}
                  className="p-4 border border-accent/10 bg-neutral-light rounded-sm group hover:border-accent/40 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xs font-black uppercase tracking-widest text-ink">{repo.title}</h3>
                    <Badge variant="outline" className="text-[8px] font-black border-accent/20">
                      {repo.badge}
                    </Badge>
                  </div>
                  <p className="text-[10px] text-ink-light font-bold uppercase tracking-widest mb-4">
                    {repo.description}
                  </p>
                  <a
                    href={repo.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-accent hover:underline"
                  >
                    Source Code
                    <ArrowTopRightOnSquareIcon className="h-3 w-3" />
                  </a>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="machined-card">
              <div className="machined-header">
                <span>INSTALLATION</span>
              </div>
              <CardContent className="p-6">
                <div className="p-4 bg-ink text-background-paper font-mono text-[10px] rounded-sm relative group tabular-nums">
                  <div className="flex justify-between items-start gap-4">
                    <pre className="whitespace-pre-wrap break-all opacity-80">{installCommand}</pre>
                    <CopyButton
                      textToCopy={installCommand}
                      ariaLabel="SDK install command"
                      className="text-background-paper opacity-40 group-hover:opacity-100"
                    />
                  </div>
                </div>
                <p className="mt-4 text-[9px] text-ink-light font-bold uppercase tracking-widest leading-relaxed">
                  Utilize standard Cargo dependency management for all core SDK crates.
                </p>
              </CardContent>
            </Card>

            <Card className="machined-card">
              <div className="machined-header">
                <span>BOOTSTRAP_CONFIG</span>
              </div>
              <CardContent className="p-6">
                <div className="p-4 bg-neutral-light border border-accent/20 font-mono text-[10px] text-ink rounded-sm relative group tabular-nums">
                  <div className="flex justify-between items-start gap-4">
                    <pre className="whitespace-pre-wrap break-all opacity-80">{configSnippet}</pre>
                    <CopyButton textToCopy={configSnippet} ariaLabel="config snippet" className="opacity-40 group-hover:opacity-100" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3 border-t border-accent/20 pt-12">
          {renderCards.map((card) => (
            <div key={card.title} className="space-y-2">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-accent">{card.title}</h4>
              <p className="text-[10px] text-ink-light font-bold uppercase tracking-widest leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
