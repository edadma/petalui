import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { TimePicker, Form, Button, Modal, Space, Typography, Row, Col } from 'asterui';

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
  const [submittedData, setSubmittedData] = useState<Record<string, unknown> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (values: Record<string, unknown>) => {
    setSubmittedData(values);
    setIsModalOpen(true);
  };

  return (
    <>
      <Form onFinish={handleSubmit}>
        <Form.Item
          name="startTime"
          label="Start Time"
          required
          rules={{ required: 'Please select start time' }}
        >
          <TimePicker placeholder="HH:MM" />
        </Form.Item>

        <Form.Item name="endTime" label="End Time">
          <TimePicker format="12" />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" color="primary">
            Submit
          </Button>
        </Form.Item>
      </Form>

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        title="Form Submitted"
        footer={null}
      >
        <div className="py-4">
          <p className="mb-4">Form data:</p>
          <pre className="bg-base-200 p-4 rounded-lg overflow-auto max-h-96">
            {JSON.stringify(submittedData, null, 2)}
          </pre>
        </div>
      </Modal>
    </>
  );
}

function TimeRangeDemo() {
  return (
    <Form>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Start Time" name="startTime">
            <TimePicker placeholder="Start" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="End Time" name="endTime">
            <TimePicker placeholder="End" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

const statefulDemos: Record<string, React.FC> = {
  controlled: ControlledDemo,
  sizes: SizesDemo,
  form: FormDemo,
  'time-range': TimeRangeDemo,
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
