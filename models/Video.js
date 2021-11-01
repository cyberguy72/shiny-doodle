const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
  input_video_path: {
    type: String,
    required: true
  },
  duration: {
    type: Number
  },
  resolution: {
    type: String
  },
  output_video_path: {
    type: String,
    required: true
  },  
  overlay: {
    type: String,
    required: true
  },  
  x_axis: {
    type: Number,
    required: true
  },  
  y_axis: {
    type: Number,
    required: true
  },  
  font_size: {
    type: Number
  },  
  font_color: {
    type: String
  },  
  start: {
    type: Number
  },  
  end: {
    type: Number
  },  
  output: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('video', VideoSchema);
