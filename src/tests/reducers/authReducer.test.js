import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

describe('Pruebas en el authReducer', () => {
    test('debe de realizar el login', () => {
        const initState = {};

        const action = {
            type: types.login,
            payload: {
                uid: 'ABC123',
                displayName: 'Juan Perez'
            }
        }

        const state = authReducer(initState, action);

        expect(state).toEqual({
            uid: 'ABC123',
            name: 'Juan Perez'
        })
    });

    test('no debe de hacer cambios en el state', () => {
        const initState = {
            uid: 'ABC123',
            name: 'Juan Perez'
        }

        const action = {
            type: '',
        };

        const state = authReducer(initState, action);

        expect(state).toEqual(initState);
    });
})