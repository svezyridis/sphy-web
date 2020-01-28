import React, { useState, useEffect } from 'react'
import DefaultAppBar from '../DefaultAppBar'
import HomeDrawer from '../home/HomeDrawer'
import Copyright from '../Copyright'
import Link from '@material-ui/core/Link'
import homeStyle from '../../styles/homeStyle'
import classNames from 'classnames'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import { useHistory } from 'react-router-dom'
import { Paper, Button } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import Typography from '@material-ui/core/Typography'
import MaterialTable from 'material-table'
import tableIcons from '../../styles/classTableIcons'
import { fetch } from 'whatwg-fetch'
import { baseURL } from '../../general/constants'
import EventSeatIcon from '@material-ui/icons/EventSeat'
import UsersTable from './UsersTable'
import Badge from '@material-ui/core/Badge'
const classesURL = baseURL + 'class/'

const Classes = ({ open, toogleDrawer, account, deleteAccount, dark }) => {
  const columns = [
    { title: 'ΑΑ', field: 'index', editable: 'never' },
    { title: 'Όνομα Τάξης', field: 'name' },
    { title: 'Αριθμός μαθητών', field: 'count', editable: 'never' },
    {
      title: 'Ημερομηνία δημιουργίας',
      field: 'creationDate',
      editable: 'never'
    },
    {
      title: 'Διαγωνίσματα',
      field: 'tests',
      editable: 'never',
      render: rowData =>
        rowData ? (
          <Badge color='secondary' badgeContent={rowData.noOfTests} showZero>
            <Button
              variant='contained'
              onClick={() => history.push(`tests/${rowData.id}`)}
            >
              ΠΡΟΒΟΛΗ
            </Button>
          </Badge>
        ) : null
    }
  ]

  const classes = homeStyle()
  const history = useHistory()
  const [classRooms, setClassRooms] = useState([])
  const controller = new window.AbortController()
  const signal = controller.signal

  useEffect(() => {
    fetch(classesURL, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json'
      },
      signal: signal
    })
      .then(result => result.json())
      .then(data => {
        console.log(data)
        if (data.status === 'success') {
          const { result } = data
          setClassRooms(
            result.map((classRoom, index) => {
              return {
                ...classRoom,
                index,
                count: classRoom.students ? classRoom.students.length : 0
              }
            })
          )
        }
      })
    return () => {
      controller.abort()
    }
  }, [])

  const deleteClass = classToDelete =>
    new Promise((resolve, reject) => {
      fetch(classesURL + classToDelete.name, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
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

  const createClass = className =>
    new Promise((resolve, reject) => {
      console.log(className)
      const temp = [...classRooms]
      fetch(classesURL + className, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        signal: signal
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          if (data.status === 'success') {
            var utc = new Date()
              .toJSON()
              .slice(0, 10)
              .replace(/-/g, '/')
            temp.push({
              ...data.result,
              index: temp.length,
              count: 0,
              creationDate: utc
            })
            setClassRooms(temp)
            resolve()
          } else reject(data.message)
        })
        .catch(err => reject(err))
    })

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
          options={{
            search: false
          }}
          editable={{
            onRowAdd: newData => createClass(newData.name),
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
          detailPanel={[
            {
              tooltip: 'Προβολή μαθητών',
              render: rowData => {
                return <UsersTable students={rowData.students} classID={rowData.id} />
              }
            }
          ]}
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
