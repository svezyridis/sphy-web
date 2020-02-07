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
import { baseURL, RANKS, ROLES } from '../../general/constants'
import find from 'lodash.find'
import CreateUnitDialog from './CreateUnitDialog'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

const columns = [
  { title: 'ΑΜ', field: 'serialNumber', type: 'numeric' },
  { title: 'Όνομα', field: 'firstName' },
  { title: 'Επίθετο', field: 'lastName' },
  { title: 'username', field: 'username' },
  {
    title: 'password',
    field: 'password',
    editComponent: props => (
      <TextField
        type='password'
        placeholder={props.columnDef.title}
        value={props.value === undefined ? '' : props.value}
        onChange={event => props.onChange(event.target.value)}
        InputProps={{
          style: {
            fontSize: 13
          }
        }}
      />
    ),
    render: rowData => <TextField
      type='password'
      disabled
      value={rowData}
                       />
  },
  {
    title: 'Βαθμός',
    field: 'rank',
    editComponent: props => (
      <Select
        value={props.value === undefined ? '' : props.value}
        onChange={event => props.onChange(event.target.value)}
        style={{
          fontSize: 13
        }}
      >
        {RANKS.map((rank, index) => (
          <MenuItem key={index} value={rank}>{rank}</MenuItem>)
        )}
      </Select>
    )
  },
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
  const [unitDialogOpen, setUnitDialogOpen] = useState(false)
  console.log(account)
  const controller = new window.AbortController()
  const signal = controller.signal

  const getRoles = () => {
    const role = account.metadata.role
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
          let roles = data.result
          const columnToEdit = find(columns, { field: 'roleID' })
          if (role === ROLES.TEACHER) { roles = roles.filter(role => role.role !== ROLES.ADMIN && role.role !== ROLES.UNIT_ADMIN) }
          if (role === ROLES.TEACHER) { roles = roles.filter(role => role.role !== ROLES.ADMIN) }
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
  }

  const getUnits = () => {
    const role = account.metadata.role
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
          let units = data.result
          if (role === ROLES.TEACHER || role === ROLES.UNIT_ADMIN) { units = units.filter(unit => unit.id === account.metadata.unitID) }
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
  }
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
          setUsers(
            data.result.map(user => ({
              ...user,
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
  }

  useEffect(() => {
    if (isEmpty(account)) {
      return
    }
    getRoles()
    getUnits()
    getUsers()
    return () => {
      controller.abort()
    }
  }, [])

  if (isEmpty(account)) {
    history.push('/login')
    return null
  }
  if (account.metadata.role === ROLES.USER) {
    history.push('/')
    return null
  }
  const createUnit = (name) => {
    fetch(unitsURL, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: name,
      signal: signal
    })
      .then(response => {
        if (response.ok) { return response.json() } else throw Error(`Request rejected with status ${response.status}`)
      })
      .then(data => {
        console.log(data)
        if (data.status === 'success') {
          const columnToEdit = find(columns, { field: 'unitID' })
          columnToEdit.lookup[parseInt(data.result.id)] = name
          setUnitDialogOpen(false)
        } else console.log(data.message)
      })
      .catch(err => console.log(err))
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
        <CreateUnitDialog open={unitDialogOpen} onClose={() => setUnitDialogOpen(false)} onCreate={(name) => createUnit(name)} classes={classes} />
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
              onClick: () => setUnitDialogOpen(true)
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
