"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { topKpiCards, metaAdsAnalysis, type CampaignAnalysis } from "@/lib/dashboard-data"
import { TrendingUp, TrendingDown, Minus, DollarSign, MessageCircle, Target, BarChart3, Shield } from "lucide-react"

function TrendIcon({ trend, change }: { trend: "up" | "down" | "neutral"; change: number }) {
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
    return (
      <span className="flex items-center gap-0.5 text-destructive text-xs font-medium">
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

function TopMetricCard({ kpi }: { kpi: typeof topKpiCards[0] }) {
  const getIcon = (label: string) => {
    switch (label) {
      case "Gasto Total":
        return <DollarSign className="size-5 text-primary" />
      case "Conversas (WhatsApp)":
        return <MessageCircle className="size-5 text-success" />
      case "CPL Medio":
        return <Target className="size-5 text-chart-2" />
      case "Campanhas (total)":
        return <BarChart3 className="size-5 text-chart-3" />
      case "Quarentena (ativo)":
        return <Shield className="size-5 text-warning" />
      default:
        return <BarChart3 className="size-5 text-muted-foreground" />
    }
  }

  const getBgClass = (label: string) => {
    switch (label) {
      case "Gasto Total":
        return "bg-primary/5"
      case "Conversas (WhatsApp)":
        return "bg-success/5"
      case "CPL Medio":
        return "bg-chart-2/5"
      case "Campanhas (total)":
        return "bg-chart-3/5"
      case "Quarentena (ativo)":
        return "bg-warning/5"
      default:
        return "bg-muted/5"
    }
  }

  return (
    <Card className={`border-border/60 shadow-none py-4 gap-2 ${getBgClass(kpi.label)}`}>
      <CardContent className="px-4 py-0 flex items-center gap-3">
        <div className={`flex items-center justify-center size-10 rounded-lg ${getBgClass(kpi.label).replace('/5', '/10')}`}>
          {getIcon(kpi.label)}
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{kpi.label}</p>
          <div className="flex items-center gap-2">
            <p className="text-xl font-semibold text-foreground">{kpi.value}</p>
            {kpi.trend !== "neutral" && <TrendIcon trend={kpi.trend} change={kpi.change} />}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function CampaignAnalysisTable({ campaigns }: { campaigns: CampaignAnalysis[] }) {
  const getStatusBadge = (status: string) => {
    const variants = {
      "Otimo": "default",
      "Bom": "secondary",
      "Ruim": "destructive"
    } as const
    return variants[status as keyof typeof variants] || "outline"
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold text-foreground">META ADS - Análise Profunda</h3>
        <Badge variant="outline" className="text-xs">
          Últimos 30 dias
        </Badge>
      </div>

      <Card className="border-border/60 shadow-none">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Campanha</TableHead>
                <TableHead>Gasto</TableHead>
                <TableHead>Conv</TableHead>
                <TableHead>CPL</TableHead>
                <TableHead>Alcance</TableHead>
                <TableHead>Freq</TableHead>
                <TableHead>CTR</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[200px]">Diagnóstico</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((campaign) => (
                <TableRow key={campaign.campaign}>
                  <TableCell className="font-medium">{campaign.campaign}</TableCell>
                  <TableCell>{campaign.gasto}</TableCell>
                  <TableCell>{campaign.conv}</TableCell>
                  <TableCell>{campaign.cpl}</TableCell>
                  <TableCell>{campaign.alcance}</TableCell>
                  <TableCell>{campaign.freq.toFixed(1)}x</TableCell>
                  <TableCell>{campaign.ctr}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadge(campaign.status)} className="text-xs">
                      {campaign.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {campaign.diagnostico}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function CampaignDiagnosticCard({ campaign }: { campaign: CampaignAnalysis }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Otimo":
        return "text-success bg-success/10"
      case "Bom":
        return "text-chart-2 bg-chart-2/10"
      case "Ruim":
        return "text-destructive bg-destructive/10"
      default:
        return "text-muted-foreground bg-muted/10"
    }
  }

  return (
    <Card className="border-border/60 shadow-none">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <h4 className="font-medium text-foreground">{campaign.campaign}</h4>
          <Badge variant="outline" className={`text-xs ${getStatusColor(campaign.status)}`}>
            {campaign.status}
          </Badge>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
          <div>
            <p className="text-xs text-muted-foreground">Gasto</p>
            <p className="text-sm font-medium">{campaign.gasto}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Conversões</p>
            <p className="text-sm font-medium">{campaign.conv}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">CPL</p>
            <p className="text-sm font-medium">{campaign.cpl}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Alcance</p>
            <p className="text-sm font-medium">{campaign.alcance}</p>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          <strong>Diagnóstico:</strong> {campaign.diagnostico}
        </div>
      </CardContent>
    </Card>
  )
}

export function KpisTab() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">KPIs de Performance</h2>
          <p className="text-sm text-muted-foreground">
            Acompanhamento detalhado das métricas de marketing
          </p>
        </div>
      </div>

      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {topKpiCards.map((kpi) => (
          <TopMetricCard key={kpi.label} kpi={kpi} />
        ))}
      </div>

      {/* Campaign Analysis Table */}
      <CampaignAnalysisTable campaigns={metaAdsAnalysis} />

      {/* Detailed Diagnostics */}
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold text-foreground">Diagnóstico Profundo por Campanha</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {metaAdsAnalysis.map((campaign) => (
            <CampaignDiagnosticCard key={campaign.campaign} campaign={campaign} />
          ))}
        </div>
      </div>
    </div>
  )
}
