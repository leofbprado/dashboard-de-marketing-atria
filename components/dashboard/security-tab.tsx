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
import {
  securityChecklist,
  type ChecklistCategory,
} from "@/lib/dashboard-data"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ShieldCheck, Car, Bell } from "lucide-react"

export function SecurityTab() {
  const [checklist, setChecklist] = useState<ChecklistCategory[]>(
    securityChecklist.map((cat) => ({
      ...cat,
      items: cat.items.map((i) => ({ ...i, checked: false })),
    }))
  )
  const [killModalOpen, setKillModalOpen] = useState(false)
  const [killActivated, setKillActivated] = useState(false)

  function toggleItem(catId: string, itemId: string) {
    setChecklist((prev) =>
      prev.map((cat) => {
        if (cat.id !== catId) return cat
        return {
          ...cat,
          items: cat.items.map((i) =>
            i.id === itemId ? { ...i, checked: !i.checked } : i
          ),
        }
      })
    )
  }

  const totals = useMemo(() => {
    const totalItems = checklist.reduce((s, c) => s + c.items.length, 0)
    const totalChecked = checklist.reduce(
      (s, c) => s + c.items.filter((i) => i.checked).length,
      0
    )
    const catStats = checklist.map((cat) => ({
      ...cat,
      checked: cat.items.filter((i) => i.checked).length,
    }))
    return { totalItems, totalChecked, catStats }
  }, [checklist])

  return (
    <section className="flex flex-col gap-6" aria-label="Checklist de Seguranca">
      {killActivated && (
        <div className="bg-red-600 text-white p-3 rounded-md text-center">
          PAUSADO - todas as campanhas foram pausadas
        </div>
      )}

      <div>
        <h2 className="text-lg font-bold text-foreground">Seguranca</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Checklist de setup e verificacao das plataformas de anuncio
        </p>
      </div>

      <div className="mt-2">
        <button
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg"
          onClick={() => setKillModalOpen(true)}
        >
          KILL SWITCH - Pausar Todas as Campanhas
        </button>
      </div>

      <Dialog open={killModalOpen} onOpenChange={setKillModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmação de Kill Switch</DialogTitle>
            <DialogDescription>
              Tem certeza? Isso vai pausar TODAS as campanhas ativas.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setKillModalOpen(false)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setKillActivated(true)
                setKillModalOpen(false)
              }}
            >
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* overall progress */}
      <div className="mb-4">
        <p className="font-bold">
          Progresso Geral {totals.totalChecked}/{totals.totalItems}
        </p>
        <Progress
          value={
            totals.totalItems
              ? (totals.totalChecked / totals.totalItems) * 100
              : 0
          }
        />
      </div>

      {totals.catStats.map((cat) => (
        <div key={cat.id} className="mb-6">
          <p className="font-semibold">
            {cat.name} {cat.checked}/{cat.items.length}
          </p>
          <Progress
            value={cat.items.length ? (cat.checked / cat.items.length) * 100 : 0}
          />
          <ul className="mt-2 space-y-2">
            {cat.items.map((item) => (
              <li key={item.id} className="flex items-center gap-2">
                <Checkbox
                  id={item.id}
                  checked={item.checked || false}
                  onCheckedChange={() => toggleItem(cat.id, item.id)}
                />
                <Label htmlFor={item.id}>{item.label}</Label>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}

