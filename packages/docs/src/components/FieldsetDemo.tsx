import { Fieldset, Input } from 'asterui'
import { Demo } from './Demo'

export function BasicDemo() {
  return (
    <Demo>
      <Fieldset className="bg-base-200 border border-base-300 rounded-box p-4">
        <Fieldset.Legend>User Information</Fieldset.Legend>
        <p className="text-sm text-base-content/70">
          Group related form controls with a descriptive legend.
        </p>
      </Fieldset>
    </Demo>
  )
}

export function WithInputsDemo() {
  return (
    <Demo>
      <Fieldset className="bg-base-200 border border-base-300 rounded-box p-4">
        <Fieldset.Legend>Contact Details</Fieldset.Legend>
        <Fieldset.Label>Name</Fieldset.Label>
        <Input placeholder="Enter your name" />
        <Fieldset.Label>Email</Fieldset.Label>
        <Input type="email" placeholder="Enter your email" />
        <Fieldset.Label>Phone</Fieldset.Label>
        <Input type="tel" placeholder="Enter your phone" />
      </Fieldset>
    </Demo>
  )
}

export function DisabledDemo() {
  return (
    <Demo>
      <Fieldset disabled className="bg-base-200 border border-base-300 rounded-box p-4">
        <Fieldset.Legend>Disabled Form Section</Fieldset.Legend>
        <Fieldset.Label>Username</Fieldset.Label>
        <Input placeholder="Cannot edit" />
        <Fieldset.Label>Password</Fieldset.Label>
        <Input type="password" placeholder="Cannot edit" />
      </Fieldset>
    </Demo>
  )
}
