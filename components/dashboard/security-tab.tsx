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
  { label: string; badgeClass: string; icon: typeof ShieldAlert; iconColor: string; bgColor: string; borderColor: string }
> = {
  critica: {
    label: "Critica",
    badgeClass: "bg-[#ff6b6b]/10 text-[#ff6b6b] border-0",
    icon: ShieldAlert,
    iconColor: "text-[#ff6b6b]",
    bgColor: "bg-[#ff6b6b]/10",
    borderColor: "from-[#ff6b6b] to-[#f03e3e]",
  },
  importante: {
    label: "Importante",
    badgeClass: "bg-[#fab005]/10 text-[#fab005] border-0",
    icon: ShieldCheck,
    iconColor: "text-[#fab005]",
    bgColor: "bg-[#fab005]/10",
    borderColor: "from-[#fab005] to-[#f76707]",
  },
  recomendada: {
    label: "Recomendada",
    badgeClass: "bg-[#868e96]/10 text-[#868e96] border-0",
    icon: ShieldQuestion,
    iconColor: "text-[#868e96]",
    bgColor: "bg-[#868e96]/10",
    borderColor: "from-[#868e96] to-[#adb5bd]",
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
            className={`text-[13px] font-semibold cursor-pointer transition-all ${
              item.checked
                ? "text-muted-foreground line-through decoration-muted-foreground/40"
                : "text-card-foreground"
            }`}
          >
            {item.label}
          </Label>
          <Badge
            className={`text-[10px] px-2 py-0 font-bold leading-relaxed ${config.badgeClass}`}
          >
            {config.label}
          </Badge>
        </div>
        <p className="text-[12px] text-muted-foreground mt-0.5 leading-relaxed">
          {item.description}
        </p>
      </div>
      {item.checked ? (
        <CheckCircle2 className="size-4 text-[#12b886] shrink-0 mt-0.5" />
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
  iconColor,
  bgColor,
}: {
  label: string
  checked: number
  total: number
  icon: typeof ShieldAlert
  iconColor: string
  bgColor: string
}) {
  const pct = total > 0 ? Math.round((checked / total) * 100) : 0
  return (
    <Card className="border-border shadow-sm py-0 overflow-hidden">
      <CardContent className="p-4 flex items-center gap-3">
        <div
          className={`flex items-center justify-center size-10 rounded-xl ${bgColor}`}
        >
          <Icon className={`size-4 ${iconColor}`} />
        </div>
        <div className="flex flex-col flex-1">
          <span className="text-xs text-muted-foreground font-medium">{label}</span>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-card-foreground tabular-nums">
              {checked}
              <span className="text-muted-foreground font-normal text-sm">/{total}</span>
            </span>
            <Badge className={`text-[10px] font-bold border-0 px-1.5 ${
              pct === 100 
                ? "bg-[#12b886]/10 text-[#12b886]" 
                : pct >= 50 
                  ? "bg-[#fab005]/10 text-[#fab005]"
                  : "bg-[#ff6b6b]/10 text-[#ff6b6b]"
            } hover:opacity-100`}>
              {pct}%
            </Badge>
          </div>
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
        <h2 className="text-lg font-bold text-foreground">Seguranca</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Checklist de setup e verificacao das plataformas de anuncio
        </p>
      </div>

      {/* Progress overview */}
      <Card className="border-0 shadow-md overflow-hidden py-0">
        <div className="bg-gradient-to-r from-[#4c6ef5] to-[#7950f2] p-5">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-5 text-[#ffffff]" />
                <span className="text-sm font-bold text-[#ffffff]">
                  Progresso Geral
                </span>
              </div>
              <span className="text-2xl font-bold text-[#ffffff] tabular-nums">
                {stats.pct}%
              </span>
            </div>
            <div className="h-2.5 bg-[#ffffff]/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#ffffff] rounded-full transition-all duration-500"
                style={{ width: `${stats.pct}%` }}
              />
            </div>
            <p className="text-[12px] text-[#ffffff]/70">
              {stats.checked} de {stats.total} itens verificados
            </p>
          </div>
        </div>
      </Card>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatCard
          label="Critica"
          checked={stats.critica.checked}
          total={stats.critica.total}
          icon={priorityConfig.critica.icon}
          iconColor={priorityConfig.critica.iconColor}
          bgColor={priorityConfig.critica.bgColor}
        />
        <StatCard
          label="Importante"
          checked={stats.importante.checked}
          total={stats.importante.total}
          icon={priorityConfig.importante.icon}
          iconColor={priorityConfig.importante.iconColor}
          bgColor={priorityConfig.importante.bgColor}
        />
        <StatCard
          label="Recomendada"
          checked={stats.recomendada.checked}
          total={stats.recomendada.total}
          icon={priorityConfig.recomendada.icon}
          iconColor={priorityConfig.recomendada.iconColor}
          bgColor={priorityConfig.recomendada.bgColor}
        />
      </div>

      {/* Checklist cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border shadow-sm overflow-hidden">
          <div className={`h-1 bg-gradient-to-r ${priorityConfig.critica.borderColor}`} />
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <div className={`flex items-center justify-center size-10 rounded-xl ${priorityConfig.critica.bgColor}`}>
                <ShieldAlert className={`size-5 ${priorityConfig.critica.iconColor}`} />
              </div>
              <div>
                <CardTitle className="text-base font-bold">Itens Criticos</CardTitle>
                <CardDescription className="text-xs">
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
          <Card className="border-border shadow-sm overflow-hidden">
            <div className={`h-1 bg-gradient-to-r ${priorityConfig.importante.borderColor}`} />
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className={`flex items-center justify-center size-10 rounded-xl ${priorityConfig.importante.bgColor}`}>
                  <ShieldCheck className={`size-5 ${priorityConfig.importante.iconColor}`} />
                </div>
                <div>
                  <CardTitle className="text-base font-bold">Importantes</CardTitle>
                  <CardDescription className="text-xs">
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

          <Card className="border-border shadow-sm overflow-hidden">
            <div className={`h-1 bg-gradient-to-r ${priorityConfig.recomendada.borderColor}`} />
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className={`flex items-center justify-center size-10 rounded-xl ${priorityConfig.recomendada.bgColor}`}>
                  <ShieldQuestion className={`size-5 ${priorityConfig.recomendada.iconColor}`} />
                </div>
                <div>
                  <CardTitle className="text-base font-bold">Recomendadas</CardTitle>
                  <CardDescription className="text-xs">
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
