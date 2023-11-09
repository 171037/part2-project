$(document).ready(function() {

    const toggleList = document.querySelectorAll(".toggleSwitch");

    toggleList.forEach(($toggle, index) => {
        if( localStorage.getItem(`toggleState_${index+1}`) == "true" ){
            $toggle.classList.add( "active")
        }
    });
    

    toggleList.forEach(($toggle, index) => {
        $toggle.onclick = () => {
            $toggle.classList.toggle('active');
            console.log(`${index+1}번째 스위치는 active 상태인가?`, $toggle.classList.contains("active"))
            localStorage.setItem(`toggleState_${index+1}`, $toggle.classList.contains("active"));
        }
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
    
    $("#head").height("50px")

    $("#home, #list1, #list2, #name").css({
        color: "black",
        backgroundColor: "#ebebeb",
        border : "none", 
        fontSize : "20px"  
    });
    $("main").css({
        // borderTop: "1px solid gray",
        // borderRight: "1px solid gray",
        // borderLeft: "1px solid gray",
        // borderBottom: "1px solid gray",
        
        
    })


    $("#home").width("60px")
    $("#list1").width("60px")
});










