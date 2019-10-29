
import { Timeline } from './ts/ui/Timeline';
import { KeywordInput } from './ts/ui/KeywordInput';
import { GraphQLClient } from './ts/data/GraphQLClient';

const main = () => {
    console.log('Client Applikation läuft...');

    // Initialize internal components
    const graphQLCLient = new GraphQLClient();

    // Initialize UI components
    const timeline = new Timeline();
    new KeywordInput(graphQLCLient, timeline);
}
main();
