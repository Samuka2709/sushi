import { ArrowLeft } from 'lucide-react';
import { clinic } from './config/clinic';
import { Footer } from './components/Footer';
import { Logo } from './components/Logo';
import { Ph } from './components/Ph';

/**
 * Política de privacidade — MODELO. Deve ser revisada pela clínica (e, idealmente,
 * por um profissional jurídico) antes de publicar.
 */
export default function Privacy() {
  return (
    <>
      <header className="border-b border-taupe/30">
        <div className="container-x flex h-20 items-center justify-between">
          <a href="/" className="flex min-h-11 items-center" aria-label={`${clinic.name} — início`}>
            <Logo />
          </a>
          <a href="/" className="link inline-flex min-h-11 items-center gap-2">
            <ArrowLeft aria-hidden size={17} /> Voltar ao site
          </a>
        </div>
      </header>
      <main id="conteudo" className="container-x max-w-3xl py-16 md:py-24">
        <h1 className="text-[clamp(2.4rem,1.8rem+3vw,3.75rem)]">Política de privacidade</h1>
        <p className="mt-4 text-muted">
          <span className="ph">[MODELO — REVISAR COM A CLÍNICA ANTES DE PUBLICAR]</span>
        </p>
        <div className="mt-10 space-y-6 [&_h2]:mt-10 [&_h2]:text-[2rem]">
          <p>
            Esta política explica como <Ph>{clinic.name}</Ph> trata os dados pessoais enviados por este site, de acordo
            com a Lei Geral de Proteção de Dados (Lei 13.709/2018).
          </p>
          <h2>Quais dados coletamos</h2>
          <p>
            Pelo formulário de agendamento: nome, telefone, melhor horário para contato e o motivo geral da consulta.
            Esses dados não ficam guardados neste site: o formulário apenas monta uma mensagem que você mesmo envia pelo
            WhatsApp.
          </p>
          <h2>Para que usamos</h2>
          <p>Exclusivamente para responder ao seu pedido de contato e agendar a consulta.</p>
          <h2>Com quem compartilhamos</h2>
          <p>
            Não vendemos nem compartilhamos seus dados com terceiros para fins de publicidade. A conversa acontece pelo
            WhatsApp, que tem a própria política de privacidade. O mapa só é carregado se você clicar em “Carregar
            mapa”; a partir daí, o Google recebe dados de navegação.
          </p>
          <h2>Cookies e rastreamento</h2>
          <p>Este site não usa cookies de publicidade, pixels de rastreamento nem gravação de sessão.</p>
          <h2>Seus direitos</h2>
          <p>
            Você pode pedir acesso, correção ou exclusão dos seus dados a qualquer momento pelo e-mail{' '}
            <Ph>{clinic.privacyEmail}</Ph> ou pelo telefone <Ph>{clinic.phone}</Ph>.
          </p>
          <h2>Responsável</h2>
          <p>
            <Ph>{clinic.name}</Ph> — Responsável técnico: <Ph>{clinic.responsible.name}</Ph>,{' '}
            <Ph>{clinic.responsible.cro}</Ph>.
          </p>
          <p className="text-muted">
            Última atualização: <span className="ph">[DATA]</span>
          </p>
        </div>
      </main>
      <Footer home={false} />
    </>
  );
}
