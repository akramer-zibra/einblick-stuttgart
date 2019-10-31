
import { Timeline } from './ts/ui/Timeline';
import { KeywordInput } from './ts/ui/KeywordInput';
import { GraphQLClient } from './ts/data/GraphQLClient';
import { RatsdokumenteProvider } from './ts/provider/Ratsdokumente.provider';

const main = () => {
    console.log('Client Applikation läuft...');

    // Initialisiere api Objekt
    const graphQLCLient = new GraphQLClient();

    // Initialisiere provider Objekte
    const ratsdokumenteProvider = new RatsdokumenteProvider(graphQLCLient);

    // Initialisiere UI Komponenten
    const timeline = new Timeline();
    new KeywordInput(ratsdokumenteProvider, timeline);
}
main();
