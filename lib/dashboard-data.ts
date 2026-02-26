// ─── Types ───────────────────────────────────────────────

export interface Campaign {
  id: string
  title: string
  platform: "meta" | "google"
  budget: string
  status: string
  dueDate: string
  priority: "alta" | "media" | "baixa"
}

export interface KpiCard {
  label: string
  value: string
  change: number
  trend: "up" | "down" | "neutral"
  platform: "meta" | "google"
  description: string
}

export interface SettingToggle {
  id: string
  label: string
  description: string
  enabled: boolean
  category: "automacao" | "notificacao" | "otimizacao"
}

export interface OperationalLimit {
  id: string
  label: string
  value: number
  unit: string
  min: number
  max: number
  step: number
}

export interface SecurityItem {
  id: string
  label: string
  description: string
  checked: boolean
  priority: "critica" | "importante" | "recomendada"
  category: "tracking" | "acesso" | "configuracao"
}

// ─── Kanban Phases ───────────────────────────────────────

export const kanbanPhases = [
  { id: "briefing", label: "Briefing", count: 0 },
  { id: "criacao", label: "Criacao", count: 0 },
  { id: "revisao", label: "Revisao", count: 0 },
  { id: "aprovacao", label: "Aprovacao", count: 0 },
  { id: "publicacao", label: "Publicacao", count: 0 },
  { id: "monitoramento", label: "Monitoramento", count: 0 },
  { id: "concluido", label: "Concluido", count: 0 },
] as const

export type KanbanPhaseId = (typeof kanbanPhases)[number]["id"]

// ─── Kanban Demo Data ────────────────────────────────────

export const initialCampaigns: Record<KanbanPhaseId, Campaign[]> = {
  briefing: [
    { id: "c1", title: "Lancamento SUV 2026", platform: "meta", budget: "R$ 15.000", status: "Nova", dueDate: "10/03", priority: "alta" },
    { id: "c2", title: "Promocao Seminovos", platform: "google", budget: "R$ 8.500", status: "Nova", dueDate: "12/03", priority: "media" },
  ],
  criacao: [
    { id: "c3", title: "Feirao de Marco", platform: "meta", budget: "R$ 22.000", status: "Em andamento", dueDate: "08/03", priority: "alta" },
    { id: "c4", title: "Test Drive Eletricos", platform: "google", budget: "R$ 12.000", status: "Em andamento", dueDate: "15/03", priority: "media" },
  ],
  revisao: [
    { id: "c5", title: "Black Week Pecas", platform: "meta", budget: "R$ 5.000", status: "Pendente", dueDate: "07/03", priority: "baixa" },
  ],
  aprovacao: [
    { id: "c6", title: "Consorcio Especial", platform: "google", budget: "R$ 18.000", status: "Aguardando", dueDate: "09/03", priority: "alta" },
    { id: "c7", title: "Revisao Programada", platform: "meta", budget: "R$ 6.500", status: "Aguardando", dueDate: "11/03", priority: "baixa" },
  ],
  publicacao: [
    { id: "c8", title: "Campanha Institucional", platform: "meta", budget: "R$ 30.000", status: "Agendada", dueDate: "06/03", priority: "alta" },
  ],
  monitoramento: [
    { id: "c9", title: "Leads Financiamento", platform: "google", budget: "R$ 20.000", status: "Ativa", dueDate: "28/02", priority: "alta" },
    { id: "c10", title: "Remarketing Visitantes", platform: "meta", budget: "R$ 10.000", status: "Ativa", dueDate: "01/03", priority: "media" },
  ],
  concluido: [
    { id: "c11", title: "Natal 2025", platform: "meta", budget: "R$ 25.000", status: "Finalizada", dueDate: "25/12", priority: "media" },
  ],
}

// ─── KPI Demo Data ──────────────────────────────────────

export const metaKpis: KpiCard[] = [
  { label: "Investimento", value: "R$ 84.500", change: 12.3, trend: "up", platform: "meta", description: "Gasto total no periodo" },
  { label: "Impressoes", value: "1.2M", change: 8.7, trend: "up", platform: "meta", description: "Total de visualizacoes" },
  { label: "Cliques", value: "34.821", change: -2.1, trend: "down", platform: "meta", description: "Cliques nos anuncios" },
  { label: "CTR", value: "2,89%", change: 0.3, trend: "up", platform: "meta", description: "Taxa de cliques" },
  { label: "CPM", value: "R$ 18,40", change: -5.2, trend: "down", platform: "meta", description: "Custo por mil impressoes" },
  { label: "Leads", value: "1.247", change: 15.6, trend: "up", platform: "meta", description: "Contatos gerados" },
  { label: "CPL", value: "R$ 67,74", change: -8.3, trend: "down", platform: "meta", description: "Custo por lead" },
  { label: "ROAS", value: "4.2x", change: 11.0, trend: "up", platform: "meta", description: "Retorno sobre investimento" },
]

export const googleKpis: KpiCard[] = [
  { label: "Investimento", value: "R$ 62.300", change: 5.8, trend: "up", platform: "google", description: "Gasto total no periodo" },
  { label: "Impressoes", value: "890K", change: 3.2, trend: "up", platform: "google", description: "Total de visualizacoes" },
  { label: "Cliques", value: "28.456", change: 7.4, trend: "up", platform: "google", description: "Cliques nos anuncios" },
  { label: "CTR", value: "3,19%", change: 1.1, trend: "up", platform: "google", description: "Taxa de cliques" },
  { label: "CPC", value: "R$ 2,19", change: -3.7, trend: "down", platform: "google", description: "Custo por clique" },
  { label: "Conversoes", value: "892", change: 22.1, trend: "up", platform: "google", description: "Conversoes realizadas" },
  { label: "CPA", value: "R$ 69,84", change: -12.5, trend: "down", platform: "google", description: "Custo por aquisicao" },
  { label: "ROAS", value: "5.1x", change: 18.3, trend: "up", platform: "google", description: "Retorno sobre investimento" },
]

// ─── Settings Demo Data ─────────────────────────────────

export const initialToggles: SettingToggle[] = [
  { id: "auto-pause", label: "Pausa automatica", description: "Pausar campanhas quando CPL ultrapassar o limite definido", enabled: true, category: "automacao" },
  { id: "auto-budget", label: "Redistribuicao de verba", description: "Realocar verba automaticamente para campanhas com melhor ROAS", enabled: false, category: "otimizacao" },
  { id: "ab-testing", label: "Teste A/B automatico", description: "Criar variacoes de criativos e testar automaticamente", enabled: true, category: "otimizacao" },
  { id: "notifications", label: "Alertas por e-mail", description: "Receber notificacoes quando metricas cairem abaixo do esperado", enabled: true, category: "notificacao" },
  { id: "report-weekly", label: "Relatorio semanal", description: "Enviar resumo de performance toda segunda-feira as 8h", enabled: true, category: "notificacao" },
  { id: "competitor-watch", label: "Monitoramento de concorrencia", description: "Rastrear anuncios de concorrentes na regiao", enabled: false, category: "otimizacao" },
]

export const initialLimits: OperationalLimit[] = [
  { id: "max-cpl", label: "CPL maximo", value: 85, unit: "R$", min: 10, max: 200, step: 5 },
  { id: "min-roas", label: "ROAS minimo", value: 3, unit: "x", min: 1, max: 10, step: 0.5 },
  { id: "daily-budget", label: "Verba diaria", value: 5000, unit: "R$", min: 500, max: 20000, step: 500 },
  { id: "max-cpc", label: "CPC maximo", value: 4, unit: "R$", min: 0.5, max: 15, step: 0.5 },
  { id: "frequency-cap", label: "Frequencia maxima", value: 5, unit: "x/semana", min: 1, max: 15, step: 1 },
]

// ─── Security Checklist ─────────────────────────────────

export const initialSecurityItems: SecurityItem[] = [
  { id: "pixel-meta", label: "Pixel Meta instalado", description: "Pixel ativo em todas as paginas do site da concessionaria", checked: true, priority: "critica", category: "tracking" },
  { id: "gtag", label: "Google Tag configurada", description: "Tag de conversao do Google Ads instalada e verificada", checked: true, priority: "critica", category: "tracking" },
  { id: "api-tokens", label: "Tokens de API renovados", description: "Tokens de acesso Meta e Google dentro da validade", checked: false, priority: "critica", category: "acesso" },
  { id: "2fa", label: "Autenticacao 2FA ativa", description: "Dois fatores habilitado em Meta Business e Google Ads", checked: true, priority: "critica", category: "acesso" },
  { id: "domain-verify", label: "Dominio verificado", description: "Dominio da concessionaria verificado no Meta Business Manager", checked: true, priority: "critica", category: "configuracao" },
  { id: "conversion-api", label: "Conversion API configurada", description: "API de conversoes do Meta para server-side tracking", checked: true, priority: "importante", category: "tracking" },
  { id: "access-review", label: "Revisao de acessos", description: "Permissoes de colaboradores verificadas nas plataformas", checked: false, priority: "importante", category: "acesso" },
  { id: "utm-standard", label: "Padrao UTM definido", description: "Convencao de nomenclatura UTM documentada e aplicada", checked: true, priority: "importante", category: "configuracao" },
  { id: "billing-check", label: "Metodo de pagamento validado", description: "Cartao e limites de faturamento verificados", checked: true, priority: "importante", category: "configuracao" },
  { id: "backup-audiences", label: "Backup de publicos", description: "Publicos personalizados exportados e armazenados", checked: false, priority: "recomendada", category: "configuracao" },
]
