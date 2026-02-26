"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { KanbanTab } from "@/components/dashboard/kanban-tab"
import { KpisTab } from "@/components/dashboard/kpis-tab"
import { SettingsTab } from "@/components/dashboard/settings-tab"
import { SecurityTab } from "@/components/dashboard/security-tab"
import {
  Columns3,
  BarChart3,
  Settings2,
  ShieldCheck,
} from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1400px] px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5">
          <DashboardHeader />

          <Tabs defaultValue="kanban" className="flex flex-col gap-5">
            <TabsList className="bg-card border border-border shadow-sm w-fit h-11 px-1">
              <TabsTrigger
                value="kanban"
                className="gap-2 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none rounded-lg px-4 h-9 transition-all"
              >
                <Columns3 className="size-4" />
                <span className="hidden sm:inline">Kanban</span>
              </TabsTrigger>
              <TabsTrigger
                value="kpis"
                className="gap-2 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none rounded-lg px-4 h-9 transition-all"
              >
                <BarChart3 className="size-4" />
                <span className="hidden sm:inline">KPIs</span>
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="gap-2 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none rounded-lg px-4 h-9 transition-all"
              >
                <Settings2 className="size-4" />
                <span className="hidden sm:inline">Configuracoes</span>
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="gap-2 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none rounded-lg px-4 h-9 transition-all"
              >
                <ShieldCheck className="size-4" />
                <span className="hidden sm:inline">Seguranca</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="kanban" className="mt-0">
              <KanbanTab />
            </TabsContent>
            <TabsContent value="kpis" className="mt-0">
              <KpisTab />
            </TabsContent>
            <TabsContent value="settings" className="mt-0">
              <SettingsTab />
            </TabsContent>
            <TabsContent value="security" className="mt-0">
              <SecurityTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
