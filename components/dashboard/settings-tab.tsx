"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import {
  initialToggles,
  initialLimits,
  type SettingToggle,
  type OperationalLimit,
} from "@/lib/dashboard-data"
import { Zap, SlidersHorizontal, Bell, Sparkles } from "lucide-react"

const categoryIcons = {
  automacao: Zap,
  notificacao: Bell,
  otimizacao: Sparkles,
}

function ToggleRow({
  toggle,
  onToggle,
}: {
  toggle: SettingToggle
  onToggle: (id: string) => void
}) {
  const Icon = categoryIcons[toggle.category]
  return (
    <div className="flex items-start gap-3 py-4 first:pt-0 last:pb-0 border-b border-border last:border-0">
      <div className="flex items-center justify-center size-8 rounded-lg bg-muted shrink-0 mt-0.5">
        <Icon className="size-3.5 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <Label
          htmlFor={toggle.id}
          className="text-[13px] font-medium text-foreground cursor-pointer"
        >
          {toggle.label}
        </Label>
        <p className="text-[12px] text-muted-foreground mt-0.5 leading-relaxed">
          {toggle.description}
        </p>
      </div>
      <Switch
        id={toggle.id}
        checked={toggle.enabled}
        onCheckedChange={() => onToggle(toggle.id)}
        className="shrink-0"
      />
    </div>
  )
}

function LimitRow({
  limit,
  onChange,
}: {
  limit: OperationalLimit
  onChange: (id: string, value: number) => void
}) {
  const displayValue =
    limit.unit === "R$"
      ? `R$ ${limit.value.toLocaleString("pt-BR")}`
      : `${limit.value}${limit.unit}`

  return (
    <div className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 border-b border-border last:border-0">
      <div className="flex items-center justify-between">
        <Label className="text-[13px] font-medium text-foreground">
          {limit.label}
        </Label>
        <Badge variant="outline" className="text-[11px] font-mono tabular-nums px-2">
          {displayValue}
        </Badge>
      </div>
      <Slider
        value={[limit.value]}
        min={limit.min}
        max={limit.max}
        step={limit.step}
        onValueChange={([val]) => onChange(limit.id, val)}
        className="w-full"
      />
      <div className="flex justify-between text-[10px] text-muted-foreground tabular-nums">
        <span>
          {limit.unit === "R$"
            ? `R$ ${limit.min.toLocaleString("pt-BR")}`
            : `${limit.min}${limit.unit}`}
        </span>
        <span>
          {limit.unit === "R$"
            ? `R$ ${limit.max.toLocaleString("pt-BR")}`
            : `${limit.max}${limit.unit}`}
        </span>
      </div>
    </div>
  )
}

export function SettingsTab() {
  const [toggles, setToggles] = useState<SettingToggle[]>(initialToggles)
  const [limits, setLimits] = useState<OperationalLimit[]>(initialLimits)

  function handleToggle(id: string) {
    setToggles((prev) =>
      prev.map((t) => (t.id === id ? { ...t, enabled: !t.enabled } : t))
    )
  }

  function handleLimitChange(id: string, value: number) {
    setLimits((prev) =>
      prev.map((l) => (l.id === id ? { ...l, value } : l))
    )
  }

  const activeCount = toggles.filter((t) => t.enabled).length

  return (
    <section className="flex flex-col gap-6" aria-label="Configuracoes">
      <div>
        <h2 className="text-base font-semibold text-foreground">Configuracoes</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Controle de automacoes e limites operacionais das campanhas
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Automacoes */}
        <Card className="border-border shadow-[0_1px_3px_0_rgba(0,0,0,0.04)]">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center justify-center size-8 rounded-lg bg-primary/[0.08]">
                  <Zap className="size-4 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-sm">Automacoes</CardTitle>
                  <CardDescription className="text-[11px]">
                    Regras de otimizacao automatica
                  </CardDescription>
                </div>
              </div>
              <Badge variant="secondary" className="text-[11px] tabular-nums">
                {activeCount}/{toggles.length} ativas
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {toggles.map((toggle) => (
              <ToggleRow key={toggle.id} toggle={toggle} onToggle={handleToggle} />
            ))}
          </CardContent>
        </Card>

        {/* Limites */}
        <Card className="border-border shadow-[0_1px_3px_0_rgba(0,0,0,0.04)]">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center size-8 rounded-lg bg-warning/[0.08]">
                <SlidersHorizontal className="size-4 text-warning" />
              </div>
              <div>
                <CardTitle className="text-sm">Limites Operacionais</CardTitle>
                <CardDescription className="text-[11px]">
                  Defina thresholds para pausa e alertas
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {limits.map((limit) => (
              <LimitRow key={limit.id} limit={limit} onChange={handleLimitChange} />
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
