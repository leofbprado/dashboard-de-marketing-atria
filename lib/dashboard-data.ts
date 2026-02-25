// ─── Types ───────────────────────────────────────────────
export interface Campaign {
  id: string
  title: string
  platform: "meta" | "google"
  budget: string
  status: string
  dueDate: string
}

export interface KpiCard {
  label: string
  value: string
  change: number
  trend: "up" | "down" | "neutral"
  platform: "meta" | "google"
}

export interface SettingToggle {
  id: string
  label: string
  description: string
  enabled: boolean
}

export interface OperationalLimit {
  id: string
  label: string
  value: number
  unit: string
  max: number
}

export interface SecurityItem {
  id: string
  label: string
  description: string
  checked: boolean
  priority: "alta" | "media" | "baixa"
}

// ─── Kanban Phases ───────────────────────────────────────
export const kanbanPhases = [
  { id: "briefing", label: "Briefing", color: "bg-muted-foreground/20" },
  { id: "criacao", label: "Criacao", color: "bg-info/20" },
  { id: "revisao", label: "Revisao", color: "bg-warning/20" },
  { id: "aprovacao", label: "Aprovacao", color: "bg-chart-4/20" },
  { id: "publicacao", label: "Publicacao", color: "bg-primary/20" },
  { id: "monitoramento", label: "Monitoramento", color: "bg-success/20" },
  { id: "concluido", label: "Concluido", color: "bg-success/30" },
] as const

export type KanbanPhaseId = (typeof kanbanPhases)[number]["id"]

// ─── Kanban Demo Data ────────────────────────────────────
export const initialCampaigns: Record<KanbanPhaseId, Campaign[]> = {
  briefing: [
    { id: "1", title: "Lancamento SUV 2026", platform: "meta", budget: "R$ 15.000", status: "Nova", dueDate: "10/03" },
    { id: "2", title: "Promocao Seminovos", platform: "google", budget: "R$ 8.500", status: "Nova", dueDate: "12/03" },
  ],
  criacao: [
    { id: "3", title: "Feirão de Marco", platform: "meta", budget: "R$ 22.000", status: "Em andamento", dueDate: "08/03" },
    { id: "4", title: "Test Drive Eletricos", platform: "google", budget: "R$ 12.000", status: "Em andamento", dueDate: "15/03" },
  ],
  revisao: [
    { id: "5", title: "Black Week Pecas", platform: "meta", budget: "R$ 5.000", status: "Pendente", dueDate: "07/03" },
  ],
  aprovacao: [
    { id: "6", title: "Consorcio Especial", platform: "google", budget: "R$ 18.000", status: "Aguardando", dueDate: "09/03" },
    { id: "7", title: "Revisão Programada", platform: "meta", budget: "R$ 6.500", status: "Aguardando", dueDate: "11/03" },
  ],
  publicacao: [
    { id: "8", title: "Campanha Institucional", platform: "meta", budget: "R$ 30.000", status: "Agendada", dueDate: "06/03" },
  ],
  monitoramento: [
    { id: "9", title: "Leads Financiamento", platform: "google", budget: "R$ 20.000", status: "Ativa", dueDate: "28/02" },
    { id: "10", title: "Remarketing Visitantes", platform: "meta", budget: "R$ 10.000", status: "Ativa", dueDate: "01/03" },
  ],
  concluido: [
    { id: "11", title: "Natal 2025", platform: "meta", budget: "R$ 25.000", status: "Finalizada", dueDate: "25/12" },
  ],
}

// ─── KPI Demo Data ──────────────────────────────────────
export const metaKpis: KpiCard[] = [
  { label: "Investimento", value: "R$ 84.500", change: 12.3, trend: "up", platform: "meta" },
  { label: "Impressoes", value: "1.2M", change: 8.7, trend: "up", platform: "meta" },
  { label: "Cliques", value: "34.821", change: -2.1, trend: "down", platform: "meta" },
  { label: "CTR", value: "2,89%", change: 0.3, trend: "up", platform: "meta" },
  { label: "CPM", value: "R$ 18,40", change: -5.2, trend: "down", platform: "meta" },
  { label: "Leads", value: "1.247", change: 15.6, trend: "up", platform: "meta" },
  { label: "CPL", value: "R$ 67,74", change: -8.3, trend: "down", platform: "meta" },
  { label: "ROAS", value: "4.2x", change: 11.0, trend: "up", platform: "meta" },
]

export const googleKpis: KpiCard[] = [
  { label: "Investimento", value: "R$ 62.300", change: 5.8, trend: "up", platform: "google" },
  { label: "Impressoes", value: "890K", change: 3.2, trend: "up", platform: "google" },
  { label: "Cliques", value: "28.456", change: 7.4, trend: "up", platform: "google" },
  { label: "CTR", value: "3,19%", change: 1.1, trend: "up", platform: "google" },
  { label: "CPC", value: "R$ 2,19", change: -3.7, trend: "down", platform: "google" },
  { label: "Conversoes", value: "892", change: 22.1, trend: "up", platform: "google" },
  { label: "CPA", value: "R$ 69,84", change: -12.5, trend: "down", platform: "google" },
  { label: "ROAS", value: "5.1x", change: 18.3, trend: "up", platform: "google" },
]

// ─── Settings Demo Data ─────────────────────────────────
export const initialToggles: SettingToggle[] = [
  { id: "auto-pause", label: "Pausa automatica", description: "Pausar campanhas quando CPL ultrapassar limite", enabled: true },
  { id: "notifications", label: "Notificacoes em tempo real", description: "Alertas via e-mail quando metricas caem", enabled: true },
  { id: "auto-budget", label: "Redistribuicao de verba", description: "Realocar automaticamente para campanhas com melhor ROAS", enabled: false },
  { id: "ab-testing", label: "Teste A/B automatico", description: "Criar variacoes de criativos automaticamente", enabled: true },
  { id: "report-weekly", label: "Relatorio semanal", description: "Enviar resumo toda segunda-feira as 8h", enabled: true },
  { id: "competitor-watch", label: "Monitoramento concorrencia", description: "Rastrear anuncios de concorrentes na regiao", enabled: false },
]

export const initialLimits: OperationalLimit[] = [
  { id: "max-cpl", label: "CPL maximo", value: 85, unit: "R$", max: 200 },
  { id: "min-roas", label: "ROAS minimo", value: 3, unit: "x", max: 10 },
  { id: "daily-budget", label: "Verba diaria maxima", value: 5000, unit: "R$", max: 20000 },
  { id: "max-cpc", label: "CPC maximo", value: 4, unit: "R$", max: 15 },
  { id: "frequency-cap", label: "Frequencia maxima", value: 5, unit: "x/semana", max: 15 },
]

// ─── Security Checklist ─────────────────────────────────
export const initialSecurityItems: SecurityItem[] = [
  { id: "pixel-meta", label: "Pixel Meta instalado", description: "Verificar se o pixel esta ativo em todas as paginas do site", checked: true, priority: "alta" },
  { id: "gtag", label: "Google Tag configurada", description: "Tag de conversao do Google Ads instalada corretamente", checked: true, priority: "alta" },
  { id: "api-tokens", label: "Tokens API renovados", description: "Tokens de acesso Meta e Google dentro da validade", checked: false, priority: "alta" },
  { id: "2fa", label: "2FA ativado nas contas", description: "Autenticacao em dois fatores em Meta Business e Google Ads", checked: true, priority: "alta" },
  { id: "access-review", label: "Revisao de acessos", description: "Verificar permissoes de colaboradores nas plataformas", checked: false, priority: "media" },
  { id: "conversion-api", label: "Conversion API ativa", description: "API de conversoes do Meta configurada para server-side tracking", checked: true, priority: "media" },
  { id: "utm-standard", label: "Padrao UTM definido", description: "Convencao de nomes UTM documentada e validada", checked: true, priority: "media" },
  { id: "backup-audiences", label: "Backup de publicos", description: "Publicos personalizados exportados e armazenados", checked: false, priority: "baixa" },
  { id: "domain-verify", label: "Dominio verificado", description: "Dominio da concessionaria verificado no Meta Business", checked: true, priority: "alta" },
  { id: "billing-check", label: "Metodo de pagamento", description: "Cartao de credito e limites validados nas plataformas", checked: true, priority: "media" },
]
