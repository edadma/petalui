import React, { useState } from 'react';
import { Tag, CheckableTag, Space, TagLiveRegion } from '@aster-ui/prefixed';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  HeartIcon,
  StarIcon,
  BookmarkIcon,
} from '@aster-ui/icons-prefixed';
import { Demo } from './Demo';

// @example-imports: { Tag, Space } from 'asterui'
export function BasicTagsDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space size="sm" wrap>
        <Tag>Default</Tag>
        <Tag color="primary">Primary</Tag>
        <Tag color="secondary">Secondary</Tag>
        <Tag color="accent">Accent</Tag>
        <Tag color="info">Info</Tag>
        <Tag color="success">Success</Tag>
        <Tag color="warning">Warning</Tag>
        <Tag color="error">Error</Tag>
      </Space>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Tag, Space } from 'asterui'
export function VariantsDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space size="sm" wrap>
        <Tag color="primary" variant="filled">Filled</Tag>
        <Tag color="primary" variant="outlined">Outlined</Tag>
        <Tag color="primary" variant="soft">Soft</Tag>
        <Tag color="primary" variant="dash">Dash</Tag>
      </Space>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Tag, Space, TagLiveRegion } from 'asterui'
// @example-imports: { useState } from 'react'
export function ClosableTagsDemo() {
  // @example-include
  const [tags, setTags] = useState(['Tag 1', 'Tag 2', 'Tag 3']);

  const handleClose = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <TagLiveRegion />
      <Space size="sm" wrap>
        {tags.map((tag) => (
          <Tag
            key={tag}
            closable
            color="primary"
            onClose={() => handleClose(tag)}
          >
            {tag}
          </Tag>
        ))}
      </Space>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Tag, Space } from 'asterui'
// @example-imports: { CheckCircleIcon, ExclamationCircleIcon } from '@aster-ui/icons'
export function TagsWithIconsDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space size="sm" wrap>
        <Tag color="success" icon={<CheckCircleIcon size="sm" />}>
          Approved
        </Tag>
        <Tag color="warning" icon={<ExclamationCircleIcon size="sm" />}>
          Pending
        </Tag>
      </Space>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Tag, Space } from 'asterui'
export function TagSizesDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space size="sm" align="center" wrap>
        <Tag color="primary" size="xs">Extra Small</Tag>
        <Tag color="primary" size="sm">Small</Tag>
        <Tag color="primary" size="md">Medium</Tag>
        <Tag color="primary" size="lg">Large</Tag>
        <Tag color="primary" size="xl">Extra Large</Tag>
      </Space>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Tag, Space } from 'asterui'
export function CustomColorsDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space size="sm" wrap>
        <Tag color="#f50">Red</Tag>
        <Tag color="#2db7f5">Blue</Tag>
        <Tag color="#87d068">Green</Tag>
        <Tag color="#108ee9">Cyan</Tag>
        <Tag color="#f5222d">Crimson</Tag>
      </Space>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Tag, Space } from 'asterui'
export function LinkTagsDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space size="sm" wrap>
        <Tag color="primary" href="https://github.com" target="_blank">
          GitHub
        </Tag>
        <Tag color="info" href="/docs">
          Documentation
        </Tag>
      </Space>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Tag, CheckableTag, Space } from 'asterui'
export function DisabledTagsDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space size="sm" wrap>
        <Tag color="primary" disabled>Disabled Tag</Tag>
        <Tag color="primary" closable disabled>Disabled Closable</Tag>
        <CheckableTag disabled>Disabled Checkable</CheckableTag>
      </Space>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { CheckableTag, Space } from 'asterui'
// @example-imports: { useState } from 'react'
export function CheckableTagsDemo() {
  // @example-include
  const [selectedTags, setSelectedTags] = useState<string[]>(['React']);

  const handleChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    setSelectedTags(nextSelectedTags);
  };

  const tags = ['React', 'Vue', 'Angular', 'Svelte'];
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Space size="sm" wrap>
        {tags.map((tag) => (
          <CheckableTag
            key={tag}
            checked={selectedTags.includes(tag)}
            onChange={(checked) => handleChange(tag, checked)}
          >
            {tag}
          </CheckableTag>
        ))}
      </Space>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { CheckableTag, Space } from 'asterui'
// @example-imports: { useState } from 'react'
export function CheckableTagColorsDemo() {
  // @example-include
  const [checked, setChecked] = useState([true, false, false]);
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Space size="sm" wrap>
        <CheckableTag
          checked={checked[0]}
          onChange={(c) => setChecked([c, checked[1], checked[2]])}
          color="success"
          size="sm"
        >
          Success
        </CheckableTag>
        <CheckableTag
          checked={checked[1]}
          onChange={(c) => setChecked([checked[0], c, checked[2]])}
          color="warning"
          size="md"
        >
          Warning
        </CheckableTag>
        <CheckableTag
          checked={checked[2]}
          onChange={(c) => setChecked([checked[0], checked[1], c])}
          color="error"
          size="lg"
        >
          Error
        </CheckableTag>
      </Space>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { CheckableTag, Space } from 'asterui'
// @example-imports: { HeartIcon, StarIcon, BookmarkIcon } from '@aster-ui/icons'
// @example-imports: { useState } from 'react'
export function CheckableTagsWithIconsDemo() {
  // @example-include
  const [liked, setLiked] = useState(false);
  const [starred, setStarred] = useState(true);
  const [saved, setSaved] = useState(false);
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Space size="sm" wrap>
        <CheckableTag
          checked={liked}
          onChange={setLiked}
          icon={<HeartIcon size="sm" />}
        >
          Like
        </CheckableTag>
        <CheckableTag
          checked={starred}
          onChange={setStarred}
          icon={<StarIcon size="sm" />}
        >
          Star
        </CheckableTag>
        <CheckableTag
          checked={saved}
          onChange={setSaved}
          icon={<BookmarkIcon size="sm" />}
        >
          Save
        </CheckableTag>
      </Space>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Tag, Space } from 'asterui'
export function UseCasesDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical" size="md">
        {/* Article tags */}
        <Space size="sm" align="center">
          <span className="text-sm text-base-content/70">Categories:</span>
          <Tag color="primary">React</Tag>
          <Tag color="secondary">TypeScript</Tag>
          <Tag color="accent">UI</Tag>
        </Space>

        {/* Status indicators */}
        <Space size="sm" align="center">
          <span className="text-sm text-base-content/70">Status:</span>
          <Tag color="success">Active</Tag>
          <Tag color="warning">Pending</Tag>
          <Tag color="error">Expired</Tag>
        </Space>
      </Space>
      {/* @example-return-end */}
    </Demo>
  );
}
