
import Bottle from 'bottlejs';
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

    // Wir benutzen bottle js als Dependency Container
    const bottle = new Bottle();

    // Definiere alle Service Klassen
    bottle.service('SearchHistory', SearchHistory);
    bottle.service('GraphQLClient', GraphQLClient);
    bottle.service('Timeline', Timeline);

    bottle.factory('RatsdokumenteProvider', RatsdokumenteProvider.build);
    bottle.factory('SearchController', SearchController.build);
    bottle.factory('SearchInput', SearchInput.build);
    bottle.factory('KeywordInput', KeywordInput.build);
    bottle.factory('PdfModal', PdfModal.build);

    // Initialisiere Eingabe Komponenten
    bottle.container.SearchInput;
    bottle.container.KeywordInput;
    bottle.container.PdfModal;
}
main();
