import { mount } from "enzyme";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { LoginScreen } from "../../../components/auth/LoginScreen";
import { MemoryRouter } from "react-router-dom";
import { startGoogleLogin, startLoginWithEmailPassword } from "../../../actions/auth";

jest.mock("../../../actions/auth", () => ({
    startGoogleLogin: jest.fn(),
    startLoginWithEmailPassword: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {},
    ui: {
        isLoading: false,
        error: null
    }
}

let store = mockStore(initState);

store.dispatch = jest.fn();

describe('Pruebas en <LoginScreen />', () => {

    beforeEach(() => {
        store = mockStore(initState);
        jest.clearAllMocks();
    });

    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <LoginScreen />
            </MemoryRouter>
        </Provider>
    );

    test('Debe de mostrar el componente correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('debe de disparar la acción de startGoogleLogin', () => {

        wrapper.find('.google-btn').prop('onClick')(
            { preventDefault: () => { } }
        );

        expect(startGoogleLogin).toHaveBeenCalled();


    })

    test('debe de disparar la acción de startLogin con los respectivos argumentos', () => {

        wrapper.find('form').prop('onSubmit')(
            { preventDefault: () => { } }
        );

        expect(startLoginWithEmailPassword).toHaveBeenCalledWith('edson@gmail.com', '123456');


    })
})