"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
  kanbanPhases,
  initialCampaigns,
  type KanbanPhaseId,
  type Campaign,
} from "@/lib/dashboard-data"
import { Calendar, DollarSign, GripVertical } from "lucide-react"

const phaseAccents: Record<KanbanPhaseId, string> = {
  briefing: "bg-muted-foreground",
  criacao: "bg-info",
  revisao: "bg-warning",
  aprovacao: "bg-chart-4",
  publicacao: "bg-primary",
  monitoramento: "bg-chart-2",
  concluido: "bg-success",
}

function PlatformDot({ platform }: { platform: "meta" | "google" }) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-[11px] font-medium ${
        platform === "meta" ? "text-info" : "text-chart-2"
      }`}
    >
      <span
        className={`size-1.5 rounded-full ${
          platform === "meta" ? "bg-info" : "bg-chart-2"
        }`}
      />
      {platform === "meta" ? "Meta" : "Google"}
    </span>
  )
}

function CampaignCard({
  campaign,
  onDragStart,
}: {
  campaign: Campaign
  onDragStart: (e: React.DragEvent, campaignId: string) => void
}) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, campaign.id)}
      className="group cursor-grab active:cursor-grabbing"
    >
      <div className="rounded-lg border border-border bg-card p-3 shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] hover:shadow-[0_1px_4px_0_rgba(0,0,0,0.06)] transition-shadow">
        <div className="flex flex-col gap-2.5">
          <div className="flex items-start justify-between gap-1.5">
            <p className="text-[13px] font-medium leading-snug text-foreground">
              {campaign.title}
            </p>
            <GripVertical className="size-3.5 text-muted-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5" />
          </div>
          <PlatformDot platform={campaign.platform} />
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="flex items-center gap-1 text-[11px]">
              <DollarSign className="size-3" />
              {campaign.budget}
            </span>
            <span className="flex items-center gap-1 text-[11px]">
              <Calendar className="size-3" />
              {campaign.dueDate}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function PhaseColumn({
  phase,
  campaigns,
  accentColor,
  isOver,
  onDragOver,
  onDragLeave,
  onDrop,
  onCardDragStart,
}: {
  phase: (typeof kanbanPhases)[number]
  campaigns: Campaign[]
  accentColor: string
  isOver: boolean
  onDragOver: (e: React.DragEvent) => void
  onDragLeave: () => void
  onDrop: (e: React.DragEvent) => void
  onCardDragStart: (e: React.DragEvent, campaignId: string) => void
}) {
  return (
    <div
      className={`flex flex-col w-[240px] shrink-0 rounded-xl transition-colors ${
        isOver ? "bg-primary/[0.03] ring-1 ring-primary/10" : "bg-muted/50"
      }`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div className="flex items-center gap-2 px-3 py-3">
        <span className={`size-2 rounded-full ${accentColor}`} />
        <span className="text-xs font-semibold text-foreground tracking-wide">
          {phase.label}
        </span>
        <span className="ml-auto text-[11px] font-medium text-muted-foreground tabular-nums">
          {campaigns.length}
        </span>
      </div>
      <div className="flex flex-col gap-2 px-2 pb-3 min-h-[140px]">
        {campaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            campaign={campaign}
            onDragStart={onCardDragStart}
          />
        ))}
      </div>
    </div>
  )
}

export function KanbanTab() {
  const [campaigns, setCampaigns] = useState(initialCampaigns)
  const [dragInfo, setDragInfo] = useState<{
    campaignId: string
    fromPhase: KanbanPhaseId
  } | null>(null)
  const [dragOverPhase, setDragOverPhase] = useState<KanbanPhaseId | null>(null)

  function handleDragStart(
    _e: React.DragEvent,
    campaignId: string,
    fromPhase: KanbanPhaseId
  ) {
    setDragInfo({ campaignId, fromPhase })
  }

  function handleDragOver(e: React.DragEvent, phaseId: KanbanPhaseId) {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    setDragOverPhase(phaseId)
  }

  function handleDrop(e: React.DragEvent, toPhase: KanbanPhaseId) {
    e.preventDefault()
    setDragOverPhase(null)
    if (!dragInfo || dragInfo.fromPhase === toPhase) return

    setCampaigns((prev) => {
      const next = { ...prev }
      const source = [...next[dragInfo.fromPhase]]
      const idx = source.findIndex((c) => c.id === dragInfo.campaignId)
      if (idx === -1) return prev
      const [moved] = source.splice(idx, 1)
      next[dragInfo.fromPhase] = source
      next[toPhase] = [...next[toPhase], moved]
      return next
    })
    setDragInfo(null)
  }

  const totalCampaigns = Object.values(campaigns).flat().length

  return (
    <section className="flex flex-col gap-5" aria-label="Pipeline Kanban">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-foreground">Pipeline de Campanhas</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Arraste os cards entre colunas para atualizar o status
          </p>
        </div>
        <Badge variant="secondary" className="text-xs font-medium tabular-nums">
          {totalCampaigns} campanhas
        </Badge>
      </div>

      <ScrollArea className="w-full">
        <div className="flex gap-3 pb-4" style={{ minWidth: "fit-content" }}>
          {kanbanPhases.map((phase) => (
            <PhaseColumn
              key={phase.id}
              phase={phase}
              campaigns={campaigns[phase.id]}
              accentColor={phaseAccents[phase.id]}
              isOver={dragOverPhase === phase.id}
              onDragOver={(e) => handleDragOver(e, phase.id)}
              onDragLeave={() => setDragOverPhase(null)}
              onDrop={(e) => handleDrop(e, phase.id)}
              onCardDragStart={(e, cId) => handleDragStart(e, cId, phase.id)}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  )
}
