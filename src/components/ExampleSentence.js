import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import {addExampleSentenceAction,addExtraInfoAction} from '../actions/addActions';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

const ExampleSentence = ({addExampleSentence,addExtraInfo}) => {

    const [exampleSentence, setExample] = useState('');
    const [extraInfo, setExtra] = useState('');
    const classes = useStyles();

    const submitHandler = (event) => {
        event.preventDefault();
        addExampleSentence(exampleSentence);
        addExtraInfo(extraInfo);
        console.log('Added info');
    }

    return (
        <div className="example-sentence">
            <form onSubmit={submitHandler} className={classes.root} noValidate autoComplete="off">
                <TextField
                    id="outlined-basic1" 
                    label="Example Sentence" 
                    variant="outlined" 
                    fullWidth
                    onInput = {( e => setExample(e.target.value))} 
                />
                <TextField 
                    id="outlined-basic2" 
                    label="Extra Info" 
                    variant="outlined" 
                    fullWidth
                    onInput = {( e => setExtra(e.target.value))} 
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.button}
                    startIcon={<AddIcon />}
                >
                    Add Card
                </Button> 
            </form>
        </div>
        
    )
}

const mapDispatchToProps = (dispatch) => ({
    addExampleSentence: (exampleSentence) => dispatch(addExampleSentenceAction(exampleSentence)),
    addExtraInfo: (extraInfo) => dispatch(addExtraInfoAction(extraInfo))
})

export default connect(null,mapDispatchToProps)(ExampleSentence);