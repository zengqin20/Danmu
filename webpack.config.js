const HtmlWebpackPlugin=require('html-webpack-plugin');
const {resolve } = require('path');

module.exports={
  entry:'./src/js/index.js',
  output:{
    path:resolve(__dirname,'build'),
    filename:'bundle.js'
  },

  plugins:[
    new HtmlWebpackPlugin({
      template:resolve(__dirname,'./src/index.html'),
    })
  ],
  devServer:{
    contentBase:'./',
    open:true,
  }
}
