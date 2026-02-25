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

function ChecklistRow({
  item,
  onToggle,
}: {
  item: SecurityItem
  onToggle: (id: string) => void
}) {
  return (
    <div className="flex items-start gap-3 py-3">
      <Checkbox
        id={item.id}
        checked={item.checked}
        onCheckedChange={() => onToggle(item.id)}
        className="mt-0.5"
      />
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <Label
          htmlFor={item.id}
          className={`text-sm font-medium cursor-pointer ${
            item.checked ? "text-muted-foreground line-through" : "text-foreground"
          }`}
        >
          {item.label}
        </Label>
        <span className="text-xs text-muted-foreground">{item.description}</span>
      </div>
    </div>
  )
}

function CategoryCard({ category, items, onToggle }: { category: SecurityItem["category"]; items: SecurityItem[]; onToggle: (id: string) => void }) {
  const config = categoryConfig(category)
  const checkedCount = items.filter(i => i.checked).length
  const totalCount = items.length
  const percentage = Math.round((checkedCount / totalCount) * 100)

  return (
    <Card className="border-border/60 shadow-none">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className={`flex items-center justify-center size-8 rounded-lg ${config.color}`}>
            <span className="text-sm">{config.icon}</span>
          </div>
          <div className="flex-1">
            <CardTitle className="text-sm">{config.label}</CardTitle>
            <CardDescription className="text-xs">
              {checkedCount} de {totalCount} itens ({percentage}%)
            </CardDescription>
          </div>
        </div>
        <Progress value={percentage} className="h-1.5" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          {items.map((item, idx) => (
            <div key={item.id}>
              <ChecklistRow item={item} onToggle={onToggle} />
              {idx < items.length - 1 && <Separator />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
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

  const hetznerItems = items.filter(i => i.category === "hetzner")
  const metaAdsItems = items.filter(i => i.category === "meta-ads")
  const googleAdsItems = items.filter(i => i.category === "google-ads")
  const lpOpenClawItems = items.filter(i => i.category === "lp-openclaw")

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Seguranca</h2>
        <p className="text-sm text-muted-foreground">
          Checklist de Setup - {checkedCount}/{totalCount} itens verificados
        </p>
      </div>

      {/* Overall Progress */}
      <Card className="border-border/60 shadow-none py-4 gap-3">
        <CardContent className="px-4 py-0 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Setup Completo</span>
            </div>
            <span className="text-sm font-semibold text-foreground">{percentage}%</span>
          </div>
          <Progress value={percentage} className="h-2" />
          <span className="text-xs text-muted-foreground">
            Checklist de configuracao das plataformas
          </span>
        </CardContent>
      </Card>

      {/* Category Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryCard category="hetzner" items={hetznerItems} onToggle={handleToggle} />
        <CategoryCard category="meta-ads" items={metaAdsItems} onToggle={handleToggle} />
        <CategoryCard category="google-ads" items={googleAdsItems} onToggle={handleToggle} />
        <CategoryCard category="lp-openclaw" items={lpOpenClawItems} onToggle={handleToggle} />
      </div>
    </div>
  )
}
