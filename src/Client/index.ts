
import { Timeline } from './ts/ui/Timeline';
import { KeywordInput } from './ts/ui/KeywordInput';
import { GraphQLClient } from './ts/data/GraphQLClient';
import { RatsdokumenteProvider } from './ts/provider/Ratsdokumente.provider';

const main = () => {
    console.log('Client Applikation läuft...');

    // Initialize internal components
    const graphQLCLient = new GraphQLClient();

    // Initialize providers
    const ratsdokumenteProvider = new RatsdokumenteProvider(graphQLCLient);

    // Initialize UI components
    const timeline = new Timeline();
    new KeywordInput(ratsdokumenteProvider, timeline);
}
main();
