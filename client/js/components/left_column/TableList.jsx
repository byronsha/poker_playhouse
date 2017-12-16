import React from 'react'
import Table from './Table'

const styles = {
  tableList: {
    fontSize: '14px',
  },
  header: {
    textAlign: 'left',
  },
}

class TableList extends React.Component {
  render() {
    const { tables, openTables, onTableClick, hasTableOpen } = this.props
    if (Object.keys(tables).length > 0) {
      return (
        <div>
          <h3>Games</h3>
          <table style={styles.tableList}>
            <thead style={styles.header}>
              <tr>
                <th>Name</th>
                <th>Stakes</th>
                <th>Players</th>
                <th></th>
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
      return <div><h1>Games</h1></div>
    }
  }
}

export default TableList