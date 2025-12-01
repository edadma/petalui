import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Navbar,
  ThemeController,
  Form,
  Input,
  InputNumber,
  Textarea,
  Checkbox,
  Radio,
  Select,
  DatePicker,
  TimePicker,
  Range,
  Rating,
  Toggle,
  FileInput,
  Autocomplete,
  Button,
  Card,
  Space,
  Row,
  Col,
  Divider,
} from '@edadma/bloomui'

interface ComprehensiveFormData {
  // Text inputs
  username: string
  email: string
  bio: string

  // Number inputs
  age: number
  experience: number
  salary: number

  // Selection inputs
  country: string
  favoriteColor: string
  skills: string[]
  programmingLanguage: string

  // Date and time
  birthDate: Date
  appointmentTime: Date

  // Range and rating
  satisfaction: number
  productRating: number

  // Toggle and checkbox
  newsletter: boolean
  terms: boolean
  notifications: boolean

  // Autocomplete
  city: string

  // File upload
  resume: FileList
}

const countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
]

const cityOptions = [
  { value: 'new-york', label: 'New York' },
  { value: 'los-angeles', label: 'Los Angeles' },
  { value: 'chicago', label: 'Chicago' },
  { value: 'houston', label: 'Houston' },
  { value: 'phoenix', label: 'Phoenix' },
  { value: 'philadelphia', label: 'Philadelphia' },
  { value: 'san-antonio', label: 'San Antonio' },
  { value: 'san-diego', label: 'San Diego' },
]

function App() {
  const [submittedData, setSubmittedData] = useState<ComprehensiveFormData | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<ComprehensiveFormData>({
    defaultValues: {
      username: '',
      email: '',
      bio: '',
      age: 25,
      experience: 0,
      salary: 50000,
      country: '',
      favoriteColor: '',
      skills: [],
      programmingLanguage: '',
      birthDate: new Date(),
      appointmentTime: new Date(new Date().setHours(9, 0, 0, 0)),
      satisfaction: 50,
      productRating: 3,
      newsletter: false,
      terms: false,
      notifications: true,
      city: '',
    },
  })

  const handleSubmit = async (values: ComprehensiveFormData) => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSubmittedData(values)
    setIsSubmitting(false)
  }

  return (
    <>
      <Navbar
        className="bg-base-100 shadow-lg"
        start={<a className="text-xl font-bold">Comprehensive Form Example</a>}
        end={<ThemeController.Swap />}
      />

      <div className="p-6">
        <Space size="lg" className="max-w-6xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl font-bold">All Components Form Integration</h1>
            <p className="text-lg mt-4">
              This form demonstrates all controllable components working seamlessly with the Form
              component without explicit hookup.
            </p>
          </div>

          <Card className="shadow-xl">
            <Form<ComprehensiveFormData> form={form} onFinish={handleSubmit}>
              <Space size="md">
                {/* Text Inputs */}
                <div>
                  <h2 className="text-2xl font-bold mb-4">Text Inputs</h2>
                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="username"
                        label="Username"
                        rules={{ required: 'Username is required' }}
                      >
                        <Input placeholder="Enter your username" />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                      <Form.Item
                        name="email"
                        label="Email"
                        rules={{
                          required: 'Email is required',
                          type: 'email',
                        }}
                      >
                        <Input type="email" placeholder="your.email@example.com" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    name="bio"
                    label="Biography"
                    rules={{
                      required: 'Bio is required',
                      min: { value: 20, message: 'Bio must be at least 20 characters' },
                    }}
                  >
                    <Textarea
                      placeholder="Tell us about yourself..."
                      rows={4}
                    />
                  </Form.Item>
                </div>

                <Divider />

                {/* Number Inputs */}
                <div>
                  <h2 className="text-2xl font-bold mb-4">Number Inputs</h2>
                  <Row gutter={16}>
                    <Col xs={24} md={8}>
                      <Form.Item
                        name="age"
                        label="Age"
                        rules={{
                          required: 'Age is required',
                          min: { value: 18, message: 'Must be at least 18' },
                          max: { value: 120, message: 'Must be under 120' },
                        }}
                      >
                        <InputNumber min={18} max={120} />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={8}>
                      <Form.Item
                        name="experience"
                        label="Years of Experience"
                        rules={{ required: 'Experience is required' }}
                      >
                        <InputNumber min={0} max={50} step={1} />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={8}>
                      <Form.Item
                        name="salary"
                        label="Expected Salary"
                        rules={{ required: 'Salary is required' }}
                      >
                        <InputNumber
                          min={0}
                          max={1000000}
                          step={5000}
                          formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          parser={(value) => parseFloat(value.replace(/\$\s?|(,*)/g, ''))}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </div>

                <Divider />

                {/* Selection Inputs */}
                <div>
                  <h2 className="text-2xl font-bold mb-4">Selection Inputs</h2>

                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="country"
                        label="Country"
                        rules={{ required: 'Country is required' }}
                      >
                        <Select>
                          <option value="">Select your country</option>
                          {countryOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                      <Form.Item
                        name="city"
                        label="City"
                        rules={{ required: 'City is required' }}
                      >
                        <Autocomplete
                          options={cityOptions}
                          placeholder="Search for a city..."
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    name="programmingLanguage"
                    label="Preferred Programming Language"
                    rules={{ required: 'Please select a language' }}
                  >
                    <Radio.Group>
                      <Space size="sm">
                        <Radio value="javascript">JavaScript</Radio>
                        <Radio value="typescript">TypeScript</Radio>
                        <Radio value="python">Python</Radio>
                        <Radio value="rust">Rust</Radio>
                        <Radio value="scala">Scala</Radio>
                        <Radio value="java">Java</Radio>
                        <Radio value="go">Go</Radio>
                      </Space>
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item name="skills" label="Skills (select all that apply)">
                    <Checkbox.Group>
                      <Row cols={120} gutter={16}>
                        <Col xs={60} md={30}>
                          <Checkbox value="react">React</Checkbox>
                        </Col>
                        <Col xs={60} md={30}>
                          <Checkbox value="vue">Vue</Checkbox>
                        </Col>
                        <Col xs={60} md={30}>
                          <Checkbox value="angular">Angular</Checkbox>
                        </Col>
                        <Col xs={60} md={30}>
                          <Checkbox value="node">Node.js</Checkbox>
                        </Col>
                      </Row>
                    </Checkbox.Group>
                  </Form.Item>

                  <Form.Item
                    name="favoriteColor"
                    label="Favorite Color"
                    rules={{ required: 'Color is required' }}
                  >
                    <Select>
                      <option value="">Choose your favorite color</option>
                      <option value="red">Red</option>
                      <option value="blue">Blue</option>
                      <option value="green">Green</option>
                      <option value="yellow">Yellow</option>
                      <option value="purple">Purple</option>
                      <option value="orange">Orange</option>
                    </Select>
                  </Form.Item>
                </div>

                <Divider />

                {/* Date and Time */}
                <div>
                  <h2 className="text-2xl font-bold mb-4">Date and Time</h2>

                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="birthDate"
                        label="Birth Date"
                        rules={{ required: 'Birth date is required' }}
                      >
                        <DatePicker />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                      <Form.Item
                        name="appointmentTime"
                        label="Preferred Appointment Time"
                        rules={{ required: 'Time is required' }}
                      >
                        <TimePicker />
                      </Form.Item>
                    </Col>
                  </Row>
                </div>

                <Divider />

                {/* Range and Rating */}
                <div>
                  <h2 className="text-2xl font-bold mb-4">Range and Rating</h2>

                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="satisfaction"
                        label="Satisfaction Level"
                        rules={{ required: 'Please rate your satisfaction' }}
                      >
                        <Range min={0} max={100} step={1} />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                      <Form.Item
                        name="productRating"
                        label="Product Rating"
                        rules={{
                          required: 'Please rate the product',
                          min: { value: 1, message: 'Rating must be at least 1' },
                        }}
                      >
                        <Rating>
                          <Rating.Item value={1} />
                          <Rating.Item value={2} />
                          <Rating.Item value={3} />
                          <Rating.Item value={4} />
                          <Rating.Item value={5} />
                        </Rating>
                      </Form.Item>
                    </Col>
                  </Row>
                </div>

                <Divider />

                {/* File Upload */}
                <div>
                  <h2 className="text-2xl font-bold mb-4">File Upload</h2>

                  <Form.Item
                    name="resume"
                    label="Resume / CV"
                    rules={{ required: 'Please upload your resume' }}
                  >
                    <FileInput />
                  </Form.Item>
                </div>

                <Divider />

                {/* Toggle and Checkbox */}
                <div>
                  <h2 className="text-2xl font-bold mb-4">Toggles and Checkboxes</h2>

                  <Space>
                    <Form.Item name="newsletter" valuePropName="checked">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <Toggle />
                        <span>Subscribe to newsletter</span>
                      </label>
                    </Form.Item>

                    <Form.Item name="notifications" valuePropName="checked">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <Toggle />
                        <span>Enable notifications</span>
                      </label>
                    </Form.Item>

                    <Form.Item
                      name="terms"
                      valuePropName="checked"
                      rules={{
                        validate: (value) => value === true || 'You must accept the terms',
                      }}
                    >
                      <label className="flex items-center gap-2 cursor-pointer">
                        <Checkbox />
                        <span>
                          I agree to the <a className="link link-primary">terms and conditions</a>
                        </span>
                      </label>
                    </Form.Item>
                  </Space>
                </div>

                <div className="form-control mt-8">
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isSubmitting}
                    className="w-full"
                    size="lg"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Form'}
                  </Button>
                </div>
              </Space>
            </Form>
          </Card>

          {submittedData && (
            <Card className="shadow-xl" title="Form Submitted Successfully">
              <p className="mb-4">
                All components integrated seamlessly! Here's the submitted data:
              </p>
              <pre className="text-sm overflow-auto bg-base-200 p-4 rounded max-h-96">
                {JSON.stringify(submittedData, null, 2)}
              </pre>
            </Card>
          )}
        </Space>
      </div>
    </>
  )
}

export default App
