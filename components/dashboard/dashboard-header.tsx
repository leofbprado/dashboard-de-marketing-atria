import { Badge } from "@/components/ui/badge"

export function DashboardHeader() {
  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <header className="flex flex-col gap-4 pb-2 border-b border-border sm:flex-row sm:items-end sm:justify-between">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center size-8 rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">AD</span>
          </div>
          <h1 className="text-lg font-semibold tracking-tight text-foreground text-balance">
            AutoDrive Marketing
          </h1>
        </div>
        <p className="text-sm text-muted-foreground capitalize pl-[42px]">{today}</p>
      </div>
      <div className="flex items-center gap-3">
        <Badge
          variant="outline"
          className="font-normal text-xs text-muted-foreground border-border"
        >
          Concessionaria Centro
        </Badge>
        <div className="flex items-center gap-1.5">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-success" />
          </span>
          <span className="text-xs text-muted-foreground">Conectado</span>
        </div>
      </div>
    </header>
  )
}
