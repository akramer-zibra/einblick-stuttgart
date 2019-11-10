
import Bottle from 'bottlejs';
import { SearchController } from './ts/controller/SearchController';
import { GraphQLClient } from './ts/data/GraphQLClient';
import { SearchHistory } from './ts/helper/SearchHistory';
import { RatsdokumenteProvider } from './ts/provider/Ratsdokumente.provider';
import { GemeinderatStuttgartWahldaten } from './ts/provider/static/GemeinderatStuttgartWahldaten.provider';
import { KeywordInput } from './ts/ui/input/KeywordInput';
import { SearchInput } from './ts/ui/input/SearchInput';
import { TypeInput } from './ts/ui/input/TypeInput';
import { PdfModal } from './ts/ui/modal/PdfModal';
import { Timeline } from './ts/ui/timeline/Timeline';

const main = () => {
    console.log('Client Applikation läuft...');

    // Wir benutzen bottle js als Dependency Container
    const bottle = new Bottle();

    // Definiere alle Service Klassen und Factory Methoden
    bottle.service('GraphQLClient', GraphQLClient);
    bottle.factory('RatsdokumenteProvider', RatsdokumenteProvider.build);
    bottle.service('GemeinderatStuttgartWahldatenProvider', GemeinderatStuttgartWahldaten);

    bottle.factory('Timeline', Timeline.build);
    bottle.factory('PdfModal', PdfModal.build);

    bottle.factory('SearchController', SearchController.build);
    bottle.service('SearchHistory', SearchHistory);
    bottle.factory('SearchInput', SearchInput.build);
    bottle.factory('KeywordInput', KeywordInput.build);
    bottle.service('TypeInput', TypeInput);

    // Initialisiere Startkomponenten
    bottle.container.SearchInput;
    bottle.container.KeywordInput;
    bottle.container.TypeInput;
    bottle.container.PdfModal;
}
main();
