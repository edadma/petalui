import { useMemo, useState } from 'react'
import {
  Button,
  Card,
  Checkbox,
  Container,
  DateOfBirth,
  Descriptions,
  Divider,
  Flex,
  Form,
  Input,
  Modal,
  Progress,
  Radio,
  Row,
  Col,
  Select,
  Space,
  Steps,
  ThemeController,
  Typography,
  Upload,
  type DateOfBirthValue,
  type UploadFile,
} from 'asterui'

interface OnboardingForm {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  avatar?: UploadFile[]
  dob?: DateOfBirthValue
  phone?: string
  country?: string
  timeZone?: string
  notifications?: string[]
  language?: string
  theme?: 'light' | 'dark' | 'auto'
  frequency?: 'realtime' | 'daily' | 'weekly'
  interests?: string[]
  industry?: string
  industryOther?: string
  experienceLevel?: 'beginner' | 'intermediate' | 'advanced'
  referral?: string
  terms?: boolean
  newsletter?: boolean
}

const STEP_ITEMS = [
  { title: 'Account', description: 'Credentials' },
  { title: 'Profile', description: 'Personal info' },
  { title: 'Preferences', description: 'Notifications' },
  { title: 'Interests', description: 'Personalize' },
  { title: 'Review', description: 'Confirm' },
]

const STEP_FIELDS: Array<Array<keyof OnboardingForm>> = [
  ['fullName', 'email', 'password', 'confirmPassword'],
  ['dob', 'country', 'timeZone'],
  ['notifications', 'language', 'theme', 'frequency'],
  ['experienceLevel', 'industry', 'industryOther'],
  ['terms'],
]

const COUNTRIES = [
  'United States',
  'Canada',
  'United Kingdom',
  'Germany',
  'Japan',
  'Brazil',
  'Australia',
]
const TIMEZONES = [
  'UTC',
  'America/New_York',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Berlin',
  'Asia/Tokyo',
]
const LANGUAGES = ['English', 'Spanish', 'French', 'German', 'Portuguese', 'Japanese']

function getPasswordStrength(password: string): {
  score: number
  label: string
  type: 'error' | 'warning' | 'info' | 'success'
} {
  const hasMinLength = password.length >= 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecial = /[!@#$%^&*.?]/.test(password)

  const basicRules = [hasMinLength, hasUppercase, hasLowercase, hasNumber, hasSpecial]
  const basicRulesMet = basicRules.filter(Boolean).length

  if (basicRulesMet < 5) {
    const score = Math.round((basicRulesMet / 5) * 50)
    return { score, label: 'Weak', type: 'error' }
  }

  if (password.length >= 16) return { score: 100, label: 'Strong', type: 'success' }
  if (password.length >= 12) return { score: 83, label: 'Good', type: 'info' }
  return { score: 67, label: 'Fair', type: 'warning' }
}

function App() {
  const defaultTimeZone = useMemo(() => {
    if (typeof Intl !== 'undefined') {
      return Intl.DateTimeFormat().resolvedOptions().timeZone
    }
    return 'UTC'
  }, [])

  const form = Form.useForm<OnboardingForm>({
    defaultValues: {
      notifications: ['email'],
      theme: 'auto',
      frequency: 'daily',
      interests: [],
      timeZone: defaultTimeZone,
    },
  })

  const [currentStep, setCurrentStep] = useState(3)
  const [maxStep, setMaxStep] = useState(3)
  const [avatarList, setAvatarList] = useState<UploadFile[]>([])
  const password = Form.useWatch({ control: form.control, name: 'password' }) || ''
  const industry = Form.useWatch({ control: form.control, name: 'industry' })
  const formValues = Form.useWatch({ control: form.control }) as OnboardingForm

  const progressValue = Math.round(((currentStep + 1) / STEP_ITEMS.length) * 100)
  const strength = useMemo(() => getPasswordStrength(password), [password])

  const goToStep = (nextStep: number) => {
    if (nextStep <= maxStep) {
      setCurrentStep(nextStep)
    }
  }

  const handleNext = async () => {
    const fields = STEP_FIELDS[currentStep]
    const isValid = await form.trigger(fields as any)
    if (!isValid) return
    const nextStep = Math.min(currentStep + 1, STEP_ITEMS.length - 1)
    setCurrentStep(nextStep)
    setMaxStep((prev) => Math.max(prev, nextStep))
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const handleSubmit = (values: OnboardingForm) => {
    Modal.success({
      title: 'Onboarding complete',
      content: (
        <pre className="max-h-72 overflow-auto text-left">
          <code>{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <div className="min-h-screen bg-base-200">
      <Container size="lg" className="py-10">
        <Flex justify="between" align="center" className="mb-6">
          <div>
            <Typography.Title level={2} className="mb-1">
              Multi-Step Onboarding
            </Typography.Title>
            <Typography.Text type="secondary">
              Guide new users through a focused, validated setup flow.
            </Typography.Text>
          </div>
          <ThemeController.Swap />
        </Flex>

        <Card className="shadow-xl">
          <Space direction="vertical" size="lg" className="w-full">
            <Steps current={currentStep} items={STEP_ITEMS} onChange={goToStep} />
            <Progress value={progressValue} max={100} type="primary" />

            <Form form={form} onFinish={handleSubmit}>
              {currentStep === 0 && (
                <Space direction="vertical" size="lg">
                  <Typography.Title level={4}>Account Setup</Typography.Title>
                  <Row gutter={16}>
                    <Col xs={24}>
                      <Form.Item
                        name="fullName"
                        label="Full Name"
                        rules={{ required: 'Full name is required' }}
                      >
                        <Input className="w-full" placeholder="Jane Doe" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="email"
                        label="Email"
                        rules={{ required: 'Email is required', type: 'email' }}
                      >
                        <Input className="w-full" type="email" placeholder="jane@example.com" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                          { required: true },
                          { min: 8, message: 'Password must be at least 8 characters' },
                          { pattern: /[A-Z]/, message: 'Must contain an uppercase letter' },
                          { pattern: /[a-z]/, message: 'Must contain a lowercase letter' },
                          { pattern: /[0-9]/, message: 'Must contain a number' },
                          { pattern: /[!@#$%^&*.?]/, message: 'Must contain a special character' },
                        ]}
                      >
                        <Input className="w-full" type="password" placeholder="Create a password" />
                      </Form.Item>
                      <div className="mt-2">
                        {password && (
                          <>
                            <Progress value={strength.score} type={strength.type} className="h-1" />
                            <Typography.Text className={`text-xs text-${strength.type}`}>
                              Password strength: {strength.label}
                            </Typography.Text>
                          </>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="confirmPassword"
                        label="Confirm Password"
                        dependencies={['password']}
                        rules={[
                          { required: true },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (!value || getFieldValue('password') === value) {
                                return Promise.resolve()
                              }
                              return Promise.reject('Passwords do not match')
                            },
                          }),
                        ]}
                      >
                        <Input className="w-full" type="password" placeholder="Re-enter password" />
                      </Form.Item>
                    </Col>
                  </Row>
                </Space>
              )}

              {currentStep === 1 && (
                <Space direction="vertical" size="lg">
                  <Typography.Title level={4}>Personal Information</Typography.Title>
                  <Row>
                    <Col xs={24} md={4}>
                      <Form.Item name="avatar" label="Profile Photo">
                        <Upload
                          listType="picture-card"
                          maxCount={1}
                          accept="image/*"
                          onChange={({ fileList }) => setAvatarList(fileList)}
                        >
                          <div className="flex flex-col items-center">
                            <span className="text-2xl">+</span>
                            <span className="text-sm">Upload</span>
                          </div>
                        </Upload>
                      </Form.Item>
                      {avatarList[0]?.name && (
                        <Typography.Text type="secondary" className="text-xs">
                          {avatarList[0].name}
                        </Typography.Text>
                      )}
                    </Col>
                    <Col xs={24} md={20}>
                      <Row gutter={16}>
                        <Col xs={24} md={15}>
                          <Form.Item name="dob" label="Date of Birth" {...DateOfBirth.required()}>
                            <DateOfBirth minAge={13} />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={9}>
                          <Form.Item name="phone" label="Phone (optional)">
                            <Input
                              className="w-full"
                              mask="+# (###) ###-####"
                              placeholder="+1 (555) 123-4567"
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={16} className="mt-4">
                        <Col xs={24} md={15}>
                          <Form.Item
                            name="country"
                            label="Country/Region"
                            rules={{ required: 'Country is required' }}
                          >
                            <Select>
                              <option value="">Select country</option>
                              {COUNTRIES.map((country) => (
                                <option key={country} value={country}>
                                  {country}
                                </option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={9}>
                          <Form.Item
                            name="timeZone"
                            label="Time Zone"
                            rules={{ required: 'Time zone is required' }}
                          >
                            <Select>
                              <option value="">Select time zone</option>
                              {TIMEZONES.map((tz) => (
                                <option key={tz} value={tz}>
                                  {tz}
                                </option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Space>
              )}

              {currentStep === 2 && (
                <Space direction="vertical" size="lg">
                  <Typography.Title level={4}>Preferences</Typography.Title>
                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="notifications"
                        label="Notification Settings"
                        rules={{
                          validate: (value) =>
                            value?.length ? true : 'Select at least one notification type',
                        }}
                      >
                        <Checkbox.Group>
                          <Space direction="vertical" size="sm">
                            <Checkbox value="email">Email notifications</Checkbox>
                            <Checkbox value="sms">SMS notifications</Checkbox>
                            <Checkbox value="push">Push notifications</Checkbox>
                          </Space>
                        </Checkbox.Group>
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="language"
                        label="Language Preference"
                        rules={{ required: 'Language is required' }}
                      >
                        <Select>
                          <option value="">Select language</option>
                          {LANGUAGES.map((language) => (
                            <option key={language} value={language}>
                              {language}
                            </option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        name="theme"
                        label="Theme"
                        rules={{ required: 'Theme is required' }}
                      >
                        <Radio.Group>
                          <Space size="md">
                            <Radio value="light">Light</Radio>
                            <Radio value="dark">Dark</Radio>
                            <Radio value="auto">Auto</Radio>
                          </Space>
                        </Radio.Group>
                      </Form.Item>
                      <Form.Item
                        name="frequency"
                        label="Communication Frequency"
                        rules={{ required: 'Select a frequency' }}
                      >
                        <Radio.Group>
                          <Space size="md">
                            <Radio value="realtime">Real-time</Radio>
                            <Radio value="daily">Daily digest</Radio>
                            <Radio value="weekly">Weekly summary</Radio>
                          </Space>
                        </Radio.Group>
                      </Form.Item>
                    </Col>
                  </Row>
                </Space>
              )}

              {currentStep === 3 && (
                <Space direction="vertical" size="lg">
                  <Typography.Title level={4}>Interests & Customization</Typography.Title>
                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item name="interests" label="Areas of Interest">
                        <Checkbox.Group>
                          <Row cols={30} gutter={[20, 5]}>
                            {[
                              'Design',
                              'Engineering',
                              'Product',
                              'Marketing',
                              'Data',
                              'Finance',
                              'Sales',
                              'HR',
                            ].map((interest) => (
                              <Col key={interest} xs={15} md={10}>
                                <Checkbox value={interest.toLowerCase()}>{interest}</Checkbox>
                              </Col>
                            ))}
                          </Row>
                        </Checkbox.Group>
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item name="industry" label="Job Role or Industry">
                        <Select>
                          <option value="">Select industry</option>
                          <option value="saas">SaaS</option>
                          <option value="healthcare">Healthcare</option>
                          <option value="finance">Finance</option>
                          <option value="education">Education</option>
                          <option value="ecommerce">E-commerce</option>
                          <option value="other">Other</option>
                        </Select>
                      </Form.Item>
                      {industry === 'other' && (
                        <Form.Item
                          name="industryOther"
                          label="Specify Industry"
                          rules={{
                            validate: (value) =>
                              industry !== 'other' || value ? true : 'Please specify your industry',
                          }}
                        >
                          <Input className="w-full" placeholder="Describe your industry" />
                        </Form.Item>
                      )}
                      <Form.Item
                        name="experienceLevel"
                        label="Experience Level"
                        rules={{ required: 'Experience level is required' }}
                      >
                        <Radio.Group>
                          <Space size="md">
                            <Radio value="beginner">Beginner</Radio>
                            <Radio value="intermediate">Intermediate</Radio>
                            <Radio value="advanced">Advanced</Radio>
                          </Space>
                        </Radio.Group>
                      </Form.Item>
                      <Form.Item name="referral" label="How did you hear about us?">
                        <Select>
                          <option value="">Select an option</option>
                          <option value="search">Search</option>
                          <option value="friend">Friend or colleague</option>
                          <option value="social">Social media</option>
                          <option value="event">Event</option>
                          <option value="other">Other</option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </Space>
              )}

              {currentStep === 4 && (
                <Space direction="vertical" size="lg">
                  <Typography.Title level={4}>Review & Confirm</Typography.Title>
                  <Descriptions
                    bordered
                    column={{ xs: 1, md: 2 }}
                    items={[
                      { label: 'Full name', children: formValues?.fullName || '-' },
                      { label: 'Email', children: formValues?.email || '-' },
                      { label: 'Phone', children: formValues?.phone || '-' },
                      {
                        label: 'Date of birth',
                        children:
                          formValues?.dob?.month && formValues?.dob?.day && formValues?.dob?.year
                            ? `${formValues.dob.month}/${formValues.dob.day}/${formValues.dob.year}`
                            : '-',
                      },
                      { label: 'Country', children: formValues?.country || '-' },
                      { label: 'Time zone', children: formValues?.timeZone || '-' },
                      { label: 'Language', children: formValues?.language || '-' },
                      { label: 'Theme', children: formValues?.theme || '-' },
                      { label: 'Frequency', children: formValues?.frequency || '-' },
                      { label: 'Experience', children: formValues?.experienceLevel || '-' },
                      {
                        label: 'Industry',
                        children: formValues?.industryOther || formValues?.industry || '-',
                      },
                      {
                        label: 'Interests',
                        children: formValues?.interests?.length
                          ? formValues.interests.join(', ')
                          : '-',
                      },
                      {
                        label: 'Notifications',
                        children: formValues?.notifications?.length
                          ? formValues.notifications.join(', ')
                          : '-',
                      },
                    ]}
                  />
                  <Divider />
                  <Form.Item
                    name="terms"
                    valuePropName="checked"
                    rules={{ validate: (value) => (value ? true : 'You must accept the terms') }}
                  >
                    <Checkbox>I agree to the Terms of Service and Privacy Policy</Checkbox>
                  </Form.Item>
                  <Form.Item name="newsletter" valuePropName="checked">
                    <Checkbox>Subscribe to product updates</Checkbox>
                  </Form.Item>
                </Space>
              )}

              <Divider />
              <Flex justify="between" align="center">
                <Button
                  htmlType="button"
                  variant="ghost"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                >
                  Back
                </Button>
                {currentStep < STEP_ITEMS.length - 1 ? (
                  <Button color="primary" htmlType="button" onClick={handleNext}>
                    Next
                  </Button>
                ) : (
                  <Button color="primary" htmlType="submit">
                    Submit
                  </Button>
                )}
              </Flex>
            </Form>
          </Space>
        </Card>
      </Container>
    </div>
  )
}

export default App
