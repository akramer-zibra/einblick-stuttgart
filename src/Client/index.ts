
import { Timeline } from './ts/ui/timeline/Timeline';
import { KeywordInput } from './ts/ui/input/KeywordInput';
import { GraphQLClient } from './ts/data/GraphQLClient';
import { RatsdokumenteProvider } from './ts/provider/Ratsdokumente.provider';
import { SearchInput } from './ts/ui/input/SearchInput';
import { SearchController } from './ts/controller/SearchController';
import { PdfModal } from './ts/ui/modal/PdfModal';
import { SearchHistory } from './ts/helper/SearchHistory';

const main = () => {
    console.log('Client Applikation läuft...');

    // Initialisiere helper Ojekte
    const searchHistory = new SearchHistory();

    // Initialisiere api Objekt
    const graphQLCLient = new GraphQLClient();

    // Initialisiere provider Objekte
    const ratsdokumenteProvider = new RatsdokumenteProvider(graphQLCLient);

    // Initialisiere UI Ausgabe Komponenten
    const timeline = new Timeline();

    // Initialisiere core Objekte
    const searchController = new SearchController(ratsdokumenteProvider, timeline, searchHistory);

    // Initialisiere EIngabe Komponenten
    new SearchInput(searchController);
    new KeywordInput(searchController);
    new PdfModal(timeline, searchHistory);
}
main();
