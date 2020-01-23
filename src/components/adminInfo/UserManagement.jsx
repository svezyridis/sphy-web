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
import tableIcons from '../../styles/tableIcons'
import { fetch } from 'whatwg-fetch'
import { baseURL } from '../../general/constants'
import { objectToQueryString } from '../../general/helperFunctions'

const testData = {
  columns: [
    { title: 'ΑΜ', field: 'serialNumber' },
    { title: 'Όνομα', field: 'firstName' },
    { title: 'Επίθετο', field: 'lastName' },
    { title: 'username', field: 'username' },
    { title: 'password', field: 'password' },
    { title: 'Μονάδα', field: 'unit' },
    { title: 'Βαθμός', field: 'rank' },
    { title: 'Ρόλος', field: 'role' }
  ]
}
const usersURL = baseURL + 'user'
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
    fetch(usersURL, {
      method: 'GET',
      credentials: 'include',
      headers: {
        authorization: 'Bearer ' + account.token,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      signal: signal
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.status === 'success') { setUsers(data.result.map(user => ({ ...user, password: '********' }))) }
      })
    return () => {
      controller.abort()
    }
  }, [])

  if (isEmpty(account)) {
    history.push('/login')
    return null
  }

  const deleteUser = (user) => new Promise((resolve, reject) => {
    const queryParams = {
      username: user.username
    }
    fetch(usersURL + objectToQueryString(queryParams), {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        authorization: 'Bearer ' + account.token,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      signal: signal
    })
      .then(response => response.json())
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

  const addNewUseR = newUser => {
    const temp = [...users]
    temp.push(newUser)
    const requestData = JSON.stringify({
      newUser: {
        serialNumber: newUser.serialNumber,
        username: newUser.username,
        password: newUser.password,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        role: newUser.role,
        rank: newUser.rank
      }
    })
    return new Promise((resolve, reject) => {
      fetch(usersURL, {
        method: 'POST',
        credentials: 'include',
        headers: {
          authorization: 'Bearer ' + account.token,
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: requestData,
        signal: signal
      })
        .then(response => response.json())
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
            Διαχείρηση Χρηστών
          </Link>
        </Breadcrumbs>
        <Typography variant='h3' color='textPrimary' align='center'>
          Διαχείρηση Χρηστών
        </Typography>
        <MaterialTable
          icons={tableIcons}
          options={{
            grouping: true
          }}
          title='Χρήστες'
          columns={testData.columns}
          data={users}
          editable={{
            onRowAdd: newData => addNewUseR(newData),
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
                deleteText: 'Είστε σίγουροι ότι θέλετε να διαγράψετε αυτόν τον χρήστη;',
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
