import React, { useState } from 'react';
import { Steps, Button, notification } from '@aster-ui/prefixed';
import { CheckIcon, DocumentTextIcon, CreditCardIcon, TruckIcon } from '@aster-ui/icons-prefixed';
import { Demo } from './Demo';

// @example-imports: { Steps } from 'asterui'
export const BasicDemo: React.FC = () => (
  <Demo>
    {/* @example-return */}
    <Steps>
      <Steps.Step color="primary">Register</Steps.Step>
      <Steps.Step color="primary">Choose plan</Steps.Step>
      <Steps.Step>Purchase</Steps.Step>
      <Steps.Step>Receive Product</Steps.Step>
    </Steps>
    {/* @example-return-end */}
  </Demo>
);

// @example-imports: { Steps } from 'asterui'
export const VerticalDemo: React.FC = () => (
  <Demo>
    {/* @example-return */}
    <Steps direction="vertical">
      <Steps.Step color="primary">Register</Steps.Step>
      <Steps.Step color="primary">Choose plan</Steps.Step>
      <Steps.Step>Purchase</Steps.Step>
      <Steps.Step>Receive Product</Steps.Step>
    </Steps>
    {/* @example-return-end */}
  </Demo>
);

// @example-imports: { Steps } from 'asterui'
export const ColorsDemo: React.FC = () => (
  <Demo>
    {/* @example-return */}
    <Steps>
      <Steps.Step color="info">Research</Steps.Step>
      <Steps.Step color="info">Design</Steps.Step>
      <Steps.Step color="warning">Develop</Steps.Step>
      <Steps.Step color="success">Deploy</Steps.Step>
    </Steps>
    {/* @example-return-end */}
  </Demo>
);

// @example-imports: { Steps } from 'asterui'
export const CustomContentDemo: React.FC = () => (
  <Demo>
    {/* @example-return */}
    <Steps>
      <Steps.Step color="primary" dataContent="?">Step 1</Steps.Step>
      <Steps.Step color="primary" dataContent="!">Step 2</Steps.Step>
      <Steps.Step dataContent="✓">Step 3</Steps.Step>
      <Steps.Step dataContent="✕">Step 4</Steps.Step>
    </Steps>
    {/* @example-return-end */}
  </Demo>
);

// @example-imports: { Steps } from 'asterui'
export const ResponsiveDemo: React.FC = () => (
  <Demo>
    {/* @example-return */}
    <Steps className="steps-vertical lg:steps-horizontal">
      <Steps.Step color="primary">Register</Steps.Step>
      <Steps.Step color="primary">Choose plan</Steps.Step>
      <Steps.Step>Purchase</Steps.Step>
      <Steps.Step>Receive Product</Steps.Step>
    </Steps>
    {/* @example-return-end */}
  </Demo>
);

// @example-imports: { Steps, Button } from 'asterui'
// @example-imports: { useState } from 'react'
export const CurrentDemo: React.FC = () => {
  // @example-include
  const [current, setCurrent] = useState(1);
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <div className="space-y-4">
        <Steps current={current}>
          <Steps.Step>Register</Steps.Step>
          <Steps.Step>Verify Email</Steps.Step>
          <Steps.Step>Setup Profile</Steps.Step>
          <Steps.Step>Complete</Steps.Step>
        </Steps>
        <div className="flex gap-2">
          <Button size="sm" onClick={() => setCurrent(Math.max(0, current - 1))} disabled={current === 0}>
            Previous
          </Button>
          <Button size="sm" color="primary" onClick={() => setCurrent(Math.min(3, current + 1))} disabled={current === 3}>
            Next
          </Button>
        </div>
      </div>
      {/* @example-return-end */}
    </Demo>
  );
};

// @example-imports: { Steps, notification } from 'asterui'
// @example-imports: { useState } from 'react'
export const DataDrivenDemo: React.FC = () => {
  // @example-include
  const [current, setCurrent] = useState(1);

  const items = [
    { key: 'cart', title: 'Cart' },
    { key: 'address', title: 'Address' },
    { key: 'payment', title: 'Payment' },
    { key: 'confirm', title: 'Confirm' },
  ];
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Steps
        items={items}
        current={current}
        onChange={(step) => {
          setCurrent(step);
          notification.info({ message: `Navigated to step ${step + 1}` });
        }}
      />
      {/* @example-return-end */}
    </Demo>
  );
};

// @example-imports: { Steps } from 'asterui'
// @example-imports: { CheckIcon, DocumentTextIcon, CreditCardIcon, TruckIcon } from '@aster-ui/icons'
export const WithIconsDemo: React.FC = () => (
  <Demo>
    {/* @example-return */}
    <Steps>
      <Steps.Step color="primary" icon={<CheckIcon size="sm" />}>
        Order Placed
      </Steps.Step>
      <Steps.Step color="primary" icon={<DocumentTextIcon size="sm" />}>
        Processing
      </Steps.Step>
      <Steps.Step icon={<CreditCardIcon size="sm" />}>
        Payment
      </Steps.Step>
      <Steps.Step icon={<TruckIcon size="sm" />}>
        Delivery
      </Steps.Step>
    </Steps>
    {/* @example-return-end */}
  </Demo>
);
