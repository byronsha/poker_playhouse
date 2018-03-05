// @flow
import * as React from 'react';
import { css } from 'emotion';
import { Link } from 'react-router';

const linkStyle = css`
  text-decoration: none;
  color: #000;
`;

type Props = {
  children?: ?React.Node,
  to: string,
  style: Object,
};

const MyLink = ({ children, to, style }: Props) => (
  <Link to={to} className={linkStyle} style={style}>{children}</Link>
);

MyLink.defaultProps = {
  style: {},
}

export default MyLink;