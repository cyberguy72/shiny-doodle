function validateAxis(location, resolution){
    var resArray = resolution.split("x");
    var locArray = location.split(",");
    
    if(!locArray.length === 2){
       return {"errors":"X/Y coordinates not entered correctly"};
    }

    if(!resArray.length === 2){
        return {"errors":"Resolution not entered correctly"};
    }

    if(parseInt(locArray[1]) > parseInt(resArray[1])){
        return {"errors":"Invalid Y coordinates - Out of range"};
    }
    
    if(parseInt(locArray[0]) > parseInt(resArray[0])){
        return {"errors":"Invalid X coordinates - Out of range"};
    }

    return locArray;
}

function validateTime(start, end, duration){
    
    if(start > end){
        return {"errors":"End is before start"};
    }

    if(start+duration > end){
        return {"errors":"Invalid end time"};
    }

    return true;
}

function fetchCommand(video, splitLocation){

    let comString = "ffmpeg -i ";
    comString += video.input_video_path + " -vf drawtext='enable=between(t," + parseFloat(video.start).toFixed(1) + "," + parseFloat(video.end).toFixed(1) + "):text='" + video.overlay + "':fontcolor=" + video.font_color +":fontsize=" + video.font_size + ":x=" + splitLocation[0] + ":y=" + splitLocation[0] +"' " + video.output_video_path;
    
    return comString;
}

module.exports = {validateAxis, validateTime, fetchCommand};