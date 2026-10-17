import type { InputHTMLAttributes } from 'react'

type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  hint?: string
}

export function FormField({ label, hint, id, ...props }: FormFieldProps) {
  return (
    <label className="form-field" htmlFor={id}>
      <span className="form-field__label">{label}</span>
      <input className="text-input" id={id} {...props} />
      {hint && <span className="form-field__hint">{hint}</span>}
    </label>
  )
}
