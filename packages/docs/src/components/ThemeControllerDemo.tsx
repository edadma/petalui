import React from 'react';
import { ThemeController, Modal, Space } from 'asterui';
import { Demo } from './Demo';

export function SwapDemo() {
  return (
    <Demo>
      <ThemeController.Swap />
    </Demo>
  );
}

export function CustomThemesDemo() {
  return (
    <Demo>
      <ThemeController.Swap lightTheme="cupcake" darkTheme="dracula" />
    </Demo>
  );
}

export function SwapCallbackDemo() {
  return (
    <Demo>
      <ThemeController.Swap
        onChange={(theme) => {
          Modal.info({ title: 'Theme Changed', content: `Theme changed to: ${theme}` });
        }}
      />
    </Demo>
  );
}

export function DropdownDemo() {
  return (
    <Demo>
      <ThemeController.Dropdown
        themes={[
          'light',
          'dark',
          'cupcake',
          'bumblebee',
          'emerald',
          'corporate',
          'synthwave',
          'retro',
          'cyberpunk',
          'valentine',
          'halloween',
          'garden',
          'forest',
          'aqua',
          'lofi',
          'pastel',
          'fantasy',
          'wireframe',
          'black',
          'luxury',
          'dracula',
        ]}
      />
    </Demo>
  );
}

export function DropdownDefaultDemo() {
  return (
    <Demo>
      <ThemeController.Dropdown
        themes={['light', 'dark', 'synthwave', 'retro', 'cyberpunk']}
        defaultTheme="synthwave"
      />
    </Demo>
  );
}

export function DropdownCallbackDemo() {
  return (
    <Demo>
      <ThemeController.Dropdown
        themes={['light', 'dark', 'cupcake', 'dracula']}
        onChange={(theme) => {
          Modal.info({ title: 'Theme Selected', content: `Selected theme: ${theme}` });
        }}
      />
    </Demo>
  );
}

export function ToggleDemo() {
  return (
    <Demo>
      <ThemeController.Toggle />
    </Demo>
  );
}

export function ToggleSizesDemo() {
  return (
    <Demo>
      <Space>
        <ThemeController.Toggle size="xs" />
        <ThemeController.Toggle size="sm" />
        <ThemeController.Toggle size="md" />
        <ThemeController.Toggle size="lg" />
      </Space>
    </Demo>
  );
}
