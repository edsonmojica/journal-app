import { types } from "../../types/types";

describe('Pruebas del types', () => {
    test('Debe de retornar un objeto', () => {

        expect(types).toEqual({
            login: '[Auth] Login',
            logout: '[Auth] Logout',
            uiSetError: '[UI] Set Error',
            uiRemoveError: '[UI] Remove Error',
            uiStartLoading: '[UI] Start Loading',
            uiFinishLoading: '[UI] Finish Loading',
            notesAddNew: '[Notes] Add New',
            notesActive: '[Notes] Set Active Note',
            notesLoad: '[Notes] Load Notes',
            notesUpdated: '[Notes] Update Note',
            notesFileUrl: '[Notes] Set Image Url',
            notesDelete: '[Notes] Delete Note',
            notesLogoutCleaning: '[Notes] Logout Cleaning',
        });
    })
})