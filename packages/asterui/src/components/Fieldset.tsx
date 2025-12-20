import React from 'react'

// DaisyUI classes
const dFieldset = 'fieldset'
const dFieldsetLegend = 'fieldset-legend'
const dFieldsetLabel = 'fieldset-label'

export interface FieldsetProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  children: React.ReactNode
  className?: string
}

export interface FieldsetLegendProps {
  children: React.ReactNode
  className?: string
}

export interface FieldsetLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
  className?: string
}

function FieldsetRoot({ children, className = '', ...props }: FieldsetProps) {
  const classes = [dFieldset, className].filter(Boolean).join(' ')

  return (
    <fieldset className={classes} {...props}>
      {children}
    </fieldset>
  )
}

function FieldsetLegend({ children, className = '' }: FieldsetLegendProps) {
  return <legend className={`${dFieldsetLegend} ${className}`}>{children}</legend>
}

function FieldsetLabel({ children, className = '', ...props }: FieldsetLabelProps) {
  const classes = [dFieldsetLabel, className].filter(Boolean).join(' ')
  return <label className={classes} {...props}>{children}</label>
}

export const Fieldset = Object.assign(FieldsetRoot, {
  Legend: FieldsetLegend,
  Label: FieldsetLabel,
})
