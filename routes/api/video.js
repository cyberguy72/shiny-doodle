const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const service = require('../../bin/video-service');

const Video = require('../../models/Video');

// @route    POST api/video
// @desc     Process Video
// @access   Public
router.post(
  '/',
  check('input_video_path', 'Video Path is required').notEmpty(),
  check('output_video_path', 'Output filename is required').notEmpty(),
  check('overlay', 'Text overlay is required').notEmpty(),
  check('location', 'Overlay location is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { input_video_path, duration, resolution, output_video_path, overlay, location, font_size, font_color, start, end } = req.body;

    try {

      let video = new Video({
        input_video_path,
        duration,
        resolution,
        output_video_path,
        overlay,
        font_size,
        font_color,
        start,
        end
      });

      let splitLocation = await service.validateAxis(location, resolution);

      if(splitLocation.errors){
        res.status(400).json(splitLocation.errors);
        return;
      }
     
      video.x_axis = parseInt(splitLocation[0]);
      video.y_axis = parseInt(splitLocation[1]);

      let validTime = await service.validateTime(start, end, duration);

      if(validTime.errors){
        res.status(400).json(validTime.errors);
        return;
      }

      let command = await service.fetchCommand(video, splitLocation);

      video.output = command;

      await video.save();

      res.status(200).json({ "command_string":command });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
