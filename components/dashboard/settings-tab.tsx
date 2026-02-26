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

const categoryConfig: Record<string, { icon: typeof Zap; color: string; bg: string }> = {
  automacao:   { icon: Zap,      color: "text-[#4c6ef5]", bg: "bg-[#4c6ef5]/10" },
  notificacao: { icon: Bell,     color: "text-[#f76707]", bg: "bg-[#f76707]/10" },
  otimizacao:  { icon: Sparkles, color: "text-[#7950f2]", bg: "bg-[#7950f2]/10" },
}

function ToggleRow({
  toggle,
  onToggle,
}: {
  toggle: SettingToggle
  onToggle: (id: string) => void
}) {
  const config = categoryConfig[(toggle as any).category] ?? {
    icon: Zap,
    color: "text-[#4c6ef5]",
    bg: "bg-[#4c6ef5]/10",
  }
  const Icon = config.icon
  return (
    <div className="flex items-start gap-3 py-4 first:pt-0 last:pb-0 border-b border-border last:border-0">
      <div className={`flex items-center justify-center size-9 rounded-xl ${config.bg} shrink-0 mt-0.5`}>
        <Icon className={`size-4 ${config.color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <Label
          htmlFor={toggle.id}
          className="text-[13px] font-semibold text-card-foreground cursor-pointer"
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

  // some limits may not define min/step in the simplified data; fallback safely
  const min = (limit as any).min ?? 0
  const max = limit.max ?? Math.max(limit.value, min)
  const step = (limit as any).step ?? 1

  return (
    <div className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 border-b border-border last:border-0">
      <div className="flex items-center justify-between">
        <Label className="text-[13px] font-semibold text-card-foreground">
          {limit.label}
        </Label>
        <Badge className="bg-primary/10 text-primary border-0 text-[11px] font-mono font-bold tabular-nums px-2.5 hover:bg-primary/10">
          {displayValue}
        </Badge>
      </div>
      <Slider
        value={[limit.value]}
        min={min}
        max={max}
        step={step}
        onValueChange={([val]) => onChange(limit.id, val)}
        className="w-full"
      />
      <div className="flex justify-between text-[10px] text-muted-foreground font-medium tabular-nums">
        <span>
          {limit.unit === "R$"
            ? `R$ ${min.toLocaleString("pt-BR")}`
            : `${min}${limit.unit}`}
        </span>
        <span>
          {limit.unit === "R$"
            ? `R$ ${max.toLocaleString("pt-BR")}`
            : `${max}${limit.unit}`}
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
        <h2 className="text-lg font-bold text-foreground">Configuracoes</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Controle de automacoes e limites operacionais das campanhas
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Automacoes */}
        <Card className="border-border shadow-sm overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-[#4c6ef5] to-[#7950f2]" />
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center size-10 rounded-xl bg-[#4c6ef5]/10">
                  <Zap className="size-5 text-[#4c6ef5]" />
                </div>
                <div>
                  <CardTitle className="text-base font-bold">Automacoes</CardTitle>
                  <CardDescription className="text-xs">
                    Regras de otimizacao automatica
                  </CardDescription>
                </div>
              </div>
              <Badge className="bg-[#12b886]/10 text-[#12b886] border-0 font-bold text-xs tabular-nums hover:bg-[#12b886]/10">
                {activeCount}/{toggles.length}
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
        <Card className="border-border shadow-sm overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-[#fab005] to-[#f76707]" />
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center size-10 rounded-xl bg-[#fab005]/10">
                <SlidersHorizontal className="size-5 text-[#fab005]" />
              </div>
              <div>
                <CardTitle className="text-base font-bold">Limites Operacionais</CardTitle>
                <CardDescription className="text-xs">
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
