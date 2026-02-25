"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { initialSecurityItems, type SecurityItem } from "@/lib/dashboard-data"
import { ShieldCheck, AlertTriangle, Info } from "lucide-react"

function priorityConfig(priority: SecurityItem["priority"]) {
  switch (priority) {
    case "alta":
      return { label: "Alta", className: "bg-destructive/10 text-destructive border-destructive/20" }
    case "media":
      return { label: "Media", className: "bg-warning/10 text-warning border-warning/20" }
    case "baixa":
      return { label: "Baixa", className: "bg-muted text-muted-foreground border-border" }
  }
}

function ChecklistRow({
  item,
  onToggle,
}: {
  item: SecurityItem
  onToggle: (id: string) => void
}) {
  const pConfig = priorityConfig(item.priority)
  return (
    <div className="flex items-start gap-3 py-3">
      <Checkbox
        id={item.id}
        checked={item.checked}
        onCheckedChange={() => onToggle(item.id)}
        className="mt-0.5"
      />
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <Label
            htmlFor={item.id}
            className={`text-sm font-medium cursor-pointer ${
              item.checked ? "text-muted-foreground line-through" : "text-foreground"
            }`}
          >
            {item.label}
          </Label>
          <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${pConfig.className}`}>
            {pConfig.label}
          </Badge>
        </div>
        <span className="text-xs text-muted-foreground">{item.description}</span>
      </div>
    </div>
  )
}

export function SecurityTab() {
  const [items, setItems] = useState<SecurityItem[]>(initialSecurityItems)

  function handleToggle(id: string) {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    )
  }

  const checkedCount = items.filter((i) => i.checked).length
  const totalCount = items.length
  const percentage = Math.round((checkedCount / totalCount) * 100)

  const highPriority = items.filter((i) => i.priority === "alta")
  const highChecked = highPriority.filter((i) => i.checked).length
  const mediumPriority = items.filter((i) => i.priority === "media")
  const mediumChecked = mediumPriority.filter((i) => i.checked).length
  const lowPriority = items.filter((i) => i.priority === "baixa")
  const lowChecked = lowPriority.filter((i) => i.checked).length

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Seguranca</h2>
        <p className="text-sm text-muted-foreground">
          Checklist de setup e verificacao das plataformas
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <Card className="border-border/60 shadow-none py-4 gap-3 md:col-span-2">
          <CardContent className="px-4 py-0 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Progresso Geral</span>
              </div>
              <span className="text-sm font-semibold text-foreground">{percentage}%</span>
            </div>
            <Progress value={percentage} className="h-2" />
            <span className="text-xs text-muted-foreground">
              {checkedCount} de {totalCount} itens verificados
            </span>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-none py-4 gap-2">
          <CardContent className="px-4 py-0 flex items-center gap-3">
            <div className="flex items-center justify-center size-9 rounded-lg bg-destructive/10">
              <AlertTriangle className="size-4 text-destructive" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Alta Prioridade</p>
              <p className="text-lg font-semibold text-foreground">
                {highChecked}/{highPriority.length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-none py-4 gap-2">
          <CardContent className="px-4 py-0 flex items-center gap-3">
            <div className="flex items-center justify-center size-9 rounded-lg bg-warning/10">
              <Info className="size-4 text-warning" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Media Prioridade</p>
              <p className="text-lg font-semibold text-foreground">
                {mediumChecked}/{mediumPriority.length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Checklist by priority */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border/60 shadow-none">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center size-8 rounded-lg bg-destructive/10">
                <AlertTriangle className="size-4 text-destructive" />
              </div>
              <div>
                <CardTitle className="text-sm">Alta Prioridade</CardTitle>
                <CardDescription className="text-xs">
                  Itens criticos para operacao
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              {highPriority.map((item, idx) => (
                <div key={item.id}>
                  <ChecklistRow item={item} onToggle={handleToggle} />
                  {idx < highPriority.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-6">
          <Card className="border-border/60 shadow-none">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center size-8 rounded-lg bg-warning/10">
                  <Info className="size-4 text-warning" />
                </div>
                <div>
                  <CardTitle className="text-sm">Media Prioridade</CardTitle>
                  <CardDescription className="text-xs">
                    Itens recomendados
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                {mediumPriority.map((item, idx) => (
                  <div key={item.id}>
                    <ChecklistRow item={item} onToggle={handleToggle} />
                    {idx < mediumPriority.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-none">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center size-8 rounded-lg bg-muted">
                  <Info className="size-4 text-muted-foreground" />
                </div>
                <div>
                  <CardTitle className="text-sm">Baixa Prioridade</CardTitle>
                  <CardDescription className="text-xs">
                    Melhorias opcionais
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                {lowPriority.map((item, idx) => (
                  <div key={item.id}>
                    <ChecklistRow item={item} onToggle={handleToggle} />
                    {idx < lowPriority.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
