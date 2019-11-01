
import { Timeline } from './ts/ui/Timeline';
import { KeywordInput } from './ts/ui/KeywordInput';
import { GraphQLClient } from './ts/data/GraphQLClient';
import { RatsdokumenteProvider } from './ts/provider/Ratsdokumente.provider';
import { SearchInput } from './ts/ui/SearchInput';
import { SearchController } from './ts/controller/SearchController';
import { PdfModal } from './ts/ui/PdfModal';

const main = () => {
    console.log('Client Applikation läuft...');

    // Initialisiere api Objekt
    const graphQLCLient = new GraphQLClient();

    // Initialisiere provider Objekte
    const ratsdokumenteProvider = new RatsdokumenteProvider(graphQLCLient);

    // Initialisiere UI Komponenten
    const timeline = new Timeline();

    // Initialisiere core Objekte
    const searchController = new SearchController(ratsdokumenteProvider, timeline);

    // 
    new SearchInput(searchController);
    new KeywordInput(searchController);
    new PdfModal(timeline);
}
main();
