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

// ─── Kanban Phases ───────────────────────────────────────
export const kanbanPhases = [
  { id: "briefing", label: "Briefing", responsible: "Estrategista", color: "bg-muted-foreground/20" },
  { id: "criativo", label: "Criativo", responsible: "Roteirista+Produtor", color: "bg-info/20" },
  { id: "aprovacao", label: "Aprovacao", responsible: "Leo", color: "bg-warning/20" },
  { id: "publicado", label: "Publicado", responsible: "Robozinho", color: "bg-chart-4/20" },
  { id: "monitor", label: "Monitor 48h", responsible: "Analista", color: "bg-success/20" },
] as const

export type KanbanPhaseId = (typeof kanbanPhases)[number]["id"]

// ─── Kanban Demo Data ────────────────────────────────────
export const initialCampaigns: Record<KanbanPhaseId, Campaign[]> = {
  briefing: [
    { id: "1", title: "Seguranca - Protecao Total", platform: "meta", budget: "R$ 15.000", status: "ACTIVE", week: "SEM 12", theme: "Seguranca", hook: "Protecao Total", pillar: "Seguranca", progress: { current: 1, total: 5 } },
    { id: "2", title: "Tempo - Rapido e Facil", platform: "google", budget: "R$ 8.500", status: "ACTIVE", week: "SEM 12", theme: "Tempo", hook: "Rapido e Facil", pillar: "Tempo", progress: { current: 1, total: 5 } },
  ],
  criativo: [
    { id: "3", title: "Preco - Oferta Imperdivel", platform: "meta", budget: "R$ 22.000", status: "ACTIVE", week: "SEM 11", theme: "Preco", hook: "Oferta Imperdivel", pillar: "Preco", progress: { current: 2, total: 5 } },
    { id: "4", title: "Qualidade - Excelencia Garantida", platform: "google", budget: "R$ 12.000", status: "ACTIVE", week: "SEM 11", theme: "Qualidade", hook: "Excelencia Garantida", pillar: "Qualidade", progress: { current: 3, total: 5 } },
  ],
  aprovacao: [
    { id: "5", title: "Conforto - Dirija com Estilo", platform: "meta+google", budget: "R$ 18.000", status: "PAUSED", week: "SEM 10", theme: "Conforto", hook: "Dirija com Estilo", pillar: "Conforto", progress: { current: 4, total: 5 } },
  ],
  publicado: [
    { id: "6", title: "Economia - Poupe Dinheiro", platform: "meta", budget: "R$ 25.000", status: "ACTIVE", week: "SEM 09", theme: "Economia", hook: "Poupe Dinheiro", pillar: "Economia", progress: { current: 5, total: 5 }, metrics: { impressions: "1.2M", cpl: "R$ 67,74" } },
    { id: "7", title: "Inovacao - Tecnologia Avancada", platform: "google", budget: "R$ 20.000", status: "ACTIVE", week: "SEM 09", theme: "Inovacao", hook: "Tecnologia Avancada", pillar: "Inovacao", progress: { current: 5, total: 5 }, metrics: { impressions: "890K", cpl: "R$ 69,84" } },
  ],
  monitor: [
    { id: "8", title: "Sustentabilidade - Verde e Limpo", platform: "meta", budget: "R$ 30.000", status: "ACTIVE", week: "SEM 08", theme: "Sustentabilidade", hook: "Verde e Limpo", pillar: "Sustentabilidade", progress: { current: 5, total: 5 }, metrics: { impressions: "1.5M", cpl: "R$ 65,00" } },
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
export const initialToggles: SettingToggle[] = [
  { id: "criacao-automatica", label: "Criacao automatica", description: "Gerar campanhas automaticamente baseado em briefing", enabled: true },
  { id: "ativacao-automatica", label: "Ativacao automatica", description: "Publicar campanhas assim que aprovadas", enabled: false },
  { id: "escalar-orcamento", label: "Escalar orcamento", description: "Aumentar investimento em campanhas performaticas", enabled: true },
  { id: "duplicacao-permitida", label: "Duplicacao permitida", description: "Permitir duplicacao de campanhas bem-sucedidas", enabled: true },
  { id: "editar-existentes", label: "Editar existentes", description: "Modificar campanhas ja publicadas", enabled: false },
  { id: "quarentena-ativa", label: "Quarentena ativa", description: "Sistema de quarentena para campanhas ruins", enabled: true },
]

export const initialLimits: OperationalLimit[] = [
  { id: "orcamento-max-campanha", label: "Orcamento max/campanha", value: 25000, unit: "R$", max: 50000 },
  { id: "max-campanhas-meta-semana", label: "Max campanhas Meta/semana", value: 5, unit: "", max: 20 },
  { id: "max-campanhas-google-semana", label: "Max campanhas Google/semana", value: 3, unit: "", max: 15 },
  { id: "cooldown-campanhas", label: "Cooldown entre campanhas (h)", value: 24, unit: "h", max: 168 },
  { id: "gasto-diario-total-max", label: "Gasto diario total max", value: 10000, unit: "R$", max: 50000 },
  { id: "semanas-restantes-quarentena", label: "Semanas restantes quarentena", value: 2, unit: "", max: 4 },
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
