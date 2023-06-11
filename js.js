//initialisation
let arr=["As the sun began to set over the horizon, Sarah felt a sense of calm wash over her. She had spent the entire day working on her novel, but now it was time to take a break and enjoy the beauty of the evening. She walked outside and took a deep breath of fresh air, feeling grateful for the simple pleasures in life.","The city was alive with the sound of cars honking, people shouting, and music blaring from storefronts. Jake walked down the crowded sidewalk, trying to keep his balance as he weaved through the throngs of people.","Jake stopped and listened for a moment, feeling the music wash over him. For a brief moment, he forgot about the chaos around him and lost himself in the music. But soon enough, the noise of the city pulled him back to reality, and he continued on his way."];
let word="";
let startbutt=document.querySelector("#start");
let input=document.querySelector("#input");
let time=document.querySelector("#time");
let ssdiv=document.querySelector(".startstop");
let stop=document.querySelector("#stop");
let mistakes=document.querySelector("#mistake");
let restart=document.querySelector("#restart");
let result=document.querySelector(".resultdiv");
let speed=document.querySelector("#speed");
let per=document.querySelector("#percentage");
let endbutt=document.querySelector("#end");
let intervalid=0;
let second=59;
let ispaused=false;






//window onload event for paragraph
window.addEventListener("load",()=>{
  const randomNumber = Math.floor(Math.random() * 3);
  document.querySelector("#para").innerHTML=arr[randomNumber];
  word=arr[randomNumber];
})
//
function end(){
clearInterval(intervalid);
ssdiv.style.display="none";
startbutt.style.display="block";
result.style.display="flex";
input.setAttribute("readonly",true);
let mistakecount=Number(mistakes.innerText);
console.log(mistakecount+" "+input.value.length);
let calc=((input.value.length-mistakecount)/5)/(60/60);
console.log(calc);
speed.innerText=calc+" wpm"
let accalc=(input.value.length-mistakecount)/word.length*100;
accalc=accalc.toFixed(2);
percentage.innerText=accalc+"%";
}

const startfunction=()=>{
input.removeAttribute("readonly");
ssdiv.style.display="flex";
let incarr=document.querySelectorAll(".incorrect");
incarr.forEach((element)=>{
  console.log(element);
  element.classList.remove("incorrect");
})
result.style.display="none";
input.value="";
second=59;
intervalid=setInterval(()=>{
  if(second===0){
    end();
  }
  time.innerText=second+"s";
  second--;
},1000);
startbutt.style.display="none";
}

startbutt.addEventListener("click",startfunction);


//for restart butt
restart.addEventListener("click",()=>{
clearInterval(intervalid);
time.innerText="60s";
input.value="";
mistakes.innerHTML=0;
startfunction();
});

//for the input

input.addEventListener("input",()=>{
const userChars = input.value.split('');  
let html = '';
let count=0;
let inputval=input.value;
for (let i = 0; i < word.length; i++) {
    if (i>=userChars.length||userChars[i] === word.charAt(i)) {
      html += `<span>${word.charAt(i)}</span>`;
    } else {
      count++;
      html += `<span class="incorrect">${word.charAt(i)}</span>`;
    }
}
para.innerHTML=html;
mistakes.innerText=count;
if(input.value.length==word.length){
  end();
}
});



//for stop button
stop.addEventListener("click",()=>{
if(!ispaused){
  clearInterval(intervalid);
  stop.innerText="Resume";
  input.setAttribute("readonly",true);
  ispaused=true;
}
else{
  intervalid=setInterval(()=>{
  if(second===0){
    end();
  }
  time.innerText=second+"s";
  second--;
  },1000);
  stop.innerText="Stop";
  ispaused=false;
  input.removeAttribute("readonly");
}
})


//for end button
endbutt.addEventListener("click",end);

