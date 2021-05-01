import '../../reducers/addReducer';
import {addImageAction} from '../../actions/addActions';
import {addExampleSentenceAction} from '../../actions/addActions';
import {addExtraInfoAction} from '../../actions/addActions';
import { addReducer } from '../../reducers/addReducer';

describe('Add Reducer',()=>{

    it('Should return the correct default state',()=>{
        expect(addReducer(undefined,{})).toEqual(
            {
                imageURL: '',
                accented: '',
                extraInfo: '',
                pronounciationURL: '',
                exampleSentence: '',
            }
        );
    });

    it('Should return the state with modified image url for an ADD_IMAGE action',()=>{

        const currentState = {
            imageURL: '',
            extraInfo: '',
            accented: 'испыта́ть',
            pronounciationURL: 'xyz.com',
            exampleSentence: 'an example sentence',
        }

        expect(addReducer(currentState,addImageAction('https://pixabay.com/get/g9f93b282920.jpg'))).toEqual(
            {
                ...currentState,
                imageURL: 'https://pixabay.com/get/g9f93b282920.jpg',
            }
        );
    });

    it('Should correctly return modified state for a ADD_EXAMPLE action',()=>{
        
        const mockSentence = 'Мы вместе до́лжны забо́титься о соба́ке';
        
        const currentState = {
            imageURL: 'https://pixabay.com/get/g9f93b282920.jpg',
            extraInfo: '',
            accented: 'соба́ка',
            pronounciationURL: 'xyz.com',
            exampleSentence: '',
        }

        expect(addReducer(currentState,addExampleSentenceAction(mockSentence))).toEqual({
            ...currentState,
            exampleSentence: mockSentence,
        });
    });

    it('Should correctly return modified state for an ADD_EXTRA information action',()=>{
        
        const mockExtraInfo = 'Female. English translation: dog'
        
        const currentState = {
            imageURL: 'https://pixabay.com/get/g9f93b282920.jpg',
            extraInfo: '',
            accented: 'соба́ка',
            pronounciationURL: 'xyz.com',
            exampleSentence: 'Мы вместе до́лжны забо́титься о соба́ке',
        }

        expect(addReducer(currentState,addExtraInfoAction(mockExtraInfo))).toEqual({
            ...currentState,
            extraInfo: mockExtraInfo,
        });
    });
});