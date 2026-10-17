import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'dark' | 'ghost-light'

interface CommonProps {
  variant?: ButtonVariant
  className?: string
  children: ReactNode
}

type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<'button'>, 'className' | 'children'> & {
    to?: undefined
    href?: undefined
  }

type ButtonAsLink = CommonProps & {
  to: string
  href?: undefined
}

type ButtonAsAnchor = CommonProps & {
  href: string
  to?: undefined
} & Omit<ComponentPropsWithoutRef<'a'>, 'className' | 'children' | 'href'>

export type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor

const variantClass: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  dark: 'btn-dark',
  'ghost-light': 'btn-ghost-light',
}

export function Button(props: ButtonProps) {
  const { variant = 'primary', className, children } = props
  const classes = cn('btn', variantClass[variant], className)

  if (props.to !== undefined) {
    return (
      <Link to={props.to} className={classes}>
        {children}
      </Link>
    )
  }

  if (props.href !== undefined) {
    const { href, ...anchorProps } = props
    return (
      <a href={href} className={classes} {...anchorProps}>
        {children}
      </a>
    )
  }

  const {
    to: _to,
    href: _href,
    className: _className,
    children: _children,
    ...buttonProps
  } = props as ButtonAsButton & {
    to?: undefined
    href?: undefined
  }
  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  )
}
