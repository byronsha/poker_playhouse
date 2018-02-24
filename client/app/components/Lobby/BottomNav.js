// @flow
import * as React from 'react';
import { css } from 'emotion';

import Button from 'material-ui/Button'

const outer = css`
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #fff;
`
const inner = css`
  display: flex;
  padding: 20px;
  align-items: center;
`

type Props = {
  name: string,
  bankroll: number,
  logout: () => void,
}

const BottomNav = ({ name, bankroll, logout }: Props) => (
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

export default BottomNav;