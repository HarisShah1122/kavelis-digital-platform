import type {
  ComponentPropsWithoutRef,
  ReactNode,
} from 'react'
import { cn } from '@/lib/utils'

interface FieldWrapperProps {
  id: string
  label: string
  error?: string
  hint?: string
  required?: boolean
  children: ReactNode
}

export function FieldWrapper({
  id,
  label,
  error,
  hint,
  required = false,
  children,
}: FieldWrapperProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-navy-900">
        {label}
        {required ? (
          <span aria-hidden="true" className="ml-0.5 text-gold-600">
            *
          </span>
        ) : (
          <span className="ml-1.5 text-xs font-normal text-charcoal-400">(optional)</span>
        )}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-charcoal-500">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs font-medium text-error">
          {error}
        </p>
      ) : null}
    </div>
  )
}

type TextFieldProps = Omit<ComponentPropsWithoutRef<'input'>, 'id' | 'className'> & {
  id: string
  error?: string
  hint?: string
  wrapperClassName?: string
}

export function TextField({
  id,
  label,
  error,
  hint,
  required,
  wrapperClassName,
  ...inputProps
}: TextFieldProps & { label: string }) {
  const describedBy = [error ? `${id}-error` : null, hint && !error ? `${id}-hint` : null]
    .filter(Boolean)
    .join(' ')

  return (
    <FieldWrapper id={id} label={label} error={error} hint={hint} required={required}>
      <input
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        className={cn('input-field', error && 'input-error', wrapperClassName)}
        {...inputProps}
      />
    </FieldWrapper>
  )
}

type SelectFieldProps = Omit<ComponentPropsWithoutRef<'select'>, 'id' | 'className'> & {
  id: string
  label: string
  error?: string
  hint?: string
  options: Array<{ value: string; label: string }>
}

export function SelectField({
  id,
  label,
  error,
  hint,
  required,
  options,
  ...selectProps
}: SelectFieldProps) {
  const describedBy = [error ? `${id}-error` : null, hint && !error ? `${id}-hint` : null]
    .filter(Boolean)
    .join(' ')

  return (
    <FieldWrapper id={id} label={label} error={error} hint={hint} required={required}>
      <select
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        className={cn('input-field appearance-none', error && 'input-error')}
        {...selectProps}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  )
}

type TextareaFieldProps = Omit<ComponentPropsWithoutRef<'textarea'>, 'id' | 'className'> & {
  id: string
  label: string
  error?: string
  hint?: string
}

export function TextareaField({
  id,
  label,
  error,
  hint,
  required,
  ...textareaProps
}: TextareaFieldProps) {
  const describedBy = [error ? `${id}-error` : null, hint && !error ? `${id}-hint` : null]
    .filter(Boolean)
    .join(' ')

  return (
    <FieldWrapper id={id} label={label} error={error} hint={hint} required={required}>
      <textarea
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        className={cn('input-field min-h-[140px] resize-y', error && 'input-error')}
        {...textareaProps}
      />
    </FieldWrapper>
  )
}
