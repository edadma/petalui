import React, { createContext, useContext, cloneElement, isValidElement, useId, useEffect, useRef } from 'react'
import { useForm as rhfUseForm, UseFormReturn, FieldValues, SubmitHandler, UseFormProps, Controller, useFieldArray, FieldArrayPath, FieldArray, useWatch } from 'react-hook-form'
import { useConfig } from '../providers/ConfigProvider'

// DaisyUI classes
const dInput = 'd-input'
const dInputXs = 'd-input-xs'
const dInputSm = 'd-input-sm'
const dInputMd = 'd-input-md'
const dInputLg = 'd-input-lg'
const dInputXl = 'd-input-xl'
const dFloatingLabel = 'd-floating-label'
const dLoading = 'd-loading'
const dLoadingSpinner = 'd-loading-spinner'
const dLoadingXs = 'd-loading-xs'
const dTooltip = 'd-tooltip'
const dTooltipTop = 'd-tooltip-top'
const dValidatorHint = 'd-validator-hint'

interface FormContextValue {
  form: UseFormReturn<any>
  layout?: 'vertical' | 'horizontal' | 'inline'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  labelWidth?: number
  listName?: string
  disabled?: boolean
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
  /** Called when form validation fails */
  onFinishFailed?: (errorInfo: { values: TFieldValues; errorFields: Array<{ name: string; errors: string[] }> }) => void
  initialValues?: UseFormProps<TFieldValues>['defaultValues']
  layout?: 'vertical' | 'horizontal' | 'inline'
  /** Label width in pixels for horizontal layout (default: 80) */
  labelWidth?: number
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  /** Disable all form fields */
  disabled?: boolean
  children: React.ReactNode
  /** Test ID for the form element */
  'data-testid'?: string
}

export interface FormRule {
  required?: boolean | string
  type?: 'email' | 'url' | 'number'
  min?: number | { value: number; message: string }
  max?: number | { value: number; message: string }
  pattern?: RegExp | { value: RegExp; message: string }
  message?: string
  validate?: (value: any) => boolean | string | Promise<boolean | string>
  /** Ant Design style validator (for compatibility) */
  validator?: (rule: any, value: any) => Promise<void>
}

/** Form methods passed to rule functions (Ant Design style) */
export interface FormRuleMethods {
  getFieldValue: (name: string) => any
  getFieldsValue: () => any
  isSubmitted: () => boolean
  isSubmitAttempted: () => boolean
}

/** A rule can be an object or a function that returns a rule object */
export type FormRuleInput = FormRule | ((methods: FormRuleMethods) => FormRule)

export type ValidateTrigger = 'onChange' | 'onBlur' | 'onSubmit' | ('onChange' | 'onBlur' | 'onSubmit')[]

export interface FormItemProps {
  name?: string | string[]
  label?: string
  /** Floating label text (alternative to label, uses DaisyUI floating-label) */
  floatingLabel?: string
  help?: string
  required?: boolean
  rules?: FormRuleInput | FormRuleInput[]
  valuePropName?: string
  inline?: boolean
  className?: string
  children: React.ReactElement
  /** Tooltip text to show next to label */
  tooltip?: string
  /** Additional content below the form control */
  extra?: React.ReactNode
  /** Show validation feedback icon */
  hasFeedback?: boolean
  /** Field names that this field depends on for validation */
  dependencies?: string[]
  /** When to trigger validation */
  validateTrigger?: ValidateTrigger
  /** Initial value for this field (overrides Form's initialValues) */
  initialValue?: any
  /** Hide this field (still validates and submits) */
  hidden?: boolean
  /** Text/element before input (outside, using DaisyUI label) */
  addonBefore?: React.ReactNode
  /** Text/element after input (outside, using DaisyUI label) */
  addonAfter?: React.ReactNode
  /** Test ID for the form item (used as prefix for child elements) */
  'data-testid'?: string
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
  onFinishFailed,
  initialValues,
  layout = 'vertical',
  labelWidth = 60,
  size,
  disabled = false,
  children,
  className = '',
  noValidate = true,
  ...props
}: FormProps<TFieldValues>) {
  const { componentSize } = useConfig()
  const effectiveSize = size ?? componentSize ?? 'md'

  const internalForm = rhfUseForm<TFieldValues>({
    defaultValues: initialValues,
  })

  const form = externalForm || internalForm

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    ;(form as any).__submitAttempted = true
    // Trigger validation
    const isValid = await form.trigger()

    if (isValid) {
      if (onFinish) {
        onFinish(form.getValues())
      }
    } else {
      if (onFinishFailed) {
        const errors = form.formState.errors
        const errorFields: Array<{ name: string; errors: string[] }> = []

        // Flatten errors into errorFields array
        const flattenErrors = (obj: any, prefix = '') => {
          for (const key in obj) {
            const fullKey = prefix ? `${prefix}.${key}` : key
            const value = obj[key]
            if (value?.message) {
              errorFields.push({ name: fullKey, errors: [value.message as string] })
            } else if (typeof value === 'object' && value !== null) {
              flattenErrors(value, fullKey)
            }
          }
        }
        flattenErrors(errors)

        onFinishFailed({ values: form.getValues(), errorFields })
      }
    }
  }

  const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    form.reset(initialValues as any)
    ;(form as any).__submitAttempted = false
  }

  return (
    <FormContext.Provider value={{ form, layout, labelWidth, size: effectiveSize, disabled }}>
      <form onSubmit={handleSubmit} onReset={handleReset} className={className} noValidate={noValidate} {...props}>
        {children}
      </form>
    </FormContext.Provider>
  )
}

function FormItem({
  name,
  label,
  floatingLabel,
  help,
  required = false,
  rules,
  valuePropName = 'value',
  inline = false,
  className = '',
  children,
  tooltip,
  extra,
  hasFeedback = false,
  dependencies,
  validateTrigger = 'onChange',
  initialValue,
  hidden = false,
  addonBefore,
  addonAfter,
  'data-testid': testId,
}: FormItemProps) {
  const { form, size, listName, layout, labelWidth, disabled: formDisabled } = useFormContext()
  const inputId = useId()
  const errorId = useId()

  if (!name) {
    // Render without form control if no name provided
    return <div className={`${inline ? 'w-auto' : 'w-full'} ${className}`} style={hidden ? { display: 'none' } : undefined}>{children}</div>
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

  // Set initial value if provided
  useEffect(() => {
    if (initialValue !== undefined) {
      const currentValue = form.getValues(fieldName as any)
      if (currentValue === undefined) {
        form.setValue(fieldName as any, initialValue)
      }
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Watch dependencies and re-validate when they change
  const watchedDeps = useWatch({
    control: form.control,
    name: dependencies as any,
    disabled: !dependencies || dependencies.length === 0,
  })

  // Use refs to avoid infinite loops
  const formRef = useRef(form)
  formRef.current = form
  const prevDepsRef = useRef<string | undefined>(undefined)

  useEffect(() => {
    // Skip if no dependencies
    if (!dependencies || dependencies.length === 0) return

    // Skip initial render
    if (prevDepsRef.current === undefined) {
      prevDepsRef.current = JSON.stringify(watchedDeps)
      return
    }

    // Only trigger if dependency values actually changed
    const currentDeps = JSON.stringify(watchedDeps)
    if (prevDepsRef.current !== currentDeps) {
      prevDepsRef.current = currentDeps
      // Only re-validate if this field has been touched
      const touchedFields = formRef.current.formState.touchedFields as any
      const isTouched = fieldName.split('.').reduce((obj, key) => obj?.[key], touchedFields)
      if (isTouched) {
        formRef.current.trigger(fieldName as any)
      }
    }
  }, [watchedDeps, dependencies, fieldName])

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
  const rulesInputArray: FormRuleInput[] = rules
    ? Array.isArray(rules) ? rules : [rules]
    : []

  // Store form ref for use in validators (to get fresh values at validation time)
  const validatorFormRef = useRef(form)
  validatorFormRef.current = form

  // Create form methods for rule functions (Ant Design style)
  // These methods always access current form values via ref
  const formMethods: FormRuleMethods = {
    getFieldValue: (name: string) => validatorFormRef.current.getValues(name as any),
    getFieldsValue: () => validatorFormRef.current.getValues(),
    isSubmitted: () => validatorFormRef.current.formState.isSubmitted,
    isSubmitAttempted: () => !!(validatorFormRef.current as any).__submitAttempted,
  }

  // Resolve function rules to rule objects
  const rulesArray: FormRule[] = rulesInputArray.map(rule =>
    typeof rule === 'function' ? rule(formMethods) : rule
  )

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

    // Custom validator (our style)
    if (rule.validate) {
      customValidators.push(rule.validate)
    }

    // Ant Design style validator
    if (rule.validator) {
      const antValidator = rule.validator
      customValidators.push(async (value: any) => {
        try {
          await antValidator(rule, value)
          return true
        } catch (err) {
          return err instanceof Error ? err.message : String(err)
        }
      })
    }
  }

  // Combine all pattern and custom validators into a single validate function
  if (patternValidators.length > 0 || customValidators.length > 0) {
    validationRules.validate = async (value: any) => {
      // Check all patterns (skip if empty - required rule handles that)
      for (const { pattern, message } of patternValidators) {
        if (value && !pattern.test(value)) {
          return message
        }
      }

      // Run all custom validators (always run - they may validate empty/false values)
      for (const validator of customValidators) {
        const result = await validator(value)
        if (result !== true) {
          return result
        }
      }

      return true
    }
  }

  // Normalize validateTrigger to array
  const triggers = Array.isArray(validateTrigger) ? validateTrigger : [validateTrigger]
  const shouldValidateOnChange = triggers.includes('onChange')
  const shouldValidateOnBlur = triggers.includes('onBlur')

  // Feedback icons
  const FeedbackIcon = ({ hasError, isValidating }: { hasError: boolean; isValidating: boolean }) => {
    if (isValidating) {
      return (
        <span className={`${dLoading} ${dLoadingSpinner} ${dLoadingXs} text-base-content/50`} />
      )
    }
    if (hasError) {
      return (
        <svg className="w-4 h-4 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      )
    }
    return (
      <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    )
  }

  // Tooltip icon
  const TooltipIcon = () => (
    <div className={`${dTooltip} ${dTooltipTop} ml-1`} data-tip={tooltip}>
      <svg className="w-4 h-4 text-base-content/50 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
  )

  return (
    <Controller
      name={fieldName}
      control={form.control}
      rules={validationRules}
      render={({ field, fieldState }) => {
        const { value, onChange, onBlur, ref } = field
        const isValidating = fieldState.isTouched && form.formState.isValidating

        // Clone the child element and inject form control props
        const childProps: any = {
          id: inputId,
          ref,
          'aria-invalid': error ? true : undefined,
          'aria-describedby': error ? errorId : undefined,
          'data-testid': testId ? `${testId}-input` : undefined,
        }

        // Handle onBlur based on validateTrigger
        childProps.onBlur = () => {
          onBlur()
          if (shouldValidateOnBlur) {
            form.trigger(fieldName as any)
          }
        }

        // Get the original onChange from the child element (if any)
        const originalOnChange = isValidElement(children) ? (children.props as any).onChange : undefined

        // Handle different value prop names (e.g., 'checked' for checkboxes)
        if (valuePropName === 'checked') {
          childProps.checked = value
          childProps.onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange(e.target.checked)
            if (shouldValidateOnChange) {
              form.trigger(fieldName as any)
            }
            // Call original onChange if provided
            originalOnChange?.(e)
          }
        } else {
          childProps.value = value ?? ''
          childProps.onChange = (eventOrValue: any) => {
            // Handle components that pass value directly (e.g., Range, Rating)
            // vs components that pass event object (e.g., Input, Select)
            if (eventOrValue && eventOrValue.target !== undefined) {
              const nextValue = eventOrValue.target.value ?? eventOrValue.currentTarget?.value
              onChange(nextValue ?? eventOrValue)
            } else {
              onChange(eventOrValue)
            }
            if (shouldValidateOnChange) {
              form.trigger(fieldName as any)
            }
            // Call original onChange if provided
            originalOnChange?.(eventOrValue)
          }
        }

        // Apply size if specified at form level
        if (size && isValidElement(children)) {
          const existingProps = children.props as any
          if (!existingProps.size) {
            childProps.size = size
          }
        }

        // Apply error styling and accessibility
        if (error) {
          childProps.color = 'error'
          childProps['aria-invalid'] = true
        }

        // Apply form-level disabled state
        if (formDisabled) {
          childProps.disabled = true
        }

        // When wrapped with addons, the child input should be unstyled (the wrapper has the styling)
        const hasAddons = addonBefore || addonAfter
        if (hasAddons) {
          childProps.unstyled = true
        }

        const enhancedChild = isValidElement(children)
          ? cloneElement(children as React.ReactElement<any>, childProps)
          : children

        const isHorizontal = layout === 'horizontal'
        const isInline = layout === 'inline'

        // Size class for floating label
        const floatingSizeClasses: Record<string, string> = {
          xs: dInputXs,
          sm: dInputSm,
          md: dInputMd,
          lg: dInputLg,
          xl: dInputXl,
        }

        // Build the input element with optional floating label wrapper
        const renderInputElement = () => {
          const inputWithFeedback = (
            <div className={`${isHorizontal ? 'flex-1' : ''} ${hasFeedback ? 'relative' : ''}`}>
              {enhancedChild}
              {hasFeedback && fieldState.isTouched && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <FeedbackIcon hasError={!!error} isValidating={isValidating} />
                </span>
              )}
            </div>
          )

          // Floating label variant
          if (floatingLabel) {
            const floatingClasses = [
              dFloatingLabel,
              size && floatingSizeClasses[size],
            ].filter(Boolean).join(' ')

            return (
              <label className={floatingClasses}>
                {enhancedChild}
                <span>{floatingLabel}{required && <span className="text-error ml-1">*</span>}</span>
              </label>
            )
          }

          return inputWithFeedback
        }

        // Wrap with external addons if specified using DaisyUI input wrapper pattern
        const renderWithAddons = (input: React.ReactNode) => {
          if (!addonBefore && !addonAfter) return input

          const addonClasses = [
            dInput,
            'flex',
            'items-center',
            'gap-2',
            size && floatingSizeClasses[size],
          ].filter(Boolean).join(' ')

          return (
            <label className={addonClasses}>
              {addonBefore && <span className="text-base-content/70">{addonBefore}</span>}
              {input}
              {addonAfter && <span className="text-base-content/70">{addonAfter}</span>}
            </label>
          )
        }

        return (
          <div className={`${inline ? 'w-auto' : 'w-full'} ${isHorizontal ? 'mb-4' : ''} ${isInline ? 'inline-flex mr-4' : ''} ${className}`} style={hidden ? { display: 'none' } : undefined} data-testid={testId}>
            <div className={isHorizontal ? 'flex items-center gap-4' : ''}>
              {label && !floatingLabel && (
                <label
                  htmlFor={inputId}
                  className={`block text-sm font-medium ${isHorizontal ? 'flex-shrink-0 text-right' : ''} ${!isHorizontal && !isInline ? 'mb-1' : ''}`}
                  style={isHorizontal ? { width: labelWidth } : undefined}
                  data-testid={testId ? `${testId}-label` : undefined}
                >
                  <span className="flex items-center">
                    {label}
                    {required && <span className="text-error ml-1">*</span>}
                    {tooltip && <TooltipIcon />}
                  </span>
                </label>
              )}
              {renderWithAddons(renderInputElement())}
            </div>
            {!isHorizontal && !inline && (
              <p id={errorId} className={`${dValidatorHint} ${errorMessage ? '!visible text-error' : ''} min-h-[1.25rem]`} role={errorMessage ? 'alert' : undefined} data-testid={testId ? `${testId}-error` : undefined}>
                {errorMessage || (help && <span className="text-base-content/70">{help}</span>) || '\u00A0'}
              </p>
            )}
            {isHorizontal && (errorMessage || help) && (
              <p id={errorId} className={`${dValidatorHint} ${errorMessage ? '!visible text-error' : ''} min-h-[1.25rem]`} role={errorMessage ? 'alert' : undefined} data-testid={testId ? `${testId}-error` : undefined}>
                {errorMessage || (help && <span className="text-base-content/70">{help}</span>)}
              </p>
            )}
            {extra && (
              <div className="text-sm text-base-content/60 mt-1" data-testid={testId ? `${testId}-extra` : undefined}>{extra}</div>
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
  const { form, layout, size, disabled } = useFormContext()

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
    <FormContext.Provider value={{ form, layout, size, listName: name as string, disabled }}>
      {children(fieldsWithName as any, {
        add: append,
        remove,
        move,
      })}
    </FormContext.Provider>
  )
}

// Enhanced hook to expose full form API
export function useFormInstance<TFieldValues extends FieldValues = FieldValues>(
  options?: UseFormProps<TFieldValues>
) {
  const formInstance = rhfUseForm<TFieldValues>(options)

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

export interface FormErrorListProps {
  /** Specific field names to show errors for (shows all errors if not specified) */
  fields?: string[]
  /** Custom className */
  className?: string
  /** Test ID for the error list */
  'data-testid'?: string
}

function FormErrorList({ fields, className = '', 'data-testid': testId }: FormErrorListProps) {
  const { form } = useFormContext()
  const { errors } = form.formState

  // Flatten nested errors into a list
  const flattenErrors = (obj: any, prefix = ''): Array<{ field: string; message: string }> => {
    const result: Array<{ field: string; message: string }> = []

    for (const key in obj) {
      const fullKey = prefix ? `${prefix}.${key}` : key
      const value = obj[key]

      if (value?.message) {
        result.push({ field: fullKey, message: value.message as string })
      } else if (typeof value === 'object' && value !== null) {
        result.push(...flattenErrors(value, fullKey))
      }
    }

    return result
  }

  const allErrors = flattenErrors(errors)
  const filteredErrors = fields
    ? allErrors.filter(e => fields.includes(e.field))
    : allErrors

  if (filteredErrors.length === 0) {
    return null
  }

  return (
    <ul className={`text-error text-sm space-y-1 ${className}`} role="alert" data-testid={testId}>
      {filteredErrors.map((error, index) => (
        <li key={`${error.field}-${index}`} className="flex items-start gap-2" data-testid={testId ? `${testId}-${error.field}` : undefined}>
          <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error.message}</span>
        </li>
      ))}
    </ul>
  )
}

export const Form = Object.assign(FormRoot, {
  Item: FormItem,
  List: FormList,
  ErrorList: FormErrorList,
  useForm: useFormInstance,
  useWatch,
})

export const useForm = useFormInstance
export { useWatch }

export type { UseFormReturn as FormInstance }
