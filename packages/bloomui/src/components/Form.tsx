import React, { createContext, useContext, cloneElement, isValidElement, useId } from 'react'
import { useForm, UseFormReturn, FieldValues, SubmitHandler, UseFormProps, Controller, useFieldArray, FieldArrayPath, FieldArray } from 'react-hook-form'

interface FormContextValue {
  form: UseFormReturn<any>
  layout?: 'vertical' | 'horizontal' | 'inline'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  listName?: string
}

const FormContext = createContext<FormContextValue | undefined>(undefined)

// Built-in type validators
const TYPE_VALIDATORS = {
  email: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: 'Please enter a valid email address',
  },
  url: {
    value: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
    message: 'Please enter a valid URL',
  },
  number: {
    value: /^-?\d+(\.\d+)?$/,
    message: 'Please enter a valid number',
  },
}

export interface FormProps<TFieldValues extends FieldValues = FieldValues>
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  form?: UseFormReturn<TFieldValues>
  onFinish?: SubmitHandler<TFieldValues>
  initialValues?: UseFormProps<TFieldValues>['defaultValues']
  layout?: 'vertical' | 'horizontal' | 'inline'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  children: React.ReactNode
}

export interface FormRule {
  required?: boolean | string
  type?: 'email' | 'url' | 'number'
  min?: number | { value: number; message: string }
  max?: number | { value: number; message: string }
  pattern?: RegExp | { value: RegExp; message: string }
  message?: string
  validate?: (value: any) => boolean | string | Promise<boolean | string>
}

export interface FormItemProps {
  name?: string | string[]
  label?: string
  help?: string
  required?: boolean
  rules?: FormRule | FormRule[]
  valuePropName?: string
  inline?: boolean
  className?: string
  children: React.ReactElement
}

export interface FormListProps<TFieldValues extends FieldValues = FieldValues> {
  name: FieldArrayPath<TFieldValues>
  children: (
    fields: FieldArray<TFieldValues>[],
    operations: {
      add: (value?: any) => void
      remove: (index: number) => void
      move: (from: number, to: number) => void
    }
  ) => React.ReactNode
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
  noValidate = true,
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
      <form onSubmit={handleSubmit} className={className} noValidate={noValidate} {...props}>
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
  inline = false,
  className = '',
  children,
}: FormItemProps) {
  const { form, size, listName, layout } = useFormContext()
  const inputId = useId()
  const errorId = useId()

  if (!name) {
    // Render without form control if no name provided
    return <div className={`form-control ${inline ? 'w-auto' : 'w-full'} ${className}`}>{children}</div>
  }

  // Handle nested field names (for Form.List)
  let fieldName: string
  if (Array.isArray(name)) {
    // If we're inside a Form.List, prepend the list name
    const fullPath = listName ? [listName, ...name] : name
    fieldName = fullPath.join('.')
  } else {
    fieldName = name
  }

  // Get error by traversing the error object path
  const getErrorByPath = (path: string) => {
    const keys = path.split('.')
    let error: any = form.formState.errors
    for (const key of keys) {
      if (!error) break
      error = error[key]
    }
    return error
  }

  const error = getErrorByPath(fieldName)
  const errorMessage = error?.message as string | undefined

  // Normalize rules to array
  const rulesArray: FormRule[] = rules
    ? Array.isArray(rules) ? rules : [rules]
    : []

  // Build validation rules
  const validationRules: any = {}
  const patternValidators: Array<{ pattern: RegExp; message: string }> = []
  const customValidators: Array<(value: any) => boolean | string | Promise<boolean | string>> = []

  // Handle top-level required prop
  if (required) {
    validationRules.required = 'This field is required'
  }

  // Process each rule
  for (const rule of rulesArray) {
    // Required
    if (rule.required) {
      validationRules.required = typeof rule.required === 'string'
        ? rule.required
        : rule.message || 'This field is required'
    }

    // Type validator
    if (rule.type && TYPE_VALIDATORS[rule.type]) {
      patternValidators.push({
        pattern: TYPE_VALIDATORS[rule.type].value,
        message: rule.message || TYPE_VALIDATORS[rule.type].message,
      })
    }

    // Min length
    if (rule.min !== undefined) {
      const minValue = typeof rule.min === 'object' ? rule.min.value : rule.min
      const minMessage = typeof rule.min === 'object'
        ? rule.min.message
        : rule.message || `Minimum length is ${minValue} characters`
      validationRules.minLength = { value: minValue, message: minMessage }
    }

    // Max length
    if (rule.max !== undefined) {
      const maxValue = typeof rule.max === 'object' ? rule.max.value : rule.max
      const maxMessage = typeof rule.max === 'object'
        ? rule.max.message
        : rule.message || `Maximum length is ${maxValue} characters`
      validationRules.maxLength = { value: maxValue, message: maxMessage }
    }

    // Pattern - collect all patterns
    if (rule.pattern) {
      const patternValue = rule.pattern instanceof RegExp ? rule.pattern : rule.pattern.value
      const patternMessage = rule.pattern instanceof RegExp
        ? rule.message || 'Invalid format'
        : rule.pattern.message
      patternValidators.push({ pattern: patternValue, message: patternMessage })
    }

    // Custom validator
    if (rule.validate) {
      customValidators.push(rule.validate)
    }
  }

  // Combine all pattern and custom validators into a single validate function
  if (patternValidators.length > 0 || customValidators.length > 0) {
    validationRules.validate = async (value: any) => {
      // Skip validation if empty (required rule handles that)
      if (!value && !validationRules.required) return true

      // Check all patterns
      for (const { pattern, message } of patternValidators) {
        if (value && !pattern.test(value)) {
          return message
        }
      }

      // Run all custom validators
      for (const validator of customValidators) {
        const result = await validator(value)
        if (result !== true) {
          return result
        }
      }

      return true
    }
  }

  return (
    <Controller
      name={fieldName}
      control={form.control}
      rules={validationRules}
      render={({ field }) => {
        const { value, onChange, onBlur, ref } = field

        // Clone the child element and inject form control props
        const childProps: any = {
          id: inputId,
          ref,
          onBlur,
          'aria-invalid': error ? true : undefined,
          'aria-describedby': error ? errorId : undefined,
        }

        // Handle different value prop names (e.g., 'checked' for checkboxes)
        if (valuePropName === 'checked') {
          childProps.checked = value
          childProps.onChange = (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.checked)
        } else {
          childProps.value = value || ''
          childProps.onChange = (eventOrValue: any) => {
            // Handle components that pass value directly (e.g., Range, Rating)
            // vs components that pass event object (e.g., Input, Select)
            if (eventOrValue && eventOrValue.target !== undefined) {
              onChange(eventOrValue.target.value)
            } else {
              onChange(eventOrValue)
            }
          }
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
          ? cloneElement(children as React.ReactElement<any>, childProps)
          : children

        const isHorizontal = layout === 'horizontal'

        return (
          <div className={`form-control ${inline ? 'w-auto' : 'w-full'} ${className}`}>
            <div className={isHorizontal ? 'flex items-center gap-4' : ''}>
              {label && (
                <label htmlFor={inputId} className={`label ${isHorizontal ? 'flex-shrink-0' : 'mb-2'}`}>
                  <span className="label-text">
                    {label}
                    {required && <span className="text-error ml-1">*</span>}
                  </span>
                </label>
              )}
              <div className={isHorizontal ? 'flex-1' : ''}>
                {enhancedChild}
              </div>
            </div>
            {!isHorizontal && !inline && (
              <div className="label">
                <span id={errorId} className="label-text-alt text-error min-h-[1.25rem]" role={errorMessage ? 'alert' : undefined}>
                  {errorMessage || (help && <span className="text-base-content/70">{help}</span>) || '\u00A0'}
                </span>
              </div>
            )}
            {isHorizontal && (errorMessage || help) && (
              <div className="label">
                <span id={errorId} className="label-text-alt text-error min-h-[1.25rem] ml-auto" role={errorMessage ? 'alert' : undefined}>
                  {errorMessage || (help && <span className="text-base-content/70">{help}</span>)}
                </span>
              </div>
            )}
          </div>
        )
      }}
    />
  )
}

function FormList<TFieldValues extends FieldValues = FieldValues>({
  name,
  children,
}: FormListProps<TFieldValues>) {
  const { form, layout, size } = useFormContext()

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name,
  })

  // Add name (index) to each field for proper path construction
  const fieldsWithName = fields.map((field, index) => ({
    ...field,
    name: index,
  }))

  return (
    <FormContext.Provider value={{ form, layout, size, listName: name as string }}>
      {children(fieldsWithName as any, {
        add: append,
        remove,
        move,
      })}
    </FormContext.Provider>
  )
}

// Enhanced hook to expose full form API
export function useFormInstance<TFieldValues extends FieldValues = FieldValues>() {
  const formInstance = useForm<TFieldValues>()

  // Add convenience methods to the instance
  const enhancedInstance = formInstance as typeof formInstance & {
    setFieldValue: typeof formInstance.setValue
    getFieldValue: (name: any) => any
    getFieldsValue: typeof formInstance.getValues
    setFieldsValue: (values: any) => void
    validateFields: typeof formInstance.trigger
    resetFields: typeof formInstance.reset
    isFieldTouched: (name: string) => boolean
    getFieldError: (name: string) => string | undefined
  }

  // Add the alias methods
  enhancedInstance.setFieldValue = formInstance.setValue
  enhancedInstance.getFieldValue = (name: any) => formInstance.getValues(name)
  enhancedInstance.getFieldsValue = formInstance.getValues
  enhancedInstance.setFieldsValue = (values: any) => {
    Object.keys(values).forEach((key) => {
      formInstance.setValue(key as any, values[key])
    })
  }
  enhancedInstance.validateFields = formInstance.trigger
  enhancedInstance.resetFields = formInstance.reset
  enhancedInstance.isFieldTouched = (name: string) => {
    const touched = formInstance.formState.touchedFields as any
    return !!touched[name]
  }
  enhancedInstance.getFieldError = (name: string) => {
    const errors = formInstance.formState.errors as any
    return errors[name]?.message as string | undefined
  }

  return enhancedInstance
}

export const Form = Object.assign(FormRoot, {
  Item: FormItem,
  List: FormList,
  useForm: useFormInstance,
})

export type { UseFormReturn as FormInstance }
