
import { Timeline } from './ts/Timeline';
import { KeywordInput } from './ts/KeywordInput';
import { GraphQLClient } from './ts/GraphQLClient';

const main = () => {
    console.log('Client Applikation läuft...');

    // Initialize internal components
    const graphQLCLient = new GraphQLClient();

    // Initialize UI components
    const timeline = new Timeline();
    new KeywordInput(graphQLCLient, timeline);
}
main();
