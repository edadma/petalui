# Accessibility (WCAG) Checklist

## Completed
- ✅ Button: Added `aria-busy` for loading state
- ✅ Button: Auto-disable when loading
- ✅ Button: Added `aria-hidden` to loading spinner
- ✅ Input: Already forwards all props including ARIA attributes
- ✅ PageLayout: Added `text-base-content` for theme-aware text

## To Do

### High Priority
- [ ] Modal: Focus trap, focus restoration, ESC key to close
- [ ] Modal: Add `aria-modal`, `aria-labelledby`, `aria-describedby`
- [ ] Form.Item: Ensure label properly associates with input (id/htmlFor)
- [ ] Form validation: Error messages with `aria-invalid` and `aria-describedby`
- [ ] Dropdown: Keyboard navigation (arrow keys, Enter/Space)
- [ ] Dropdown: Proper ARIA role and state

### Medium Priority
- [ ] Alert: Add `role="alert"` for dynamic announcements
- [ ] Tabs: Keyboard navigation, proper ARIA roles
- [ ] Checkbox/Radio: Ensure group labeling with fieldset/legend
- [ ] Select: Custom select needs full keyboard support

### Low Priority
- [ ] Add skip navigation link component
- [ ] Ensure all focusable elements have visible focus indicators
- [ ] Color contrast audit for all theme combinations
- [ ] Screen reader testing with NVDA/JAWS

## Testing
- [ ] Set up automated accessibility testing (axe-core, pa11y)
- [ ] Document keyboard shortcuts for each interactive component
- [ ] Create accessibility example page in docs
