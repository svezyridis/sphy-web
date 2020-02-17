import React, { useState, useEffect } from 'react'
import homeStyle from '../../styles/homeStyle'
import MaterialTable from 'material-table'
import tableIcons from '../../styles/userTableIcons'
import { baseURL } from '../../general/constants'
import Paper from '@material-ui/core/Paper'
import { fetch } from 'whatwg-fetch'
import EditUsersDialog from './EditUsersDIalog'

const columns = [
  { title: 'ΑΜ', field: 'serialNumber' },
  { title: 'Όνομα', field: 'firstName' },
  { title: 'Επίθετο', field: 'lastName' },
  { title: 'username', field: 'username' },
  { title: 'Βαθμός', field: 'rank' }
]

const UsersTable = ({ students, classID }) => {
  const classes = homeStyle()
  const [users, setUsers] = useState(students)
  const editStudentsURL = baseURL + 'classes/' + classID + '/students/'
  const controller = new window.AbortController()
  const signal = controller.signal
  const [dialogOpen, setDialogOpen] = useState(false)

  const addUsers = newUsers => {
    fetch(editStudentsURL,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        signal: signal,
        body: JSON.stringify(newUsers.map(user => user.id))
      })
      .then(response => {
        if (response.ok) { return response.json() } else throw Error(`Request rejected with status ${response.status}`)
      })
      .then(data => {
        console.log(data)
        if (data.status === 'success') {
          const temp = [...users]
          newUsers.forEach(user => temp.push(user))
          setUsers(temp)
          setDialogOpen(false)
        }
      })
      .catch(err => console.log(err))
  }

  const removeUserFromClass = (user) =>
    new Promise((resolve, reject) => {
      fetch(editStudentsURL + user.id,
        {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            Accept: 'application/json'
          },
          signal: signal
        })
        .then(response => {
          if (response.ok) { return response.json() } else throw Error(`Request rejected with status ${response.status}`)
        })
        .then(data => {
          console.log(data)
          if (data.status === 'success') {
            const oldDataIndex = users.indexOf(user)
            setUsers(users =>
              users.filter((row, index) => index !== oldDataIndex)
            )
            resolve()
          } else { reject(data.message) }
        })
        .catch(err => reject(err))
      resolve()
    })
  useEffect(() => {
    return () => {
      controller.abort()
    }
  }, [])

  return (
    <>
      <EditUsersDialog dialogOpen={dialogOpen} onClose={() => setDialogOpen(false)} students={users} addUsers={addUsers} />
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
              onClick: () => setDialogOpen(true)
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
    </>
  )
}
export default UsersTable
