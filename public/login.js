$(document).ready(function() {
    $(".btn").click(function() {
        alert("버튼이 클릭되었습니다!");
    });
    $("#btn2").click(function() {
        alert("클릭되었습니다!");
    }); 
    $("#home").click(function() {
        $(location).attr("href", "http://localhost:3000/")           
    })
    $("#list1").click(function(){
        $(location).attr("href", "http://localhost:3000/storage")  
    })
    $("#list2").click(function(){
        $(location).attr("href", "http://localhost:3000/members")  
    })
    // $('#head4').click(function(){
    //     alert("팀원 : 전석범, 홍의선")
    //   })
    $("#head").height("50px")

    $("#home, #list1, #list2, #name").css({
        color: "black",
        backgroundColor: "#ebebeb",
        border : "none", 
        fontSize : "20px"  
    });
    $("main").css({
        border: "3px solid rgb(134, 134, 134)",
    })
    $("#home").width("60px")
    $("#list1").width("60px")

});
