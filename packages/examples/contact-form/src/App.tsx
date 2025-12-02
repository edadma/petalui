import { Form, Input, Button, Modal } from '@edadma/bloomui';

function ContactForm() {
  const handleSubmit = (values: { name: string; email: string }) => {
    Modal.success({
      title: 'Message Sent!',
      content: `Thanks ${values.name}, we'll be in touch.`,
    });
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="name"
        label="Name"
        rules={{ required: true, min: 2 }}
      >
        <Input placeholder="Your name" />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={{ required: true, type: 'email' }}
      >
        <Input placeholder="you@example.com" />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Send Message
      </Button>
    </Form>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-8">
      <div className="card bg-base-200 shadow-xl w-full max-w-md">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">Contact Us</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
