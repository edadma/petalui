import { createRoot } from 'react-dom/client';
import { Footer } from 'asterui';
import { CheckIconSvg } from './icons'

// Demo components for each example
const demos: Record<string, React.ReactNode> = {
  'basic': (
    <Footer horizontal className="bg-base-200 p-4">
      <a href="#" className="link link-hover">About</a>
      <a href="#" className="link link-hover">Contact</a>
      <a href="#" className="link link-hover">Privacy</a>
      <a href="#" className="link link-hover">Terms</a>
    </Footer>
  ),
  'with-title': (
    <Footer horizontal className="bg-base-200 p-10">
      <nav>
        <Footer.Title>Services</Footer.Title>
        <a href="#" className="link link-hover">Branding</a>
        <a href="#" className="link link-hover">Design</a>
        <a href="#" className="link link-hover">Marketing</a>
      </nav>
      <nav>
        <Footer.Title>Company</Footer.Title>
        <a href="#" className="link link-hover">About us</a>
        <a href="#" className="link link-hover">Contact</a>
        <a href="#" className="link link-hover">Jobs</a>
      </nav>
      <nav>
        <Footer.Title>Legal</Footer.Title>
        <a href="#" className="link link-hover">Terms of use</a>
        <a href="#" className="link link-hover">Privacy policy</a>
        <a href="#" className="link link-hover">Cookie policy</a>
      </nav>
    </Footer>
  ),
  'centered': (
    <Footer center horizontal className="bg-base-200 p-4">
      <nav className="flex gap-4">
        <a href="#" className="link link-hover">About</a>
        <a href="#" className="link link-hover">Contact</a>
        <a href="#" className="link link-hover">Privacy</a>
        <a href="#" className="link link-hover">Terms</a>
      </nav>
      <aside>
        <p>© 2024 Company Name. All rights reserved.</p>
      </aside>
    </Footer>
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
