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
import { Paper, Button } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import Typography from '@material-ui/core/Typography'
import MaterialTable from 'material-table'
import tableIcons from '../../styles/tableIcons'
import { fetch } from 'whatwg-fetch'
import { baseURL } from '../../general/constants'
import EventSeatIcon from '@material-ui/icons/EventSeat'
import { objectToQueryString } from '../../general/helperFunctions'
import UsersTable from './UsersTable'

const data = [
  {
    id: 23,
    index: 1,
    name: 'ονομα',
    count: 13,
    creationDate: Date.now(),
    tests: 10,
    users: [
      {
        serialNumber: 65324,
        firstName: 'savvas',
        lastName: 'vezyridis',
        username: 'boubis12',
        rank: 'anthsgos'
      },
      {
        serialNumber: 65324,
        firstName: 'savvas',
        lastName: 'vezyridis',
        username: 'boubis12',
        rank: 'anthsgos'
      }
    ]
  },
  {
    id: 15,
    index: 1,
    name: 'ονομα',
    count: 13,
    creationDate: Date.now(),
    users: []
  }
]

const classesURL = baseURL + 'class/'

const Classes = ({ open, toogleDrawer, account, deleteAccount, dark }) => {
  const originalColumns = [
    { title: 'ΑΑ', field: 'index', editable: 'never' },
    { title: 'Όνομα Τάξης', field: 'name' },
    { title: 'Αριθμός συμμετεχόντων', field: 'count', editable: 'never' },
    {
      title: 'Ημερομηνία δημιουργίας',
      field: 'creationDate',
      editable: 'never'
    },
    {
      title: 'Αρ.Διαγωνισμάτων',
      field: 'tests',
      editable: 'never',
      render: rowData => (
        <Typography variant='body2'>
          {rowData.tests}
          <Button
            variant='contained'
            onClick={() => history.push(`tests/${rowData.id}`)}
          >
            ΠΡΟΒΟΛΗ
          </Button>
        </Typography>
      )
    }
  ]
  const [columns, setColumns] = useState(originalColumns)
  const classes = homeStyle()
  const history = useHistory()
  const [classRooms, setClassRooms] = useState(data)
  const controller = new window.AbortController()
  const signal = controller.signal

  const deleteClass = classToDelete =>
    new Promise((resolve, reject) => {
      fetch(classesURL + classToDelete.name, {
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
            const oldDataIndex = classRooms.indexOf(classToDelete)
            setClassRooms(classRooms =>
              classRooms.filter((row, index) => index !== oldDataIndex)
            )
            resolve()
          } else reject(data.message)
        })
        .catch(err => reject(err))
    })

  const createClass = className => {
    const temp = [...classRooms]
    temp.push({ index: classRooms.length, name: className, count: 0 })
    return new Promise((resolve, reject) => {
      fetch(classesURL + className, {
        method: 'POST',
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
            setClassRooms(temp)
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
              history.push('/classes')
            }}
            className={classNames(classes.link, dark && classes.dark)}
          >
            <EventSeatIcon className={classes.icon} />
            Οι τάξεις μου
          </Link>
        </Breadcrumbs>
        <Typography variant='h3' color='textPrimary' align='center'>
          Οι τάξεις μου
        </Typography>
        <MaterialTable
          icons={tableIcons}
          title='Τάξεις'
          columns={columns}
          data={classRooms}
          editable={{
            onRowAdd: newData => createClass(newData),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    const oldDataIndex = classRooms.indexOf(oldData)
                    setClassRooms(users =>
                      users.map((row, index) =>
                        index === oldDataIndex ? newData : row
                      )
                    )
                  }
                  resolve()
                }, 1000)
              }),
            onRowDelete: oldData => deleteClass(oldData)
          }}
          detailPanel={rowData => {
            return <UsersTable students={rowData.users} />
          }}
          localization={{
            body: {
              addTooltip: 'Δημιουργία Τάξης',
              deleteTooltip: 'Διαγραφή τάξης',
              editTooltip: 'Επεξεργασία τάξης',
              editRow: {
                deleteText:
                  'Είστε σίγουροι ότι θέλετε να διαγράψετε αυτή την τάξη;',
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
export default Classes
