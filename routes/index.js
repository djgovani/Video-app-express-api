const express = require('express');
const router = express.Router();

const videosController = require('../controllers/videosController');
const categoriesController = require('../controllers/categoriesController');

/* Default root page. */
router.get('/', (req, res) => {
  res.status(200).json({ statusCode: 200, message: 'OK' });
});

router.get(`/api/videos`, videosController.getVideos);
router.get(`/api/videos/:id`, videosController.getSingleVideo);
router.post(`/api/videos`, videosController.postVideos);
router.put(`/api/videos/:id`, videosController.updateVideos);

router.get(`/api/categories`, categoriesController.getCategories);


module.exports = router;
