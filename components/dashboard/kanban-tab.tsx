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
import { Calendar, DollarSign, GripVertical, Plus } from "lucide-react"

const phaseColors: Record<KanbanPhaseId, { top: string; dot: string; bg: string; count: string }> = {
  briefing:      { top: "bg-[#868e96]", dot: "bg-[#868e96]", bg: "bg-[#868e96]/5",  count: "bg-[#868e96]/10 text-[#868e96]" },
  criacao:       { top: "bg-[#4c6ef5]", dot: "bg-[#4c6ef5]", bg: "bg-[#4c6ef5]/5",  count: "bg-[#4c6ef5]/10 text-[#4c6ef5]" },
  revisao:       { top: "bg-[#fab005]", dot: "bg-[#fab005]", bg: "bg-[#fab005]/5",  count: "bg-[#fab005]/10 text-[#fab005]" },
  aprovacao:     { top: "bg-[#7950f2]", dot: "bg-[#7950f2]", bg: "bg-[#7950f2]/5",  count: "bg-[#7950f2]/10 text-[#7950f2]" },
  publicacao:    { top: "bg-[#1098ad]", dot: "bg-[#1098ad]", bg: "bg-[#1098ad]/5",  count: "bg-[#1098ad]/10 text-[#1098ad]" },
  monitoramento: { top: "bg-[#f76707]", dot: "bg-[#f76707]", bg: "bg-[#f76707]/5",  count: "bg-[#f76707]/10 text-[#f76707]" },
  concluido:     { top: "bg-[#12b886]", dot: "bg-[#12b886]", bg: "bg-[#12b886]/5",  count: "bg-[#12b886]/10 text-[#12b886]" },
}

function PlatformBadge({ platform }: { platform: "meta" | "google" }) {
  const isMeta = platform === "meta"
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
        isMeta
          ? "bg-[#1877f2]/10 text-[#1877f2]"
          : "bg-[#34a853]/10 text-[#34a853]"
      }`}
    >
      <span
        className={`size-1.5 rounded-full ${
          isMeta ? "bg-[#1877f2]" : "bg-[#34a853]"
        }`}
      />
      {isMeta ? "Meta" : "Google"}
    </span>
  )
}

function PriorityDot({ priority }: { priority: Campaign["priority"] }) {
  const colors = {
    alta: "bg-[#ff6b6b]",
    media: "bg-[#fab005]",
    baixa: "bg-[#868e96]",
  }
  return (
    <span
      className={`size-1.5 rounded-full ${colors[priority]}`}
      title={`Prioridade ${priority}`}
    />
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
      <div className="rounded-xl border border-border bg-card p-3.5 shadow-sm hover:shadow-md hover:border-primary/20 transition-all">
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-1.5">
            <div className="flex items-center gap-1.5">
              <PriorityDot priority={campaign.priority} />
              <p className="text-[13px] font-semibold leading-snug text-card-foreground">
                {campaign.title}
              </p>
            </div>
            <GripVertical className="size-3.5 text-muted-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5" />
          </div>
          <PlatformBadge platform={campaign.platform} />
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="flex items-center gap-1 text-[11px] font-medium">
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
  colors,
  isOver,
  onDragOver,
  onDragLeave,
  onDrop,
  onCardDragStart,
}: {
  phase: (typeof kanbanPhases)[number]
  campaigns: Campaign[]
  colors: (typeof phaseColors)[KanbanPhaseId]
  isOver: boolean
  onDragOver: (e: React.DragEvent) => void
  onDragLeave: () => void
  onDrop: (e: React.DragEvent) => void
  onCardDragStart: (e: React.DragEvent, campaignId: string) => void
}) {
  return (
    <div
      className={`flex flex-col w-[260px] shrink-0 rounded-2xl overflow-hidden transition-all border ${
        isOver ? "border-primary/30 shadow-lg shadow-primary/5" : "border-border"
      } bg-card`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {/* Colored top bar */}
      <div className={`h-1.5 ${colors.top}`} />
      
      <div className="flex items-center gap-2 px-4 py-3">
        <span className={`size-2.5 rounded-full ${colors.dot}`} />
        <span className="text-sm font-semibold text-card-foreground">
          {phase.label}
        </span>
        <span className={`ml-auto text-[11px] font-bold rounded-full px-2 py-0.5 ${colors.count}`}>
          {campaigns.length}
        </span>
      </div>

      <div className="flex flex-col gap-2.5 px-3 pb-3 min-h-[140px]">
        {campaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            campaign={campaign}
            onDragStart={onCardDragStart}
          />
        ))}
        <button className="flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-border py-2.5 text-xs text-muted-foreground hover:border-primary/30 hover:text-primary hover:bg-primary/5 transition-colors">
          <Plus className="size-3.5" />
          Adicionar
        </button>
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
          <h2 className="text-lg font-bold text-foreground">Pipeline de Campanhas</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Arraste os cards entre colunas para atualizar o status
          </p>
        </div>
        <Badge className="bg-primary/10 text-primary border-0 text-sm font-bold tabular-nums px-3 py-1 hover:bg-primary/10">
          {totalCampaigns} campanhas
        </Badge>
      </div>

      <ScrollArea className="w-full">
        <div className="flex gap-4 pb-4" style={{ minWidth: "fit-content" }}>
          {kanbanPhases.map((phase) => (
            <PhaseColumn
              key={phase.id}
              phase={phase}
              campaigns={campaigns[phase.id]}
              colors={phaseColors[phase.id]}
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
