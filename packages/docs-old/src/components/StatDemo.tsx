import React from 'react';
import { Stats, Button } from '@aster-ui/prefixed';
import { InformationCircleIcon, AdjustmentsVerticalIcon } from '@aster-ui/icons-prefixed';
import { Demo } from './Demo';

// @example-imports: { Stats } from 'asterui'
export function BasicDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Stats className="shadow">
        <Stats.Stat title="Total Page Views" value="89,400" />
      </Stats>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Stats } from 'asterui'
export function DescDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Stats className="shadow">
        <Stats.Stat title="Downloads" value="31K" desc="Jan 1st - Feb 1st" />
      </Stats>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Stats } from 'asterui'
export function MultipleDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Stats className="shadow">
        <Stats.Stat title="Total Users" value="4,200" desc="↗︎ 400 (22%)" />
        <Stats.Stat title="New Users" value="1,200" desc="↘︎ 90 (14%)" />
        <Stats.Stat title="New Registers" value="4,200" desc="↗︎ 400 (22%)" />
      </Stats>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Stats } from 'asterui'
// @example-imports: { InformationCircleIcon, AdjustmentsVerticalIcon } from '@aster-ui/icons'
export function IconsDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Stats className="shadow">
        <Stats.Stat
          figure={<InformationCircleIcon size={32} />}
          title="Downloads"
          value="31K"
          desc="Jan 1st - Feb 1st"
        />
        <Stats.Stat
          figure={<AdjustmentsVerticalIcon size={32} />}
          title="New Users"
          value="4,200"
          desc="↗︎ 400 (22%)"
        />
      </Stats>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Stats } from 'asterui'
export function ColoredDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Stats className="shadow">
        <Stats.Stat
          title="Account balance"
          value={<span className="text-primary">$89,400</span>}
          desc="21% more than last month"
        />
        <Stats.Stat
          title="Current balance"
          value={<span className="text-secondary">$12,721</span>}
          desc="12% less than last month"
        />
      </Stats>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Stats } from 'asterui'
export function VerticalDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Stats vertical className="shadow">
        <Stats.Stat title="Downloads" value="31K" desc="Jan 1st - Feb 1st" />
        <Stats.Stat title="New Users" value="4,200" desc="↗︎ 400 (22%)" />
        <Stats.Stat title="New Registers" value="1,200" desc="↘︎ 90 (14%)" />
      </Stats>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Stats, Button } from 'asterui'
export function ActionsDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Stats className="shadow">
        <Stats.Stat
          title="Account balance"
          value="$89,400"
          actions={
            <Button size="sm" color="primary">
              Add funds
            </Button>
          }
        />
      </Stats>
      {/* @example-return-end */}
    </Demo>
  );
}
