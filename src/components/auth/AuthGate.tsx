"use client";

import type { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import {
  getSupabaseBrowserClient,
  isSupabaseConfigured
} from "@/lib/supabase/client";

type AuthGateProps = {
  children: React.ReactNode;
};

export function AuthGate({ children }: AuthGateProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const supabase = getSupabaseBrowserClient();

  useEffect(() => {
    if (!supabase) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (isMounted) {
        setSession(data.session);
        setIsLoading(false);
      }
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  async function submitLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!supabase) {
      setErrorMessage("Supabase is nog niet ingesteld.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password
    });

    if (error) {
      setErrorMessage("Aanmelden mislukt. Controleer e-mail en wachtwoord.");
    }

    setIsSubmitting(false);
  }

  async function signOut() {
    if (!supabase) {
      return;
    }

    await supabase.auth.signOut();
  }

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-perceel-soft px-6">
        <p className="text-sm font-semibold text-slate-600">
          Planner laden...
        </p>
      </main>
    );
  }

  if (!isSupabaseConfigured() || !supabase) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-perceel-soft px-6">
        <section className="w-full max-w-md rounded-md border border-perceel-line bg-white p-5">
          <p className="text-xs font-semibold uppercase text-perceel-green">
            Perceel
          </p>
          <h1 className="mt-1 text-xl font-bold text-perceel-dark">
            Login niet beschikbaar
          </h1>
          <p className="mt-2 text-sm leading-5 text-slate-600">
            Supabase environment variables ontbreken. Controleer de Vercel
            configuratie.
          </p>
        </section>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-perceel-soft px-6">
        <section className="w-full max-w-md rounded-md border border-perceel-line bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase text-perceel-green">
            Perceel
          </p>
          <h1 className="mt-1 text-xl font-bold text-perceel-dark">
            Aanmelden
          </h1>
          <p className="mt-2 text-sm leading-5 text-slate-600">
            Meld je aan om de werkplanning te openen.
          </p>

          <form className="mt-4 space-y-3" onSubmit={submitLogin}>
            <label className="block text-xs font-semibold text-slate-600">
              E-mail
              <input
                autoComplete="email"
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none focus:border-perceel-green focus:ring-2 focus:ring-emerald-100"
                onChange={(event) => setEmail(event.target.value)}
                required
                type="email"
                value={email}
              />
            </label>

            <label className="block text-xs font-semibold text-slate-600">
              Wachtwoord
              <input
                autoComplete="current-password"
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none focus:border-perceel-green focus:ring-2 focus:ring-emerald-100"
                onChange={(event) => setPassword(event.target.value)}
                required
                type="password"
                value={password}
              />
            </label>

            {errorMessage ? (
              <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">
                {errorMessage}
              </p>
            ) : null}

            <button
              className="w-full rounded-md bg-perceel-green px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-slate-300"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "Aanmelden..." : "Aanmelden"}
            </button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <>
      <div className="fixed right-3 top-3 z-50 flex items-center gap-2 rounded-md border border-perceel-line bg-white/95 px-2 py-1 text-xs shadow-sm">
        <span className="max-w-[180px] truncate font-semibold text-slate-600">
          {session.user.email}
        </span>
        <button
          className="rounded border border-slate-200 bg-slate-50 px-2 py-1 font-semibold text-slate-600 hover:bg-white hover:text-perceel-dark"
          onClick={signOut}
          type="button"
        >
          Uitloggen
        </button>
      </div>
      {children}
    </>
  );
}
