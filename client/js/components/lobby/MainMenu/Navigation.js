// @flow
import * as React from 'react';
import { css } from 'emotion';

import Button from 'material-ui/Button'

const nav = css`
  display: flex;
  border-bottom: 1px solid #ddd;
  padding: 10px 20px;
  align-items: center;
  justify-content: space-between;
,`

type Props = {
  name: string,
  bankroll: number,
  logout: () => void,
}

const Navigation = ({ name, bankroll, logout }: Props) => (
  <div className={nav}>
    <div>
      <span style={{ marginRight: '10px' }}>Logged in as {name}</span>
      <span>Balance: ${bankroll.toFixed(2)}</span>
    </div>
    <Button onClick={logout}>Logout</Button>
  </div>
)

export default Navigation;