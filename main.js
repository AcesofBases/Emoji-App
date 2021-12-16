prediction_1="";
prediction_2="";

Webcam.set({
width:300,
height:350,
image_format:"png",
png_quality:90
});

Webcam.attach(camera);
function speakComputer(){
    synth=window.speechSynthesis
    speak_data_1="The first prediction is "+ prediction_1;
    speak_data_2="And the second prediction is "+ prediction_2;
    utterThis=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterThis)
}
function takesnapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src=" '+ data_uri + ' "> '; 
    });

    }
   console.log("ml5 version", ml5.version); 
   classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/QKPG7gRpw/model.json", modelLoaded);
function modelLoaded(){
    console.log("Mode has been successfully loaded");
}
function Check(){
    img= document.getElementById("captured_image");
    classifier.classify(img , gotResult);
}
function gotResult(error, results)
{
if(error)
{
console.error(error);
}
else{
console.log(results);
prediction_1=results[0].label;
prediction_2=results[1].label;
document.getElementById("result_emotion_name").innerHTML=prediction_1;
document.getElementById("result_emotion_name2").innerHTML=prediction_2;

speakComputer();
if (prediction_1 =="Angry"){
    document.getElementById("update_emoji").innerHTML="&#128548;"
}
if (prediction_1 =="Sad"){
    document.getElementById("update_emoji").innerHTML="&#128532;"
}
if (prediction_1 =="Happy"){
    document.getElementById("update_emoji").innerHTML="&#128522;"
}
if (prediction_2 =="Angry"){
    document.getElementById("update_emoji2").innerHTML="&#128548;"
}
if (prediction_2 =="Sad"){
    document.getElementById("update_emoji2").innerHTML="&#128532;"
}
if (prediction_2 =="Happy"){
    document.getElementById("update_emoji2").innerHTML="&#128522;"
}
}
}