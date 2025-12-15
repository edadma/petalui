import React, { useRef, useState } from 'react';
import { Tour, Button, Input, Card, Space } from 'asterui';
import { Demo } from './Demo';

// Basic Tour Demo
export function BasicTourDemo() {
  const [open, setOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const profileRef = useRef<HTMLButtonElement>(null);
  const settingsRef = useRef<HTMLButtonElement>(null);

  const steps = [
    {
      target: searchRef,
      title: 'Search',
      description: 'Use the search bar to find content quickly.',
      placement: 'bottom' as const,
    },
    {
      target: profileRef,
      title: 'Profile',
      description: 'Click here to view and edit your profile.',
      placement: 'bottom' as const,
    },
    {
      target: settingsRef,
      title: 'Settings',
      description: 'Customize your experience in settings.',
      placement: 'left' as const,
    },
  ];

  return (
    <Demo>
      <Card className="p-4">
        <div className="flex gap-4 items-center mb-4">
          <Input ref={searchRef} placeholder="Search..." className="flex-1" />
          <Button ref={profileRef}>Profile</Button>
          <Button ref={settingsRef}>Settings</Button>
        </div>
        <Button color="primary" onClick={() => setOpen(true)}>
          Start Tour
        </Button>
        <Tour
          open={open}
          steps={steps}
          onClose={() => setOpen(false)}
          onFinish={() => setOpen(false)}
        />
      </Card>
    </Demo>
  );
}

// Without Target Demo
export function WithoutTargetDemo() {
  const [open, setOpen] = useState(false);

  const steps = [
    {
      title: 'Welcome!',
      description: 'This tour will guide you through the main features.',
    },
    {
      title: 'Getting Started',
      description: 'Follow along to learn how to use this application.',
    },
    {
      title: 'All Done!',
      description: 'You are ready to start using the app.',
    },
  ];

  return (
    <Demo>
      <Button color="primary" onClick={() => setOpen(true)}>
        Start Intro
      </Button>
      <Tour
        open={open}
        steps={steps}
        onClose={() => setOpen(false)}
        type="primary"
      />
    </Demo>
  );
}

// With Cover Demo
export function WithCoverDemo() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const steps = [
    {
      target: buttonRef,
      title: 'New Feature',
      description: 'Check out this amazing new feature we just added!',
      cover: (
        <img
          src="https://picsum.photos/320/160"
          alt="Feature preview"
          className="w-full h-40 object-cover"
        />
      ),
      placement: 'right' as const,
    },
  ];

  return (
    <Demo>
      <Button ref={buttonRef} color="primary" onClick={() => setOpen(true)}>
        View Feature
      </Button>
      <Tour
        open={open}
        steps={steps}
        onClose={() => setOpen(false)}
        showSkip={false}
      />
    </Demo>
  );
}

// Placements Demo
export function PlacementsDemo() {
  const [open, setOpen] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);
  const placements = ['top', 'right', 'bottom', 'left'] as const;
  const [placementIndex, setPlacementIndex] = useState(0);

  const steps = [
    {
      target: targetRef,
      title: `Placement: ${placements[placementIndex]}`,
      description: 'The popover can appear on any side of the target.',
      placement: placements[placementIndex],
    },
  ];

  return (
    <Demo>
      <div className="flex flex-col items-center gap-4">
        <div
          ref={targetRef}
          className="w-24 h-24 bg-primary text-primary-content flex items-center justify-center rounded-lg"
        >
          Target
        </div>
        <Space>
          <Button onClick={() => setPlacementIndex((i) => (i + 1) % 4)}>
            Change Placement
          </Button>
          <Button color="primary" onClick={() => setOpen(true)}>
            Show Tour
          </Button>
        </Space>
        <Tour
          open={open}
          steps={steps}
          onClose={() => setOpen(false)}
          showIndicators={false}
        />
      </div>
    </Demo>
  );
}
