function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(640, 420);
    video.hide();
}

function start() {
    objectDetected = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    
}


function gotresult(error, result){
    if (error) {
        console.log(error);
    }
    console.log(result);
    object = result;
}

function draw(){
    image(video, 0,0, 640, 420);

    if(status != "" ){
        objectDetected.detect(video, gotresult);
        r = random(255);
        g = random(255);
        b = random(255);
        for( i=0; i<object.length; i++ ){
            document.getElementById("nofobject").innerHTML = "Number of objects detected : " + object.length;
            document.getElementById("status").innerHTML = "Status : object detected";
            percent = floor(object[i].confidence*100);
            fill(r,g,b);
            noFill();
            text(object[i].label + " " + percent + " %", object[i].x + 15, object[i].y + 15);
            stroke(r,g,b);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }
}