import { clinic } from '../config/clinic';
import { Ph } from './Ph';

/** Logo em arquivo (clinic.logo) ou nome da clínica em texto */
export function Logo({ light = false }: { light?: boolean }) {
  if (clinic.logo) {
    return <img src={clinic.logo} alt={clinic.name} width={160} height={40} className="h-9 w-auto" />;
  }
  return (
    <span
      className={`font-serif text-[1.45rem] font-medium leading-none tracking-tight md:text-[1.6rem] ${
        light ? 'text-bg' : 'text-green'
      }`}
    >
      <Ph>{clinic.name}</Ph>
    </span>
  );
}
