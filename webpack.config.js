const path = require('path'); // getting node path module loaded up
// seting up config object
const config = {
  entry: path.join(__dirname, './client/index.js'), // absolute path to our index file
  output: {  // our output configuration
    path: path.join(__dirname, './public/'), // output path (directory/folder)
    filename: 'bundle.js' //output bundled javascript file name
  },
  module: { //we define loaders here
    rules: [
      {
        test: /\.(js|jsx)$/, // check for .js or .jsx files using regex
        loader: 'babel-loader'
      },
      {
        test:/\.css$/,
        loaders: ['style-loader', 'css-loader']
      }
    ]
  }
};

// export the config object
module.exports = config; //this is es5 because webpack currently supports es5 only
