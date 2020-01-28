import React from 'react'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Dialog from '@material-ui/core/Dialog'
import DialogContentText from '@material-ui/core/DialogContentText'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const DeleteCategoryDialog = ({ open, onClose, onDeleteCategory, category }) => {
  return (
    <Dialog
      open={open}
      keepMounted
      onClose={onClose}
    >
      <Typography color='error' align='center' variant='h5'>{`Διαγραφη κατηγορίας ${category}!`}</Typography>
      <DialogContent>
        <DialogContentText>
          {`Η παρακάτω ενέργεια είναι μη αναστρέψιμη και θα διαγράψει την κατηγορία ${category} καθώς και όλα τα θέματα που ανήκουν σε αυτήν.
        Αν είστε σίγουροι πως θέλετε να προχωρήσετε πατήστε το κουμπί  'ΔΙΑΓΡΑΦΗ'`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDeleteCategory} color='primary' variant='contained'>
        Διαγραφη
        </Button>
        <Button onClick={onClose} color='primary'>
        Ακύρωση
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteCategoryDialog
