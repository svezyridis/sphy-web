import React, { useState, forwardRef } from 'react'
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

const testData = {
  columns: [
    { title: 'ΑΜ', field: 'SN' },
    { title: 'Όνομα', field: 'firstName' },
    { title: 'Επίθετο', field: 'lastName' },
    { title: 'username', field: 'username' },
    { title: 'password', field: 'password' },
    { title: 'Μονάδα', field: 'unit' },
    { title: 'Βαθμός', field: 'rank' },
    { title: 'Ρόλος', field: 'role' }
  ],
  data: [
    {
      SN: 1,
      firstName: 'Savvas',
      lastName: 'Vezyridis',
      username: 'boubis12',
      password: '*******',
      unit: '115ΠΜ',
      rank: 'Ανθσγος',
      role: 'ADMIN'
    },
    {
      SN: 2,
      firstName: 'SavvDSADASDas',
      lastName: 'VezyDSADSAridis',
      username: 'boDASDSAubis12',
      password: '*******',
      unit: '115ΠΜ',
      rank: 'Ανθσγος',
      role: 'ADMIN'
    }
  ]
}

const UserManagement = ({
  open,
  toogleDrawer,
  account,
  deleteAccount,
  dark
}) => {
  const classes = homeStyle()
  const history = useHistory()
  const [data, setData] = useState(testData.data)
  console.log(account)
  if (isEmpty(account)) {
    history.push('/login')
    return null
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
          title='Χρήστες'
          columns={testData.columns}
          data={data}
          editable={{
            onRowAdd: newData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  setData(data => ({ ...data, newData }))
                  resolve()
                }, 1000)
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    const oldDataIndex = data.indexOf(oldData)
                    setData(data =>
                      data.map((row, index) =>
                        index === oldDataIndex ? newData : row
                      )
                    )
                  }
                  resolve()
                }, 1000)
              }),
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    const oldDataIndex = data.indexOf(oldData)
                    setData(data =>
                      data.filter((row, index) => index !== oldDataIndex)
                    )
                  }
                  resolve()
                }, 1000)
              })
          }}
        />

        <Paper elevation={3} />
      </div>
      <Copyright open={open} />
    </div>
  )
}
export default UserManagement
