import { mount } from "enzyme";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import { types } from "../../../types/types";
import { startLogout } from "../../../actions/auth";
import { startNewNote } from "../../../actions/notes";
import { Sidebar } from "../../../components/journal/Sidebar";



jest.mock("../../../actions/auth", () => ({
    startLogout: jest.fn(),
}));

jest.mock("../../../actions/notes", () => ({
    startNewNote: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: '1',
        name: 'Juan',
    },
    ui: {
        isLoading: false,
        error: null
    },
    notes: {
        active: {
            id: 'ABC123'
        },
        notes: []
    }
}

let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Pruebas en <Sidebar>', () => {

    beforeEach(() => {
        store = mockStore(initState);
        jest.clearAllMocks();
    });

    const wrapper = mount(
        <Provider store={store}>
            <Sidebar />
        </Provider>
    );
    test('debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();

    });

    test('debe de llamar el logout', () => {
        wrapper.find('button').prop('onClick')();
        expect(startLogout).toHaveBeenCalled();

    });

    test('debe de llamar el startNewNote', () => {
        wrapper.find('.journal__new-entry').prop('onClick')();
        expect(startNewNote).toHaveBeenCalled();
    });
});