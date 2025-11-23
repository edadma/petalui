import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { Navbar, ThemeController, Form, Input, Button, Card, Checkbox, Space, Row, Col } from '@edadma/petalui'

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
  const [submittedData, setSubmittedData] = useState<JobApplicationForm | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const form = useForm<JobApplicationForm>({
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
    setSubmittedData(values)
    setIsSubmitting(false)
  }

  return (
    <>
      <Navbar
        className="bg-base-100 shadow-lg"
        start={<a className="text-xl font-bold">Job Application Form</a>}
        end={<ThemeController.Swap />}
      />

      <div className="p-6">
        <Space size="lg" className="max-w-4xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl font-bold">Job Application</h1>
            <p className="text-lg mt-4">
              Complete this form to apply for a position. All required fields must be filled out.
            </p>
          </div>

          <Card className="shadow-xl">
            <Form<JobApplicationForm> form={form} onFinish={handleSubmit}>
              {/* Personal Information */}
              <Space>
                <h2 className="text-2xl font-bold border-b pb-2">Personal Information</h2>

                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="firstName"
                      label="First Name"
                      rules={{ required: 'First name is required' }}
                    >
                      <Input placeholder="John" />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      name="lastName"
                      label="Last Name"
                      rules={{ required: 'Last name is required' }}
                    >
                      <Input placeholder="Doe" />
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
                      <Input type="email" placeholder="john@example.com" />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      name="phone"
                      label="Phone"
                      rules={{
                        required: 'Phone is required',
                        pattern: {
                          value: /^\+?[\d\s\-()]+$/,
                          message: 'Invalid phone number',
                        },
                      }}
                    >
                      <Input placeholder="+1 (555) 123-4567" />
                    </Form.Item>
                  </Col>
                </Row>
              </Space>

              {/* Work Experience */}
              <Space className="mt-8">
                <h2 className="text-2xl font-bold border-b pb-2">Work Experience</h2>

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

                      <Button onClick={() => add({ company: '', position: '', startDate: '', currentlyWorking: false, description: '' })} className="w-full">
                        Add Work Experience
                      </Button>
                    </>
                  )}
                </Form.List>
              </Space>

              {/* Education */}
              <Space className="mt-8">
                <h2 className="text-2xl font-bold border-b pb-2">Education</h2>

                <Form.List name="education">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map((field: any, index) => (
                        <Space
                          key={field.id}
                          className="border border-base-300 rounded-lg p-4"
                        >
                          <div className="flex justify-between items-center">
                            <h3 className="font-semibold">Education {index + 1}</h3>
                            {fields.length > 1 && (
                              <Button size="sm" onClick={() => remove(index)} type="error">
                                Remove
                              </Button>
                            )}
                          </div>

                          <Row gutter={16}>
                            <Col xs={24} md={12}>
                              <Form.Item
                                name={[field.name, 'school']}
                                label="School/University"
                                rules={{ required: 'School is required' }}
                              >
                                <Input placeholder="University of Example" />
                              </Form.Item>
                            </Col>

                            <Col xs={24} md={12}>
                              <Form.Item
                                name={[field.name, 'degree']}
                                label="Degree"
                                rules={{ required: 'Degree is required' }}
                              >
                                <Input placeholder="Bachelor of Science" />
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
                                <Input placeholder="Computer Science" />
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
                                <Input placeholder="2020" />
                              </Form.Item>
                            </Col>
                          </Row>
                        </Space>
                      ))}

                      <Button onClick={() => add({ school: '', degree: '', field: '', graduationYear: '' })} className="w-full">
                        Add Education
                      </Button>
                    </>
                  )}
                </Form.List>
              </Space>

              {/* Skills */}
              <Space className="mt-8">
                <h2 className="text-2xl font-bold border-b pb-2">Skills</h2>
                <p className="text-sm text-base-content/70">Select all that apply</p>

                <Row cols={120} gutter={16}>
                  {['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java', 'SQL', 'Git', 'Docker', 'Kubernetes', 'AWS', 'GraphQL', 'MongoDB', 'Redis', 'Go'].map((skill) => (
                    <Col key={skill} xs={60} md={24}>
                      <Form.Item name="skills" valuePropName="checked">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <Checkbox value={skill} />
                          <span>{skill}</span>
                        </label>
                      </Form.Item>
                    </Col>
                  ))}
                </Row>
              </Space>

              {/* References */}
              <Space className="mt-8">
                <h2 className="text-2xl font-bold border-b pb-2">References (Optional)</h2>

                <Form.List name="references">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map((field: any, index) => (
                        <Space
                          key={field.id}
                          className="border border-base-300 rounded-lg p-4"
                        >
                          <div className="flex justify-between items-center">
                            <h3 className="font-semibold">Reference {index + 1}</h3>
                            <Button size="sm" onClick={() => remove(index)} type="error">
                              Remove
                            </Button>
                          </div>

                          <Row gutter={16}>
                            <Col xs={24} md={12}>
                              <Form.Item
                                name={[field.name, 'name']}
                                label="Name"
                                rules={{ required: 'Name is required' }}
                              >
                                <Input placeholder="Jane Smith" />
                              </Form.Item>
                            </Col>

                            <Col xs={24} md={12}>
                              <Form.Item
                                name={[field.name, 'company']}
                                label="Company"
                                rules={{ required: 'Company is required' }}
                              >
                                <Input placeholder="Example Corp" />
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
                                <Input placeholder="Manager" />
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
                                <Input type="email" placeholder="jane@example.com" />
                              </Form.Item>
                            </Col>

                            <Col xs={24} md={8}>
                              <Form.Item
                                name={[field.name, 'phone']}
                                label="Phone"
                                rules={{ required: 'Phone is required' }}
                              >
                                <Input placeholder="+1 (555) 987-6543" />
                              </Form.Item>
                            </Col>
                          </Row>
                        </Space>
                      ))}

                      <Button onClick={() => add({ name: '', company: '', position: '', email: '', phone: '' })} className="w-full">
                        Add Reference
                      </Button>
                    </>
                  )}
                </Form.List>
              </Space>

              <div className="form-control mt-8">
                <Button type="primary" htmlType="submit" loading={isSubmitting} className="w-full" size="lg">
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </Button>
              </div>
            </Form>
          </Card>

          {submittedData && (
            <Card className="shadow-xl" title="Application Submitted Successfully">
              <p className="mb-4">Thank you for your application! Here's what you submitted:</p>
              <pre className="text-sm overflow-auto bg-base-200 p-4 rounded">
                {JSON.stringify(submittedData, null, 2)}
              </pre>
            </Card>
          )}
        </Space>
      </div>
    </>
  )
}

function WorkExperienceField({ field, index, remove, canRemove, form }: any) {
  const currentlyWorking = useWatch({
    control: form.control,
    name: `workExperience.${index}.currentlyWorking`,
  })

  return (
    <Space className="border border-base-300 rounded-lg p-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Work Experience {index + 1}</h3>
        {canRemove && (
          <Button size="sm" onClick={() => remove(index)} type="error">
            Remove
          </Button>
        )}
      </div>

      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            name={[field.name, 'company']}
            label="Company"
            rules={{ required: 'Company is required' }}
          >
            <Input placeholder="Example Corp" />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            name={[field.name, 'position']}
            label="Position"
            rules={{ required: 'Position is required' }}
          >
            <Input placeholder="Software Engineer" />
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
            <Input type="date" />
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
            <Input type="date" disabled={currentlyWorking} />
          </Form.Item>
        </Col>

        <Col xs={24} md={8}>
          <Form.Item name={[field.name, 'currentlyWorking']} valuePropName="checked">
            <label className="flex items-center gap-2 cursor-pointer mt-8">
              <Checkbox />
              <span>Currently working</span>
            </label>
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
        <Input placeholder="Describe your responsibilities and achievements..." />
      </Form.Item>
    </Space>
  )
}

export default App
