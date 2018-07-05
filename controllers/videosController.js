const fs = require('fs');
const jsonfile = require('jsonfile')
var path = require('path');

// const fileExists = require('../helper');


const file = path.join(__dirname, '../database/video.json');

module.exports = {
  /*
  ----------------------------------------------------------------------
    - postVideos Controller Function
      * Input: id, title and category_id
      * Output: 201 status code on Success, Other Status Code on Fail
  ----------------------------------------------------------------------
  */
  postVideos(req, res) {
    if (req.body != null) {
      const id = req.body.id;
      const title = req.body.title;
      const category_id = parseInt(req.body.category_id, 0);
      let obj;
      fs.exists(file, function(exists){
        if(exists){
          fs.readFile(file, (err, data) => {
            if (err) {
              console.log(err);
              return res.status(500).json({err}).end();
            }
            obj = JSON.parse(data);
            let notExists = true;
            for (let i=0; i <= obj.video.length - 1; i++) {
              if (obj.video[i].id === id) {
                return res.status(409).json({message: 'Already exists'}).end();
                notExists = false;
              } else {
                notExists = true;
              }
            }

            if (notExists) {
              obj.video.push({id: id, title: title, category_id: category_id});
              json = JSON.stringify(obj);
              fs.writeFile(file, json, 'utf8', (err, response) => {
                if (err) {
                  console.log(err);
                  return res.status(500).json({err}).end();
                } else {
                  return res.status(201).json({message: 'Video added'}).end();
                }
              });
            }
          });
        } else {
          return res.status(404).json({message: 'file not exists'}).end();
        }
      });
    } else {
      return res.status(204).json({message: 'No content'}).end();
    }
  },

  /*
  ----------------------------------------------------------------------
    - updateVideos Controller Function
      * Input: id
      * Output: 200 status code on Success, Other Status Code on Fail
  ----------------------------------------------------------------------
  */
  updateVideos(req, res) {
    if (req.body != null) {
      const id = req.body.id;
      const title = req.body.title;
      const category_id = parseInt(req.body.category_id, 0);
      let obj;
      fs.exists(file, function(exists){
        if(exists){
          fs.readFile(file, (err, data) => {
            if (err) {
              console.log(err);
              return res.status(500).json({err}).end();
            }
            obj = JSON.parse(data);
            let notExists = true;
            for (let i=0; i <= obj.video.length - 1; i++) {
              if (obj.video[i].id === id && obj.video[i].title === title && obj.video[i].category_id === category_id) {
                return res.status(409).json({message: 'Already exists'}).end();
                notExists = false;
              } else {
                notExists = true;
              }
            }

            if (notExists) {
              let index;
              for (let i=0; i <= obj.video.length - 1; i++) {
                if (obj.video[i].id === req.params.id) {
                  obj.video[i].id = id;
                  obj.video[i].title = title;
                  obj.video[i].category_id = category_id;
                }
              }
              json = JSON.stringify(obj);
              fs.writeFile(file, json, 'utf8', (err, response) => {
                if (err) {
                  console.log(err);
                  return res.status(500).json({err}).end();
                } else {
                  return res.status(200).json({message: 'Video updated'}).end();
                }
              });
            }
          });
        } else {
          return res.status(404).json({message: 'file not exists'}).end();
        }
      });
    } else {
      return res.status(204).json({message: 'No content'}).end();
    }
  },

  /*
  ----------------------------------------------------------------------
    - getVideos Controller Function
      * Output: 200 status code on Success, videos
  ----------------------------------------------------------------------
  */
  getVideos(req, res) {
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
              data: parsedData.video,
            });
          }
        });
      } else {
        res.status(204).json({message: 'file not exists'});
        console.log("file not exists");
      }
    });
  },

  /*
  ----------------------------------------------------------------------
    - getSingleVideo Controller Function
      * Output: 200 status code on Success, video
  ----------------------------------------------------------------------
  */
  getSingleVideo(req, res) {
    const { id } = req.params;
    fs.exists(file, function(exists){
      if(exists){
        fs.readFile(file, (err, data) => {
          if (err) {
            console.log(err);
            res.status(500).json({err});
          }
          if (data) {
            const obj = JSON.parse(data);
            let videoFound = false;
            for (let i=0; i <= obj.video.length - 1; i++) {
              if (obj.video[i].id === id) {
                videoFound = true;
                return res.status(200).json({
                  data: obj.video[i],
                }).end();
              }
            }
            if (!videoFound) {
              res.status(404).json({message: 'Not found'}).end();
            }
          }
        });
      } else {
        res.status(204).json({message: 'file not exists'});
        console.log("file not exists");
      }
    });
  },

  /*
  ----------------------------------------------------------------------
    - deleteVideo Controller Function
      * Output: 200 status code on Success
  ----------------------------------------------------------------------
  */
  deleteVideo(req, res) {
    const { id } = req.params;
    fs.exists(file, function(exists){
      if(exists){
        fs.readFile(file, (err, data) => {
          if (err) {
            console.log(err);
            res.status(500).json({err});
          }
          if (data) {
            const obj = JSON.parse(data);
            let videoFound = false;
            for (let i=0; i <= obj.video.length - 1; i++) {
              console.log('params id-->', id);
              if (obj.video[i].id === id) {
                videoFound = true;
                if (delete obj.video.splice(i,1)) {
                  json = JSON.stringify(obj);
                  fs.writeFile(file, json, 'utf8', (err, response) => {
                    if (err) {
                      console.log(err);
                      return res.status(500).json({err}).end();
                    } else {
                      return res.status(200).json({message: 'Video deleted'}).end();
                    }
                  });
                } else {
                  res.status(400).json({}).end();
                }
              }
            }
            if (!videoFound) {
              res.status(404).json({message: 'Not found'}).end();
            }
          }
        });
      } else {
        res.status(204).json({message: 'file not exists'});
        console.log("file not exists");
      }
    });
  }
};