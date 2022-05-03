// @flow
import React from 'react'
import { css } from 'emotion' 
import Card from '../Pieces/Card'

const hand = css`
  position: absolute;
  text-align: center;
  width: 100%;
  bottom: 128px;

  .card {
    position: absolute;
    transition: 0.2s all;
  }
  .card:first-child {
    top: 0px;
    left: 38px;
  }
  .card:last-child {
    top: 0px;
    right: 38px;
  }

  &:hover {
    .card:first-child {
      top: -40px;
      left: 10px;
    }
    .card:last-child {
      top: -40px;
      right: 10px;
    }
  }
`

type Props = {
  seat: {
    hand: Array<{
      rank: string,
      suit: string,
    }>,
  },
}
const Hand = (props: Props) => (
  <div className={hand}>
    <Card card={props.seat.hand[0]} />
    <Card card={props.seat.hand[1]} />
  </div>
);

export default Hand