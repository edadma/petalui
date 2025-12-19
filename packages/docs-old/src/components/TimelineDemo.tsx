import React, { useState } from 'react';
import { Timeline, Button, Space } from '@aster-ui/prefixed';
import type { TimelineItemConfig } from '@aster-ui/prefixed';
import { CheckCircleIcon, ClockIcon, ExclamationCircleIcon } from '@aster-ui/icons-prefixed/solid';
import { Demo } from './Demo';

const CheckIcon = () => <CheckCircleIcon />;
const PrimaryCheckIcon = () => <CheckCircleIcon className="text-primary" />;
const ClockIconEl = () => <ClockIcon />;
const AlertIcon = () => <ExclamationCircleIcon />;

// @example-imports: { Timeline } from 'asterui'
// @example-imports: { CheckCircleIcon } from '@aster-ui/icons/solid'
export function BasicDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Timeline>
        <Timeline.Item start="1984" icon={<CheckCircleIcon />} end="First Macintosh computer" endBox />
        <Timeline.Item start="iMac" icon={<CheckCircleIcon />} end="1998" startBox />
      </Timeline>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Timeline } from 'asterui'
// @example-imports: { CheckCircleIcon } from '@aster-ui/icons/solid'
export function VerticalDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Timeline vertical>
        <Timeline.Item start="2015" icon={<CheckCircleIcon className="text-primary" />} end="Apple Watch" endBox />
        <Timeline.Item start="2017" icon={<CheckCircleIcon className="text-primary" />} end="iPhone X" endBox />
        <Timeline.Item start="2020" icon={<CheckCircleIcon className="text-primary" />} end="Apple Silicon M1" endBox />
      </Timeline>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Timeline } from 'asterui'
// @example-imports: { CheckCircleIcon, ClockIcon } from '@aster-ui/icons/solid'
export function HorizontalDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Timeline horizontal>
        <Timeline.Item start="Step 1" icon={<CheckCircleIcon />} end="Planning" endBox />
        <Timeline.Item start="Step 2" icon={<CheckCircleIcon />} end="Development" endBox />
        <Timeline.Item start="Step 3" icon={<ClockIcon />} end="Testing" endBox />
        <Timeline.Item start="Step 4" icon={<ClockIcon />} end="Launch" endBox />
      </Timeline>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Timeline } from 'asterui'
// @example-imports: { CheckCircleIcon } from '@aster-ui/icons/solid'
export function CompactDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Timeline vertical compact>
        <Timeline.Item
          icon={<CheckCircleIcon />}
          end={
            <div>
              <time>1984</time>
              <div className="text-lg font-black">First Macintosh computer</div>
            </div>
          }
          endBox
        />
        <Timeline.Item
          icon={<CheckCircleIcon />}
          end={
            <div>
              <time>1998</time>
              <div className="text-lg font-black">iMac</div>
            </div>
          }
          endBox
        />
      </Timeline>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Timeline } from 'asterui'
// @example-imports: { CheckCircleIcon, ClockIcon } from '@aster-ui/icons/solid'
export function SnapIconDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Timeline vertical snapIcon>
        <Timeline.Item start="2023" icon={<CheckCircleIcon />} end="Project Started" endBox />
        <Timeline.Item start="2024" icon={<CheckCircleIcon />} end="Beta Release" endBox />
        <Timeline.Item start="2025" icon={<ClockIcon />} end="Public Launch" endBox />
      </Timeline>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Timeline } from 'asterui'
// @example-imports: { CheckCircleIcon, ClockIcon, ExclamationCircleIcon } from '@aster-ui/icons/solid'
export function ColorsDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Timeline vertical>
        <Timeline.Item start="Completed" icon={<CheckCircleIcon />} end="Task 1" endBox color="success" />
        <Timeline.Item start="In Progress" icon={<ClockIcon />} end="Task 2" endBox color="info" />
        <Timeline.Item start="Warning" icon={<ExclamationCircleIcon />} end="Task 3" endBox color="warning" />
        <Timeline.Item start="Error" icon={<ExclamationCircleIcon />} end="Task 4" endBox color="error" />
      </Timeline>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Timeline } from 'asterui'
// @example-imports: { CheckCircleIcon } from '@aster-ui/icons/solid'
export function ModeStartDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Timeline vertical mode="start">
        <Timeline.Item start="2020" icon={<CheckCircleIcon />} end="Event One" endBox />
        <Timeline.Item start="2021" icon={<CheckCircleIcon />} end="Event Two" endBox />
        <Timeline.Item start="2022" icon={<CheckCircleIcon />} end="Event Three" endBox />
      </Timeline>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Timeline } from 'asterui'
// @example-imports: { CheckCircleIcon } from '@aster-ui/icons/solid'
export function ModeEndDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Timeline vertical mode="end">
        <Timeline.Item start="2020" icon={<CheckCircleIcon />} end="Event One" endBox />
        <Timeline.Item start="2021" icon={<CheckCircleIcon />} end="Event Two" endBox />
        <Timeline.Item start="2022" icon={<CheckCircleIcon />} end="Event Three" endBox />
      </Timeline>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Timeline } from 'asterui'
// @example-imports: { CheckCircleIcon } from '@aster-ui/icons/solid'
export function PendingDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Timeline vertical pending="Recording in progress...">
        <Timeline.Item start="9:00 AM" icon={<CheckCircleIcon />} end="Meeting started" endBox color="success" />
        <Timeline.Item start="9:30 AM" icon={<CheckCircleIcon />} end="Presentation complete" endBox color="success" />
        <Timeline.Item start="10:00 AM" icon={<CheckCircleIcon />} end="Q&A session" endBox color="success" />
      </Timeline>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Timeline } from 'asterui'
// @example-imports: { CheckCircleIcon, ClockIcon } from '@aster-ui/icons/solid'
export function LoadingDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Timeline vertical>
        <Timeline.Item start="Step 1" icon={<CheckCircleIcon />} end="Complete" endBox color="success" />
        <Timeline.Item start="Step 2" loading end="Processing..." endBox />
        <Timeline.Item start="Step 3" icon={<ClockIcon />} end="Pending" endBox />
      </Timeline>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Timeline, Button } from 'asterui'
// @example-imports: { CheckCircleIcon } from '@aster-ui/icons/solid'
// @example-imports: { useState } from 'react'
export function ReverseDemo() {
  // @example-include
  const [reversed, setReversed] = useState(false);
  // @example-include-end
  return (
    <Demo>
      {/* @example-return */}
      <div className="space-y-4">
        <Button size="sm" onClick={() => setReversed(!reversed)}>
          {reversed ? 'Normal Order' : 'Reverse Order'}
        </Button>
        <Timeline vertical reverse={reversed}>
          <Timeline.Item start="1st" icon={<CheckCircleIcon />} end="First Event" endBox />
          <Timeline.Item start="2nd" icon={<CheckCircleIcon />} end="Second Event" endBox />
          <Timeline.Item start="3rd" icon={<CheckCircleIcon />} end="Third Event" endBox />
        </Timeline>
      </div>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Timeline } from 'asterui'
// @example-imports: { CheckCircleIcon } from '@aster-ui/icons/solid'
export function DeclarativeDemo() {
  // @example-include
  const items = [
    { key: '1', start: '2020', end: 'Company Founded', endBox: true, icon: <CheckCircleIcon />, color: 'primary' },
    { key: '2', start: '2021', end: 'Series A Funding', endBox: true, icon: <CheckCircleIcon />, color: 'success' },
    { key: '3', start: '2022', end: 'Global Expansion', endBox: true, icon: <CheckCircleIcon />, color: 'info' },
    { key: '4', start: '2023', end: 'IPO', endBox: true, icon: <CheckCircleIcon />, color: 'warning' },
  ];
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Timeline vertical items={items} />
      {/* @example-return-end */}
    </Demo>
  );
}
