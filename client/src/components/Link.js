// @flow
import * as React from 'react';
import { css } from 'emotion';
// import { IndexLink } from 'react-router';

import {
  NavLink,
} from "react-router-dom";

const linkStyle = css`
  text-decoration: none;
  color: #aaa;
`;
const activeClass = css`
  margin-right: 20px;
  font-weight: bold;
  color: #000;
`;

type Props = {
  children?: ?React.Node,
  to: string,
  style: Object,
};

const MyLink = ({ children, to, style }: Props) => (
  <NavLink
    to={to}
    className={({ isActive })=> `${linkStyle} ${isActive ? activeClass: ''}`}
    style={style}
  >
    {children}
  </NavLink>
);

MyLink.defaultProps = {
  style: {},
}

export default MyLink;