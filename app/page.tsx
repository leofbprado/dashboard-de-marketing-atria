"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { KanbanTab } from "@/components/dashboard/kanban-tab"
import { KpisTab } from "@/components/dashboard/kpis-tab"
import { SettingsTab } from "@/components/dashboard/settings-tab"
import { SecurityTab } from "@/components/dashboard/security-tab"
import {
  LayoutGrid,
  BarChart3,
  Settings2,
  ShieldCheck,
} from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
        <div className="flex flex-col gap-6">
          <DashboardHeader />

          <Tabs defaultValue="kanban" className="flex flex-col gap-4">
            <TabsList className="bg-secondary/80 w-full md:w-auto">
              <TabsTrigger value="kanban" className="gap-1.5 text-xs">
                <LayoutGrid className="size-3.5" />
                <span className="hidden sm:inline">Kanban</span>
              </TabsTrigger>
              <TabsTrigger value="kpis" className="gap-1.5 text-xs">
                <BarChart3 className="size-3.5" />
                <span className="hidden sm:inline">KPIs</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="gap-1.5 text-xs">
                <Settings2 className="size-3.5" />
                <span className="hidden sm:inline">Configuracoes</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="gap-1.5 text-xs">
                <ShieldCheck className="size-3.5" />
                <span className="hidden sm:inline">Seguranca</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="kanban">
              <KanbanTab />
            </TabsContent>
            <TabsContent value="kpis">
              <KpisTab />
            </TabsContent>
            <TabsContent value="settings">
              <SettingsTab />
            </TabsContent>
            <TabsContent value="security">
              <SecurityTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
