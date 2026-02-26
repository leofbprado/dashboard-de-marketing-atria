// ─── Types ───────────────────────────────────────────────
export interface Campaign {
  id: string
  title: string
  platform: "meta" | "google" | "meta+google"
  budget: string
  status: "ACTIVE" | "PAUSED"
  week: string // SEM XX
  theme: string
  hook: string
  pillar: string // Segurança, Tempo, Preço etc
  progress: { current: number; total: number } // 3/5
  metrics?: { impressions: string; cpl: string } // quando publicado
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
  category: "hetzner" | "meta-ads" | "google-ads" | "lp-openclaw"
}

// parâmetros específicos de configuração do motor de consignaçãp
export interface MotorConfig {
  ALLOW_AUTO_CREATE: boolean
  ALLOW_AUTO_ACTIVATE: boolean
  ALLOW_BUDGET_INCREASE: boolean
  MAX_DAILY_BUDGET: number
  MAX_CAMPAIGNS_WEEK_META: number
  MAX_CAMPAIGNS_WEEK_GOOGLE: number
  COOLDOWN_HOURS: number
  MAX_TOTAL_DAILY_SPEND: number
  DUPLICATION_ALLOWED: boolean
  EDIT_EXISTING_ALLOWED: boolean
  QUARANTINE_ACTIVE: boolean
  QUARANTINE_WEEKS_LEFT: number
  KILL_SWITCH_ACTIVE: boolean
}

export const initialMotorConfig: MotorConfig = {
  ALLOW_AUTO_CREATE: true,
  ALLOW_AUTO_ACTIVATE: true,
  ALLOW_BUDGET_INCREASE: false,
  MAX_DAILY_BUDGET: 30,
  MAX_CAMPAIGNS_WEEK_META: 1,
  MAX_CAMPAIGNS_WEEK_GOOGLE: 1,
  COOLDOWN_HOURS: 72,
  MAX_TOTAL_DAILY_SPEND: 100,
  DUPLICATION_ALLOWED: false,
  EDIT_EXISTING_ALLOWED: false,
  QUARANTINE_ACTIVE: true,
  QUARANTINE_WEEKS_LEFT: 3,
  KILL_SWITCH_ACTIVE: false,
}

export interface SecurityEvent {
  id: string
  timestamp: string
  type: "configchange" | "killswitch" | "budgetover" | "multicreate" | "authfail" | "metawriteattempt" | "freqhigh" | "campaignpaused"
  severity: "info" | "warning" | "critical"
  detail: string
  action: string
}

export const initialSecurityEvents: SecurityEvent[] = [
  {
    id: "evt-1",
    timestamp: "2026-01-15T08:30:00Z",
    type: "configchange",
    severity: "info",
    detail: "Orçamento diário ajustado para R$30",
    action: "notificar equipe",
  },
  {
    id: "evt-2",
    timestamp: "2026-01-20T14:12:00Z",
    type: "budgetover",
    severity: "warning",
    detail: "Gasto diário ultrapassou o limite definido",
    action: "pausar campanhas",
  },
  {
    id: "evt-3",
    timestamp: "2026-02-01T09:00:00Z",
    type: "authfail",
    severity: "critical",
    detail: "Falha de autenticação na API do Meta",
    action: "verificar credenciais",
  },
  {
    id: "evt-4",
    timestamp: "2026-02-10T16:45:00Z",
    type: "multicreate",
    severity: "warning",
    detail: "Tentativa de criar mais campanhas do que o permitido",
    action: "bloquear requisição",
  },
  {
    id: "evt-5",
    timestamp: "2026-02-20T11:20:00Z",
    type: "killswitch",
    severity: "critical",
    detail: "Kill switch ativado manualmente",
    action: "analisar motivos e reiniciar motor",
  },
]

// ─── Kanban Phases ───────────────────────────────────────
// nome da coluna mudou de "producao" para "aprovacao"; gate de aprovação do Leo antes de publicar
export const kanbanPhases = [
  { id: "briefing", label: "Briefing", responsible: "Estrategista", color: "bg-muted-foreground/20" },
  { id: "criativo", label: "Criativo", responsible: "Roteirista+Produtor", color: "bg-info/20" },
  { id: "aprovacao", label: "Aprovacao", responsible: "Leo", color: "bg-warning/20" },
  { id: "publicado", label: "Publicado", responsible: "Robozinho", color: "bg-chart-4/20" },
  { id: "monitor", label: "Monitor 48h", responsible: "Analista", color: "bg-success/20" },
] as const

export type KanbanPhaseId = (typeof kanbanPhases)[number]["id"]

// ─── Kanban Demo Data ────────────────────────────────────
// todas as campanhas agora são de consignação e usam apenas as três dores principais
export const initialCampaigns: Record<KanbanPhaseId, Campaign[]> = {
  briefing: [
    {
      id: "1",
      title: "Consignação - Segurança: Evite golpes",
      platform: "meta",
      budget: "R$ 30",
      status: "PAUSED",
      week: "SEM 12",
      theme: "Segurança",
      hook: "Evite golpes Pix/cheque",
      pillar: "Segurança",
      progress: { current: 0, total: 5 },
    },
  ],
  criativo: [
    {
      id: "2",
      title: "Consignação - Tempo: Venda sem estresse",
      platform: "google",
      budget: "R$ 30",
      status: "ACTIVE",
      week: "SEM 12",
      theme: "Tempo",
      hook: "Menos desgaste vendendo sozinho",
      pillar: "Tempo",
      progress: { current: 1, total: 5 },
    },
  ],
  aprovacao: [
    {
      id: "3",
      title: "Consignação - Preço: Proteja seu valor",
      platform: "meta+google",
      budget: "R$ 30",
      status: "ENDED",
      week: "SEM 11",
      theme: "Preço",
      hook: "Sem medo de perder dinheiro",
      pillar: "Preço",
      progress: { current: 2, total: 5 },
    },
  ],
  publicado: [
    {
      id: "4",
      title: "Consignação - Segurança: Tranquilidade total",
      platform: "meta",
      budget: "R$ 30",
      status: "ACTIVE",
      week: "SEM 10",
      theme: "Segurança",
      hook: "Nunca mais caia em golpe",
      pillar: "Segurança",
      progress: { current: 5, total: 5 },
      metrics: { impressions: "10K", cpl: "R$ 30,00" },
    },
  ],
  monitor: [
    {
      id: "5",
      title: "Consignação - Tempo: Rápido e seguro",
      platform: "google",
      budget: "R$ 30",
      status: "ACTIVE",
      week: "SEM 09",
      theme: "Tempo",
      hook: "Venda em minutos",
      pillar: "Tempo",
      progress: { current: 5, total: 5 },
      metrics: { impressions: "8K", cpl: "R$ 25,00" },
    },
  ],
}

// ─── KPI Demo Data ──────────────────────────────────────
export const topKpiCards = [
  { label: "Gasto Total", value: "R$ 146.800", change: 8.5, trend: "up" as const },
  { label: "Conversas (WhatsApp)", value: "2.139", change: 15.2, trend: "up" as const },
  { label: "CPL Medio", value: "R$ 68,60", change: -5.1, trend: "down" as const },
  { label: "Campanhas (total)", value: "24", change: 12.0, trend: "up" as const },
  { label: "Quarentena (ativo)", value: "2/4", change: 0, trend: "neutral" as const },
]

export interface CampaignAnalysis {
  campaign: string
  gasto: string
  conv: number
  cpl: string
  alcance: string
  freq: number
  ctr: string
  status: string
  diagnostico: string
}

export const metaAdsAnalysis: CampaignAnalysis[] = [
  { campaign: "Seguranca - Protecao Total", gasto: "R$ 15.000", conv: 124, cpl: "R$ 120,97", alcance: "45.2K", freq: 2.3, ctr: "2.1%", status: "Otimo", diagnostico: "Performance acima da media" },
  { campaign: "Preco - Oferta Imperdivel", gasto: "R$ 22.000", conv: 89, cpl: "R$ 247,19", alcance: "78.5K", freq: 1.8, ctr: "1.8%", status: "Ruim", diagnostico: "CPL elevado, revisar criativos" },
  { campaign: "Economia - Poupe Dinheiro", gasto: "R$ 25.000", conv: 247, cpl: "R$ 101,21", alcance: "92.1K", freq: 2.1, ctr: "2.5%", status: "Bom", diagnostico: "Alcance bom, otimizar para conversoes" },
  { campaign: "Conforto - Dirija com Estilo", gasto: "R$ 18.000", conv: 156, cpl: "R$ 115,38", alcance: "67.8K", freq: 2.0, ctr: "2.3%", status: "Otimo", diagnostico: "Equilibrio perfeito" },
]

// ─── Settings Demo Data ─────────────────────────────────
// ─── Configurações do motor ─────────────────────────────────
// os genéricos foram substituídos por parâmetros específicos
export const initialToggles: SettingToggle[] = [
  { id: "allow-auto-create", label: "Permitir criação automática", description: "Gerar campanhas automaticamente baseado em briefing", enabled: true },
  { id: "allow-auto-activate", label: "Permitir ativação automática", description: "Publicar campanhas assim que aprovadas", enabled: true },
  { id: "allow-budget-increase", label: "Permitir aumento de orçamento", description: "Escalar orçamento de campanhas performáticas", enabled: false },
  { id: "duplication-allowed", label: "Duplicação permitida", description: "Permitir duplicação de campanhas bem-sucedidas", enabled: false },
  { id: "edit-existing-allowed", label: "Edição de existentes permitida", description: "Modificar campanhas já publicadas", enabled: false },
  { id: "quarantine-active", label: "Quarentena ativa", description: "Sistema de quarentena para campanhas ruins", enabled: true },
  { id: "kill-switch-active", label: "Kill switch ativo", description: "Desligar motor completamente em emergência", enabled: false },
]

export const initialLimits: OperationalLimit[] = [
  { id: "max-daily-budget", label: "Orçamento diário máximo", value: 30, unit: "R$", max: 100 },
  { id: "max-campaigns-week-meta", label: "Max campanhas Meta/semana", value: 1, unit: "", max: 5 },
  { id: "max-campaigns-week-google", label: "Max campanhas Google/semana", value: 1, unit: "", max: 5 },
  { id: "cooldown-hours", label: "Cooldown entre campanhas (h)", value: 72, unit: "h", max: 168 },
  { id: "max-total-daily-spend", label: "Gasto diário total máximo", value: 100, unit: "R$", max: 1000 },
  { id: "quarantine-weeks-left", label: "Semanas restantes quarentena", value: 3, unit: "", max: 4 },
]
// ─── Security Checklist ─────────────────────────────────
export const initialSecurityItems: SecurityItem[] = [
  // Hetzner
  { id: "hetzner-1", label: "Servidor provisionado", description: "Instancia VPS criada no Hetzner", checked: true, priority: "alta", category: "hetzner" },
  { id: "hetzner-2", label: "Firewall configurado", description: "Regras de firewall aplicadas", checked: true, priority: "alta", category: "hetzner" },
  { id: "hetzner-3", label: "SSL instalado", description: "Certificado SSL Let's Encrypt ativo", checked: true, priority: "alta", category: "hetzner" },
  { id: "hetzner-4", label: "Backup automatico", description: "Sistema de backup diario configurado", checked: false, priority: "media", category: "hetzner" },
  { id: "hetzner-5", label: "Monitoramento ativo", description: "Alertas de uptime e performance", checked: true, priority: "media", category: "hetzner" },
  { id: "hetzner-6", label: "Atualizacoes de sistema", description: "SO e pacotes atualizados", checked: false, priority: "baixa", category: "hetzner" },
  { id: "hetzner-7", label: "Logs centralizados", description: "Sistema de logs configurado", checked: true, priority: "baixa", category: "hetzner" },
  { id: "hetzner-8", label: "Seguranca SSH", description: "Chaves SSH e desabilitacao root", checked: true, priority: "alta", category: "hetzner" },
  { id: "hetzner-9", label: "Fail2Ban ativo", description: "Protecao contra brute force", checked: true, priority: "media", category: "hetzner" },

  // Meta Ads
  { id: "meta-1", label: "Conta Business Manager", description: "Conta Meta Business criada e verificada", checked: true, priority: "alta", category: "meta-ads" },
  { id: "meta-2", label: "Pixel Meta instalado", description: "Pixel ativo em todas as paginas", checked: true, priority: "alta", category: "meta-ads" },
  { id: "meta-3", label: "Conversion API", description: "API de conversoes configurada", checked: true, priority: "alta", category: "meta-ads" },
  { id: "meta-4", label: "Catalogo de produtos", description: "Catalogo atualizado no Commerce Manager", checked: false, priority: "media", category: "meta-ads" },
  { id: "meta-5", label: "Audiencias personalizadas", description: "Publicos criados e segmentados", checked: true, priority: "media", category: "meta-ads" },
  { id: "meta-6", label: "2FA ativado", description: "Autenticacao em dois fatores", checked: true, priority: "alta", category: "meta-ads" },
  { id: "meta-7", label: "Metodo de pagamento", description: "Cartao valido e limites definidos", checked: true, priority: "alta", category: "meta-ads" },
  { id: "meta-8", label: "Permissoes de acesso", description: "Usuarios com permissoes corretas", checked: false, priority: "media", category: "meta-ads" },
  { id: "meta-9", label: "Dominio verificado", description: "Dominio da empresa verificado", checked: true, priority: "alta", category: "meta-ads" },

  // Google Ads
  { id: "google-1", label: "Conta Google Ads", description: "Conta criada e verificada", checked: true, priority: "alta", category: "google-ads" },
  { id: "google-2", label: "Google Tag Manager", description: "GTM instalado no site", checked: true, priority: "alta", category: "google-ads" },
  { id: "google-3", label: "Google Analytics", description: "GA4 configurado e ativo", checked: true, priority: "alta", category: "google-ads" },
  { id: "google-4", label: "Conversoes rastreadas", description: "Eventos de conversao definidos", checked: true, priority: "alta", category: "google-ads" },
  { id: "google-5", label: "Extensoes de anuncio", description: "Sitelink, local e chamadas configuradas", checked: false, priority: "media", category: "google-ads" },
  { id: "google-6", label: "Orcamento definido", description: "Limites diarios e mensais", checked: true, priority: "media", category: "google-ads" },
  { id: "google-7", label: "Palavras-chave negativas", description: "Lista de negativas atualizada", checked: false, priority: "media", category: "google-ads" },
  { id: "google-8", label: "Remarketing ativo", description: "Listas de remarketing criadas", checked: true, priority: "baixa", category: "google-ads" },
  { id: "google-9", label: "Relatorios automaticos", description: "Dashboards e alertas configurados", checked: false, priority: "baixa", category: "google-ads" },

  // LP + OpenClaw
  { id: "lp-1", label: "Landing Pages criadas", description: "Pags de destino otimizadas", checked: true, priority: "alta", category: "lp-openclaw" },
  { id: "lp-2", label: "Formularios funcionais", description: "Captura de leads funcionando", checked: true, priority: "alta", category: "lp-openclaw" },
  { id: "lp-3", label: "Integracao WhatsApp", description: "Botao de contato via WhatsApp", checked: true, priority: "alta", category: "lp-openclaw" },
  { id: "lp-4", label: "OpenClaw configurado", description: "Sistema de automacao ativo", checked: true, priority: "alta", category: "lp-openclaw" },
  { id: "lp-5", label: "Templates padronizados", description: "Modelos de LP consistentes", checked: false, priority: "media", category: "lp-openclaw" },
  { id: "lp-6", label: "Teste A/B ativo", description: "Otimizacao de conversao", checked: true, priority: "media", category: "lp-openclaw" },
  { id: "lp-7", label: "Analytics integrado", description: "Rastreamento de performance", checked: true, priority: "media", category: "lp-openclaw" },
  { id: "lp-8", label: "Backup de dados", description: "Leads exportados regularmente", checked: false, priority: "baixa", category: "lp-openclaw" },
]
