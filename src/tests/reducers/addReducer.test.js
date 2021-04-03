import '../../reducers/addReducer';
import {addImageAction} from '../../actions/addActions';
import { addReducer } from '../../reducers/addReducer';

describe('Add Reducer',()=>{

    it('Should return the correct default state',()=>{
        expect(addReducer(undefined,{})).toEqual(
            {
                imageURL: '',
                accented: '',
                pronounciationURL: '',
                exampleSentence: '',
            }
        )
    })

    it('Should return the state with modified image url for an ADD_IMAGE action',()=>{

        const currentState = {
            imageURL: '',
            accented: 'испыта́ть',
            pronounciationURL: 'xyz.com',
            exampleSentence: 'an example sentence',
        }

        expect(addReducer(currentState,addImageAction('https://pixabay.com/get/g9f93b282920.jpg'))).toEqual(
            {
                ...currentState,
                imageURL: 'https://pixabay.com/get/g9f93b282920.jpg',
            }
        )
    })
})