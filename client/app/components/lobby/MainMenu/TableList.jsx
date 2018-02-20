import React from 'react'
import { css } from 'emotion';

import Table from './Table'
import { Panel } from 'app/components';

const tableList = css`
  text-align: center;
  font-size: 16px;
  border-spacing: 10px 5px;
`
const tableHeader = css`
  padding-bottom: 10px;
  font-weight: 600;
`

class TableList extends React.Component {
  render() {
    const { tables, openTables, onTableClick, hasTableOpen } = this.props
    if (Object.keys(tables).length > 0) {
      return (
        <Panel>
          <table className={tableList}>
            <thead>
              <tr>
                <th className={tableHeader}>Name</th>
                <th className={tableHeader}>Stakes</th>
                <th className={tableHeader}>Players</th>
                <th className={tableHeader}></th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(tables).map((id) => {
                const active = openTables.indexOf(id.toString()) !== -1 ? true : false
                return (
                  <Table
                    key={id}
                    table={tables[id]}
                    active={active}
                    onTableClick={onTableClick}
                    hasTableOpen={hasTableOpen} 
                  />
                )
              })}
            </tbody>
          </table>
        </Panel>
      )
    } else {
      return <div>loading...</div>
    }
  }
}

export default TableList