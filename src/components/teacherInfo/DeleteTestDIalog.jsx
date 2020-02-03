import React from 'react'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Dialog from '@material-ui/core/Dialog'
import DialogContentText from '@material-ui/core/DialogContentText'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const DeleteTestDialog = ({ open, onClose, onDeleteTest }) => {
  return (
    <Dialog
      open={open}
      keepMounted
      onClose={onClose}
    >
      <Typography color='error' align='center' variant='h5'>Διαγραφη διαγωνίσματος!</Typography>
      <DialogContent>
        <DialogContentText>
          Η παρακάτω ενέργεια είναι μη αναστρέψιμη και θα διαγράψει το διαγώνισμα  καθώς και όλες τις υποβληθήσες απαντήσεις.
        Αν είστε σίγουροι πως θέλετε να προχωρήσετε πατήστε το κουμπί  'ΔΙΑΓΡΑΦΗ'
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDeleteTest} color='primary' variant='contained'>
        Διαγραφη
        </Button>
        <Button onClick={onClose} color='primary'>
        Ακύρωση
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteTestDialog
