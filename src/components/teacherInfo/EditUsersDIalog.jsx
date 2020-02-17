import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import { Typography, Checkbox } from '@material-ui/core'
import createSubjectStyle from '../../styles/createSubjectStyle'
import { fetch } from 'whatwg-fetch'
import { baseURL } from '../../general/constants'
import tableIcons from '../../styles/userTableIcons'
import MaterialTable from 'material-table'
import differenceWith from 'lodash.differencewith'
import isEqual from 'lodash.isequal'

const usersURL = baseURL + 'users'

const EditUsersDialog = ({ dialogOpen, onClose, addUsers, students }) => {
  const classes = createSubjectStyle()
  const [users, setUsers] = useState([])
  const controller = new window.AbortController()
  const signal = controller.signal

  const columns = [
    {
      title: 'Επιλογή',
      editable: 'never',
      sorting: false,
      grouping: false,
      render: rowData =>
        <Checkbox
          checked={rowData.checked} onChange={() => setUsers(users => users.map(user =>
            user.id !== rowData.id ? user : { ...user, checked: !user.checked }
          ))}
        />
    },
    { title: 'ΑΜ', field: 'serialNumber' },
    { title: 'Όνομα', field: 'firstName' },
    { title: 'Επίθετο', field: 'lastName' },
    { title: 'username', field: 'username' },
    { title: 'Βαθμός', field: 'rank' },
    { title: 'Μονάδα', field: 'unit', sorting: false }
  ]

  const comparator = (userA, userB) => userA.id === userB.id

  const getUsers = () => {
    fetch(usersURL, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
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
          students = students.map(student => {
            const { tableData, ...pureStudent } = student
            return pureStudent
          })
          const usersNotInClass = differenceWith(data.result, students, comparator)
          console.log(usersNotInClass)
          setUsers(
            usersNotInClass.map(user => ({
              ...user,
              checked: false
            }))
          )
        }
      })
  }

  return (
    <Dialog
      onEnter={getUsers}
      open={dialogOpen}
      onClose={onClose}
      className={classes.dialog}
      classes={{ paper: classes.dialog }}
      disableBackdropClick
    >
      <Typography color='secondary' align='center' variant='h5'>
        Προσθήκη μαθητών
      </Typography>
      <DialogContent className={classes.content}>
        <MaterialTable
          icons={tableIcons}
          options={{
            grouping: true
          }}
          title='Χρήστες'
          columns={columns}
          data={users}
          localization={{
            header: {
              actions: 'Ενέργειες'
            },
            grouping: {
              placeholder: 'Σύρετε στήλη για ομαδοποίηση'
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary' variant='outlined'>
          ΑΚΥΡΟ
        </Button>
        <Button
          onClick={() => addUsers(users.filter(user => user.checked))}
          color='primary'
          variant='contained'
        >
          Προσθήκη
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditUsersDialog
