import { Badge } from "@/components/ui/badge"
import { Car } from "lucide-react"

export function DashboardHeader() {
  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <header className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center size-10 rounded-xl bg-primary text-primary-foreground">
          <Car className="size-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight text-balance">
            Atria Veiculos - Motor V3.0
          </h1>
          <p className="text-xs text-muted-foreground capitalize">{today}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-2 md:mt-0">
        <Badge variant="outline" className="text-xs font-normal">
          QUARENTENA 2/4
        </Badge>
        <div className="size-2 rounded-full bg-success animate-pulse" />
        <span className="text-xs text-muted-foreground">Online</span>
      </div>
    </header>
  )
}
