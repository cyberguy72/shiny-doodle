# Steel Series Coding Challenge

After cloning the repo to local -

> npm install
> npm install nodemon
> npm run server

API should be running on port 5000

All requests are logged to a Mongo Atlas DB

Functional endpoint is localhost:5000/api/video

## Request Syntax

> {
>     "input_video_path":"test_input1.mp4",
>     "duration":60.5,
>     "resolution":"1920x1080",
>     "output_video_path":"test_output1.mp4",
>     "overlay":"I'm sOoOo good at this game! xD",
>     "location":"200, 100",
>     "font_size":64,
>     "font_color":"0xFFFFFF",
>     "start":20.1,
>     "end":85.0
> }

## Response Syntax

> "command_string": "ffmpeg -i test_input1.mp4 -vf drawtext='enable=between(t,20.1,85.0):text='I'm sOoOo good at this game! xD':fontcolor=0xFFFFFF:fontsize=64:x=200:y=200' test_output1.mp4"

### Author

Christopher Kohler
[All About Me](https://chriskohler1972.w3spaces.com/)

### Version

1.0.0

### License

This project is licensed under the MIT License
