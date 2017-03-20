import React from 'react'
import Table from './Table'

class TableList extends React.Component {
  render() {
    const { tables, table, onTableClick } = this.props

    if (Object.keys(tables).length > 0) {
      return (
        <div>
          <h1>Tables</h1>
          <ul className="table-list">
            {Object.keys(tables).map((id) => {
              let active
              if (table) {
                active = id == table.id ? true : false
              }

              return (
                <Table
                  key={id}
                  table={tables[id]}
                  onTableClick={onTableClick} 
                  active={active}
                />
              )
            })}
          </ul>
        </div>
      )
    } else {
      return <div><h1>Tables</h1></div>
    }
  }
}

export default TableList