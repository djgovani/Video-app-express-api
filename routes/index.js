const express = require('express');
const router = express.Router();

const videosController = require('../controllers/videosController');

/* Default root page. */
router.get('/', (req, res) => {
  res.status(200).json({ statusCode: 200, message: 'OK' });
});

router.get(`/api/videos`, videosController.getVideos);
router.post(`/api/videos`, videosController.postVideos);
// router.put(`/api/videos`, videosController.updateVideos);

module.exports = router;
