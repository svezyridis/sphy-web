import React, { useState, useEffect } from 'react'
import DefaultAppBar from '../DefaultAppBar'
import HomeDrawer from '../home/HomeDrawer'
import Copyright from '../Copyright'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import Link from '@material-ui/core/Link'
import homeStyle from '../../styles/homeStyle'
import classNames from 'classnames'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import isEmpty from 'lodash.isempty'
import { useHistory } from 'react-router-dom'
import { Paper } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import Typography from '@material-ui/core/Typography'
import MaterialTable from 'material-table'
import tableIcons from '../../styles/userTableIcons'
import { fetch } from 'whatwg-fetch'
import { baseURL } from '../../general/constants'
import find from 'lodash.find'

const columns = [
  { title: 'ΑΜ', field: 'serialNumber' },
  { title: 'Όνομα', field: 'firstName' },
  { title: 'Επίθετο', field: 'lastName' },
  { title: 'username', field: 'username' },
  { title: 'password', field: 'password' },
  { title: 'Βαθμός', field: 'rank' },
  { title: 'Μονάδα', field: 'unitID', lookup: {} },
  { title: 'Ρόλος', field: 'roleID', lookup: {} }
]

const usersURL = baseURL + 'users/'
const rolesURL = baseURL + 'roles/'
const unitsURL = baseURL + 'units/'

const UserManagement = ({
  open,
  toogleDrawer,
  account,
  deleteAccount,
  dark
}) => {
  const classes = homeStyle()
  const history = useHistory()
  const [users, setUsers] = useState([])
  console.log(account)
  const controller = new window.AbortController()
  const signal = controller.signal

  useEffect(() => {
    return () => {
      controller.abort()
    }
  }, [])

  useEffect(() => {
    fetch(rolesURL, {
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
          const roles = data.result
          const columnToEdit = find(columns, { field: 'roleID' })
          console.log(columnToEdit)
          roles.forEach(role => {
            columnToEdit.lookup[parseInt(role.id)] = role.role
          })
        }
      })
      .catch(error => {
        if (!controller.signal.aborted) {
          console.error(error)
        }
      })

    fetch(unitsURL, {
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
          const units = data.result
          const columnToEdit = find(columns, { field: 'unitID' })
          units.forEach(unit => {
            columnToEdit.lookup[parseInt(unit.id)] = unit.name
          })
        }
      })
      .catch(error => {
        if (!controller.signal.aborted) {
          console.error(error)
        }
      })

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
          setUsers(
            data.result.map(user => ({
              ...user,
              password: '********',
              roleID: parseInt(user.roleID)
            }))
          )
        }
      })
      .catch(error => {
        if (!controller.signal.aborted) {
          console.error(error)
        }
      })
    return () => {
      controller.abort()
    }
  }, [])

  if (isEmpty(account)) {
    history.push('/login')
    return null
  }

  const deleteUser = user =>
    new Promise((resolve, reject) => {
      fetch(usersURL + user.username, {
        method: 'DELETE',
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
            const oldDataIndex = users.indexOf(user)
            setUsers(users =>
              users.filter((row, index) => index !== oldDataIndex)
            )
            resolve()
          } else reject(data.message)
        })
        .catch(err => reject(err))
    })

  const addNewUser = newUser => {
    const temp = [...users]
    temp.push({ ...newUser, password: '********' })
    const requestData = JSON.stringify({
      newUser: {
        serialNumber: newUser.serialNumber,
        username: newUser.username,
        password: newUser.password,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        roleID: newUser.roleID,
        rank: newUser.rank,
        unitID: newUser.unitID
      }
    })
    return new Promise((resolve, reject) => {
      fetch(usersURL, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: requestData,
        signal: signal
      })
        .then(response => {
          if (response.ok) { return response.json() } else throw Error(`Request rejected with status ${response.status}`)
        })
        .then(data => {
          console.log(data)
          if (data.status === 'success') {
            setUsers(temp)
            resolve()
          } else reject(data.message)
        })
        .catch(err => reject(err))
    })
  }

  return (
    <div className={classes.root}>
      <DefaultAppBar />
      <HomeDrawer
        account={account}
        deleteAccount={deleteAccount}
        classes={classes}
      />
      }
      <div className={classNames(classes.rest, !open && classes.closed)}>
        <Breadcrumbs>
          <Link
            component='button'
            variant='body1'
            onClick={() => {
              history.push('/')
            }}
            className={classNames(classes.link, dark && classes.dark)}
          >
            <HomeIcon className={classes.icon} />
            Αρχική
          </Link>
          <Link
            component='button'
            variant='body1'
            onClick={() => {
              history.push('/users')
            }}
            className={classNames(classes.link, dark && classes.dark)}
          >
            <AccountBoxIcon className={classes.icon} />
            Διαχείριση Χρηστών
          </Link>
        </Breadcrumbs>
        <Typography variant='h3' color='textPrimary' align='center'>
          Διαχείριση Χρηστών
        </Typography>
        <MaterialTable
          icons={tableIcons}
          options={{
            grouping: true
          }}
          actions={[
            {
              icon: tableIcons.AddUnit,
              tooltip: 'Προσθήκη μονάδας',
              isFreeAction: true,
              onClick: event => alert('You want to add a new unit')
            }
          ]}
          title='Χρήστες'
          columns={columns}
          data={users}
          editable={{
            onRowAdd: newData => addNewUser(newData),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    const oldDataIndex = users.indexOf(oldData)
                    setUsers(users =>
                      users.map((row, index) =>
                        index === oldDataIndex ? newData : row
                      )
                    )
                  }
                  resolve()
                }, 1000)
              }),
            onRowDelete: oldData => deleteUser(oldData)
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

        <Paper elevation={3} />
      </div>
      <Copyright open={open} />
    </div>
  )
}
export default UserManagement
