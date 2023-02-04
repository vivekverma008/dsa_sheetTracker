


function openNav(){
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}
function closeNav(){
    document.getElementById("mySidebar").style.width="1px";
    document.getElementById("main").style.marginLeft = "1px";
}
function openNts(question,note){
    if(note){
        $('#my_note_content').html(note.content);
    }else{
        $('#my_note_content').html("")
    }
        
    $('.question-title').html(question.name);
    $('#note_pid').prop('value' , `${question._id}`);
    let all_ele = $('.notedisplay');
    for(let ele of all_ele){
        $(ele).css("display","block");
    }
}


function closeNts(){
       
    let noteDisp = document.getElementsByClassName("notedisplay");
    for(let doc of noteDisp){
        doc.style.display= "none";
    }

}

$('#note-form').submit(function(e){
    let noteForm = e.currentTarget;
    e.preventDefault();
    console.log(e);
    let mydata = $('#note-form').serialize();
    console.log(mydata);

    $.ajax({
        type : 'post',
        url : '/problems/notes/updateNote',
        data : mydata,
        success : function(data){
            console.log(data.message);
        },
        error : function(err){
            console.log(err.responseText);
        }
    })
})


$('._nts').click(function(e){
    e.preventDefault();
    let openLink = e.currentTarget;
    console.log();
    $.ajax({
        type:'get',
        url : $(openLink).prop('href'),
        success : function(data){
            openNts(data.data.problem,data.data.note );
        },
        error : function(err){
            console.log(err.responseText);
        }
    })

})



