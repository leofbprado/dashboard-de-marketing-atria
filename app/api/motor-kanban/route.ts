import { NextResponse } from "next/server"
import { initialCampaigns } from "@/lib/dashboard-data"

export async function GET() {
  // Retorna todos os cards do kanban com os campos de tráfego (cpc, clicks, thumbnailUrl)
  const allCampaigns = Object.entries(initialCampaigns).flatMap(([phase, campaigns]) =>
    campaigns.map((c) => ({ ...c, phase }))
  )

  return NextResponse.json({ campaigns: allCampaigns })
}
