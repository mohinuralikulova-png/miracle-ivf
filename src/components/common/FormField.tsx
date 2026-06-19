import type { ReactNode } from 'react'

interface FieldRenderProps {
  /** Apply to the control's `id` (matches the label's `htmlFor`). */
  id: string
  /** True when the field has a validation error. */
  invalid: boolean
  /** Apply to the control's `aria-describedby` so the error is announced. */
  describedBy: string | undefined
}

interface Props {
  /** Field name — used as the control id and error id base. Must match the FormData key. */
  name: string
  label: string
  error?: string
  required?: boolean
  /** Localized screen-reader text for the required indicator (e.g. a11y.required). */
  requiredLabel?: string
  /** Render the control; receives the accessibility wiring to spread onto it. */
  children: (props: FieldRenderProps) => ReactNode
}

// Accessible field shell: renders the label, wires aria-describedby/aria-invalid
// through to the control via a render-prop, and announces errors with role="alert".
// Control-agnostic — works for input, select and textarea (composition over config).
export function FormField({ name, label, error, required = false, requiredLabel, children }: Props) {
  const id = name
  const errorId = `${name}-error`
  const invalid = Boolean(error)

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-primary">
        {label}
        {required && (
          <>
            <span aria-hidden="true" className="ml-0.5 text-destructive">
              *
            </span>
            {requiredLabel && <span className="sr-only"> {requiredLabel}</span>}
          </>
        )}
      </label>

      {children({ id, invalid, describedBy: invalid ? errorId : undefined })}

      {error && (
        <p id={errorId} role="alert" className="text-sm font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
