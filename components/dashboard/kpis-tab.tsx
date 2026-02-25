"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { metaKpis, googleKpis, type KpiCard } from "@/lib/dashboard-data"
import { TrendingUp, TrendingDown, Minus, BarChart3, Target } from "lucide-react"

function TrendIcon({ trend, change }: { trend: KpiCard["trend"]; change: number }) {
  const absChange = Math.abs(change)
  if (trend === "up") {
    return (
      <span className="flex items-center gap-0.5 text-success text-xs font-medium">
        <TrendingUp className="size-3" />
        +{absChange}%
      </span>
    )
  }
  if (trend === "down") {
    // For cost metrics, down is good
    const isCostMetric = true
    return (
      <span className={`flex items-center gap-0.5 text-xs font-medium ${isCostMetric ? "text-success" : "text-destructive"}`}>
        <TrendingDown className="size-3" />
        -{absChange}%
      </span>
    )
  }
  return (
    <span className="flex items-center gap-0.5 text-muted-foreground text-xs font-medium">
      <Minus className="size-3" />
      {absChange}%
    </span>
  )
}

function MetricCard({ kpi }: { kpi: KpiCard }) {
  return (
    <Card className="border-border/60 shadow-none hover:shadow-sm transition-all py-4 gap-3">
      <CardContent className="px-4 py-0 flex flex-col gap-1">
        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
          {kpi.label}
        </span>
        <div className="flex items-end justify-between gap-2">
          <span className="text-2xl font-semibold text-foreground tracking-tight">
            {kpi.value}
          </span>
          <TrendIcon trend={kpi.trend} change={kpi.change} />
        </div>
      </CardContent>
    </Card>
  )
}

function PlatformSection({
  title,
  icon,
  kpis,
  accentClass,
}: {
  title: string
  icon: React.ReactNode
  kpis: KpiCard[]
  accentClass: string
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <div className={`flex items-center justify-center size-8 rounded-lg ${accentClass}`}>
          {icon}
        </div>
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <Badge variant="outline" className="text-[10px] ml-auto">
          Ultimos 30 dias
        </Badge>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {kpis.map((kpi) => (
          <MetricCard key={kpi.label} kpi={kpi} />
        ))}
      </div>
    </div>
  )
}

export function KpisTab() {
  const [activeFilter, setActiveFilter] = useState<"all" | "meta" | "google">("all")

  const totalInvest = "R$ 146.800"
  const totalLeads = "2.139"
  const avgRoas = "4.65x"

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Metricas de Performance</h2>
          <p className="text-sm text-muted-foreground">
            Acompanhamento de KPIs das plataformas de anuncio
          </p>
        </div>
        <div className="flex items-center gap-1 bg-secondary rounded-lg p-0.5">
          {(["all", "meta", "google"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                activeFilter === filter
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {filter === "all" ? "Todas" : filter === "meta" ? "Meta Ads" : "Google Ads"}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Card className="border-border/60 shadow-none py-4 gap-2 bg-primary/5">
          <CardContent className="px-4 py-0 flex items-center gap-3">
            <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10">
              <BarChart3 className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Investimento Total</p>
              <p className="text-xl font-semibold text-foreground">{totalInvest}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/60 shadow-none py-4 gap-2 bg-success/5">
          <CardContent className="px-4 py-0 flex items-center gap-3">
            <div className="flex items-center justify-center size-10 rounded-lg bg-success/10">
              <Target className="size-5 text-success" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total de Leads</p>
              <p className="text-xl font-semibold text-foreground">{totalLeads}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/60 shadow-none py-4 gap-2 bg-chart-2/5">
          <CardContent className="px-4 py-0 flex items-center gap-3">
            <div className="flex items-center justify-center size-10 rounded-lg bg-chart-2/10">
              <TrendingUp className="size-5 text-chart-2" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">ROAS Medio</p>
              <p className="text-xl font-semibold text-foreground">{avgRoas}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform KPIs */}
      {(activeFilter === "all" || activeFilter === "meta") && (
        <PlatformSection
          title="Meta Ads"
          icon={<BarChart3 className="size-4 text-chart-1" />}
          kpis={metaKpis}
          accentClass="bg-chart-1/10"
        />
      )}

      {(activeFilter === "all" || activeFilter === "google") && (
        <PlatformSection
          title="Google Ads"
          icon={<Target className="size-4 text-chart-2" />}
          kpis={googleKpis}
          accentClass="bg-chart-2/10"
        />
      )}
    </div>
  )
}
