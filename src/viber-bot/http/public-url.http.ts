import http from "http";

const options = {
  hostname: '127.0.0.1',
  port: 4040,
  path: '/api/tunnels',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  }
};

export const getPublicUrl = function () {
  return new Promise((resolve, reject) => {
    const req = http.request(options, function (res: http.IncomingMessage) {
      res.setEncoding('utf8');
      res.on('data', function (data: string) {
        const config = JSON.parse(data) as { tunnels: { proto: string, public_url: string }[]};
        const httpsTunnel = config.tunnels.filter((t) => t.proto === 'https').pop();
        resolve(httpsTunnel?.public_url);
      });
    });

    req.on('error', function (e: any) {
      reject(e.message);
    });

    req.end();
  });
}
