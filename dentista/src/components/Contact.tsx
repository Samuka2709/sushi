import { useId, useState, type FormEvent } from 'react';
import { CheckCircle2, Clock, MapPin, MessageCircle, Phone } from 'lucide-react';
import { clinic } from '../config/clinic';
import { fullAddress, mapsEmbedUrl, mapsUrl, phoneUrl, whatsappUrl } from '../lib/clinic-utils';
import { Ph } from './Ph';

function MapEmbed() {
  // Mapa só carrega quando a pessoa pede: mais leve e sem enviar dados ao Google antes disso
  const [load, setLoad] = useState(false);
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] bg-green-deep md:aspect-[16/10]">
      {load ? (
        <iframe
          title={`Mapa: ${clinic.name}`}
          src={mapsEmbedUrl()}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
          <MapPin aria-hidden size={30} strokeWidth={1.5} className="text-sand" />
          <button type="button" onClick={() => setLoad(true)} className="btn btn-outline-light">
            Carregar mapa
          </button>
          <p className="max-w-[30ch] text-sm text-sand">Ao carregar, o Google Maps recebe dados de navegação.</p>
        </div>
      )}
    </div>
  );
}

function ContactForm() {
  const id = useId();
  const [sent, setSent] = useState(false);
  const c = clinic.content;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const msg = [
      clinic.whatsappMessage,
      '',
      `Nome: ${data.get('nome')}`,
      `Telefone: ${data.get('telefone')}`,
      `Melhor horário: ${data.get('horario')}`,
      `Motivo: ${data.get('motivo')}`,
    ].join('\n');
    // Sem backend: monta a mensagem e abre o WhatsApp com os dados preenchidos
    window.open(whatsappUrl(msg), '_blank', 'noopener');
    setSent(true);
  };

  if (sent) {
    return (
      <div role="status" className="rounded-[14px] border border-bg/25 p-7 md:p-9">
        <CheckCircle2 aria-hidden size={30} strokeWidth={1.5} className="text-sand" />
        <h3 className="mt-4 text-[2rem] text-bg">Quase lá</h3>
        <p className="mt-3 text-sand">
          Abrimos o WhatsApp com seus dados preenchidos. Envie a mensagem para a equipe confirmar o dia e o horário da
          consulta.
        </p>
        <p className="mt-3 text-sand">
          Se o WhatsApp não abriu,{' '}
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener"
            className="font-semibold text-bg underline underline-offset-4"
          >
            toque aqui
          </a>{' '}
          ou ligue para{' '}
          <a href={phoneUrl()} className="font-semibold text-bg underline underline-offset-4">
            <Ph>{clinic.phone}</Ph>
          </a>
          .
        </p>
        <button type="button" onClick={() => setSent(false)} className="btn btn-outline-light mt-6">
          Preencher de novo
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-5 rounded-[14px] border border-bg/25 p-7 md:p-9"
      aria-describedby={`${id}-lgpd`}
    >
      <h3 className="text-[2rem] text-bg">Prefere que a gente chame?</h3>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor={`${id}-nome`} className="text-sm font-semibold">
            Nome
          </label>
          <input id={`${id}-nome`} name="nome" required autoComplete="name" className="field" />
        </div>
        <div className="grid gap-2">
          <label htmlFor={`${id}-tel`} className="text-sm font-semibold">
            Telefone / WhatsApp
          </label>
          <input
            id={`${id}-tel`}
            name="telefone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            pattern="[0-9()\s+\-]{8,}"
            placeholder="(00) 00000-0000"
            className="field placeholder:text-sand/70"
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor={`${id}-hora`} className="text-sm font-semibold">
            Melhor horário
          </label>
          <select id={`${id}-hora`} name="horario" required className="field" defaultValue="">
            <option value="" disabled>
              Selecione
            </option>
            {c.formTimes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="grid gap-2">
          <label htmlFor={`${id}-motivo`} className="text-sm font-semibold">
            Motivo
          </label>
          <select id={`${id}-motivo`} name="motivo" required className="field" defaultValue="">
            <option value="" disabled>
              Selecione
            </option>
            {c.formReasons.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>
      </div>
      <p id={`${id}-lgpd`} className="text-sm text-sand">
        Usamos seus dados só para entrar em contato sobre o agendamento. Eles seguem por WhatsApp e não são guardados
        neste site.{' '}
        <a href="/privacidade/" className="font-semibold text-bg underline underline-offset-4">
          Política de privacidade
        </a>
        .
      </p>
      <button type="submit" className="btn btn-light justify-self-start">
        <MessageCircle aria-hidden size={19} />
        Enviar pelo WhatsApp
      </button>
    </form>
  );
}

export function Contact() {
  const c = clinic.content;
  return (
    <section id="contato" aria-labelledby="contact-title" className="on-dark bg-green py-20 text-bg md:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <p className="eyebrow" data-reveal>
            Agendamento
          </p>
          <h2 id="contact-title" className="h2 mt-4 text-bg" data-reveal>
            {c.contactTitle}
          </h2>
          <p className="mt-5 max-w-[40ch] text-sand" data-reveal>
            {c.contactIntro}
          </p>

          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener"
            className="btn btn-light mt-9 w-full min-h-14 text-[1.05rem] sm:w-auto"
            data-reveal
          >
            <MessageCircle aria-hidden size={21} />
            Agendar pelo WhatsApp
          </a>

          <ul className="mt-10 grid gap-6 text-[1rem]" data-reveal>
            <li className="flex gap-4">
              <Phone aria-hidden size={20} strokeWidth={1.6} className="mt-1 shrink-0 text-sand" />
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-sand">Telefone</p>
                <a
                  href={phoneUrl()}
                  className="mt-1 inline-flex min-h-11 items-center text-[1.15rem] font-semibold underline decoration-bg/30 underline-offset-4 hover:decoration-bg"
                >
                  <Ph>{clinic.phone}</Ph>
                </a>
              </div>
            </li>
            <li className="flex gap-4">
              <MapPin aria-hidden size={20} strokeWidth={1.6} className="mt-1 shrink-0 text-sand" />
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-sand">Endereço</p>
                <address className="mt-1 not-italic">
                  <Ph>{fullAddress()}</Ph>
                </address>
                <a
                  href={mapsUrl()}
                  target="_blank"
                  rel="noopener"
                  className="mt-1 inline-flex min-h-11 items-center font-semibold underline decoration-bg/30 underline-offset-4 hover:decoration-bg"
                >
                  Abrir no Google Maps
                </a>
              </div>
            </li>
            <li className="flex gap-4">
              <Clock aria-hidden size={20} strokeWidth={1.6} className="mt-1 shrink-0 text-sand" />
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-sand">Horários</p>
                <dl className="mt-1 grid gap-1">
                  {clinic.hours.map((h, i) => (
                    <div key={i} className="flex flex-wrap gap-x-3">
                      <dt>
                        <Ph>{h.label}</Ph>
                      </dt>
                      <dd className="text-sand">
                        <Ph>{h.time}</Ph>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </li>
          </ul>
        </div>

        <div className="grid gap-8 lg:col-span-6 lg:col-start-7">
          <ContactForm />
          <MapEmbed />
        </div>
      </div>
    </section>
  );
}
