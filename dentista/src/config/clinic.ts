/**
 * DADOS DA CLÍNICA — fonte única de verdade.
 *
 * Trocar de clínica = editar só este arquivo (e as fotos em `images.ts`).
 * Nenhum componente tem nome, telefone, endereço ou texto da clínica escrito direto.
 *
 * Tudo o que está entre colchetes, como `[TELEFONE]`, é um MARCADOR PENDENTE:
 * aparece destacado no site até ser substituído pelo dado real.
 * Nunca preencha com dados inventados (profissionais, CRO, depoimentos, notas,
 * número de pacientes, anos de experiência, convênios ou resultados).
 */

export type IconName =
  | 'clock'
  | 'map-pin'
  | 'shield-check'
  | 'heart-handshake'
  | 'calendar-check'
  | 'accessibility'
  | 'car'
  | 'scan'
  | 'baby'
  | 'sparkles'
  | 'stethoscope'
  | 'smile';

export type Treatment = {
  id: string;
  name: string;
  /** Usada para agrupar quando houver mais de 6 tratamentos (ex.: Prevenção, Estética, Reabilitação, Ortodontia) */
  category: string;
  /** 1 a 2 frases no card */
  summary: string;
  /** Parágrafos do painel "Saiba mais" */
  details: string[];
};

export type Professional = {
  name: string;
  cro: string;
  specialty: string;
  bio: string;
  /** Chave em `images.team` ou null para mostrar o espaço da foto pendente */
  photo: string | null;
};

export type Testimonial = {
  text: string;
  author: string;
  /** Ex.: "Google", "Instagram" — obrigatório */
  source: string;
};

export type OpeningHours = {
  /** Texto exibido, ex.: "Segunda a sexta" */
  label: string;
  /** Texto exibido, ex.: "8h às 18h" */
  time: string;
  /** Para o Google (JSON-LD). Dias em inglês: Monday, Tuesday... Deixe [] enquanto pendente. */
  days: string[];
  /** "08:00" — formato 24h, para o JSON-LD */
  opens: string;
  closes: string;
};

export const clinic = {
  name: '[NOME DA CLÍNICA]',
  /** Ex.: "Odontologia" — usado no título da página e no rodapé */
  specialty: 'Clínica odontológica',
  city: '[CIDADE]',
  neighborhood: '[BAIRRO]',
  state: '[UF]',

  responsible: {
    name: '[NOME DO RESPONSÁVEL TÉCNICO]',
    cro: 'CRO-[UF] [NÚMERO]',
  },

  /** Como aparece no site, ex.: "(11) 3333-4444" */
  phone: '[TELEFONE]',
  /** Só números, com DDI 55, ex.: "5511999998888" */
  whatsapp: '[WHATSAPP]',
  whatsappMessage: 'Olá, vim pelo site e gostaria de agendar uma consulta.',

  address: {
    street: '[RUA E NÚMERO]',
    complement: '', // opcional, ex.: "Sala 12"
    neighborhood: '[BAIRRO]',
    city: '[CIDADE]',
    state: '[UF]',
    zip: '[CEP]',
  },
  mapsUrl: '[LINK DO GOOGLE MAPS]',

  hours: [
    {
      label: '[DIAS DE ATENDIMENTO]',
      time: '[HORÁRIO]',
      days: [],
      opens: '',
      closes: '',
    },
  ] as OpeningHours[],

  /** Deixe o array vazio para esconder. Links com marcador aparecem como texto, sem link. */
  social: [{ label: 'Instagram', handle: '[@PERFIL]', url: '[LINK DO INSTAGRAM]' }],

  /** Convênios aceitos ou "Atendimento particular" */
  insurance: '[CONVÊNIOS ACEITOS OU "PARTICULAR"]',

  /** Caminho de um arquivo em /public (ex.: "/logo.svg") ou null para usar o nome em texto */
  logo: null as string | null,

  /** Público principal e tom — orientam os textos; não aparecem no site */
  audience: '[PÚBLICO PRINCIPAL]',
  tone: 'acolhedor e sofisticado',

  /** Endereço final do site, sem barra no fim (ex.: "https://www.clinica.com.br"). Usado no canonical e no Open Graph. */
  siteUrl: '',

  /** E-mail de contato para assuntos de privacidade (LGPD) */
  privacyEmail: '[E-MAIL PARA PRIVACIDADE]',

  /* --------------------------------------------------------------------------
   * TRATAMENTOS — apenas os que a clínica realmente oferece.
   * Mais de 6 itens: o site agrupa automaticamente por `category`.
   * ------------------------------------------------------------------------ */
  treatments: [
    {
      id: 'tratamento-1',
      name: '[TRATAMENTO 1]',
      category: '[CATEGORIA]',
      summary: '[DESCRIÇÃO DE 1 A 2 FRASES]',
      details: ['[O QUE É, PARA QUEM É INDICADO E COMO É FEITO]'],
    },
    {
      id: 'tratamento-2',
      name: '[TRATAMENTO 2]',
      category: '[CATEGORIA]',
      summary: '[DESCRIÇÃO DE 1 A 2 FRASES]',
      details: ['[O QUE É, PARA QUEM É INDICADO E COMO É FEITO]'],
    },
    {
      id: 'tratamento-3',
      name: '[TRATAMENTO 3]',
      category: '[CATEGORIA]',
      summary: '[DESCRIÇÃO DE 1 A 2 FRASES]',
      details: ['[O QUE É, PARA QUEM É INDICADO E COMO É FEITO]'],
    },
    {
      id: 'tratamento-4',
      name: '[TRATAMENTO 4]',
      category: '[CATEGORIA]',
      summary: '[DESCRIÇÃO DE 1 A 2 FRASES]',
      details: ['[O QUE É, PARA QUEM É INDICADO E COMO É FEITO]'],
    },
    {
      id: 'tratamento-5',
      name: '[TRATAMENTO 5]',
      category: '[CATEGORIA]',
      summary: '[DESCRIÇÃO DE 1 A 2 FRASES]',
      details: ['[O QUE É, PARA QUEM É INDICADO E COMO É FEITO]'],
    },
    {
      id: 'tratamento-6',
      name: '[TRATAMENTO 6]',
      category: '[CATEGORIA]',
      summary: '[DESCRIÇÃO DE 1 A 2 FRASES]',
      details: ['[O QUE É, PARA QUEM É INDICADO E COMO É FEITO]'],
    },
  ] as Treatment[],

  /* Diferenciais REAIS (3 a 4). Ícones disponíveis: veja IconName acima. */
  differentials: [
    { icon: 'calendar-check', title: '[DIFERENCIAL 1]', text: '[FRASE CURTA]' },
    { icon: 'map-pin', title: '[DIFERENCIAL 2]', text: '[FRASE CURTA]' },
    { icon: 'heart-handshake', title: '[DIFERENCIAL 3]', text: '[FRASE CURTA]' },
    { icon: 'shield-check', title: '[DIFERENCIAL 4]', text: '[FRASE CURTA]' },
  ] as { icon: IconName; title: string; text: string }[],

  /* Equipe — só profissionais reais, com CRO. */
  team: [
    {
      name: '[NOME DO PROFISSIONAL]',
      cro: 'CRO-[UF] [NÚMERO]',
      specialty: '[ESPECIALIDADE]',
      bio: '[MINI-BIO DE 2 LINHAS]',
      photo: null,
    },
  ] as Professional[],

  /* Depoimentos AUTORIZADOS. Vazio = a seção não aparece (nunca criar texto falso). */
  testimonials: [] as Testimonial[],

  /* Antes e depois: só com fotos autorizadas pelos pacientes. false = a seção vira galeria. */
  hasBeforeAfter: false,
  beforeAfter: [] as { treatment: string; before: string; after: string }[],

  /* --------------------------------------------------------------------------
   * TEXTOS DA PÁGINA
   * ------------------------------------------------------------------------ */
  content: {
    heroEyebrow: '[BAIRRO] · [CIDADE]',
    /** Curto e específico: o que e onde. Sem clichês. */
    heroTitle: 'Odontologia no coração de [BAIRRO]',
    heroSubtitle: '[SUBTÍTULO DE UMA LINHA COM OS PRINCIPAIS TRATAMENTOS]',

    aboutTitle: 'Um consultório para ser atendido sem pressa',
    aboutParagraphs: [
      'A [NOME DA CLÍNICA] fica em [BAIRRO], [CIDADE]. [EM UMA FRASE: QUEM A CLÍNICA ATENDE E O QUE FAZ.]',
      '[COMO É O ATENDIMENTO: A PRIMEIRA CONVERSA, A EXPLICAÇÃO DO PLANO DE TRATAMENTO, O ACOMPANHAMENTO.]',
      '[A ESTRUTURA DO ESPAÇO, SE FOR RELEVANTE PARA O PACIENTE.]',
    ],

    treatmentsTitle: 'Tratamentos',
    treatmentsIntro: 'O que fazemos no consultório. Toque em um tratamento para ver os detalhes.',

    differentialsTitle: 'Por que agendar aqui',

    teamTitle: 'Quem vai atender você',

    galleryTitle: 'Conheça o espaço',

    faqTitle: 'Perguntas frequentes',
    faq: [
      {
        q: 'Como funciona a primeira consulta?',
        a: '[RESPOSTA A CONFIRMAR PELA CLÍNICA: duração, o que é avaliado, se há exames.]',
      },
      {
        q: 'Vocês atendem convênio?',
        a: '[RESPOSTA A CONFIRMAR PELA CLÍNICA: lista de convênios ou "atendimento particular".]',
      },
      {
        q: 'Quais são as formas de pagamento?',
        a: '[RESPOSTA A CONFIRMAR PELA CLÍNICA: formas e condições de pagamento.]',
      },
      {
        q: 'Vocês atendem urgências?',
        a: '[RESPOSTA A CONFIRMAR PELA CLÍNICA: como proceder em caso de dor ou urgência.]',
      },
      {
        q: 'Tem estacionamento?',
        a: '[RESPOSTA A CONFIRMAR PELA CLÍNICA: estacionamento próprio, conveniado ou na rua.]',
      },
      {
        q: 'Como faço para agendar?',
        a: 'Pelo WhatsApp, por telefone ou pelo formulário no fim desta página. A equipe responde para confirmar dia e horário.',
      },
    ],

    contactTitle: 'Agende sua consulta',
    contactIntro: 'Fale com a equipe pelo WhatsApp ou deixe seus dados que entramos em contato.',

    /** Opções do formulário */
    formTimes: ['Manhã', 'Tarde', 'Qualquer horário'],
    formReasons: [
      'Avaliação / primeira consulta',
      'Dor ou urgência',
      'Limpeza e prevenção',
      'Estética',
      'Continuar um tratamento',
      'Outro assunto',
    ],
  },
};

export type Clinic = typeof clinic;
