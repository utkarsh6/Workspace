let tracklist=[
    {
        name:"Faded",
        path: "Music/Alan-Walker-Faded.mp3",
        img:"images/image1.jpg",
        artist:"Alan walker",
        
    },
    {
        name:"Tired",
        path:"Music/Alan-Walker-ft.-Gavin-James-Tired.mp3",
        img:"images/image2.jpg",
        artist:"Alan walker",

    },
    {
        name:"Sad-Sometimes",
        path:"Music/Alan-Walker-Huang-Xiaoyun-Sad-Sometimes.mp3",
        img:"images/image3.jpg",
        artist:"Alan walker",

    },
]

//starting with variable creation

const play=document.querySelector(".play"),
next=document.querySelector(".next"),
prev=document.querySelector(".prev"),

playall=document.querySelector(".play-all"),

playlistimg=document.querySelector("#playlist-image"),
title=document.querySelector(".title"),
singer=document.querySelector(".singer"),

hamburger=document.querySelector(".fa-bars"),
closesong=document.querySelector(".fa-times"),

timeslider=document.querySelector(".timeslider"),
currenttime= document.querySelector(".current-time"),
songduration = document.querySelector(".song-duration"),

showVolume=document.querySelector(".show-volume"),
volumeimg= document.querySelector("#volume-sign"),
volumeslider= document.querySelector("#volume"),

songplaylist= document.querySelector(".playlist-1"),
songlistdiv= document.querySelector(".songlistdiv"),
songlist= document.querySelector(".songlist");


let timer;
let autoplay=0;
let indextrack=0;
let songisplaying=false;
let track=document.createElement("audio");

play.addEventListener("click", (mainplaymusic)=>{
    if(songisplaying==false){
        playmusic()
    }else{
        pausesong()
    }


});
next.addEventListener("click",(nextsong)=>{
    if(indextrack <tracklist.length -1){
        indextrack++;
        loadTrack(indextrack);
        playmusic();
    }
    else{
        //for last song 
        indextrack=0;
        loadTrack(indextrack);
        playmusic();
    }

})
playall.addEventListener("click", (autoplaytoggle)=>{
    if(autoplay==0){
        autoplay=1;
    }else{
        autoplay=0;
    }

})
prev.addEventListener("click",(prevsong)=>{
    if(indextrack >0){
        indextrack--;
        loadTrack(indextrack);
        playmusic();
    }
    else{
        
        indextrack=tracklist.length-1;
        loadTrack(indextrack);
        playmusic();
    }

})



function loadTrack(indexTrack){
    // defning properties of track
    clearInterval(timer);
    //to get the slider back to 0 while navigating to different song
    resetslider();

    track.src=tracklist[indexTrack].path;

    playlistimg.src=tracklist[indexTrack].img;
    title.innerHTML=tracklist[indexTrack].name;
    singer.innerHTML=tracklist[indexTrack].artist;

    //Method to load track

    track.load();
    //update slider of music
    timer=setInterval((songtimeslider)=>{
        let position=0;
        //to check this is a number or not 
        if(!isNaN(track.duration)){
            position=track.currentTime*(100/track.duration);
            timeslider.value=position;
            

        }

        if(track.ended){
            play.innerHTML='<i class="fas fa-play"> </i>'
            //to play next song
            if(autoplay==1 &&indexTrack<tracklist.length-1){
                indexTrack++;
                loadTrack(indexTrack);
                playmusic();
            }
            //to play first song 
            else if(autoplay==1 &&indexTrack == tracklist.length-1){
                indexTrack=0;
                loadTrack(indexTrack);
                playmusic();

            }
        }
    },1000);

}

loadTrack(indextrack)



//play song 
function playmusic(){
    track.play();
    songisplaying=true;
    //to pause 

    play.innerHTML='<i class="fas fa-pause"> </i>';

}
function pausesong(){
    track.pause();
    songisplaying=false;
    //to pause 

    play.innerHTML='<i class="fas fa-play"> </i>';


}
volumeimg.addEventListener("click",(mute)=>{
    track.volume=0;
    showVolume.innerHTML=0;
    volumeslider.value=0;
   
  

});
volumeslider.addEventListener("change",(adjustvolume)=>{
    showVolume.value=volumeslider.value;
    showVolume.innerHTML=volumeslider.value
    track.volume=volumeslider.value/100;
    

});
timeslider.addEventListener("change",(durationtime)=>{
    let slidertime= track.duration*(timeslider.value/100);
    track.currentTime=slidertime;
  

});
function resetslider(){
    timeslider.value=0;
}
track.addEventListener("timeupdate",(songtimer)=>{
    if(track.duration){
        let currentmin=Math.floor(track.currentTime/60);
        let currentsec=Math.floor(track.currentTime-currentmin*60);
    
        let durationmin=Math.floor(track.duration/60);
        let durationsec=Math.floor(track.duration-durationmin*60);
    
        if(durationsec<10){
            durationsec="0"+durationsec;
        }
        if(durationmin<10){
            durationmin="0"+durationmin;
        }
        if(currentmin<10){
            currentmin ="0"+currentmin;
        }
        if(currentsec<10){
            currentsec="0"+currentsec;
        }
        currenttime.innerHTML=currentmin+":"+currentsec;
        songduration.innerHTML=durationmin+":"+durationsec;
        
    }
    else{
        currenttime.innerHTML="00"+":"+"00";
        songduration.innerHTML="00"+":"+"00";

    }
   
})
hamburger.addEventListener("click",(displaylist)=>{
    songplaylist.style.transform="translateX(0)";

});

closesong.addEventListener("click",closesonglist);
function closesonglist(){
    songplaylist.style.transform="translateX(-100%)";


}
let counter=1;
function showmusic(){
    for(let i=0;i<tracklist.length;i++){
        
        let div=document.createElement("div");
        div.classList.add("songlist");
        div.innerHTML=`
        <span class="index">${counter++}</span>
        <p class="song">${tracklist[i].name}</p>
        
        
        `;
        songlistdiv.appendChild(div);
    }
    playsongfromlist();
    
}
showmusic();
function playsongfromlist(){
    songlistdiv.addEventListener("click",(e)=>{
        if(e.target.classList.contains("song")){
            const indexNum=tracklist.findIndex((item,index)=>{
                if(item.name==e.target.innerHTML){
                    return true;
                }
            });
            loadTrack(indexNum);
            playmusic();
            closesonglist();
        }
    })
}





