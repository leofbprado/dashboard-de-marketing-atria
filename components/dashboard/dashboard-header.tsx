"use client"

import { Badge } from "@/components/ui/badge"
import { Car, Bell } from "lucide-react"

export function DashboardHeader() {
  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <header className="rounded-2xl bg-gradient-to-r from-[#4c6ef5] to-[#7950f2] p-6 text-[#ffffff]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-10 rounded-xl bg-[#ffffff]/20 backdrop-blur-sm">
            <Car className="size-5 text-[#ffffff]" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-[#ffffff] text-balance">
              AutoDrive Marketing
            </h1>
            <p className="text-sm text-[#ffffff]/70 capitalize">{today}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-[#ffffff]/15 text-[#ffffff] border-[#ffffff]/20 hover:bg-[#ffffff]/20 text-xs font-medium backdrop-blur-sm">
            Concessionaria Centro
          </Badge>
          <button className="relative flex items-center justify-center size-9 rounded-xl bg-[#ffffff]/15 hover:bg-[#ffffff]/20 backdrop-blur-sm transition-colors" aria-label="Notificacoes">
            <Bell className="size-4 text-[#ffffff]" />
            <span className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-[#ff6b6b] ring-2 ring-[#4c6ef5]" />
          </button>
          <div className="flex items-center gap-1.5 bg-[#ffffff]/15 backdrop-blur-sm rounded-full px-3 py-1.5">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#51cf66] opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-[#51cf66]" />
            </span>
            <span className="text-xs text-[#ffffff] font-medium">Online</span>
          </div>
        </div>
      </div>
    </header>
  )
}
