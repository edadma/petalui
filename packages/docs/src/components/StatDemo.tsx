import React from 'react';
import { Stats, Button } from 'asterui';
import { InformationCircleIcon, AdjustmentsVerticalIcon } from '@aster-ui/icons';
import { Demo } from './Demo';

export function BasicDemo() {
  return (
    <Demo>
      <Stats className="shadow">
        <Stats.Stat title="Total Page Views" value="89,400" />
      </Stats>
    </Demo>
  );
}

export function DescDemo() {
  return (
    <Demo>
      <Stats className="shadow">
        <Stats.Stat title="Downloads" value="31K" desc="Jan 1st - Feb 1st" />
      </Stats>
    </Demo>
  );
}

export function MultipleDemo() {
  return (
    <Demo>
      <Stats className="shadow">
        <Stats.Stat title="Total Users" value="4,200" desc="↗︎ 400 (22%)" />
        <Stats.Stat title="New Users" value="1,200" desc="↘︎ 90 (14%)" />
        <Stats.Stat title="New Registers" value="4,200" desc="↗︎ 400 (22%)" />
      </Stats>
    </Demo>
  );
}

export function IconsDemo() {
  return (
    <Demo>
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
    </Demo>
  );
}

export function ColoredDemo() {
  return (
    <Demo>
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
    </Demo>
  );
}

export function VerticalDemo() {
  return (
    <Demo>
      <Stats vertical className="shadow">
        <Stats.Stat title="Downloads" value="31K" desc="Jan 1st - Feb 1st" />
        <Stats.Stat title="New Users" value="4,200" desc="↗︎ 400 (22%)" />
        <Stats.Stat title="New Registers" value="1,200" desc="↘︎ 90 (14%)" />
      </Stats>
    </Demo>
  );
}

export function ActionsDemo() {
  return (
    <Demo>
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
    </Demo>
  );
}
