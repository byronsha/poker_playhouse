// @flow
import * as React from 'react';
import { Link } from 'react-router';
import { css } from 'emotion';

const outer = css`
  position: absolute;
  top: 0;
  width: 100%;
  background: #fff;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);  
`
const inner = css`
  display: flex;
  padding: 20px;
  align-items: center;
`
const link = css`
  margin-right: 20px;
  text-decoration: none;
  color: #333;
`

const TopNav = () => (
  <div className={outer}>
    <div className={inner}>
      <Link to="/lobby" className={link}>Lobby</Link>
      <Link to="/lobby/hand-history" className={link}>Hand history</Link>
    </div>
  </div>
)

export default TopNav;