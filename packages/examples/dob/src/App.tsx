import { useEffect, useMemo } from 'react'
import {
  Button,
  Card,
  Container,
  Divider,
  Flex,
  Form,
  Modal,
  Row,
  Col,
  Select,
  Space,
  ThemeController,
  Typography,
} from 'asterui'

interface DobForm {
  dobMonth?: string
  dobDay?: string
  dobYear?: string
}

const MONTHS = [
  { value: '1', label: 'January' },
  { value: '2', label: 'February' },
  { value: '3', label: 'March' },
  { value: '4', label: 'April' },
  { value: '5', label: 'May' },
  { value: '6', label: 'June' },
  { value: '7', label: 'July' },
  { value: '8', label: 'August' },
  { value: '9', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
]

function App() {
  const form = Form.useForm<DobForm>()
  const dobMonth = Form.useWatch({ control: form.control, name: 'dobMonth' })
  const dobYear = Form.useWatch({ control: form.control, name: 'dobYear' })
  const dobDay = Form.useWatch({ control: form.control, name: 'dobDay' })

  const dayOptions = useMemo(() => {
    if (!dobMonth) return Array.from({ length: 31 }, (_, i) => `${i + 1}`)
    const month = Number(dobMonth)
    const year = dobYear ? Number(dobYear) : 2001
    const daysInMonth = new Date(year, month, 0).getDate()
    return Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`)
  }, [dobMonth, dobYear])

  const yearRange = useMemo(() => {
    const currentYear = new Date().getFullYear()
    return Array.from({ length: 120 }, (_, i) => String(currentYear - i))
  }, [])

  useEffect(() => {
    if (dobDay && !dayOptions.includes(dobDay)) {
      form.setFieldValue('dobDay', undefined)
    }
  }, [dobDay, dayOptions, form])

  const handleSubmit = (values: DobForm) => {
    Modal.info({
      title: 'Date of Birth',
      content: (
        <pre className="text-left">
          <code>{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <div className="min-h-screen bg-base-200">
      <Container size="sm" className="py-12">
        <Flex justify="between" align="center" className="mb-6">
          <div>
            <Typography.Title level={3} className="mb-1">Date of Birth</Typography.Title>
            <Typography.Text type="secondary">
              Fast, friendly DOB entry without scrolling through decades.
            </Typography.Text>
          </div>
          <ThemeController.Swap />
        </Flex>

        <Card className="shadow-xl">
          <Form form={form} onFinish={handleSubmit}>
            <Form.Item label="Date of Birth" required>
              <Row gutter={12}>
                <Col xs={24} md={8}>
                  <Form.Item
                    name="dobMonth"
                    rules={{ required: 'Month is required' }}
                  >
                    <Select>
                      <option value="">Month</option>
                      {MONTHS.map((month) => (
                        <option key={month.value} value={month.value}>
                          {month.label}
                        </option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Item
                    name="dobDay"
                    rules={{ required: 'Day is required' }}
                  >
                    <Select>
                      <option value="">Day</option>
                      {dayOptions.map((day) => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Item
                    name="dobYear"
                    rules={{
                      required: 'Year is required',
                      validate: (value) => {
                        if (!value || !dobMonth || !dobDay) return true
                        const year = Number(value)
                        const month = Number(dobMonth) - 1
                        const day = Number(dobDay)
                        const birthDate = new Date(year, month, day)
                        if (Number.isNaN(birthDate.getTime())) return 'Enter a valid date'
                        const today = new Date()
                        let age = today.getFullYear() - birthDate.getFullYear()
                        const hasHadBirthday =
                          today.getMonth() > birthDate.getMonth() ||
                          (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate())
                        if (!hasHadBirthday) age -= 1
                        return age >= 13 || 'You must be at least 13 years old'
                      },
                    }}
                  >
                    <Select>
                      <option value="">Year</option>
                      {yearRange.map((year) => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>

            <Divider />

            <Space size="sm">
              <Button htmlType="button" variant="ghost" onClick={() => form.resetFields()}>
                Reset
              </Button>
              <Button color="primary" htmlType="submit">
                Save
              </Button>
            </Space>
          </Form>
        </Card>
      </Container>
    </div>
  )
}

export default App
