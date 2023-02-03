

function openNav(){
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}
function closeNav(){
    document.getElementById("mySidebar").style.width="1px";
    document.getElementById("main").style.marginLeft = "1px";
}
function openNts(question){
    question = JSON.parse(question);
    
    
    let question_title = question.name;
    let question_id = ""+question._id;
    let decoded = decodeURIComponent(document.cookie.substring(9, ));
    decoded = JSON.parse(decoded);
    console.log(question_id);
    console.log(decoded);
    let quesTitle = document.getElementsByClassName("question-title")
    for(let ques of quesTitle){
        ques.innerHTML = question_title;
    }   
    let noteDisp = document.getElementsByClassName("notedisplay");
    for(let doc of noteDisp){
        doc.style.display= "block";
    }
    document.getElementById("note_pid").value = question_id;
    if(decoded)
        document.getElementById("my_note_content").innerHTML = decoded.content;
    console.log(document.getElementById("note_pid").value);
}


function closeNts(){
       
    let noteDisp = document.getElementsByClassName("notedisplay");
    for(let doc of noteDisp){
        doc.style.display= "none";
    }

}
