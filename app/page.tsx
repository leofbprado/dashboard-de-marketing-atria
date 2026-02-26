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
      <div className="mx-auto max-w-[1280px] px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6">
          <DashboardHeader />

          <Tabs defaultValue="kanban" className="flex flex-col gap-6">
            <TabsList className="bg-muted/60 border border-border w-fit">
              <TabsTrigger
                value="kanban"
                className="gap-1.5 text-xs data-[state=active]:bg-card data-[state=active]:shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]"
              >
                <Columns3 className="size-3.5" />
                <span className="hidden sm:inline">Kanban</span>
              </TabsTrigger>
              <TabsTrigger
                value="kpis"
                className="gap-1.5 text-xs data-[state=active]:bg-card data-[state=active]:shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]"
              >
                <BarChart3 className="size-3.5" />
                <span className="hidden sm:inline">KPIs</span>
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="gap-1.5 text-xs data-[state=active]:bg-card data-[state=active]:shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]"
              >
                <Settings2 className="size-3.5" />
                <span className="hidden sm:inline">Configuracoes</span>
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="gap-1.5 text-xs data-[state=active]:bg-card data-[state=active]:shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]"
              >
                <ShieldCheck className="size-3.5" />
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
