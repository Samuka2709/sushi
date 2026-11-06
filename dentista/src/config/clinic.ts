/**
 * DADOS DA CLÍNICA — fonte única de verdade.
 *
 * Trocar de clínica = editar só este arquivo (e as fotos em `images.ts`).
 * Nenhum componente tem nome, telefone, endereço ou texto da clínica escrito direto.
 *
 * >>> DEMONSTRAÇÃO: os valores abaixo são FICTÍCIOS, para apresentar ao cliente.
 *     Troque tudo pelos dados reais antes de publicar (veja `demo: true`). <<<
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
  /** true = mostra o aviso "Site de demonstração" no rodapé. Troque para false ao publicar. */
  demo: true,

  name: 'Clínica Lumière Odontologia', // DEMO
  specialty: 'Clínica odontológica',
  city: 'São Paulo', // DEMO
  neighborhood: 'Vila Mariana', // DEMO
  state: 'SP', // DEMO

  responsible: {
    name: 'Dra. Helena Duarte', // DEMO — fictícia
    cro: 'CRO-SP 00.000', // DEMO — fictício
  },

  phone: '(11) 3000-0000', // DEMO
  /** Só números, com DDI 55. Vazio = abre o WhatsApp para escolher o contato. */
  whatsapp: '', // DEMO
  whatsappMessage: 'Olá, vim pelo site e gostaria de agendar uma consulta.',

  address: {
    street: 'Rua das Acácias, 120', // DEMO — endereço fictício
    complement: 'Sala 4',
    neighborhood: 'Vila Mariana',
    city: 'São Paulo',
    state: 'SP',
    zip: '04000-000',
  },
  mapsUrl: '', // DEMO — vazio = busca pelo endereço

  hours: [
    {
      label: 'Segunda a sexta',
      time: '8h às 19h',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '19:00',
    },
    { label: 'Sábado', time: '8h às 12h', days: ['Saturday'], opens: '08:00', closes: '12:00' },
  ] as OpeningHours[],

  social: [{ label: 'Instagram', handle: '@lumiere.odonto', url: 'https://www.instagram.com/' }], // DEMO

  insurance: 'Atendimento particular, com reembolso para os principais planos', // DEMO

  logo: null as string | null,
  audience: 'Adultos e famílias',
  tone: 'acolhedor e sofisticado',
  siteUrl: '',
  privacyEmail: 'privacidade@exemplo.com.br', // DEMO

  treatments: [
    {
      id: 'clinico-geral',
      name: 'Clínico geral',
      category: 'Prevenção',
      summary: 'Consulta de avaliação, limpeza, restaurações e acompanhamento da saúde da boca.',
      details: [
        'A consulta começa por uma conversa sobre seu histórico e suas queixas, seguida de exame clínico completo.',
        'Inclui limpeza profissional, aplicação de flúor quando indicada e restaurações em resina da cor do dente.',
      ],
    },
    {
      id: 'implantes',
      name: 'Implantes dentários',
      category: 'Reabilitação',
      summary: 'Reposição de dentes perdidos com implantes, planejada a partir de exames de imagem.',
      details: [
        'O planejamento usa tomografia para avaliar o osso e definir a posição do implante.',
        'O tempo de tratamento varia conforme cada caso e é explicado na avaliação.',
      ],
    },
    {
      id: 'ortodontia',
      name: 'Ortodontia e alinhadores',
      category: 'Ortodontia',
      summary: 'Aparelho fixo ou alinhadores transparentes para corrigir a posição dos dentes.',
      details: [
        'Depois da documentação ortodôntica, o profissional indica o tipo de aparelho mais adequado.',
        'Atendemos adolescentes e adultos, com consultas de manutenção periódicas.',
      ],
    },
    {
      id: 'clareamento',
      name: 'Clareamento dental',
      category: 'Estética',
      summary: 'Clareamento em consultório ou caseiro supervisionado, após avaliação.',
      details: [
        'Antes de clarear, verificamos se há cáries, restaurações ou sensibilidade que precisem de cuidado.',
        'O resultado varia de pessoa para pessoa.',
      ],
    },
    {
      id: 'facetas',
      name: 'Facetas e lentes de contato',
      category: 'Estética',
      summary: 'Lâminas de porcelana ou resina para ajustar forma e cor dos dentes.',
      details: [
        'O planejamento inclui fotos e um ensaio do sorriso antes de qualquer desgaste.',
        'Nem todo caso é indicado para facetas: isso é definido na avaliação.',
      ],
    },
    {
      id: 'endodontia',
      name: 'Tratamento de canal',
      category: 'Reabilitação',
      summary: 'Tratamento da polpa do dente para aliviar a dor e preservar o dente natural.',
      details: [
        'Feito com anestesia local e, sempre que possível, em uma ou duas sessões.',
        'Em caso de dor, entre em contato pelo WhatsApp para verificarmos um horário.',
      ],
    },
  ] as Treatment[],

  differentials: [
    { icon: 'calendar-check', title: 'Horário pontual', text: 'Agenda organizada para você não esperar na recepção.' },
    { icon: 'scan', title: 'Exames no consultório', text: 'Radiografia digital feita na própria clínica.' },
    {
      icon: 'heart-handshake',
      title: 'Plano explicado',
      text: 'Você recebe o plano de tratamento por escrito, com as etapas.',
    },
    { icon: 'map-pin', title: 'Perto do metrô', text: 'A poucos minutos a pé da estação Vila Mariana.' },
  ] as { icon: IconName; title: string; text: string }[],

  team: [
    {
      name: 'Dra. Helena Duarte', // DEMO — fictícia
      cro: 'CRO-SP 00.000',
      specialty: 'Implantodontia',
      bio: 'Responsável técnica da clínica. Atua em reabilitação oral e implantes.',
      photo: 'helena',
    },
    {
      name: 'Dr. Rafael Moreira', // DEMO — fictício
      cro: 'CRO-SP 00.001',
      specialty: 'Ortodontia',
      bio: 'Atende adolescentes e adultos com aparelhos fixos e alinhadores.',
      photo: 'rafael',
    },
    {
      name: 'Dra. Camila Nogueira', // DEMO — fictícia
      cro: 'CRO-SP 00.002',
      specialty: 'Dentística e estética',
      bio: 'Cuida de restaurações, clareamento e facetas.',
      photo: 'camila',
    },
  ] as Professional[],

  /* Depoimentos: só reais e autorizados. Vazio = a seção não aparece. */
  testimonials: [] as Testimonial[],

  hasBeforeAfter: false,
  beforeAfter: [] as { treatment: string; before: string; after: string }[],

  content: {
    heroEyebrow: 'Vila Mariana · São Paulo',
    heroTitle: 'Odontologia no coração da Vila Mariana',
    heroSubtitle: 'Clínico geral, implantes, ortodontia e estética, com consultas sem pressa.',

    aboutTitle: 'Um consultório para ser atendido sem pressa',
    aboutParagraphs: [
      'A Clínica Lumière fica na Vila Mariana, em São Paulo. Atendemos adultos e famílias, da prevenção à reabilitação.',
      'A primeira consulta começa por uma conversa. Depois do exame, explicamos o que encontramos e as opções de tratamento, com as etapas por escrito.',
      'O espaço tem salas com luz natural e radiografia digital no próprio consultório.',
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
        a: 'Dura cerca de 40 minutos. Conversamos sobre seu histórico, fazemos o exame clínico e, se necessário, radiografias. No fim, você recebe o plano de tratamento.',
      },
      {
        q: 'Vocês atendem convênio?',
        a: 'O atendimento é particular. Emitimos a documentação para você pedir reembolso ao seu plano.',
      },
      {
        q: 'Quais são as formas de pagamento?',
        a: 'Pix, cartão de débito e cartão de crédito. As condições são apresentadas junto com o plano de tratamento.',
      },
      {
        q: 'Vocês atendem urgências?',
        a: 'Em caso de dor, fale com a gente pelo WhatsApp. Reservamos horários na agenda para encaixes no mesmo dia, sempre que possível.',
      },
      {
        q: 'Tem estacionamento?',
        a: 'Há estacionamento conveniado na mesma rua. A clínica fica a poucos minutos a pé do metrô.',
      },
      {
        q: 'Como faço para agendar?',
        a: 'Pelo WhatsApp, por telefone ou pelo formulário no fim desta página. A equipe responde para confirmar dia e horário.',
      },
    ],

    contactTitle: 'Agende sua consulta',
    contactIntro: 'Fale com a equipe pelo WhatsApp ou deixe seus dados que entramos em contato.',
    formTimes: ['Manhã', 'Tarde', 'Qualquer horário'],
    formReasons: [
      'Avaliação / primeira consulta',
      'Dor ou urgência',
      'Limpeza e prevenção',
      'Implantes',
      'Ortodontia / alinhadores',
      'Estética (clareamento, facetas)',
      'Outro assunto',
    ],
  },
};

export type Clinic = typeof clinic;
