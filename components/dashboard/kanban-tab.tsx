"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
  kanbanPhases,
  initialCampaigns,
  type KanbanPhaseId,
  type Campaign,
} from "@/lib/dashboard-data"
import { GripVertical, Calendar, DollarSign } from "lucide-react"

function PlatformBadge({ platform }: { platform: "meta" | "google" }) {
  return (
    <Badge
      variant="outline"
      className={
        platform === "meta"
          ? "border-chart-1/30 bg-chart-1/10 text-chart-1 text-[10px] px-1.5 py-0"
          : "border-chart-2/30 bg-chart-2/10 text-chart-2 text-[10px] px-1.5 py-0"
      }
    >
      {platform === "meta" ? "Meta" : "Google"}
    </Badge>
  )
}

function CampaignCard({
  campaign,
  onDragStart,
}: {
  campaign: Campaign
  onDragStart: (e: React.DragEvent, campaignId: string, fromPhase: string) => void
}) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, campaign.id, "")}
      className="group cursor-grab active:cursor-grabbing"
    >
      <Card className="border-border/60 shadow-none hover:shadow-sm transition-shadow py-3 gap-3">
        <CardContent className="px-3 py-0 flex flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-medium leading-tight text-foreground">
              {campaign.title}
            </p>
            <GripVertical className="size-3.5 text-muted-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5" />
          </div>
          <div className="flex items-center gap-2">
            <PlatformBadge platform={campaign.platform} />
            <span className="text-[10px] text-muted-foreground">{campaign.status}</span>
          </div>
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="flex items-center gap-1 text-xs">
              <DollarSign className="size-3" />
              {campaign.budget}
            </span>
            <span className="flex items-center gap-1 text-xs">
              <Calendar className="size-3" />
              {campaign.dueDate}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function KanbanTab() {
  const [campaigns, setCampaigns] = useState(initialCampaigns)
  const [dragInfo, setDragInfo] = useState<{ campaignId: string; fromPhase: KanbanPhaseId } | null>(null)
  const [dragOverPhase, setDragOverPhase] = useState<KanbanPhaseId | null>(null)

  function handleDragStart(e: React.DragEvent, campaignId: string, fromPhase: KanbanPhaseId) {
    setDragInfo({ campaignId, fromPhase })
    e.dataTransfer.effectAllowed = "move"
  }

  function handleDragOver(e: React.DragEvent, phaseId: KanbanPhaseId) {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    setDragOverPhase(phaseId)
  }

  function handleDragLeave() {
    setDragOverPhase(null)
  }

  function handleDrop(e: React.DragEvent, toPhase: KanbanPhaseId) {
    e.preventDefault()
    setDragOverPhase(null)

    if (!dragInfo) return

    const { campaignId, fromPhase } = dragInfo
    if (fromPhase === toPhase) return

    setCampaigns((prev) => {
      const next = { ...prev }
      const sourceCampaigns = [...next[fromPhase]]
      const campaignIndex = sourceCampaigns.findIndex((c) => c.id === campaignId)
      if (campaignIndex === -1) return prev

      const [movedCampaign] = sourceCampaigns.splice(campaignIndex, 1)
      next[fromPhase] = sourceCampaigns
      next[toPhase] = [...next[toPhase], movedCampaign]
      return next
    })

    setDragInfo(null)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Pipeline de Campanhas</h2>
          <p className="text-sm text-muted-foreground">
            Arraste os cards entre as fases para atualizar o status
          </p>
        </div>
        <Badge variant="secondary" className="text-xs font-normal">
          {Object.values(campaigns).flat().length} campanhas
        </Badge>
      </div>

      <ScrollArea className="w-full">
        <div className="flex gap-3 pb-4" style={{ minWidth: "fit-content" }}>
          {kanbanPhases.map((phase) => {
            const phaseCampaigns = campaigns[phase.id]
            const isOver = dragOverPhase === phase.id
            return (
              <div
                key={phase.id}
                className={`flex flex-col gap-3 w-[220px] shrink-0 rounded-xl p-3 transition-colors ${
                  isOver ? "bg-primary/5 ring-1 ring-primary/20" : "bg-secondary/50"
                }`}
                onDragOver={(e) => handleDragOver(e, phase.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, phase.id)}
              >
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <div className={`size-2 rounded-full ${phase.color}`} />
                    <span className="text-xs font-medium text-foreground">{phase.label}</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground font-medium bg-background rounded-full px-1.5 py-0.5">
                    {phaseCampaigns.length}
                  </span>
                </div>

                <div className="flex flex-col gap-2 min-h-[120px]">
                  {phaseCampaigns.map((campaign) => (
                    <CampaignCard
                      key={campaign.id}
                      campaign={campaign}
                      onDragStart={(e, cId) => handleDragStart(e, cId, phase.id)}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
