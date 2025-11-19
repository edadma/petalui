import React, { createContext, useContext, cloneElement, isValidElement } from 'react'
import { useForm, UseFormReturn, FieldValues, SubmitHandler, UseFormProps, Controller } from 'react-hook-form'

interface FormContextValue {
  form: UseFormReturn<any>
  layout?: 'vertical' | 'horizontal' | 'inline'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const FormContext = createContext<FormContextValue | undefined>(undefined)

export interface FormProps<TFieldValues extends FieldValues = FieldValues>
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  form?: UseFormReturn<TFieldValues>
  onFinish?: SubmitHandler<TFieldValues>
  initialValues?: UseFormProps<TFieldValues>['defaultValues']
  layout?: 'vertical' | 'horizontal' | 'inline'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  children: React.ReactNode
}

export interface FormItemProps {
  name?: string
  label?: string
  help?: string
  required?: boolean
  rules?: {
    required?: boolean | string
    min?: number | { value: number; message: string }
    max?: number | { value: number; message: string }
    pattern?: { value: RegExp; message: string }
    validate?: (value: any) => boolean | string | Promise<boolean | string>
  }
  valuePropName?: string
  className?: string
  children: React.ReactElement
}

function useFormContext() {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error('Form compound components must be used within Form')
  }
  return context
}

function FormRoot<TFieldValues extends FieldValues = FieldValues>({
  form: externalForm,
  onFinish,
  initialValues,
  layout = 'vertical',
  size,
  children,
  className = '',
  ...props
}: FormProps<TFieldValues>) {
  const internalForm = useForm<TFieldValues>({
    defaultValues: initialValues,
  })

  const form = externalForm || internalForm

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (onFinish) {
      form.handleSubmit(onFinish)(e)
    }
  }

  return (
    <FormContext.Provider value={{ form, layout, size }}>
      <form onSubmit={handleSubmit} className={className} {...props}>
        {children}
      </form>
    </FormContext.Provider>
  )
}

function FormItem({
  name,
  label,
  help,
  required = false,
  rules,
  valuePropName = 'value',
  className = '',
  children,
}: FormItemProps) {
  const { form, size } = useFormContext()

  if (!name) {
    // Render without form control if no name provided
    return <div className={`form-control w-full ${className}`}>{children}</div>
  }

  const error = form.formState.errors[name]
  const errorMessage = error?.message as string | undefined

  // Build validation rules
  const validationRules: any = {}
  if (required || rules?.required) {
    validationRules.required = typeof rules?.required === 'string' ? rules.required : required ? 'This field is required' : false
  }
  if (rules?.min) {
    validationRules.min = typeof rules.min === 'object' ? rules.min : { value: rules.min, message: `Minimum value is ${rules.min}` }
  }
  if (rules?.max) {
    validationRules.max = typeof rules.max === 'object' ? rules.max : { value: rules.max, message: `Maximum value is ${rules.max}` }
  }
  if (rules?.pattern) {
    validationRules.pattern = rules.pattern
  }
  if (rules?.validate) {
    validationRules.validate = rules.validate
  }

  return (
    <Controller
      name={name}
      control={form.control}
      rules={validationRules}
      render={({ field }) => {
        const { value, onChange, onBlur, ref } = field

        // Clone the child element and inject form control props
        const childProps: any = {
          ref,
          onBlur,
        }

        // Handle different value prop names (e.g., 'checked' for checkboxes)
        if (valuePropName === 'checked') {
          childProps.checked = value
          childProps.onChange = (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.checked)
        } else {
          childProps.value = value || ''
          childProps.onChange = (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)
        }

        // Apply size if specified at form level
        if (size && isValidElement(children)) {
          const existingProps = children.props as any
          if (!existingProps.size) {
            childProps.size = size
          }
        }

        // Apply error styling
        if (error) {
          childProps.color = 'error'
        }

        const enhancedChild = isValidElement(children)
          ? cloneElement(children as React.ReactElement<any>, { ...childProps, ...(children.props as any) })
          : children

        return (
          <div className={`form-control w-full ${className}`}>
            {label && (
              <label className="label">
                <span className="label-text">
                  {label}
                  {required && <span className="text-error ml-1">*</span>}
                </span>
              </label>
            )}
            {enhancedChild}
            {(errorMessage || help) && (
              <label className="label">
                {errorMessage && <span className="label-text-alt text-error">{errorMessage}</span>}
                {!errorMessage && help && <span className="label-text-alt">{help}</span>}
              </label>
            )}
          </div>
        )
      }}
    />
  )
}

// Hook to use form instance
export function useFormInstance<TFieldValues extends FieldValues = FieldValues>() {
  return useForm<TFieldValues>()
}

export const Form = Object.assign(FormRoot, {
  Item: FormItem,
  useForm: useFormInstance,
})

export type { UseFormReturn as FormInstance }
