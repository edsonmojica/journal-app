import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { login, logout, startLoginWithEmailPassword, startLogout } from "../../actions/auth";
import { types } from "../../types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {}

let store = mockStore(initState);

describe('Pruebas con las acciones de Auth', () => {

    beforeEach(() => {
        store = mockStore(initState)
    })
    test('login debe de crear la acción respectiva', () => {
        const uid = 'ABC123';
        const displayName = 'Juan';
        const loginAction = login(uid, displayName);
        const logoutAction = logout();

        expect(loginAction).toEqual({
            payload: {
                uid: uid,
                displayName: displayName
            },
            type: types.login
        });

        expect(logoutAction).toEqual({
            type: types.logout
        });
    });

    test('debe de realizar el startLogout', async () => {
        await store.dispatch(startLogout());
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: types.logout
        });

        expect(actions[1]).toEqual({
            type: types.notesLogoutCleaning
        });
    });

    test('debe de iniciar el startLoginWithEmailAndPassword', async () => {
        await store.dispatch(startLoginWithEmailPassword('test@testing.com', '123456'));
        const actions = store.getActions();

        expect(actions[1]).toEqual({
            type: types.login,
            payload: {
                uid: 'C0y3IEHNzlWvY8ji6TrFKPQIbZE3',
                displayName: null
            }
        });

    })
})