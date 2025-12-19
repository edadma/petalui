import React from 'react';
import { ThemeController, Modal, Space } from '@aster-ui/prefixed';
import { Demo } from './Demo';

// @example-imports: { ThemeController } from 'asterui'
export function SwapDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <ThemeController.Swap />
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { ThemeController } from 'asterui'
export function CustomThemesDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <ThemeController.Swap lightTheme="cupcake" darkTheme="dracula" />
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { ThemeController, Modal } from 'asterui'
export function SwapCallbackDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <ThemeController.Swap
        onChange={(theme) => {
          Modal.info({ title: 'Theme Changed', content: `Theme changed to: ${theme}` });
        }}
      />
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { ThemeController } from 'asterui'
export function DropdownDemo() {
  return (
    <Demo>
      {/* @example-return */}
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
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { ThemeController } from 'asterui'
export function DropdownDefaultDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <ThemeController.Dropdown
        themes={['light', 'dark', 'synthwave', 'retro', 'cyberpunk']}
        defaultTheme="synthwave"
      />
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { ThemeController, Modal } from 'asterui'
export function DropdownCallbackDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <ThemeController.Dropdown
        themes={['light', 'dark', 'cupcake', 'dracula']}
        onChange={(theme) => {
          Modal.info({ title: 'Theme Selected', content: `Selected theme: ${theme}` });
        }}
      />
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { ThemeController } from 'asterui'
export function ToggleDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <ThemeController.Toggle />
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { ThemeController, Space } from 'asterui'
export function ToggleSizesDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space>
        <ThemeController.Toggle size="xs" />
        <ThemeController.Toggle size="sm" />
        <ThemeController.Toggle size="md" />
        <ThemeController.Toggle size="lg" />
      </Space>
      {/* @example-return-end */}
    </Demo>
  );
}
