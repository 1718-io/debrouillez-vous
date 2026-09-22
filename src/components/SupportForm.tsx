import { useState } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function SupportForm() {
  const [submitted, setSubmitted] = useState(false);
  return submitted ? (
    <div className="flex min-h-72 flex-col items-center justify-center gap-4 rounded-3xl border border-signal/40 bg-signal/10 p-8 text-center">
      <CheckCircle2 className="text-signal" size={44} aria-hidden="true" />
      <h3 className="font-display text-2xl font-bold">Merci, votre voix compte.</h3>
      <p className="text-zinc-400">Votre soutien est bien enregistré. On avance ensemble.</p>
    </div>
  ) : (
    <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }} className="space-y-5" aria-label="Formulaire de soutien">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium">Prénom<input required name="firstName" placeholder="Camille" className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base outline-none transition placeholder:text-zinc-600 focus:border-signal" /></label>
        <label className="space-y-2 text-sm font-medium">Email<input required type="email" name="email" placeholder="vous@exemple.fr" className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base outline-none transition placeholder:text-zinc-600 focus:border-signal" /></label>
      </div>
      <label className="block space-y-2 text-sm font-medium">Département<select required name="department" defaultValue="" className="mt-1 w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base outline-none transition focus:border-signal"><option value="" disabled>Choisir votre département</option><option>75 — Paris</option><option>13 — Bouches-du-Rhône</option><option>33 — Gironde</option><option>69 — Rhône</option><option>59 — Nord</option><option>Autre département</option></select></label>
      <fieldset className="space-y-3"><legend className="text-sm font-medium">Comment souhaitez-vous vous mobiliser ?</legend><label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-signal/60"><input required type="radio" name="presence" value="terrain" className="accent-signal" /> <span>Je serai présent·e sur le terrain</span></label><label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-signal/60"><input type="radio" name="presence" value="distance" className="accent-signal" /> <span>Je soutiens à distance</span></label></fieldset>
      <button type="submit" className="group flex w-full items-center justify-center gap-2 rounded-xl bg-signal px-5 py-4 font-bold text-night transition hover:bg-yellow-300">Je rejoins le mouvement <ArrowUpRight size={18} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></button>
      <p className="text-center text-xs text-zinc-500">Vos données restent confidentielles et ne seront jamais revendues.</p>
    </form>
  );
}
