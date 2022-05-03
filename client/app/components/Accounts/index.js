import * as React from 'react'
import { css } from 'emotion'

import { Panel, Text, Button } from 'app/components';

const container = css`
  display: flex;
  height: calc(100% - 168px);
  padding: 80px 20px;
  overflow: auto;
`;

const leftColumn = css`
  width: 450px;
  margin-right: 20px;
`;

const groupList = css`
  position: relative;
  height: calc(50% - 12px);
  margin-bottom: 20px;
`;

const button = {
  position: 'absolute',
  bottom: '16px',
  right: '24px',
};

const groupName = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const Accounts = () => {

	const selectAccount = () => {

	}


	const accounts = [
		{
			id: 1,
			name: 'account 1',
			level: 1,
			experience: 10000,
		},
		{
			id: 2,
			name: 'account 2',
			level: 7,
			experience: 190000,
		},
		{
			id: 3,
			name: 'account 3',
			level: 1,
			experience: 10000,
		}
	];


	return (
		<div className={container}>
			<div className={leftColumn}>
				{accounts.map(account => (
					<Panel key={account.id} dark className={groupList} header={account.name}>
						<div  className={groupName}>
							<Text large>level: {account.level}</Text>
							<Text large>tokens: {account.experience}</Text>
						</div>

						<Button onClick={selectAccount} style={button}>
	            Select account
	          </Button>
					</Panel>
				))}
			</div>
		</div>
	);
}

export default Accounts;