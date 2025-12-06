import { createRoot } from 'react-dom/client';
import React, { useRef } from 'react';
import { FloatButton, Modal } from 'asterui';
import { PlusIcon, QuestionMarkCircleIcon, ChatBubbleLeftRightIcon, ArrowPathIcon, HeartIcon, CameraIcon, PhotoIcon, MicrophoneIcon } from '@heroicons/react/24/outline';
import { CheckIconSvg } from './icons';

// Demo components for each example
const BasicDemo: React.FC = () => {
  return (
    <div className="h-40 flex items-center justify-center bg-base-200 rounded-lg relative">
      <p className="text-base-content/50 text-sm">Floating action button in corner</p>
      <FloatButton
        icon={<PlusIcon className="w-5 h-5" />}
        onClick={() => Modal.info({ title: 'FloatButton', content: 'You clicked the floating action button!' })}
        style={{ position: 'absolute', bottom: 16, right: 16 }}
      />
    </div>
  );
};

const WithTooltipDemo: React.FC = () => {
  return (
    <div className="h-40 flex items-center justify-center bg-base-200 rounded-lg relative">
      <p className="text-base-content/50 text-sm">Hover to see tooltip</p>
      <FloatButton
        icon={<PlusIcon className="w-5 h-5" />}
        tooltip="Add new item"
        type="primary"
        onClick={() => Modal.info({ title: 'Add Item', content: 'Add item clicked!' })}
        style={{ position: 'absolute', bottom: 16, right: 16 }}
      />
    </div>
  );
};

const GroupDemo: React.FC = () => {
  return (
    <div className="h-56 flex items-center justify-center bg-base-200 rounded-lg relative overflow-hidden">
      <p className="text-base-content/50 text-sm">Click button to expand group</p>
      <FloatButton.Group
        icon={<PlusIcon className="w-5 h-5" />}
        style={{ position: 'absolute', bottom: 16, right: 16 }}
      >
        <FloatButton
          icon={<QuestionMarkCircleIcon className="w-5 h-5" />}
          onClick={() => Modal.info({ title: 'Help', content: 'Help section opened' })}
        />
        <FloatButton
          icon={<ChatBubbleLeftRightIcon className="w-5 h-5" />}
          onClick={() => Modal.info({ title: 'Support', content: 'Contact support' })}
        />
        <FloatButton
          icon={<ArrowPathIcon className="w-5 h-5" />}
          onClick={() => Modal.info({ title: 'Refresh', content: 'Refreshing...' })}
        />
      </FloatButton.Group>
    </div>
  );
};

const BackTopDemo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="h-40 bg-base-200 rounded-lg relative">
      <div
        ref={containerRef}
        className="h-full overflow-auto rounded-lg"
      >
        <div style={{ height: '400px', padding: '16px' }}>
          <p className="text-base-content/50 text-sm mb-4">Scroll down to see the button</p>
          <div className="space-y-2">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="h-4 bg-base-300 rounded" style={{ width: `${60 + Math.random() * 40}%` }} />
            ))}
          </div>
        </div>
      </div>
      <FloatButton.BackTop
        target={() => containerRef.current!}
        visibilityHeight={50}
        style={{ position: 'absolute', bottom: 16, right: 16 }}
      />
    </div>
  );
};

const TypesDemo: React.FC = () => {
  return (
    <div className="h-24 flex items-center justify-center gap-4 bg-base-200 rounded-lg">
      <FloatButton
        icon={<PlusIcon className="w-5 h-5" />}
        type="default"
        style={{ position: 'static' }}
        onClick={() => Modal.info({ title: 'Default', content: 'Default type button' })}
      />
      <FloatButton
        icon={<HeartIcon className="w-5 h-5" />}
        type="primary"
        style={{ position: 'static' }}
        onClick={() => Modal.info({ title: 'Primary', content: 'Primary type button' })}
      />
    </div>
  );
};

const ShapesDemo: React.FC = () => {
  return (
    <div className="h-24 flex items-center justify-center gap-4 bg-base-200 rounded-lg">
      <FloatButton
        icon={<PlusIcon className="w-5 h-5" />}
        shape="circle"
        style={{ position: 'static' }}
      />
      <FloatButton
        icon={<PlusIcon className="w-5 h-5" />}
        shape="square"
        style={{ position: 'static' }}
      />
    </div>
  );
};

const BadgeDemo: React.FC = () => {
  return (
    <div className="h-40 flex items-center justify-center bg-base-200 rounded-lg relative">
      <p className="text-base-content/50 text-sm">Button with badge</p>
      <FloatButton
        icon={<ChatBubbleLeftRightIcon className="w-5 h-5" />}
        badge={5}
        onClick={() => Modal.info({ title: 'Messages', content: 'You have 5 unread messages' })}
        style={{ position: 'absolute', bottom: 16, right: 16 }}
      />
    </div>
  );
};

const FlowerDemo: React.FC = () => {
  return (
    <div className="h-56 flex items-center justify-center bg-base-200 rounded-lg relative overflow-hidden">
      <p className="text-base-content/50 text-sm">Click to expand in radial layout</p>
      <FloatButton.Group
        flower
        icon={<PlusIcon className="w-5 h-5" />}
        mainAction={<HeartIcon className="w-5 h-5" />}
        onMainAction={() => Modal.info({ title: 'Main Action', content: 'Main action clicked!' })}
        style={{ position: 'absolute', bottom: 16, right: 16 }}
      >
        <FloatButton
          icon={<CameraIcon className="w-5 h-5" />}
          onClick={() => Modal.info({ title: 'Camera', content: 'Open camera' })}
        />
        <FloatButton
          icon={<PhotoIcon className="w-5 h-5" />}
          onClick={() => Modal.info({ title: 'Gallery', content: 'Open gallery' })}
        />
        <FloatButton
          icon={<MicrophoneIcon className="w-5 h-5" />}
          onClick={() => Modal.info({ title: 'Voice', content: 'Record voice' })}
        />
      </FloatButton.Group>
    </div>
  );
};

const statefulDemos: Record<string, React.FC> = {
  'basic': BasicDemo,
  'with-tooltip': WithTooltipDemo,
  'group': GroupDemo,
  'flower': FlowerDemo,
  'back-top': BackTopDemo,
  'types': TypesDemo,
  'shapes': ShapesDemo,
  'badge': BadgeDemo,
};

// Mount React demos
document.querySelectorAll('.demo-container').forEach(container => {
  const exampleId = container.getAttribute('data-example');
  if (exampleId && statefulDemos[exampleId]) {
    const root = createRoot(container as HTMLElement);
    const Component = statefulDemos[exampleId];
    root.render(<Component />);
  }
});

// Copy button functionality
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', async () => {
    const code = btn.getAttribute('data-code');
    if (code) {
      await navigator.clipboard.writeText(code);
      const originalHTML = btn.innerHTML;
      btn.innerHTML = CheckIconSvg;
      setTimeout(() => {
        btn.innerHTML = originalHTML;
      }, 2000);
    }
  });
});
