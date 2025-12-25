import { useState } from 'react'
import {
  Navbar,
  ThemeController,
  Form,
  Input,
  Button,
  Card,
  Checkbox,
  Code,
  Container,
  Flex,
  notification,
  Space,
  Row,
  Col,
  Typography,
} from 'asterui'

interface WorkExperience {
  company: string
  position: string
  startDate: string
  endDate?: string
  currentlyWorking: boolean
  description: string
}

interface Education {
  school: string
  degree: string
  field: string
  graduationYear: string
}

interface Reference {
  name: string
  company: string
  position: string
  email: string
  phone: string
}

interface JobApplicationForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  workExperience: WorkExperience[]
  education: Education[]
  skills: string[]
  references: Reference[]
}

function App() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const form = Form.useForm<JobApplicationForm>({
    defaultValues: {
      workExperience: [
        { company: '', position: '', startDate: '', currentlyWorking: false, description: '' },
      ],
      education: [{ school: '', degree: '', field: '', graduationYear: '' }],
      skills: [],
      references: [],
    },
  })

  const handleSubmit = async (values: JobApplicationForm) => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const formatted = JSON.stringify(values, null, 2)
    notification.info({
      message: 'Application submitted',
      description: (
        <Code className="max-h-60 overflow-auto" copyable={formatted}>
          {formatted.split('\n').map((line, index) => (
            <Code.Line key={index} prefix=" ">
              {line}
            </Code.Line>
          ))}
        </Code>
      ),
    })
    setIsSubmitting(false)
  }

  return (
    <>
      <Navbar
        className="bg-base-100 shadow-lg"
        start={<Typography.Text strong className="text-xl">Job Application Form</Typography.Text>}
        end={<ThemeController.Swap />}
      />

      <Container size="lg" className="py-6">
        <Space direction="vertical" size="lg" align="stretch" className="w-full">
          <Space direction="vertical" align="center" className="text-center">
            <Typography.Title level={1} className="text-5xl">Job Application</Typography.Title>
            <Typography.Paragraph className="text-lg" align="center">
              Complete this form to apply for a position. All required fields must be filled out.
            </Typography.Paragraph>
          </Space>

          <Card className="shadow-xl max-w-3xl mx-auto w-full">
            <Form<JobApplicationForm> form={form} onFinish={handleSubmit}>
              {/* Personal Information */}
              <Space direction="vertical">
                <Typography.Title level={3} className="border-b pb-2">
                  Personal Information
                </Typography.Title>

                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="firstName"
                      label="First Name"
                      rules={{ required: 'First name is required' }}
                    >
                      <Input className="w-full" placeholder="John" />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      name="lastName"
                      label="Last Name"
                      rules={{ required: 'Last name is required' }}
                    >
                      <Input className="w-full" placeholder="Doe" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={{
                        required: 'Email is required',
                        type: 'email',
                      }}
                    >
                      <Input className="w-full" type="email" placeholder="john@example.com" />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      name="phone"
                      label="Phone"
                      validateTrigger="onBlur"
                      rules={{
                        required: 'Phone is required',
                        validate: (value) => {
                          if (!value) return true
                          const digits = value.replace(/\D/g, '')
                          return digits.length >= 11 || 'Phone number is incomplete'
                        },
                      }}
                    >
                      <Input
                        className="w-full"
                        mask="+# (###) ###-####"
                        placeholder="+1 (555) 123-4567"
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Space>

              {/* Work Experience */}
              <Space direction="vertical" className="mt-8">
                <Typography.Title level={3} className="border-b pb-2">
                  Work Experience
                </Typography.Title>

                <Form.List name="workExperience">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map((field: any, index) => (
                        <WorkExperienceField
                          key={field.id}
                          field={field}
                          index={index}
                          remove={remove}
                          canRemove={fields.length > 1}
                          form={form}
                        />
                      ))}

                      <Button
                        onClick={() =>
                          add({
                            company: '',
                            position: '',
                            startDate: '',
                            currentlyWorking: false,
                            description: '',
                          })
                        }
                        className="w-full"
                      >
                        Add Work Experience
                      </Button>
                    </>
                  )}
                </Form.List>
              </Space>

              {/* Education */}
              <Space direction="vertical" className="mt-8">
                <Typography.Title level={3} className="border-b pb-2">
                  Education
                </Typography.Title>

                <Form.List name="education">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map((field: any, index) => (
                        <Space
                          key={field.id}
                          direction="vertical"
                          className="border border-base-300 rounded-lg p-4"
                        >
                          <Flex justify="between" align="center">
                            <Typography.Text strong>Education {index + 1}</Typography.Text>
                            {fields.length > 1 && (
                              <Button size="sm" onClick={() => remove(index)} color="error">
                                Remove
                              </Button>
                            )}
                          </Flex>

                          <Row gutter={16}>
                            <Col xs={24} md={12}>
                              <Form.Item
                                name={[field.name, 'school']}
                                label="School/University"
                                rules={{ required: 'School is required' }}
                              >
                                <Input className="w-full" placeholder="University of Example" />
                              </Form.Item>
                            </Col>

                            <Col xs={24} md={12}>
                              <Form.Item
                                name={[field.name, 'degree']}
                                label="Degree"
                                rules={{ required: 'Degree is required' }}
                              >
                                <Input className="w-full" placeholder="Bachelor of Science" />
                              </Form.Item>
                            </Col>
                          </Row>

                          <Row gutter={16}>
                            <Col xs={24} md={12}>
                              <Form.Item
                                name={[field.name, 'field']}
                                label="Field of Study"
                                rules={{ required: 'Field is required' }}
                              >
                                <Input className="w-full" placeholder="Computer Science" />
                              </Form.Item>
                            </Col>

                            <Col xs={24} md={12}>
                              <Form.Item
                                name={[field.name, 'graduationYear']}
                                label="Graduation Year"
                                rules={{
                                  required: 'Graduation year is required',
                                  pattern: {
                                    value: /^\d{4}$/,
                                    message: 'Must be a 4-digit year',
                                  },
                                  validate: (value) => {
                                    const year = parseInt(value)
                                    const currentYear = new Date().getFullYear()
                                    return (
                                      (year >= 1950 && year <= currentYear + 10) ||
                                      'Year must be between 1950 and ' + (currentYear + 10)
                                    )
                                  },
                                }}
                              >
                                <Input className="w-full" placeholder="2020" />
                              </Form.Item>
                            </Col>
                          </Row>
                        </Space>
                      ))}

                      <Button
                        onClick={() =>
                          add({ school: '', degree: '', field: '', graduationYear: '' })
                        }
                        className="w-full"
                      >
                        Add Education
                      </Button>
                    </>
                  )}
                </Form.List>
              </Space>

              {/* Skills */}
              <Space direction="vertical" className="mt-8">
                <Typography.Title level={3} className="border-b pb-2">
                  Skills
                </Typography.Title>
                <Typography.Text type="secondary" className="text-sm">
                  Select all that apply
                </Typography.Text>

                <Row cols={30} gutter={16}>
                  {[
                    'JavaScript',
                    'TypeScript',
                    'React',
                    'Node.js',
                    'Python',
                    'Java',
                    'SQL',
                    'Git',
                    'Docker',
                    'Kubernetes',
                    'AWS',
                    'GraphQL',
                    'MongoDB',
                    'Redis',
                    'Go',
                  ].map((skill) => (
                    <Col key={skill} xs={15} md={6}>
                      <Form.Item name="skills" valuePropName="checked">
                        <Flex align="center" gap="sm" className="cursor-pointer">
                          <Checkbox value={skill} />
                          <Typography.Text>{skill}</Typography.Text>
                        </Flex>
                      </Form.Item>
                    </Col>
                  ))}
                </Row>
              </Space>

              {/* References */}
              <Space direction="vertical" className="mt-8">
                <Typography.Title level={3} className="border-b pb-2">
                  References (Optional)
                </Typography.Title>

                <Form.List name="references">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map((field: any, index) => (
                        <Space
                          key={field.id}
                          direction="vertical"
                          className="border border-base-300 rounded-lg p-4"
                        >
                          <Flex justify="between" align="center">
                            <Typography.Text strong>Reference {index + 1}</Typography.Text>
                            <Button size="sm" onClick={() => remove(index)} color="error">
                              Remove
                            </Button>
                          </Flex>

                          <Row gutter={16}>
                            <Col xs={24} md={12}>
                              <Form.Item
                                name={[field.name, 'name']}
                                label="Name"
                                rules={{ required: 'Name is required' }}
                              >
                                <Input className="w-full" placeholder="Jane Smith" />
                              </Form.Item>
                            </Col>

                            <Col xs={24} md={12}>
                              <Form.Item
                                name={[field.name, 'company']}
                                label="Company"
                                rules={{ required: 'Company is required' }}
                              >
                                <Input className="w-full" placeholder="Example Corp" />
                              </Form.Item>
                            </Col>
                          </Row>

                          <Row gutter={16}>
                            <Col xs={24} md={8}>
                              <Form.Item
                                name={[field.name, 'position']}
                                label="Position"
                                rules={{ required: 'Position is required' }}
                              >
                                <Input className="w-full" placeholder="Manager" />
                              </Form.Item>
                            </Col>

                            <Col xs={24} md={8}>
                              <Form.Item
                                name={[field.name, 'email']}
                                label="Email"
                                rules={{
                                  required: 'Email is required',
                                  type: 'email',
                                }}
                              >
                                <Input className="w-full" type="email" placeholder="jane@example.com" />
                              </Form.Item>
                            </Col>

                            <Col xs={24} md={8}>
                              <Form.Item
                                name={[field.name, 'phone']}
                                label="Phone"
                                rules={{ required: 'Phone is required' }}
                              >
                                <Input className="w-full" placeholder="+1 (555) 987-6543" />
                              </Form.Item>
                            </Col>
                          </Row>
                        </Space>
                      ))}

                      <Button
                        onClick={() =>
                          add({ name: '', company: '', position: '', email: '', phone: '' })
                        }
                        className="w-full"
                      >
                        Add Reference
                      </Button>
                    </>
                  )}
                </Form.List>
              </Space>

              <Form.Item className="mt-8">
                <Button
                  color="primary"
                  htmlType="submit"
                  loading={isSubmitting}
                  className="w-full"
                  size="lg"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Space>
      </Container>
    </>
  )
}

function WorkExperienceField({ field, index, remove, canRemove, form }: any) {
  const currentlyWorking = Form.useWatch({
    control: form.control,
    name: `workExperience.${index}.currentlyWorking`,
  })

  return (
    <Space direction="vertical" className="border border-base-300 rounded-lg p-4">
      <Flex justify="between" align="center">
        <Typography.Text strong>Work Experience {index + 1}</Typography.Text>
        {canRemove && (
          <Button size="sm" onClick={() => remove(index)} color="error">
            Remove
          </Button>
        )}
      </Flex>

      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            name={[field.name, 'company']}
            label="Company"
            rules={{ required: 'Company is required' }}
          >
            <Input className="w-full" placeholder="Example Corp" />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            name={[field.name, 'position']}
            label="Position"
            rules={{ required: 'Position is required' }}
          >
            <Input className="w-full" placeholder="Software Engineer" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} md={8}>
          <Form.Item
            name={[field.name, 'startDate']}
            label="Start Date"
            rules={{ required: 'Start date is required' }}
          >
            <Input className="w-full" type="date" />
          </Form.Item>
        </Col>

        <Col xs={24} md={8}>
          <Form.Item
            name={[field.name, 'endDate']}
            label="End Date"
            rules={{
              required: !currentlyWorking ? 'End date is required' : false,
              validate: (value) => {
                if (currentlyWorking) return true
                const startDate = form.getValues(`workExperience.${index}.startDate`)
                if (!value || !startDate) return true
                return value >= startDate || 'End date must be after start date'
              },
            }}
          >
            <Input className="w-full" type="date" disabled={currentlyWorking} />
          </Form.Item>
        </Col>

        <Col xs={24} md={8}>
          <Form.Item name={[field.name, 'currentlyWorking']} valuePropName="checked">
            <Flex align="center" gap="sm" className="mt-8 cursor-pointer">
              <Checkbox />
              <Typography.Text>Currently working</Typography.Text>
            </Flex>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name={[field.name, 'description']}
        label="Description"
        rules={{
          required: 'Description is required',
          min: { value: 20, message: 'Description must be at least 20 characters' },
        }}
      >
        <Input className="w-full" placeholder="Describe your responsibilities and achievements..." />
      </Form.Item>
    </Space>
  )
}

export default App
