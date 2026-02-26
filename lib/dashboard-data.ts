// ─── Types ───────────────────────────────────────────────

export interface PipelineStep {
  role: string
  title: string
  done: boolean
  details: string[]
}

export interface Campaign {
  id: string
  title: string
  theme: string
  platform: "meta" | "google" | "meta+google"
  budget: string
  status: string
  dueDate: string
  week: string
  priority: "alta" | "media" | "baixa"
  tags: string[]
  pipeline: PipelineStep[]
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
  { id: "criativo", label: "Criativo", count: 0 },
  { id: "producao", label: "Producao", count: 0 },
  { id: "publicacao", label: "Publicacao", count: 0 },
  { id: "monitor48h", label: "Monitor 48h", count: 0 },
  { id: "decisao", label: "Decisao", count: 0 },
  { id: "concluido", label: "Concluido", count: 0 },
] as const

export type KanbanPhaseId = (typeof kanbanPhases)[number]["id"]

// ─── Move-to options (used in campaign detail modal) ─────
export const moveToOptions: { id: KanbanPhaseId; label: string; color: string }[] = [
  { id: "briefing", label: "Briefing", color: "#868e96" },
  { id: "criativo", label: "Criativo", color: "#4c6ef5" },
  { id: "producao", label: "Producao", color: "#7950f2" },
  { id: "publicacao", label: "Publicacao", color: "#1098ad" },
  { id: "monitor48h", label: "Monitor 48h", color: "#f76707" },
  { id: "decisao", label: "Decisao", color: "#fab005" },
  { id: "concluido", label: "Concluido", color: "#12b886" },
]

// ─── Pipeline role icons/emojis are handled in the component

// ─── Kanban Demo Data ────────────────────────────────────

export const initialCampaigns: Record<KanbanPhaseId, Campaign[]> = {
  briefing: [
    {
      id: "c1",
      title: "Seguranca — Medo de golpe",
      theme: "Seguranca",
      platform: "meta+google",
      budget: "R$ 25/dia",
      status: "PAUSED",
      dueDate: "2026-02-25",
      week: "SEM 13",
      priority: "alta",
      tags: ["Seguranca"],
      pipeline: [
        {
          role: "Estrategista",
          title: "Estrategista",
          done: true,
          details: [
            "Dor: Seguranca | Meta+Google | R$25/dia",
            "Publico: donos veiculos 2018+, interesse em FIPE/Kavak/iCarros",
            "Hipotese: medo de golpe Pix e a dor mais urgente pos-carnaval",
          ],
        },
        {
          role: "Roteirista",
          title: "Roteirista",
          done: true,
          details: [
            "VIDEO PROMPT: Cinematic close-up of hands exchanging car keys, warm showroom lighting, transition to concerned face looking at phone with 'PIX RECEBIDO' notification fading to red warning...",
            "VOICE SCRIPT (14s): 'Vender seu carro por conta propria? Pix falso, cheque devolvido, comprador sumiu. Na Atria, voce entrega o carro e recebe com seguranca. Chame no WhatsApp.'",
            "GOOGLE: 15 headlines + 4 descriptions criados",
          ],
        },
        {
          role: "Produtor",
          title: "Produtor",
          done: true,
          details: [
            "ATRIA_consignacao_seguranca_2026-02-25_v1.mp4",
            "Duracao: 28s | 1080p 9:16 | H.264",
            "Voz: ElevenLabs masculina, tom grave confiavel",
            "Captions: 4 cenas com texto overlay",
          ],
        },
        {
          role: "Publicador",
          title: "Publicador",
          done: false,
          details: [
            "Aguardando aprovacao do criativo pelo Leo",
            "Meta: Leo publica manualmente",
            "Google: pronto para criar PAUSED apos aprovacao",
          ],
        },
        {
          role: "Analista",
          title: "Analista",
          done: false,
          details: ["Aguardando publicacao para iniciar monitoramento"],
        },
      ],
    },
    {
      id: "c2",
      title: "Promocao Seminovos",
      theme: "Vendas",
      platform: "google",
      budget: "R$ 50/dia",
      status: "Ativa",
      dueDate: "2026-03-12",
      week: "SEM 14",
      priority: "media",
      tags: ["Vendas"],
      pipeline: [
        {
          role: "Estrategista",
          title: "Estrategista",
          done: true,
          details: [
            "Dor: Estoque parado de seminovos",
            "Publico: compradores 25-45 anos, renda B/C",
            "Hipotese: preco agressivo + financiamento facil converte",
          ],
        },
        {
          role: "Roteirista",
          title: "Roteirista",
          done: false,
          details: ["Aguardando briefing aprovado"],
        },
        { role: "Produtor", title: "Produtor", done: false, details: [] },
        { role: "Publicador", title: "Publicador", done: false, details: [] },
        { role: "Analista", title: "Analista", done: false, details: [] },
      ],
    },
  ],
  criativo: [
    {
      id: "c3",
      title: "Feirao de Marco",
      theme: "Vendas",
      platform: "meta",
      budget: "R$ 120/dia",
      status: "Em andamento",
      dueDate: "2026-03-08",
      week: "SEM 14",
      priority: "alta",
      tags: ["Vendas", "Feirao"],
      pipeline: [
        {
          role: "Estrategista",
          title: "Estrategista",
          done: true,
          details: [
            "Dor: Estoque alto pos-virada do ano",
            "Publico: compradores primeiro carro e troca",
            "Hipotese: urgencia de prazo limitado funciona",
          ],
        },
        {
          role: "Roteirista",
          title: "Roteirista",
          done: true,
          details: [
            "3 variacoes de copy criadas",
            "Foco em urgencia e condicoes exclusivas",
          ],
        },
        {
          role: "Produtor",
          title: "Produtor",
          done: false,
          details: ["Em producao: 2 videos + 4 estaticos"],
        },
        { role: "Publicador", title: "Publicador", done: false, details: [] },
        { role: "Analista", title: "Analista", done: false, details: [] },
      ],
    },
    {
      id: "c4",
      title: "Test Drive Eletricos",
      theme: "Institucional",
      platform: "google",
      budget: "R$ 80/dia",
      status: "Em andamento",
      dueDate: "2026-03-15",
      week: "SEM 15",
      priority: "media",
      tags: ["Eletricos", "Test Drive"],
      pipeline: [
        {
          role: "Estrategista",
          title: "Estrategista",
          done: true,
          details: [
            "Dor: Desconhecimento sobre EVs",
            "Publico: early adopters, renda A/B",
          ],
        },
        {
          role: "Roteirista",
          title: "Roteirista",
          done: false,
          details: ["Pesquisando referencias de campanhas EV"],
        },
        { role: "Produtor", title: "Produtor", done: false, details: [] },
        { role: "Publicador", title: "Publicador", done: false, details: [] },
        { role: "Analista", title: "Analista", done: false, details: [] },
      ],
    },
  ],
  producao: [
    {
      id: "c5",
      title: "Black Week Pecas",
      theme: "Pos-venda",
      platform: "meta",
      budget: "R$ 30/dia",
      status: "Pendente",
      dueDate: "2026-03-07",
      week: "SEM 13",
      priority: "baixa",
      tags: ["Pecas", "Pos-venda"],
      pipeline: [
        { role: "Estrategista", title: "Estrategista", done: true, details: ["Briefing aprovado"] },
        { role: "Roteirista", title: "Roteirista", done: true, details: ["Scripts finalizados"] },
        { role: "Produtor", title: "Produtor", done: false, details: ["Gerando criativos no Canva"] },
        { role: "Publicador", title: "Publicador", done: false, details: [] },
        { role: "Analista", title: "Analista", done: false, details: [] },
      ],
    },
  ],
  publicacao: [
    {
      id: "c8",
      title: "Campanha Institucional",
      theme: "Institucional",
      platform: "meta",
      budget: "R$ 200/dia",
      status: "Agendada",
      dueDate: "2026-03-06",
      week: "SEM 13",
      priority: "alta",
      tags: ["Institucional", "Brand"],
      pipeline: [
        { role: "Estrategista", title: "Estrategista", done: true, details: ["Briefing pronto"] },
        { role: "Roteirista", title: "Roteirista", done: true, details: ["Copy aprovada"] },
        { role: "Produtor", title: "Produtor", done: true, details: ["4 pecas finalizadas"] },
        {
          role: "Publicador",
          title: "Publicador",
          done: false,
          details: ["Agendando para 06/03 as 10h", "Todas as pecas revisadas e prontas"],
        },
        { role: "Analista", title: "Analista", done: false, details: [] },
      ],
    },
  ],
  monitor48h: [
    {
      id: "c9",
      title: "Leads Financiamento",
      theme: "Financiamento",
      platform: "google",
      budget: "R$ 150/dia",
      status: "Ativa",
      dueDate: "2026-02-28",
      week: "SEM 12",
      priority: "alta",
      tags: ["Financiamento", "Leads"],
      pipeline: [
        { role: "Estrategista", title: "Estrategista", done: true, details: ["Estrategia aprovada"] },
        { role: "Roteirista", title: "Roteirista", done: true, details: ["Headlines e descriptions prontos"] },
        { role: "Produtor", title: "Produtor", done: true, details: ["Criativos entregues"] },
        { role: "Publicador", title: "Publicador", done: true, details: ["Publicado em 25/02"] },
        {
          role: "Analista",
          title: "Analista",
          done: false,
          details: [
            "Monitorando primeiras 48h",
            "CTR: 3.2% (acima da meta)",
            "CPL: R$ 45 (dentro do limite)",
          ],
        },
      ],
    },
    {
      id: "c10",
      title: "Remarketing Visitantes",
      theme: "Remarketing",
      platform: "meta",
      budget: "R$ 60/dia",
      status: "Ativa",
      dueDate: "2026-03-01",
      week: "SEM 12",
      priority: "media",
      tags: ["Remarketing"],
      pipeline: [
        { role: "Estrategista", title: "Estrategista", done: true, details: ["Publico de remarketing definido"] },
        { role: "Roteirista", title: "Roteirista", done: true, details: ["Copy de retargeting pronta"] },
        { role: "Produtor", title: "Produtor", done: true, details: ["Criativos dinamicos configurados"] },
        { role: "Publicador", title: "Publicador", done: true, details: ["Publicado em 26/02"] },
        {
          role: "Analista",
          title: "Analista",
          done: false,
          details: ["CTR: 1.8%", "Frequencia: 2.3x"],
        },
      ],
    },
  ],
  decisao: [
    {
      id: "c6",
      title: "Consorcio Especial",
      theme: "Financeiro",
      platform: "google",
      budget: "R$ 100/dia",
      status: "Em analise",
      dueDate: "2026-03-09",
      week: "SEM 14",
      priority: "alta",
      tags: ["Consorcio", "Financeiro"],
      pipeline: [
        { role: "Estrategista", title: "Estrategista", done: true, details: ["Estrategia definida"] },
        { role: "Roteirista", title: "Roteirista", done: true, details: ["Scripts aprovados"] },
        { role: "Produtor", title: "Produtor", done: true, details: ["Materiais produzidos"] },
        { role: "Publicador", title: "Publicador", done: true, details: ["Publicado em 02/03"] },
        {
          role: "Analista",
          title: "Analista",
          done: true,
          details: [
            "ROAS: 3.8x (abaixo da meta de 4x)",
            "CPL: R$ 92 (acima do limite R$85)",
            "Recomendacao: ajustar publico e reduzir CPC",
          ],
        },
      ],
    },
    {
      id: "c7",
      title: "Revisao Programada",
      theme: "Pos-venda",
      platform: "meta",
      budget: "R$ 40/dia",
      status: "Em analise",
      dueDate: "2026-03-11",
      week: "SEM 14",
      priority: "baixa",
      tags: ["Pos-venda", "Servicos"],
      pipeline: [
        { role: "Estrategista", title: "Estrategista", done: true, details: ["Ok"] },
        { role: "Roteirista", title: "Roteirista", done: true, details: ["Ok"] },
        { role: "Produtor", title: "Produtor", done: true, details: ["Ok"] },
        { role: "Publicador", title: "Publicador", done: true, details: ["Publicado"] },
        {
          role: "Analista",
          title: "Analista",
          done: true,
          details: ["ROAS: 5.2x", "Recomendacao: escalar verba"],
        },
      ],
    },
  ],
  concluido: [
    {
      id: "c11",
      title: "Natal 2025",
      theme: "Sazonal",
      platform: "meta+google",
      budget: "R$ 250/dia",
      status: "Finalizada",
      dueDate: "2025-12-25",
      week: "SEM 52",
      priority: "media",
      tags: ["Sazonal", "Natal"],
      pipeline: [
        { role: "Estrategista", title: "Estrategista", done: true, details: ["Concluido"] },
        { role: "Roteirista", title: "Roteirista", done: true, details: ["Concluido"] },
        { role: "Produtor", title: "Produtor", done: true, details: ["Concluido"] },
        { role: "Publicador", title: "Publicador", done: true, details: ["Concluido"] },
        {
          role: "Analista",
          title: "Analista",
          done: true,
          details: ["ROAS final: 6.1x", "147 leads gerados", "Campanha encerrada com sucesso"],
        },
      ],
    },
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
