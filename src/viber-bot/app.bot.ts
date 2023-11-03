import http from 'http';

import { getPublicUrl } from './http/public-url.http';
import bot from './services/viber-event.service'

export class ViberBot {
  static start() {
    getPublicUrl()
      .then((publicUrl) => {
        const port = process.env.PORT ?? 3000;
        http.createServer(bot.middleware()).listen(port, () => {
          bot.setWebhook((publicUrl as string))
            .catch((error) => {
              console.error('Can not set webhook on following server. Is it running?', error);
              process.exit(1);
            });
        });
      }).catch((err) => {
        //TODO provide error handler
        console.error('No public URL', err);
      });
  }
}
