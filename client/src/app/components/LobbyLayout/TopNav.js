// @flow
import * as React from 'react';
import { Link } from '../../../components';
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
const linkStyle = { marginRight: '20px' };

const TopNav = () => (
  <div className={outer}>
    <div className={inner}>
      <Link to="/lobby" style={linkStyle}>Lobby</Link>
      <Link to="/lobby/hand-history" style={linkStyle}>Hand history</Link>
      <Link to="/lobby/groups" style={linkStyle}>Groups</Link>
      <Link to="/lobby/accounts" style={linkStyle}>Accounts</Link>
    </div>
  </div>
)

export default TopNav;