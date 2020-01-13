import React from 'react'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import DialogContentText from '@material-ui/core/DialogContentText'
import DeleteIcon from '@material-ui/icons/Delete'
import classNames from 'classnames'

const finishedText =
  'Φαίνεται πως έχετε ολοκληρώσει ένα quiz. ' +
  'Πιέστε επισκόπηση για να δείτε τα αποτελέσματά σας ' +
  'ή διαγραφή για να δημιουργήσετε ένα νέο'
const inProgressText =
  'Φαίνεται πως έχετε αφήσει ένα quiz σε εξέλιξη. ' +
  'Πιέστε συνέχεια για να το συνεχίσετε ' +
  'ή διαγραφή για να δημιουργήσετε ένα νέο'
const QuizInProgressDialog = ({
  open,
  onGoToQuiz,
  onNewQuiz,
  onReview,
  finished,
  dark,
  classes
}) => {
  const text = finished ? finishedText : inProgressText
  return (
    <Dialog open={open} maxWidth='sm'>
      <Typography
        color={dark ? 'secondary' : 'primary'}
        variant='h3'
        align='center'
      >
        Xμμ..
      </Typography>
      <DialogContent>
        <DialogContentText color='textPrimary' align='center'>
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {finished ? (
          <Button
            onClick={() => onReview()}
            color='secondary'
          >
            Επισκόπηση
          </Button>
        ) : (
          <Button
            onClick={() => onGoToQuiz()}
            color='secondary'
          >
            Συνεχεια
          </Button>
        )}

        <Button
          variant='contained'
          color='secondary'
          onClick={() => onNewQuiz()}
          startIcon={<DeleteIcon />}
        >
          Διαγραφη
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default QuizInProgressDialog
