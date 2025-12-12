import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { TimePicker, Form, Button, Space, Typography, Row, Col, notification } from 'asterui';

const { Text } = Typography;

const demos: Record<string, React.ReactNode> = {
  basic: <TimePicker placeholder="Select time" />,
  '12-hour': <TimePicker format="12" placeholder="Select time" />,
  seconds: <TimePicker showSeconds placeholder="Select time" />,
  disabled: <TimePicker disabled defaultValue={new Date()} />,
  steps: <TimePicker minuteStep={15} placeholder="Select time (15 min intervals)" />,
};

function ControlledDemo() {
  const [time, setTime] = useState<Date | null>(null);

  return (
    <Space direction="vertical">
      <TimePicker value={time} onChange={setTime} />
      <Text size="sm" muted>
        Selected: {time ? time.toLocaleTimeString() : 'None'}
      </Text>
    </Space>
  );
}

function SizesDemo() {
  return (
    <Space direction="vertical">
      <TimePicker size="xs" placeholder="Extra small" />
      <TimePicker size="sm" placeholder="Small" />
      <TimePicker size="md" placeholder="Medium" />
      <TimePicker size="lg" placeholder="Large" />
    </Space>
  );
}

function FormDemo() {
  const handleSubmit = (values: Record<string, unknown>) => {
    const startTime = values.startTime as Date | null;
    const endTime = values.endTime as Date | null;
    notification.success({
      message: 'Form Submitted',
      description: `Start: ${startTime?.toLocaleTimeString() || 'Not set'}, End: ${endTime?.toLocaleTimeString() || 'Not set'}`,
    });
  };

  return (
    <Form onFinish={handleSubmit}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="startTime" label="Start Time" rules={{ required: 'Please select start time' }}>
            <TimePicker placeholder="Start" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="endTime" label="End Time">
            <TimePicker placeholder="End" />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button htmlType="submit" color="primary">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

const statefulDemos: Record<string, React.FC> = {
  controlled: ControlledDemo,
  sizes: SizesDemo,
  form: FormDemo,
};

document.querySelectorAll('.demo-container').forEach((container) => {
  const example = container.getAttribute('data-example');
  if (example) {
    const root = createRoot(container);
    const StatefulComponent = statefulDemos[example];
    if (StatefulComponent) {
      root.render(<StatefulComponent />);
    } else if (demos[example]) {
      root.render(<>{demos[example]}</>);
    }
  }
});
