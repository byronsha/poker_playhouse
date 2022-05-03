// @flow
import * as React from 'react';
import { css } from 'emotion';
import { IndexLink } from 'react-router';

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
  <IndexLink
    to={to}
    className={linkStyle}
    activeClassName={activeClass}
    style={style}
  >
    {children}
  </IndexLink>
);

MyLink.defaultProps = {
  style: {},
}

export default MyLink;