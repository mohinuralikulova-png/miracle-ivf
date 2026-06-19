import { AlertCircle } from 'lucide-react'

interface Props {
  heading: string
  body: string
}

// Inline, recoverable error banner shown above the form when submission fails
// at the server/storage layer. The form stays mounted with the user's input
// intact so they can simply resubmit. Announced via role="alert".
export function FormErrorState({ heading, body }: Props) {
  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/[.06] p-4"
    >
      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" aria-hidden="true" />
      <div>
        <p className="text-sm font-bold text-destructive">{heading}</p>
        <p className="mt-1 text-sm leading-relaxed text-foreground/80">{body}</p>
      </div>
    </div>
  )
}
