import React from 'react';
import { Result, Button, Space } from '@aster-ui/prefixed';
import { Demo } from './Demo';

// @example-imports: { Result, Button, Space } from 'asterui'
export function SuccessResultDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Result
        status="success"
        title="Payment Successful"
        subTitle="Your order has been confirmed and will be shipped within 2 business days."
        extra={
          <Space>
            <Button color="primary">View Order</Button>
            <Button>Continue Shopping</Button>
          </Space>
        }
      />
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Result, Button } from 'asterui'
export function ErrorResultDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Result
        status="error"
        title="Submission Failed"
        subTitle="Please check your information and try again."
        extra={<Button color="error">Try Again</Button>}
      />
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Result } from 'asterui'
export function InfoResultDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Result
        status="info"
        title="Verification Required"
        subTitle="Please check your email to verify your account."
      />
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Result, Button } from 'asterui'
export function WarningResultDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Result
        status="warning"
        title="Account Suspended"
        subTitle="Your account has been suspended due to unusual activity."
        extra={<Button color="warning">Contact Support</Button>}
      />
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Result, Button } from 'asterui'
export function NotFoundResultDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Result
        status="404"
        title="Page Not Found"
        subTitle="The page you are looking for does not exist."
        extra={<Button color="primary">Back Home</Button>}
      />
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Result, Button } from 'asterui'
export function ForbiddenResultDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Result
        status="403"
        title="Access Denied"
        subTitle="You don't have permission to access this resource."
        extra={<Button>Request Access</Button>}
      />
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Result, Button } from 'asterui'
export function ServerErrorResultDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Result
        status="500"
        title="Server Error"
        subTitle="Something went wrong on our end. Please try again later."
        extra={<Button color="primary">Refresh Page</Button>}
      />
      {/* @example-return-end */}
    </Demo>
  );
}
