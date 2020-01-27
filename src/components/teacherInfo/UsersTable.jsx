import React, { useState, Fragment } from 'react'
import homeStyle from '../../styles/homeStyle'
import { useHistory } from 'react-router-dom'
import MaterialTable from 'material-table'
import tableIcons from '../../styles/tableIcons'
import { baseURL } from '../../general/constants'
import { Box, Typography, Paper } from '@material-ui/core'

const originalColumns = [
  { title: 'ΑΜ', field: 'serialNumber' },
  { title: 'Όνομα', field: 'firstName' },
  { title: 'Επίθετο', field: 'lastName' },
  { title: 'username', field: 'username' },
  { title: 'Βαθμός', field: 'rank' }
]

const usersURL = baseURL + 'user/'

const UsersTable = ({ students }) => {
  const [columns, setColumns] = useState(originalColumns)
  const classes = homeStyle()
  const history = useHistory()
  const [users, setUsers] = useState(students)
  console.log(students)

  return (
    <Paper className={classes.innerTable}>
      <MaterialTable
        icons={tableIcons}
        columns={columns}
        data={users}
        components={{
          Toolbar: props => (
            <Typography variant='h6' align='left'>
              Μαθητές
            </Typography>
          )
        }}
        options={{
          search: false
        }}
        localization={{
          body: {
            addTooltip: 'Προσθήκη Χρήστη',
            deleteTooltip: 'Διαγραφή Χρήστη',
            editTooltip: 'Επεξεργασία',
            editRow: {
              deleteText:
                'Είστε σίγουροι ότι θέλετε να διαγράψετε αυτόν τον χρήστη;',
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
