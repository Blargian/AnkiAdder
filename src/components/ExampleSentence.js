import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { connect,useSelector } from 'react-redux';
import Utility from '../utilities/utility';
import {addExampleSentenceAction,addExtraInfoAction} from '../actions/addActions';
import axios from 'axios';

const utility = new Utility();
const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

const ExampleSentence = ({addObject,addExampleSentence,addExtraInfo}) => {

    const [exampleSentence, setExample] = useState('');
    const [extraInfo, setExtra] = useState('');
    const [add,setAdd] = useState(false);
    const classes = useStyles();

    const submitHandler = (event) => {
        event.preventDefault();
        addExampleSentence(exampleSentence);
        addExtraInfo(extraInfo);
        setAdd(true);
    }

    useEffect(()=>{
        if(add){
            setAdd(false);
            console.log(addObject);
            const res = axios.post('/add',
            utility.reduxToJSON(addObject),{
                headers: {
                    'Content-Type':'application/json',
                }
            }
            );

            if(res.status===200){
                console.log('Sent the data successfully');
            }
        }
    },[addObject])

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
});

const mapStateToProps = (state) => {

    const addObject = {
        imageURL: state.add.imageURL,
        accented: state.add.accented,
        pronounciationURL: state.add.pronounciationURL,
        exampleSentence: state.add.exampleSentence,
        extraInfo: state.add.extraInfo
    }
    return {addObject};
};

export default connect(mapStateToProps,mapDispatchToProps)(ExampleSentence);