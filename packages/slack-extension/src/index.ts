import { WebClient } from '@slack/web-api';
import dotenv from 'dotenv';

dotenv.config();

const web = new WebClient(process.env.SLACK_TOKEN);
const currentTime = new Date().toTimeString();

(async () => {
    try {
        await web.chat.postMessage({
            channel: '#datagalaxy-bot-staging',
            text: `The current time is ${currentTime}`,
        });
    } catch (error) {
        console.error(error);
    }

    console.info('Message posted!');
})();
