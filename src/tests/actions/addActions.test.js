import {addImageAction} from '../../actions/addActions';

test('Should create action for adding an image url to the store', () => {
    const mockURL = 'https://pixabay.com/get/g9f93b282920cb5affb17ffb6ff8b5f90bbc1950f84173aa13729fa0c1c8c0e30496a5a70b88856d868cbd0c70cfb1233_640.jpg'
    const mockAction = {
        type: 'ADD_IMAGE',
        payload: mockURL
    }
    expect(addImageAction(mockURL)).toEqual(mockAction)
})