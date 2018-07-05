const fs = require('fs');
const jsonfile = require('jsonfile')
var path = require('path');

// const fileExists = require('../helper');


const file = path.join(__dirname, '../database/video.json');

module.exports = {
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
              data: parsedData,
            });
          }
        });
      } else {
        res.status(204).json({message: 'file not exists'});
        console.log("file not exists");
      }
    });
  },

  postVideos(req, res) {
    if (req.body != null) {
      const id = req.body.id;
      const title = req.body.title;
      const category_id = parseInt(req.body.category_id, 0);
      let obj = {
         data: []
      };
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
                  return res.status(201).json({message: 'Video added.'}).end();
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

  // updateVideos(req, res) {
  //   if (req.body != null) {
  //     const id = req.body.id;
  //     const title = req.body.title;
  //     const category_id = parseInt(req.body.category_id, 0);
  //     let obj = {
  //        data: []
  //     };
  //     fs.exists(file, function(exists){
  //       if(exists){
  //         fs.readFile(file, (err, data) => {
  //           if (err) {
  //             console.log(err);
  //             return res.status(500).json({err}).end();
  //           }
  //           obj = JSON.parse(data);
  //           let notExists = true;
  //           for (let i=0; i <= obj.video.length - 1; i++) {
  //             if (obj.video[i].id === id && obj.video[i].title === title && obj.video[i].category_id === category_id) {
  //               return res.status(409).json({message: 'Already exists'}).end();
  //               notExists = false;
  //             } else {
  //               notExists = true;
  //             }
  //           }

  //           if (notExists) {
  //             let index;
  //             for (let i=0; i <= obj.video.length - 1; i++) {
  //               if (obj.video[i].id === id) {
  //                 delete obj.video.indexOf(id);

  //                 // delete
  //                 console.log('deleted', obj.video);
  //               }
  //             }
  //             obj.video.push({id: id, title: title, category_id: category_id});
  //             json = JSON.stringify(obj);
  //             fs.writeFile(file, json, 'utf8', (err, response) => {
  //               if (err) {
  //                 console.log(err);
  //                 return res.status(500).json({err}).end();
  //               } else {
  //                 return res.status(201).json({message: 'Video updated.'}).end();
  //               }
  //             });
  //           }
  //         });
  //       } else {
  //         return res.status(404).json({message: 'file not exists'}).end();
  //       }
  //     });
  //   } else {
  //     return res.status(204).json({message: 'No content'}).end();
  //   }
  // }
};