"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  initialToggles,
  initialLimits,
  type SettingToggle,
  type OperationalLimit,
} from "@/lib/dashboard-data"
import { Settings2, SlidersHorizontal } from "lucide-react"

function ToggleRow({
  toggle,
  onToggle,
}: {
  toggle: SettingToggle
  onToggle: (id: string) => void
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="flex flex-col gap-0.5">
        <Label htmlFor={toggle.id} className="text-sm font-medium text-foreground cursor-pointer">
          {toggle.label}
        </Label>
        <span className="text-xs text-muted-foreground">{toggle.description}</span>
      </div>
      <Switch
        id={toggle.id}
        checked={toggle.enabled}
        onCheckedChange={() => onToggle(toggle.id)}
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
  return (
    <div className="flex flex-col gap-3 py-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium text-foreground">{limit.label}</Label>
        <Badge variant="outline" className="text-xs font-mono tabular-nums">
          {limit.unit === "R$" ? `R$ ${limit.value.toLocaleString("pt-BR")}` : `${limit.value}${limit.unit}`}
        </Badge>
      </div>
      <Slider
        value={[limit.value]}
        max={limit.max}
        step={limit.unit === "R$" ? (limit.max > 1000 ? 100 : 1) : 1}
        onValueChange={([val]) => onChange(limit.id, val)}
        className="w-full"
      />
      <div className="flex justify-between text-[10px] text-muted-foreground">
        <span>0</span>
        <span>{limit.unit === "R$" ? `R$ ${limit.max.toLocaleString("pt-BR")}` : `${limit.max}${limit.unit}`}</span>
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
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Configuracoes</h2>
        <p className="text-sm text-muted-foreground">
          Controle de automacoes e limites operacionais
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Toggles Section */}
        <Card className="border-border/60 shadow-none">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center size-8 rounded-lg bg-primary/10">
                <Settings2 className="size-4 text-primary" />
              </div>
              <div>
                <CardTitle className="text-sm">Automacoes</CardTitle>
                <CardDescription className="text-xs">
                  {activeCount} de {toggles.length} ativas
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              {toggles.map((toggle, idx) => (
                <div key={toggle.id}>
                  <ToggleRow toggle={toggle} onToggle={handleToggle} />
                  {idx < toggles.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Limits Section */}
        <Card className="border-border/60 shadow-none">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center size-8 rounded-lg bg-warning/10">
                <SlidersHorizontal className="size-4 text-warning" />
              </div>
              <div>
                <CardTitle className="text-sm">Limites Operacionais</CardTitle>
                <CardDescription className="text-xs">
                  Defina os limites para pausa automatica
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              {limits.map((limit, idx) => (
                <div key={limit.id}>
                  <LimitRow limit={limit} onChange={handleLimitChange} />
                  {idx < limits.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
