const titles = ["Full Stack Web Developer", "Software Engineer", "Code Debugger", "Problem Solver", "Solutions Creator"]
let title

let index = 0;
setInterval(function(){
    title = (titles[index++ % titles.length]);
    document.getElementById("titleHolder").innerHTML = title.toString()
}, 5000)