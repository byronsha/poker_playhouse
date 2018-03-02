// @flow
import * as React from 'react';
import { css } from 'emotion';

import { Button } from 'app/components'

const outer = css`
  position: absolute;
  bottom: 0;
  width: 100%;
  background: #2c2e3e;
`
const inner = css`
  display: flex;
  padding: 20px;
  align-items: center;
  justify-content: space-between;
  color: #eee;
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
        <span style={{ marginRight: '50px' }}>Logged in as {name}</span>
        <span>Balance: ${bankroll.toFixed(2)}</span>
      </div>
      <Button onClick={logout}>Logout</Button>
    </div>
  </div>
)

export default BottomNav;