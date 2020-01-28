import React, { useState } from 'react'
import homeStyle from '../../styles/homeStyle'
import { useHistory } from 'react-router-dom'
import MaterialTable from 'material-table'
import tableIcons from '../../styles/userTableIcons'
import { baseURL } from '../../general/constants'
import { Typography, Paper } from '@material-ui/core'

const columns = [
  { title: 'ΑΜ', field: 'serialNumber' },
  { title: 'Όνομα', field: 'firstName' },
  { title: 'Επίθετο', field: 'lastName' },
  { title: 'username', field: 'username' },
  { title: 'Βαθμός', field: 'rank' }
]

const usersURL = baseURL + 'user/'

const UsersTable = ({ students, classID }) => {
  const classes = homeStyle()
  const history = useHistory()
  const [users, setUsers] = useState(students)
  console.log(students)

  const removeUserFromClass = (user) =>
    new Promise((resolve, reject) => {
      console.log(classID, user.id)
      resolve()
    })

  return (
    <Paper className={classes.innerTable}>
      <MaterialTable
        icons={tableIcons}
        columns={columns}
        data={users}
        title='Μαθητές'
        actions={[
          {
            icon: tableIcons.Add,
            tooltip: 'Προσθήκη μαθητών',
            isFreeAction: true,
            onClick: event => alert('You want to add a new unit')
          }
        ]}
        editable={{
          onRowDelete: oldData =>
            removeUserFromClass(oldData)
        }}
        localization={{
          body: {
            addTooltip: 'Προσθήκη Μαθητή',
            deleteTooltip: 'Αφαίρεση Μαθητή',
            editRow: {
              deleteText:
                'Είστε σίγουροι ότι θέλετε να αφαιρέσετε τον χρήστη από την τάξη;',
              cancelTooltip: 'Ακύρωση',
              saveTooltip: 'Επιβεβαίωση'
            }
          },
          header: {
            actions: 'Ενέργειες'
          },
          pagination: {
            firstTooltip: 'Πρώτη σελίδα',
            lastTooltip: 'Τελευταία σελίδα',
            nextTooltip: 'Επόμενη σελίδα',
            previousTooltip: 'Προηγούμενη σελίδα',
            labelRowsSelect: 'γραμμές',
            labelDisplayedRows: '{from}-{to} από {count}'
          },
          toolbar: {
            searchTooltip: 'Αναζήτηση',
            searchPlaceholder: 'Αναζήτηση'
          }
        }}
      />
    </Paper>
  )
}
export default UsersTable
