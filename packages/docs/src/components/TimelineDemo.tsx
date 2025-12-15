import React, { useState } from 'react';
import { Timeline, Button, Space } from 'asterui';
import type { TimelineItemConfig } from 'asterui';
import { CheckCircleIcon, ClockIcon, ExclamationCircleIcon } from '@aster-ui/icons/solid';
import { Demo } from './Demo';

const CheckIcon = () => <CheckCircleIcon />;
const PrimaryCheckIcon = () => <CheckCircleIcon className="text-primary" />;
const ClockIconEl = () => <ClockIcon />;
const AlertIcon = () => <ExclamationCircleIcon />;

export function BasicDemo() {
  return (
    <Demo>
      <Timeline>
        <Timeline.Item start="1984" icon={<CheckIcon />} end="First Macintosh computer" endBox />
        <Timeline.Item start="iMac" icon={<CheckIcon />} end="1998" startBox />
      </Timeline>
    </Demo>
  );
}

export function VerticalDemo() {
  return (
    <Demo>
      <Timeline vertical>
        <Timeline.Item start="2015" icon={<PrimaryCheckIcon />} end="Apple Watch" endBox />
        <Timeline.Item start="2017" icon={<PrimaryCheckIcon />} end="iPhone X" endBox />
        <Timeline.Item start="2020" icon={<PrimaryCheckIcon />} end="Apple Silicon M1" endBox />
      </Timeline>
    </Demo>
  );
}

export function HorizontalDemo() {
  return (
    <Demo>
      <Timeline horizontal>
        <Timeline.Item start="Step 1" icon={<CheckIcon />} end="Planning" endBox />
        <Timeline.Item start="Step 2" icon={<CheckIcon />} end="Development" endBox />
        <Timeline.Item start="Step 3" icon={<ClockIconEl />} end="Testing" endBox />
        <Timeline.Item start="Step 4" icon={<ClockIconEl />} end="Launch" endBox />
      </Timeline>
    </Demo>
  );
}

export function CompactDemo() {
  return (
    <Demo>
      <Timeline vertical compact>
        <Timeline.Item
          icon={<CheckIcon />}
          end={
            <div>
              <time>1984</time>
              <div className="text-lg font-black">First Macintosh computer</div>
            </div>
          }
          endBox
        />
        <Timeline.Item
          icon={<CheckIcon />}
          end={
            <div>
              <time>1998</time>
              <div className="text-lg font-black">iMac</div>
            </div>
          }
          endBox
        />
      </Timeline>
    </Demo>
  );
}

export function SnapIconDemo() {
  return (
    <Demo>
      <Timeline vertical snapIcon>
        <Timeline.Item start="2023" icon={<CheckIcon />} end="Project Started" endBox />
        <Timeline.Item start="2024" icon={<CheckIcon />} end="Beta Release" endBox />
        <Timeline.Item start="2025" icon={<ClockIconEl />} end="Public Launch" endBox />
      </Timeline>
    </Demo>
  );
}

export function ColorsDemo() {
  return (
    <Demo>
      <Timeline vertical>
        <Timeline.Item start="Completed" icon={<CheckIcon />} end="Task 1" endBox color="success" />
        <Timeline.Item start="In Progress" icon={<ClockIconEl />} end="Task 2" endBox color="info" />
        <Timeline.Item start="Warning" icon={<AlertIcon />} end="Task 3" endBox color="warning" />
        <Timeline.Item start="Error" icon={<AlertIcon />} end="Task 4" endBox color="error" />
      </Timeline>
    </Demo>
  );
}

export function ModeStartDemo() {
  return (
    <Demo>
      <Timeline vertical mode="start">
        <Timeline.Item start="2020" icon={<CheckIcon />} end="Event One" endBox />
        <Timeline.Item start="2021" icon={<CheckIcon />} end="Event Two" endBox />
        <Timeline.Item start="2022" icon={<CheckIcon />} end="Event Three" endBox />
      </Timeline>
    </Demo>
  );
}

export function ModeEndDemo() {
  return (
    <Demo>
      <Timeline vertical mode="end">
        <Timeline.Item start="2020" icon={<CheckIcon />} end="Event One" endBox />
        <Timeline.Item start="2021" icon={<CheckIcon />} end="Event Two" endBox />
        <Timeline.Item start="2022" icon={<CheckIcon />} end="Event Three" endBox />
      </Timeline>
    </Demo>
  );
}

export function PendingDemo() {
  return (
    <Demo>
      <Timeline vertical pending="Recording in progress...">
        <Timeline.Item start="9:00 AM" icon={<CheckIcon />} end="Meeting started" endBox color="success" />
        <Timeline.Item start="9:30 AM" icon={<CheckIcon />} end="Presentation complete" endBox color="success" />
        <Timeline.Item start="10:00 AM" icon={<CheckIcon />} end="Q&A session" endBox color="success" />
      </Timeline>
    </Demo>
  );
}

export function LoadingDemo() {
  return (
    <Demo>
      <Timeline vertical>
        <Timeline.Item start="Step 1" icon={<CheckIcon />} end="Complete" endBox color="success" />
        <Timeline.Item start="Step 2" loading end="Processing..." endBox />
        <Timeline.Item start="Step 3" icon={<ClockIconEl />} end="Pending" endBox />
      </Timeline>
    </Demo>
  );
}

export function ReverseDemo() {
  const [reversed, setReversed] = useState(false);
  return (
    <Demo>
      <div className="space-y-4">
        <Button size="sm" onClick={() => setReversed(!reversed)}>
          {reversed ? 'Normal Order' : 'Reverse Order'}
        </Button>
        <Timeline vertical reverse={reversed}>
          <Timeline.Item start="1st" icon={<CheckIcon />} end="First Event" endBox />
          <Timeline.Item start="2nd" icon={<CheckIcon />} end="Second Event" endBox />
          <Timeline.Item start="3rd" icon={<CheckIcon />} end="Third Event" endBox />
        </Timeline>
      </div>
    </Demo>
  );
}

export function DeclarativeDemo() {
  const items: TimelineItemConfig[] = [
    { key: '1', start: '2020', end: 'Company Founded', endBox: true, icon: <CheckIcon />, color: 'primary' },
    { key: '2', start: '2021', end: 'Series A Funding', endBox: true, icon: <CheckIcon />, color: 'success' },
    { key: '3', start: '2022', end: 'Global Expansion', endBox: true, icon: <CheckIcon />, color: 'info' },
    { key: '4', start: '2023', end: 'IPO', endBox: true, icon: <CheckIcon />, color: 'warning' },
  ];

  return (
    <Demo>
      <Timeline vertical items={items} />
    </Demo>
  );
}
