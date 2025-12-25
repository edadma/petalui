import {
  Button,
  Card,
  Checkbox,
  Flex,
  Form,
  Input,
  Modal,
  Row,
  Col,
  Space,
  Typography,
} from '@aster-ui/prefixed'
import { Demo } from '../components/Demo'

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

const SKILLS = [
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
]

// @example-imports: { Button, Card, Checkbox, Code, Flex, Form, Input, notification, Row, Col, Space, Typography } from 'asterui'
export function JobApplicationDemo() {
  // @example-include
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

  const handleSubmit = (values: JobApplicationForm) => {
    Modal.info({
      title: 'Application submitted',
      content: (
        <pre className="max-h-72 overflow-auto text-left">
          <code>{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    })
  }
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Card className="w-full max-w-4xl mx-auto shadow-xl">
        <Space direction="vertical" size="lg" align="stretch" className="w-full">
          <Space direction="vertical" align="center" className="text-center">
            <Typography.Title level={2} className="text-4xl">
              Job Application
            </Typography.Title>
            <Typography.Paragraph className="text-base" align="center">
              Complete this form to apply for a position. All required fields must be filled out.
            </Typography.Paragraph>
          </Space>

          <Form<JobApplicationForm> form={form} onFinish={handleSubmit}>
            <Space direction="vertical">
              <Typography.Title level={4} className="border-b pb-2">
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
                    rules={{ required: 'Email is required', type: 'email' }}
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

            <Space direction="vertical" className="mt-8">
              <Typography.Title level={4} className="border-b pb-2">
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

            <Space direction="vertical" className="mt-8">
              <Typography.Title level={4} className="border-b pb-2">
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
                                pattern: { value: /^\d{4}$/, message: 'Must be a 4-digit year' },
                              }}
                            >
                              <Input className="w-full" placeholder="2020" />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Space>
                    ))}

                    <Button
                      onClick={() => add({ school: '', degree: '', field: '', graduationYear: '' })}
                      className="w-full"
                    >
                      Add Education
                    </Button>
                  </>
                )}
              </Form.List>
            </Space>

            <Space direction="vertical" className="mt-8">
              <Typography.Title level={4} className="border-b pb-2">
                Skills
              </Typography.Title>
              <Typography.Text type="secondary" className="text-sm">
                Select all that apply
              </Typography.Text>

              <Row cols={30} gutter={16}>
                {SKILLS.map((skill) => (
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

            <Space direction="vertical" className="mt-8">
              <Typography.Title level={4} className="border-b pb-2">
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
                              rules={{ required: 'Email is required', type: 'email' }}
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
              <Button color="primary" htmlType="submit" className="w-full" size="lg">
                Submit Application
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </Card>
      {/* @example-return-end */}
    </Demo>
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
            rules={{ required: !currentlyWorking ? 'End date is required' : false }}
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
        rules={{ required: 'Description is required' }}
      >
        <Input className="w-full" placeholder="Describe your responsibilities and achievements..." />
      </Form.Item>
    </Space>
  )
}
