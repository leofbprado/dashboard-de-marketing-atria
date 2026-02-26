"use client"

import { useState, useMemo } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { initialSecurityItems, type SecurityItem } from "@/lib/dashboard-data"
import {
  ShieldCheck,
  ShieldAlert,
  ShieldQuestion,
  CheckCircle2,
  Circle,
} from "lucide-react"

const priorityConfig: Record<
  SecurityItem["priority"],
  { label: string; badgeClass: string; icon: typeof ShieldAlert; iconClass: string; bgClass: string }
> = {
  critica: {
    label: "Critica",
    badgeClass: "bg-destructive/10 text-destructive border-destructive/20",
    icon: ShieldAlert,
    iconClass: "text-destructive",
    bgClass: "bg-destructive/[0.06]",
  },
  importante: {
    label: "Importante",
    badgeClass: "bg-warning/10 text-warning border-warning/20",
    icon: ShieldCheck,
    iconClass: "text-warning",
    bgClass: "bg-warning/[0.06]",
  },
  recomendada: {
    label: "Recomendada",
    badgeClass: "bg-muted text-muted-foreground border-border",
    icon: ShieldQuestion,
    iconClass: "text-muted-foreground",
    bgClass: "bg-muted",
  },
}

function ChecklistItem({
  item,
  onToggle,
}: {
  item: SecurityItem
  onToggle: (id: string) => void
}) {
  const config = priorityConfig[item.priority]
  return (
    <div className="flex items-start gap-3 py-3.5 first:pt-0 last:pb-0 border-b border-border last:border-0">
      <Checkbox
        id={item.id}
        checked={item.checked}
        onCheckedChange={() => onToggle(item.id)}
        className="mt-0.5"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <Label
            htmlFor={item.id}
            className={`text-[13px] font-medium cursor-pointer transition-colors ${
              item.checked
                ? "text-muted-foreground line-through"
                : "text-foreground"
            }`}
          >
            {item.label}
          </Label>
          <Badge
            variant="outline"
            className={`text-[9px] px-1.5 py-0 leading-relaxed ${config.badgeClass}`}
          >
            {config.label}
          </Badge>
        </div>
        <p className="text-[12px] text-muted-foreground mt-0.5 leading-relaxed">
          {item.description}
        </p>
      </div>
      {item.checked ? (
        <CheckCircle2 className="size-4 text-success shrink-0 mt-0.5" />
      ) : (
        <Circle className="size-4 text-border shrink-0 mt-0.5" />
      )}
    </div>
  )
}

function StatCard({
  label,
  checked,
  total,
  icon: Icon,
  iconClass,
  bgClass,
}: {
  label: string
  checked: number
  total: number
  icon: typeof ShieldAlert
  iconClass: string
  bgClass: string
}) {
  return (
    <Card className="border-border shadow-[0_1px_3px_0_rgba(0,0,0,0.04)] py-0">
      <CardContent className="p-4 flex items-center gap-3">
        <div
          className={`flex items-center justify-center size-9 rounded-lg ${bgClass}`}
        >
          <Icon className={`size-4 ${iconClass}`} />
        </div>
        <div className="flex flex-col">
          <span className="text-[11px] text-muted-foreground font-medium">{label}</span>
          <span className="text-base font-bold text-foreground tabular-nums">
            {checked}
            <span className="text-muted-foreground font-normal text-sm">/{total}</span>
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

export function SecurityTab() {
  const [items, setItems] = useState<SecurityItem[]>(initialSecurityItems)

  function handleToggle(id: string) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    )
  }

  const stats = useMemo(() => {
    const checked = items.filter((i) => i.checked).length
    const total = items.length
    const pct = Math.round((checked / total) * 100)

    const critica = items.filter((i) => i.priority === "critica")
    const importante = items.filter((i) => i.priority === "importante")
    const recomendada = items.filter((i) => i.priority === "recomendada")

    return {
      checked,
      total,
      pct,
      critica: { checked: critica.filter((i) => i.checked).length, total: critica.length, items: critica },
      importante: { checked: importante.filter((i) => i.checked).length, total: importante.length, items: importante },
      recomendada: { checked: recomendada.filter((i) => i.checked).length, total: recomendada.length, items: recomendada },
    }
  }, [items])

  return (
    <section className="flex flex-col gap-6" aria-label="Checklist de Seguranca">
      <div>
        <h2 className="text-base font-semibold text-foreground">Seguranca</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Checklist de setup e verificacao das plataformas de anuncio
        </p>
      </div>

      {/* Progress overview */}
      <Card className="border-border shadow-[0_1px_3px_0_rgba(0,0,0,0.04)] py-0">
        <CardContent className="p-5">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">
                  Progresso Geral
                </span>
              </div>
              <span className="text-sm font-bold text-foreground tabular-nums">
                {stats.pct}%
              </span>
            </div>
            <Progress value={stats.pct} className="h-2" />
            <p className="text-[12px] text-muted-foreground">
              {stats.checked} de {stats.total} itens verificados
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatCard
          label="Critica"
          checked={stats.critica.checked}
          total={stats.critica.total}
          icon={priorityConfig.critica.icon}
          iconClass={priorityConfig.critica.iconClass}
          bgClass={priorityConfig.critica.bgClass}
        />
        <StatCard
          label="Importante"
          checked={stats.importante.checked}
          total={stats.importante.total}
          icon={priorityConfig.importante.icon}
          iconClass={priorityConfig.importante.iconClass}
          bgClass={priorityConfig.importante.bgClass}
        />
        <StatCard
          label="Recomendada"
          checked={stats.recomendada.checked}
          total={stats.recomendada.total}
          icon={priorityConfig.recomendada.icon}
          iconClass={priorityConfig.recomendada.iconClass}
          bgClass={priorityConfig.recomendada.bgClass}
        />
      </div>

      {/* Checklist cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border shadow-[0_1px_3px_0_rgba(0,0,0,0.04)]">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2.5">
              <div className={`flex items-center justify-center size-8 rounded-lg ${priorityConfig.critica.bgClass}`}>
                <ShieldAlert className={`size-4 ${priorityConfig.critica.iconClass}`} />
              </div>
              <div>
                <CardTitle className="text-sm">Itens Criticos</CardTitle>
                <CardDescription className="text-[11px]">
                  Obrigatorios para operacao segura
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            {stats.critica.items.map((item) => (
              <ChecklistItem
                key={item.id}
                item={item}
                onToggle={handleToggle}
              />
            ))}
          </CardContent>
        </Card>

        <div className="flex flex-col gap-6">
          <Card className="border-border shadow-[0_1px_3px_0_rgba(0,0,0,0.04)]">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2.5">
                <div className={`flex items-center justify-center size-8 rounded-lg ${priorityConfig.importante.bgClass}`}>
                  <ShieldCheck className={`size-4 ${priorityConfig.importante.iconClass}`} />
                </div>
                <div>
                  <CardTitle className="text-sm">Importantes</CardTitle>
                  <CardDescription className="text-[11px]">
                    Fortemente recomendados
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              {stats.importante.items.map((item) => (
                <ChecklistItem
                  key={item.id}
                  item={item}
                  onToggle={handleToggle}
                />
              ))}
            </CardContent>
          </Card>

          <Card className="border-border shadow-[0_1px_3px_0_rgba(0,0,0,0.04)]">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2.5">
                <div className={`flex items-center justify-center size-8 rounded-lg ${priorityConfig.recomendada.bgClass}`}>
                  <ShieldQuestion className={`size-4 ${priorityConfig.recomendada.iconClass}`} />
                </div>
                <div>
                  <CardTitle className="text-sm">Recomendadas</CardTitle>
                  <CardDescription className="text-[11px]">
                    Melhorias opcionais de setup
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              {stats.recomendada.items.map((item) => (
                <ChecklistItem
                  key={item.id}
                  item={item}
                  onToggle={handleToggle}
                />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
