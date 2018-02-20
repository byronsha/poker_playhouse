// @flow
import * as React from 'react';
import { css } from 'emotion';

import Button from 'material-ui/Button'

const outer = css`
  position: absolute;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #ddd;
`
const inner = css`
  display: flex;
  padding: 20px;
  align-items: center;
  justify-content: space-between;
`

type Props = {
  name: string,
  bankroll: number,
  logout: () => void,
}

const Navigation = ({ name, bankroll, logout }: Props) => (
  <div className={outer}>
    <div className={inner}>
      <div>
        <span style={{ marginRight: '24px' }}>Logged in as {name}</span>
        <span>Balance: ${bankroll.toFixed(2)}</span>
      </div>
      <Button onClick={logout}>Logout</Button>
    </div>
  </div>
)

export default Navigation;