import React from 'react'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import DialogContentText from '@material-ui/core/DialogContentText'

const finishedText = 'Φαίνεται πως έχετε ολοκληρώσει ένα quiz. ' +
                    'Πιέστε επισκόπηση για να δείτε τα αποτελέσματά σας ' +
                    'ή διαγραφή για να δημιουργήσετε ένα νέο'
const inProgressText = 'Φαίνεται πως έχετε αφήσει ένα quiz σε εξέλιξη. ' +
'Πιέστε συνέχεια για να το συνεχίσετε ' +
  'ή διαγραφή για να δημιουργήσετε ένα νέο'
const QuizInProgressDialog = ({ open, onGoToQuiz, onNewQuiz, onReview, finished }) => {
  const text = finished ? finishedText : inProgressText
  return (
    <Dialog
      open={open}
      maxWidth='md'
    >
      <Typography color='secondary' variant='h3' align='center'>
                    Xμμ..
      </Typography>
      <DialogContent>
        <DialogContentText color='textPrimary' align='center'>
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {finished
          ? <Button onClick={() => onReview()} color='primary'>
                Επισκόπηση
          </Button>
          : <Button onClick={() => onGoToQuiz()} color='primary'>
                Συνεχεια
            </Button>}

        <Button variant='contained' color='primary' onClick={() => onNewQuiz()}>
          Διαγραφή
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default QuizInProgressDialog
