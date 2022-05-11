/** * @jest-environment node */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startLoadingNotes, startNewNote, startSaveNote, startUploading } from "../../actions/notes";
import { db } from '../../firebase/firebase-config';
import { types } from "../../types/types";

// jest.mock('../../helpers/fileUpload', () => ({

//     fileUpload: jest.fn(() => {
//         return Promise.resolve("https://misfotos.com/photo.png")
//     }),

// }));

jest.mock("../../helpers/fileUpload", () => {
    return {
        fileUpload: () => {
            return Promise.resolve(
                "https://this-represents-an-url.com/photo.png"
            );
        },
    };
});


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: 'TESTING'
    },
    notes: {
        active: {
            id: 'zHDHILkQIPuQQrdVsRZg',
            title: 'Test',
            body: 'Test',
        }
    }
}


let store = mockStore(initState);

describe('Pruebas en notes-actions', () => {

    beforeEach(() => {
        store = mockStore(initState)
    })

    test('debe de crear una nueva nota startNewNote', async () => {

        await store.dispatch(startNewNote());

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        expect(actions[1]).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        const docId = actions[0].payload.id;
        const uid = store.getState().auth.uid;
        await db.doc(`${uid}/journal/notes/${docId}`).delete();
    })

    test('startLoadingNotes debe cargar las notas', async () => {
        await store.dispatch(startLoadingNotes('TESTING'));
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        });

        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number)
        }

        expect(actions[0].payload[0]).toMatchObject(expected);
    })

    test('startSaveNote debe de actualizar una nota', async () => {
        const note = {
            id: 'zHDHILkQIPuQQrdVsRZg',
            title: 'Test1',
            body: 'Test1',
        }

        await store.dispatch(startSaveNote(note));

        const actions = store.getActions();

        //console.log(actions)
        expect(actions[0].type).toBe(types.notesUpdated);

        const docRef = await db.doc(`/TESTING/journal/notes/${note.id}`).get();

        expect(docRef.data().title).toBe(note.title);
    })

    test('startUploadingImage debe de actualizar el url de la imagen', async () => {
        const file = [];
        await store.dispatch(startUploading(file));

        const docRef = await db.doc(`/TESTING/journal/notes/zHDHILkQIPuQQrdVsRZg`).get();
        expect(docRef.data().url).toBe('https://this-represents-an-url.com/photo.png');

    });
});
