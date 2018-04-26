$(document).ready(function(){

    /* Hide the side nav bar by default */
    $("#sidebar-wrapper").hide();

    $(window).scroll(function(){
        //console.log("window is scrolling");
    })
    /* Show or hide the side nav bar when hamburger menu button is clicked.*/
    $(".menu-toggle").click(function() {
        //console.log("show hide nav");
        $("#sidebar-wrapper").toggle();
        $(this).find('i').toggleClass('fa fa-bars fa fa-times');
        return false;
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $('#sidebar-wrapper .js-scroll-trigger').click(function() {
        $("#sidebar-wrapper").toggle();
        $(".menu-toggle i").toggleClass('fa fa-bars fa fa-times');
        //$(this).find('svg').toggleClass('fa fa-bars fa fa-times');
    });
    
    // Select all links with hashes
$('a[href*="#"]')
// Remove links that don't actually link to anything
.not('[href="#"]')
.not('[href="#0"]')
.click(function(event) {
  // On-page links
  if (
    location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
    && 
    location.hostname == this.hostname
  ) {
    // Figure out element to scroll to
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    // Does a scroll target exist?
    if (target.length) {
      // Only prevent default if animation is actually gonna happen
      event.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1000, "easeInOutExpo")/*function() {
        // Callback after animation
        // Must change focus!
        var $target = $(target);
        $target.focus();
        if ($target.is(":focus")) { // Checking if the target was focused
          return false;
        } else {
          $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
          $target.focus(); // Set focus again
        };
      });*/
    }
  }
});
     
    /** Draw skills bar graphs */
    drawGraph();

    /* Show first image in the carousel */
    console.log("page load");
    showImage("first");

    /** Project carousel next and previous click handlers */
    $('.prev').on('click', function(){
        showImage('prev');
        return false;
    });
    $('.next').click(function() {
        showImage('next');
        return false;
    });

    

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    
    var modalImg = $("#img01");
    var captionText = $("#caption");
    $('#rsa img').on('click', function(){
         var el = $(this);
        //console.log("image clicked: ", el);
        $("#myModal").show();
        $("#img01").attr("src", el.attr("src")); 
        captionText.innerHTML = el.alt;
    });

    // Get the <span> element that closes the modal


    // When the user clicks on <span> (x), close the modal
    $(".close").on("click", function() { 
        $("#myModal").hide();
    });

});

function drawGraph() {

    //$(".skills").empty();
    
    //$(".skills").append(<h1/>).text("Skills");
    var values = {"HTML": 80, "CSS":70,"JavaScript": 80, "JQuery":75,"Angular 4.0":65,
    "ExtJS":70,"Express":65,"Mongoose":60, "C#":70, "C":75};

    for (const [key,value] of Object.entries(values)) {
        $('.skills').append(
            $('<div/>').addClass('barHolder')
        )
        var last = $('.barHolder').last();
       
        // console.log("Width: ", last.width());
        
        // console.log("NetWidth: ", value+'%');
        last.append(
            $('<div/>').addClass('bar').width(value+"%").append(
                $('<div>').addClass('skillName').text(key)
            )    
        )
    }
}

showImage = function(direction) {

    var carousel = [
        {   img:"img/generalTab.png", 
            title:"DataFeed Manager UI", 
            desc:"RSA's Archer's DataFeed Manager UI built with Sencha ExtJS, HTML and CSS during my tenure at RSA,EMC Dell",
            details:"rsa.html",
            code: ""
        },
        {   img:"img/lessonPlanner.png", 
            title:"Lesson Planner", 
            desc:"Lesson Planner for teachers created using Angular 4.0, Express.js, Node.js and Mongoose.",
            details:"http://ec2-13-58-92-100.us-east-2.compute.amazonaws.com/dashboard",
            code:"https://github.com/sheetaldesai/LessonPlanner"
        },
        {   img:"img/carolinaswc.png", 
            title:"Carolina Sexual Wellness Center", 
            desc:"A website for Psychologiest Dr. Krista Nabar using WordPress",
            details:"https://carolinaswc.org/",
            code:""
        },
    ]

    var content, index;
    // console.log("direction: ", direction);
    if (direction == "first") {
        index = 0;
    } else {
        index = $("div.carousal").data("ind");
        // console.log("index ", index);
        if (direction == 'prev') {
            if (index == 0 ) {
                index = carousel.length - 1;
            } else {
                index = index -1;
            }
        } else if ( direction == 'next') {
            if (index == carousel.length - 1) {
                index = 0;
            } else {
                index = index + 1;
            }
        }
    }
    content = carousel[index];
    // console.log("content: ", content);

    $('div.carousal').html(`<img src=${content.img} alt="">`);
    $('div.carousal').data("ind",index);
    $('div.projectInfo').html(`<h3>${content.title}</h3>
                                <p>${content.desc}</p>`);
    // console.log("carousal: ", $('.carousal'));

    if (content.details == "") {
        $('.details').addClass('disabled'); 
    } else {
        $('.details').removeClass('disabled'); 
        $('.details').attr("href", content.details);
    }
    
    if (content.code == "") {
        $('.code').addClass('disabled'); 
    } else {
        $('.code').removeClass('disabled'); 
        $('.code').attr("href", content.code);
    }
    
}

