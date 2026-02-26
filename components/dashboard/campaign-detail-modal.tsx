"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  type Campaign,
  type KanbanPhaseId,
  kanbanPhases,
} from "@/lib/dashboard-data"
import {
  CheckCircle2,
  Circle,
  Compass,
  PenTool,
  Film,
  Send,
  BarChart3,
} from "lucide-react"

const roleConfig: Record<
  string,
  { icon: React.ElementType; color: string; bg: string }
> = {
  Estrategista: { icon: Compass, color: "#4c6ef5", bg: "#4c6ef5" },
  Roteirista: { icon: PenTool, color: "#fab005", bg: "#fab005" },
  Produtor: { icon: Film, color: "#1098ad", bg: "#1098ad" },
  Publicador: { icon: Send, color: "#7950f2", bg: "#7950f2" },
  Analista: { icon: BarChart3, color: "#12b886", bg: "#12b886" },
}

function PlatformTag({ platform }: { platform: Campaign["platform"] }) {
  const label = platform === "meta+google" ? "META+GOOGLE" : platform === "meta" ? "META" : "GOOGLE"
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-card px-2.5 py-0.5 text-[11px] font-bold tracking-wide text-foreground">
      {label}
    </span>
  )
}

function ThemeTag({ theme }: { theme: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#12b886]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[#12b886]">
      <span className="size-1.5 rounded-full bg-[#12b886]" />
      {theme}
    </span>
  )
}

function StatusTag({ status }: { status: string }) {
  const isPaused = status.toUpperCase() === "PAUSED"
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide ${
        isPaused
          ? "bg-[#fab005]/10 text-[#fab005]"
          : "bg-muted text-muted-foreground"
      }`}
    >
      {status.toUpperCase()}
    </span>
  )
}

interface CampaignDetailModalProps {
  campaign: Campaign | null
  currentPhase: KanbanPhaseId | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onMoveTo: (campaignId: string, fromPhase: KanbanPhaseId, toPhase: KanbanPhaseId) => void
}

export function CampaignDetailModal({
  campaign,
  currentPhase,
  open,
  onOpenChange,
  onMoveTo,
}: CampaignDetailModalProps) {
  if (!campaign || !currentPhase) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[540px] p-0 gap-0 overflow-hidden bg-card border-border">
        {/* Header with colored top */}
        <div className="bg-[#4c6ef5]/5 px-6 pt-5 pb-4">
          <DialogHeader className="gap-0">
            <DialogDescription className="text-[12px] font-bold tracking-wide text-muted-foreground">
              {campaign.week} &middot; {campaign.dueDate}
            </DialogDescription>
            <DialogTitle className="text-lg font-bold text-foreground mt-1 text-balance">
              {campaign.title}
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-wrap items-center gap-2 mt-3">
            <PlatformTag platform={campaign.platform} />
            <ThemeTag theme={campaign.theme} />
            <StatusTag status={campaign.status} />
          </div>
        </div>

        <ScrollArea className="max-h-[60vh]">
          <div className="px-6 pb-6">
            {/* Move to section */}
            <div className="py-4">
              <p className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase mb-2.5">
                Mover para:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {kanbanPhases
                  .filter((p) => p.id !== currentPhase)
                  .map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        onMoveTo(campaign.id, currentPhase, p.id)
                        onOpenChange(false)
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-[12px] font-semibold text-foreground hover:border-[var(--btn-color)]/40 hover:bg-[var(--btn-color)]/5 transition-colors cursor-pointer"
                      style={
                        { "--btn-color": p.color } as React.CSSProperties
                      }
                    >
                      <span
                        className="size-2 rounded-full"
                        style={{ backgroundColor: p.color }}
                      />
                      {p.label}
                    </button>
                  ))}
              </div>
            </div>

            <Separator />

            {/* Pipeline section */}
            <div className="py-4">
              <p className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase mb-4">
                Pipeline
              </p>
              <div className="flex flex-col gap-4">
                {(campaign.pipeline || []).map((step, idx) => {
                  const config = roleConfig[step.role] || {
                    icon: Circle,
                    color: "#868e96",
                    bg: "#868e96",
                  }
                  const Icon = config.icon
                  const isLast = idx === campaign.pipeline.length - 1

                  return (
                    <div key={step.role} className="relative">
                      {/* Connector line */}
                      {!isLast && (
                        <div
                          className="absolute left-[15px] top-[34px] w-0.5 bg-border"
                          style={{ height: "calc(100% - 4px)" }}
                        />
                      )}

                      <div className="flex gap-3">
                        {/* Icon */}
                        <div
                          className="flex items-center justify-center size-[30px] rounded-lg shrink-0 mt-0.5"
                          style={{
                            backgroundColor: `${config.bg}15`,
                          }}
                        >
                          <Icon
                            className="size-4"
                            style={{ color: config.color }}
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[13px] font-bold text-foreground">
                              {step.role}
                            </span>
                            <span className="text-[11px] text-muted-foreground">
                              {step.title}
                            </span>
                            <div className="ml-auto">
                              {step.done ? (
                                <CheckCircle2 className="size-4 text-[#12b886]" />
                              ) : (
                                <div className="size-4 rounded-full border-2 border-border" />
                              )}
                            </div>
                          </div>

                          {step.details.length > 0 && (
                            <div className="rounded-lg bg-muted/50 p-3 mt-1.5">
                              {step.details.map((detail, dIdx) => (
                                <p
                                  key={dIdx}
                                  className="text-[12px] leading-relaxed text-muted-foreground font-mono whitespace-pre-wrap"
                                >
                                  {detail}
                                </p>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
