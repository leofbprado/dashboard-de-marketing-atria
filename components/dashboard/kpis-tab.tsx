"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { topKpiCards, type KpiCard, diagnosticData } from "@/lib/dashboard-data"
import { ArrowUpRight, ArrowDownRight, DollarSign, Users, BarChart3, TrendingUp } from "lucide-react"

function TrendBadge({ trend, change }: { trend: KpiCard["trend"]; change: number }) {
  const abs = Math.abs(change)
  const isPositive = trend === "up"
  return (
    <span
      className={`inline-flex items-center gap-0.5 text-[11px] font-bold px-2 py-0.5 rounded-full ${
        isPositive ? "bg-[#12b886]/10 text-[#12b886]" : "bg-[#ff6b6b]/10 text-[#ff6b6b]"
      }`}
    >
      {isPositive ? (
        <ArrowUpRight className="size-3" />
      ) : (
        <ArrowDownRight className="size-3" />
      )}
      {abs}%
    </span>
  )
}

function MetricCard({ kpi }: { kpi: KpiCard }) {
  return (
    <Card className="border-border bg-card shadow-sm hover:shadow-md hover:border-primary/20 transition-all py-0 overflow-hidden">
      <CardContent className="p-4 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">
            {kpi.label}
          </span>
          <TrendBadge trend={kpi.trend} change={kpi.change} />
        </div>
        <span className="text-2xl font-bold text-card-foreground tracking-tight tabular-nums">
          {kpi.value}
        </span>
        {/* sparkline placeholder */}
        <div className="mt-1">
          <svg width="40" height="12" className="block">
            <polyline
              points="0,8 10,4 20,6 30,3 40,5"
              stroke="#888"
              fill="none"
              strokeWidth="1"
            />
          </svg>
        </div>
        <span className="text-[11px] text-muted-foreground leading-tight">
          {kpi.description}
        </span>
      </CardContent>
    </Card>
  )
}

function SummaryCard({
  label,
  value,
  subtext,
  icon,
  gradient,
}: {
  label: string
  value: string
  subtext: string
  icon: React.ReactNode
  gradient: string
}) {
  return (
    <Card className="border-0 shadow-md overflow-hidden py-0">
      <CardContent className="p-0">
        <div className={`${gradient} p-5 flex items-center gap-4`}>
          <div className="flex items-center justify-center size-12 rounded-xl bg-[#ffffff]/20 backdrop-blur-sm">
            <span className="text-[#ffffff]">{icon}</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-medium text-[#ffffff]/70">
              {label}
            </span>
            <span className="text-2xl font-bold text-[#ffffff] tracking-tight">
              {value}
            </span>
            <span className="text-[11px] text-[#ffffff]/60">{subtext}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function PlatformSection({
  title,
  platformColor,
  platformBg,
  kpis,
}: {
  title: string
  platformColor: string
  platformBg: string
  kpis: KpiCard[]
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2.5">
        <span className={`size-3 rounded-full ${platformColor}`} />
        <h3 className="text-base font-bold text-foreground">{title}</h3>
        <Badge className={`${platformBg} border-0 text-xs font-medium ml-auto hover:opacity-90`}>
          Ultimos 30 dias
        </Badge>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {kpis.map((kpi) => (
          <MetricCard key={`${kpi.platform}-${kpi.label}`} kpi={kpi} />
        ))}
      </div>
    </div>
  )
}

export function KpisTab() {
  const [filter, setFilter] = useState<"all" | "meta" | "google">("all")

  // derive platform-specific lists from central data
  const metaKpis = topKpiCards.filter((k) => k.platform === "meta")
  const googleKpis = topKpiCards.filter((k) => k.platform === "google")

  const filterOptions = [
    { key: "all" as const, label: "Todas", color: "" },
    { key: "meta" as const, label: "Meta Ads", color: "data-[active=true]:bg-[#1877f2] data-[active=true]:text-[#ffffff]" },
    { key: "google" as const, label: "Google Ads", color: "data-[active=true]:bg-[#34a853] data-[active=true]:text-[#ffffff]" },
  ]

  return (
    <section className="flex flex-col gap-6" aria-label="KPIs de Performance">
      {/* alerts bar */}
      <div className="flex flex-wrap gap-2">
        {(() => {
          const alerts: { text: string; color: string }[] = []
          const {
            freq_meta,
            freq_google,
            cpl_meta,
            cpl_google,
            roas_meta,
            roas_google,
            thresholds,
          } = diagnosticData
          if (freq_meta > thresholds.freq_limit || freq_google > thresholds.freq_limit) {
            alerts.push({ text: "FADIGA CRIATIVA", color: "bg-red-600 text-white" })
          }
          if (cpl_meta > thresholds.cpl_limit || cpl_google > thresholds.cpl_limit) {
            alerts.push({ text: "CPL ALTO", color: "bg-orange-500 text-white" })
          }
          if (roas_meta < thresholds.roas_limit || roas_google < thresholds.roas_limit) {
            alerts.push({ text: "ROAS BAIXO", color: "bg-red-600 text-white" })
          }
          return alerts.map((a, i) => (
            <span
              key={i}
              className={`${a.color} px-3 py-1 rounded-full text-xs font-bold`}
            >
              {a.text}
            </span>
          ))
        })()}
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground">Metricas de Performance</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Acompanhamento de KPIs das plataformas de anuncio
          </p>
        </div>
        <div
          className="inline-flex items-center rounded-xl border border-border bg-card p-1 shadow-sm"
          role="tablist"
          aria-label="Filtro de plataforma"
        >
          {filterOptions.map((f) => (
            <button
              key={f.key}
              role="tab"
              aria-selected={filter === f.key}
              data-active={filter === f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                filter === f.key
                  ? f.key === "all"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : ""
                  : "text-muted-foreground hover:text-foreground"
              } ${f.color}`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Summary cards with colored gradients */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SummaryCard
          label="Investimento Total"
          value="R$ 146.800"
          subtext="Acumulado no periodo"
          icon={<DollarSign className="size-5" />}
          gradient="bg-gradient-to-br from-[#4c6ef5] to-[#5c7cfa]"
        />
        <SummaryCard
          label="Total de Leads"
          value="2.139"
          subtext="+18,9% vs. mes anterior"
          icon={<Users className="size-5" />}
          gradient="bg-gradient-to-br from-[#12b886] to-[#20c997]"
        />
        <SummaryCard
          label="ROAS Medio"
          value="4.65x"
          subtext="Meta e Google combinados"
          icon={<TrendingUp className="size-5" />}
          gradient="bg-gradient-to-br from-[#7950f2] to-[#9775fa]"
        />
      </div>

      {/* Platform sections */}
      {/* Diagnóstico abaixo dos KPI cards */}
      <div className="mt-6 p-4 bg-card border border-border rounded-lg">
        <h3 className="text-base font-semibold">Diagnóstico</h3>
        <ul className="list-disc ml-5 mt-2 space-y-1 text-sm">
          {(() => {
            const notes: string[] = []
            const {
              freq_meta,
              freq_google,
              cpl_meta,
              cpl_google,
              roas_meta,
              roas_google,
              thresholds,
            } = diagnosticData
            if (cpl_meta > thresholds.cpl_limit)
              notes.push(
                `CPL Meta está alto (${cpl_meta}), possivelmente por frequência elevada (${freq_meta}).`
              )
            if (cpl_google > thresholds.cpl_limit)
              notes.push(
                `CPL Google está alto (${cpl_google}), verificar criativos.`
              )
            if (freq_meta > thresholds.freq_limit)
              notes.push(
                `Frequência Meta acima do limite (${freq_meta}), cuidado com fadiga criativa.`
              )
            if (roas_meta < thresholds.roas_limit)
              notes.push(
                `ROAS Meta baixo (${roas_meta}), reavalie estratégias de lance.`
              )
            if (roas_google < thresholds.roas_limit)
              notes.push(
                `ROAS Google baixo (${roas_google}), ajustar orçamento.`
              )
            if (notes.length === 0) notes.push("Nenhum problema identificado.")
            return notes.map((n, idx) => <li key={idx}>{n}</li>)
          })()}
        </ul>
      </div>
      <div className="flex flex-col gap-8">
        {(filter === "all" || filter === "meta") && (
          <PlatformSection
            title="Meta Ads"
            platformColor="bg-[#1877f2]"
            platformBg="bg-[#1877f2]/10 text-[#1877f2]"
            kpis={metaKpis}
          />
        )}
        {(filter === "all" || filter === "google") && (
          <PlatformSection
            title="Google Ads"
            platformColor="bg-[#34a853]"
            platformBg="bg-[#34a853]/10 text-[#34a853]"
            kpis={googleKpis}
          />
        )}
      </div>
    </section>
  )
}
