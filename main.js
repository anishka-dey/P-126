song1="";
song2="";
leftx=0;
rightx=0;
lefty=0;
righty=0;
song1_stat="";
song2_stat="";
R_score=0;
L_score=0;
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}
function preload(){
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}

function draw(){
    image(video,0,0,600,500);
    song1_stat=song1.isPlaying();
    song2_stat=song2.isPlaying();
    fill("red");
    stroke("red");
    if(R_score>0.2){
        circle(rightX, rightY, 30);
        song2.stop();
        if(song1_stat==false){
            song1.play();
            document.getElementById("play").innerHTML="Song Name: Harry Potter playing";
        }
    }
    if(L_score>0.2){
        circle(leftX, leftY, 30);
        song1.stop();
        if(song2_stat==false){
            song2.play();
            document.getElementById("play").innerHTML="Song Name: Peter Pan playing";
        }
    }
}



function stop(){
    song1.stop();
    song2.stop();
}

function modelLoaded(){
    console.log("The model is ready to go!");
}

function gotPoses(results){
    if (results.length>0){
        console.log(results);
        R_score=results[0].pose.keypoints[10].score;
        L_score=results[0].pose.keypoints[9].score;
        leftX=results[0].pose.leftWrist.x;
        leftY=results[0].pose.leftWrist.y;
        rightX=results[0].pose.rightWrist.x;
        rightY=results[0].pose.rightWrist.y;
        console.log("left wrist coordinates:", leftX, leftY, "And right wrist coordinates:", rightX, rightY );
    }
}