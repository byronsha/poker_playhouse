// @flow
import * as React from 'react';
import { Link } from 'react-router';
import { css } from 'emotion';

const outer = css`
  position: fixed;
  top: 0;
  width: 100%;
  background: #fff;
`
const inner = css`
  display: flex;
  padding: 20px;
  align-items: center;
`
const link = css`margin-right: 20px;`

const TopNav = () => (
  <div className={outer}>
    <div className={inner}>
      <Link to="/lobby" className={link}>Lobby</Link>
      <Link to="/lobby/hand-history" className={link}>Hand history</Link>
    </div>
  </div>
)

export default TopNav;