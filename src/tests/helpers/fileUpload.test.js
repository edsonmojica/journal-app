import 'setimmediate';
import cloudinary from 'cloudinary';
import { fileUpload } from "../../helpers/fileUpload";

jest.setTimeout(60000);

cloudinary.config({
    cloud_name: 'ddzxmfoj7',
    api_key: '446671572157528',
    api_secret: 'Pe22s4Ub1VpA539Bek2-Cd52JOU'
});

describe('Pruebas en el fileUpload', () => {
    test('debe de cargar un archivo y retornar la url', async () => {

        const resp = await fetch('https://us.123rf.com/450wm/abluecup/abluecup1209/abluecup120900334/15405340-un-hombre-acusado-de-otra-persona.jpg');

        const blob = await resp.blob();
        const file = new File([blob], 'foto.jpg');

        const url = await fileUpload(file);

        expect(typeof url).toBe('string');

        //Borrar imagen por ID

        const segments = url.split('/');
        //console.log(segments);
        const imageId = segments[segments.length - 1].replace('.jpg', '');
        //console.log(imageId);
        cloudinary.v2.api.delete_resources(imageId, {}, () => {

        });

    });

    test('debe de retornar un error', async () => {


        const file = new File([], 'foto.png');
        const url = await fileUpload(file);

        expect(url).toBe(null);

    });

})

