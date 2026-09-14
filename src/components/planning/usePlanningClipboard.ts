"use client";

import { useEffect, useRef, useState } from "react";
import { copyPlanningItem, isSamePlanningCell, type PlanningClipboard, type PlanningDestination } from "@/lib/planning/clipboard";
import { createPlannerPlanningItem, fetchPlannerPlanningItem, movePlannerPlanningItem } from "@/lib/supabase/planning-items";
import type { PlannerAuditUser } from "@/lib/supabase/audit";
import type { PlanningItem } from "@/types/planning";

type Options = {
  enabled: boolean;
  ready: boolean;
  user?: PlannerAuditUser;
  selectedItem?: PlanningItem;
  destination: PlanningDestination | null;
  flushEdits: () => Promise<boolean>;
  onSaved: (item: PlanningItem) => void;
  onStarted: () => void;
};

export function usePlanningClipboard(options: Options) {
  const [clipboard, setClipboard] = useState<PlanningClipboard | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const busyRef = useRef(false);
  const enabledRef = useRef(options.enabled);
  enabledRef.current = options.enabled;
  const copyAttemptRef = useRef<{ source: PlanningClipboard; destination: PlanningDestination; id: string } | null>(null);
  const sessionRef = useRef(options.user?.id);
  sessionRef.current = options.user?.id;

  useEffect(() => {
    copyAttemptRef.current = null;
    setClipboard(null);
    setMessage("");
    setError("");
  }, [options.enabled, options.user?.id]);

  useEffect(() => {
    if (!message) return;
    const timeout = setTimeout(() => setMessage(""), 2500);
    return () => clearTimeout(timeout);
  }, [message]);

  const canPaste = Boolean(options.enabled && options.ready && options.user && clipboard && options.destination &&
    !(clipboard.mode === "cut" && isSamePlanningCell(clipboard.item, options.destination)));

  async function start(mode: PlanningClipboard["mode"]) {
    if (!options.enabled || !options.selectedItem || !options.user || busyRef.current) return;
    const item = options.selectedItem;
    const userId = options.user.id;
    busyRef.current = true;
    setBusy(true);
    setError("");
    setMessage("");
    try {
      if (!await options.flushEdits()) throw new Error("pending edits");
      if (sessionRef.current !== userId || !enabledRef.current) return;
      copyAttemptRef.current = null;
      setClipboard({ mode, item: { ...item, resourceIds: item.resourceIds?.slice() } });
      options.onStarted();
      setMessage(mode === "cut" ? "Taak geknipt." : "Taak gekopieerd.");
    } catch {
      setError("Laatste wijziging niet opgeslagen. Probeer opnieuw voordat je knipt of kopieert.");
    } finally {
      busyRef.current = false;
      setBusy(false);
    }
  }

  async function paste() {
    if (!canPaste || !clipboard || !options.destination || !options.user || busyRef.current) return;
    const source = clipboard;
    const destination = { ...options.destination };
    const user = options.user;
    busyRef.current = true;
    setBusy(true);
    setError("");
    setMessage("");
    try {
      if (!await options.flushEdits()) throw new Error("pending edits");
      if (sessionRef.current !== user.id) return;
      let saved: PlanningItem;
      if (source.mode === "cut") {
        saved = await movePlannerPlanningItem(source.item.id, destination, user);
      } else {
        // Reuse the request id after a lost response; retrying must not create another copy.
        let attempt = copyAttemptRef.current;
        if (!attempt || attempt.source !== source || !isSamePlanningCell(attempt.destination, destination)) {
          attempt = { source, destination, id: `planning-${crypto.randomUUID()}` };
          copyAttemptRef.current = attempt;
        }
        try {
          saved = await createPlannerPlanningItem(copyPlanningItem(source.item, destination, attempt.id), user);
        } catch (error) {
          if ((error as { code?: string })?.code !== "23505") throw error;
          saved = await fetchPlannerPlanningItem(attempt.id);
        }
        copyAttemptRef.current = null;
      }
      if (sessionRef.current !== user.id) return;
      options.onSaved(saved);
      if (source.mode === "cut") setClipboard(null);
      setMessage(source.mode === "cut" ? "Taak verplaatst." : "Taak gekopieerd.");
    } catch {
      setError("Plakken niet bevestigd. Controleer de verbinding en of de oorspronkelijke taak nog bestaat.");
    } finally {
      busyRef.current = false;
      setBusy(false);
    }
  }

  function cancel() {
    if (busyRef.current) return;
    copyAttemptRef.current = null;
    setClipboard(null);
    setMessage("");
    setError("");
  }

  useEffect(() => {
    if (!options.enabled) return;
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target;
      if (event.defaultPrevented || event.repeat || event.isComposing ||
          (target instanceof HTMLElement && (target.isContentEditable || target.closest("input, textarea, select, [role='textbox']")))) return;
      if (event.key === "Escape" && clipboard) { event.preventDefault(); cancel(); return; }
      if (!(event.ctrlKey || event.metaKey) || event.altKey || event.shiftKey) return;
      const key = event.key.toLowerCase();
      if ((key === "x" || key === "c") && options.selectedItem && !window.getSelection()?.toString()) {
        event.preventDefault();
        void start(key === "x" ? "cut" : "copy");
      } else if (key === "v" && clipboard) {
        event.preventDefault();
        void paste();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  return { clipboard, busy, message, error };
}
