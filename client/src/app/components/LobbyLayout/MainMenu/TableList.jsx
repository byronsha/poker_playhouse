import React from 'react'
import { css } from 'emotion';

import Table from './Table'
// import { Panel } from '../../../../modules/app/components';

const tableList = css`
  text-align: center;
  font-size: 16px;
  border-spacing: 0 5px;
`
const tableHeader = css`
  padding-bottom: 10px;
  font-weight: 600;
  font-size: 20px;
`

type Props = {
  tables: {
    [id: string]: Object,
  },
  openTables: Array<{}>,
  onTableClick: () => void,
  hasTableOpen: boolean,
}

class TableList extends React.Component<Props> {
  render() {
    //<Panel header={`Games`}>
    const { tables, openTables, onTableClick, hasTableOpen } = this.props
    if (Object.keys(tables).length > 0) {
      return (
        <div>
          <table className={tableList}>
            <thead>
              <tr>
                <th className={tableHeader}>Name</th>
                <th className={css`${tableHeader} min-width: 200px;`}>Stakes</th>
                <th className={css`${tableHeader} min-width: 100px;`}>Players</th>
                <th className={css`${tableHeader} min-width: 100px;`}></th>
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
        </div>
      )
    } else {
      return <div>Loading...</div>
    }
  }
}

export default TableList