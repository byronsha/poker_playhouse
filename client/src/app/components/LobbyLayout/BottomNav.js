// @flow
import * as React from 'react';
import { css } from 'emotion';

import { Button } from '../../../components'

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
const BottomNav = ({ name, bankroll, logout, account }: Props) => (
  <div className={outer}>
    <div className={inner}>
      <div>
        <span style={{ marginRight: '50px' }}>Logged in as {name}</span>
        <span>Balance: ${bankroll.toFixed(2)}</span>
      </div>
      {account && <div>
        <span style={{ marginRight: '50px' }}>select account: {account.name}</span>
      </div>}
      
      <Button onClick={logout} style={{ background: '#555' }}>Logout</Button>
    </div>
  </div>
)

export default BottomNav;