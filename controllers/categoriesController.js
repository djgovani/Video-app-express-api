const fs = require('fs');
const jsonfile = require('jsonfile')
var path = require('path');

// const fileExists = require('../helper');


const file = path.join(__dirname, '../database/video.json');

module.exports = {
  /*
  ----------------------------------------------------------------------
    - getCategories Controller Function
      * Output: 200 status code on Success, videos
  ----------------------------------------------------------------------
  */
  getCategories(req, res) {
    fs.exists(file, function(exists){
      if(exists){
        fs.readFile(file, (err, data) => {
          if (err) {
            console.log(err);
            res.status(500).json({err});
          }
          if (data) {
            console.log(data)
            const parsedData = JSON.parse(data);
            res.status(200).json({
              data: parsedData.category,
            });
          }
        });
      } else {
        res.status(204).json({message: 'file not exists'});
        console.log("file not exists");
      }
    });
  }
};