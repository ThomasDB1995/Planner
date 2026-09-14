import { ClipboardPaste, Copy, Scissors, X } from "lucide-react";
import { formatPlanningDate } from "@/lib/planning/date-format";
import type { usePlanningClipboard } from "@/components/planning/usePlanningClipboard";
import type { PlanningItem } from "@/types/planning";

type Props = {
  controller: ReturnType<typeof usePlanningClipboard>;
  selectedItem?: PlanningItem;
  destinationLabel?: string;
};

export function PlanningClipboardToolbar({ controller, selectedItem, destinationLabel }: Props) {
  const { clipboard, busy, message, error } = controller;
  const button = "inline-flex min-h-10 items-center justify-center gap-1.5 rounded border border-slate-200 bg-white px-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40";
  return (
    <div className="mb-2 border-y border-perceel-line bg-white px-2 py-2" aria-label="Taakacties" aria-busy={busy}>
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex gap-1.5">
          <button className={button} type="button" title="Knippen (Ctrl+X / Cmd+X)" disabled={!selectedItem || busy} onClick={() => void controller.start("cut")}><Scissors size={16} aria-hidden="true" />Knippen</button>
          <button className={button} type="button" title="Kopiëren (Ctrl+C / Cmd+C)" disabled={!selectedItem || busy} onClick={() => void controller.start("copy")}><Copy size={16} aria-hidden="true" />Kopiëren</button>
        </div>
        {clipboard ? (
          <>
            <span className="min-w-0 basis-full break-words text-xs text-slate-600 sm:basis-auto sm:flex-1">
              <strong>{clipboard.mode === "cut" ? "Geknipt" : "Gekopieerd"}:</strong> {clipboard.item.taskName}
              <span className="ml-1 text-slate-500">({formatPlanningDate(clipboard.item.date)})</span>
            </span>
            <button className={`${button} !border-perceel-green !bg-perceel-green !text-white`} type="button" title="Hier plakken (Ctrl+V / Cmd+V)" disabled={!controller.canPaste || busy} onClick={() => void controller.paste()}><ClipboardPaste size={16} aria-hidden="true" />{busy ? "Opslaan..." : "Hier plakken"}</button>
            <button className={button} type="button" title="Annuleren (Esc)" disabled={busy} onClick={controller.cancel}><X size={16} aria-hidden="true" />Annuleren</button>
          </>
        ) : <span className="min-w-0 truncate text-xs text-slate-500">{selectedItem?.taskName ?? "Geen taak geselecteerd"}</span>}
      </div>
      {clipboard && destinationLabel ? <p className="mt-1 text-xs text-slate-600">Naar: {destinationLabel}</p> : null}
      {message ? <p role="status" className="mt-1 text-xs text-perceel-green">{message}</p> : null}
      {error ? <p role="alert" className="mt-1 text-xs text-red-700">{error}</p> : null}
    </div>
  );
}
