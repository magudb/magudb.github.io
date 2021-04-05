const WorkboxPlugin = require('workbox-webpack-plugin');
const path = require('path');
module.exports = {
  entry: './_src/app.js',
  output: {
    path: path.resolve(__dirname, "assets/js/"),
        filename: "app.js"
  },
  plugins: [
   new WorkboxPlugin.GenerateSW({
     // these options encourage the ServiceWorkers to get in there fast
     // and not allow any straggling "old" SWs to hang around
     clientsClaim: true,
     skipWaiting: true,
     swDest: "service-worker.js"
   }),
  ],
};
