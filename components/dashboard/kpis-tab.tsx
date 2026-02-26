"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { metaKpis, googleKpis, type KpiCard } from "@/lib/dashboard-data"
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, DollarSign, Users, BarChart3 } from "lucide-react"

function TrendBadge({ trend, change }: { trend: KpiCard["trend"]; change: number }) {
  const abs = Math.abs(change)
  const isPositive = trend === "up"
  return (
    <span
      className={`inline-flex items-center gap-0.5 text-[11px] font-semibold ${
        isPositive ? "text-success" : "text-destructive"
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
    <Card className="border-border bg-card shadow-[0_1px_3px_0_rgba(0,0,0,0.04)] hover:shadow-[0_2px_6px_0_rgba(0,0,0,0.06)] transition-shadow py-0">
      <CardContent className="p-4 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
            {kpi.label}
          </span>
          <TrendBadge trend={kpi.trend} change={kpi.change} />
        </div>
        <span className="text-xl font-bold text-foreground tracking-tight tabular-nums">
          {kpi.value}
        </span>
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
  accentBg,
  accentText,
}: {
  label: string
  value: string
  subtext: string
  icon: React.ReactNode
  accentBg: string
  accentText: string
}) {
  return (
    <Card className="border-border bg-card shadow-[0_1px_3px_0_rgba(0,0,0,0.04)] py-0">
      <CardContent className="p-5 flex items-center gap-4">
        <div
          className={`flex items-center justify-center size-11 rounded-xl ${accentBg}`}
        >
          <span className={accentText}>{icon}</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
            {label}
          </span>
          <span className="text-xl font-bold text-foreground tracking-tight">
            {value}
          </span>
          <span className="text-[11px] text-muted-foreground">{subtext}</span>
        </div>
      </CardContent>
    </Card>
  )
}

function PlatformSection({
  title,
  platformColor,
  kpis,
}: {
  title: string
  platformColor: string
  kpis: KpiCard[]
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2.5">
        <span className={`size-2.5 rounded-full ${platformColor}`} />
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <Badge variant="outline" className="text-[10px] font-normal text-muted-foreground ml-auto">
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

  return (
    <section className="flex flex-col gap-6" aria-label="KPIs de Performance">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-foreground">Metricas de Performance</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Acompanhamento de KPIs das plataformas de anuncio
          </p>
        </div>
        <div
          className="inline-flex items-center rounded-lg border border-border bg-muted/50 p-0.5"
          role="tablist"
          aria-label="Filtro de plataforma"
        >
          {(["all", "meta", "google"] as const).map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all ${
                filter === f
                  ? "bg-card text-foreground shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f === "all" ? "Todas" : f === "meta" ? "Meta Ads" : "Google Ads"}
            </button>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <SummaryCard
          label="Investimento Total"
          value="R$ 146.800"
          subtext="Acumulado no periodo"
          icon={<DollarSign className="size-5" />}
          accentBg="bg-primary/[0.08]"
          accentText="text-primary"
        />
        <SummaryCard
          label="Total de Leads"
          value="2.139"
          subtext="+18,9% vs. mes anterior"
          icon={<Users className="size-5" />}
          accentBg="bg-success/[0.08]"
          accentText="text-success"
        />
        <SummaryCard
          label="ROAS Medio"
          value="4.65x"
          subtext="Meta e Google combinados"
          icon={<BarChart3 className="size-5" />}
          accentBg="bg-chart-2/[0.08]"
          accentText="text-chart-2"
        />
      </div>

      {/* Platform sections */}
      <div className="flex flex-col gap-8">
        {(filter === "all" || filter === "meta") && (
          <PlatformSection
            title="Meta Ads"
            platformColor="bg-info"
            kpis={metaKpis}
          />
        )}
        {(filter === "all" || filter === "google") && (
          <PlatformSection
            title="Google Ads"
            platformColor="bg-chart-2"
            kpis={googleKpis}
          />
        )}
      </div>
    </section>
  )
}
