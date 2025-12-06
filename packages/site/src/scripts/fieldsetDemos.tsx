import { createRoot } from 'react-dom/client';
import { Fieldset, Input } from 'asterui';
import { CheckIconSvg } from './icons'

// Demo components for each example
const demos: Record<string, React.ReactNode> = {
  'basic': (
    <Fieldset className="bg-base-200 border border-base-300 rounded-box p-4">
      <Fieldset.Legend>User Information</Fieldset.Legend>
      <p className="text-sm text-base-content/70">
        Group related form controls with a descriptive legend.
      </p>
    </Fieldset>
  ),
  'with-inputs': (
    <Fieldset className="bg-base-200 border border-base-300 rounded-box p-4">
      <Fieldset.Legend>Contact Details</Fieldset.Legend>
      <Fieldset.Label>Name</Fieldset.Label>
      <Input placeholder="Enter your name" />
      <Fieldset.Label>Email</Fieldset.Label>
      <Input type="email" placeholder="Enter your email" />
      <Fieldset.Label>Phone</Fieldset.Label>
      <Input type="tel" placeholder="Enter your phone" />
    </Fieldset>
  ),
  'disabled': (
    <Fieldset disabled className="bg-base-200 border border-base-300 rounded-box p-4">
      <Fieldset.Legend>Disabled Form Section</Fieldset.Legend>
      <Fieldset.Label>Username</Fieldset.Label>
      <Input placeholder="Cannot edit" />
      <Fieldset.Label>Password</Fieldset.Label>
      <Input type="password" placeholder="Cannot edit" />
    </Fieldset>
  ),
};

// Mount React demos
document.querySelectorAll('.demo-container').forEach(container => {
  const exampleId = container.getAttribute('data-example');
  if (exampleId && demos[exampleId]) {
    const root = createRoot(container as HTMLElement);
    root.render(demos[exampleId]);
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
