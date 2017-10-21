$(document).ready(function(){


  //Set initial position of filter highlight
  var initialPos = $(".filterBtns").offset();
  $("#filterHL").height($(".filterBtns").height()).width($(".filterBtns").width());
  $("#filterHL").offset({ top: initialPos.top, left: initialPos.left });
  var newPos;
  var currentFilter = $("#all");

  //Set highlight animation on filter button click/populate gallery with filtered results
  $(".filterBtns").click(function(){
    var sender = $(this);
    newPos = sender.offset();
    currentFilter = sender;
    $("#filterHL").animate({top: newPos.top + $('body').scrollTop(), left: newPos.left - $('body').scrollLeft()}, "slow");
    $("#photoIcons").fadeOut("fast", function(){
      $("#photoIcons").empty();
      if($(sender).attr("id") == "all"){
        getAllImgs();
      } else{
        populateImgs($(sender).attr("url"), $(sender).attr("qty"));
      }
      $("#photoIcons").fadeIn("fast");
    });
  });



  //Position the filter highlight, repeat if true.
  function positionFilterHL(tOrF){
    newPos = $(currentFilter).offset();
    $("#filterHL").height($(".filterBtns").height()).width($(".filterBtns").width());
    $("#filterHL").offset({ top: newPos.top, left: newPos.left });
    if(tOrF == true){
      setTimeout(function () {
        positionFilterHL(true)
      }, 1);
    } else{
      return;
    };
  }



  function toggleTitleBreak(){
    if($(window).width() <= 800){
      $("#titleBreak").show();
    } else{
      $("#titleBreak").hide();
    }
  };



  //Perform functions on window resize
  window.onresize = function(){
    positionFilterHL(false);
    toggleTitleBreak();
  };



  //Open/Close about section
  $("#aboutBtn").click(function(){
    $('#aboutCollapse').on('show.bs.collapse', function() {
      positionFilterHL(true);
    }).on('shown.bs.collapse', function() {
      positionFilterHL(false);
    }).on('hide.bs.collapse', function() {
      positionFilterHL(true);
    }).on('hidden.bs.collapse', function() {
      positionFilterHL(false);
    });
  });



  //Get all gallery images in all folders
  function getAllImgs(){
    for(var i = 1; i <= 18; i++){
      $("#photoIcons").append("<div class='card' style='background-image:url(img/wood/Bowls/img"+i+".JPG);' data-toggle='modal' data-target='#imgModal' data-url='img/wood/Bowls/img"+i+".JPG'></div>");
    }
    for(var i = 1; i <= 8; i++){
      $("#photoIcons").append("<div class='card' style='background-image:url(img/wood/Vases/img"+i+".JPG);' data-toggle='modal' data-target='#imgModal' data-url='img/wood/Vases/img"+i+".JPG'></div>");
    }
    for(var i = 1; i <= 8; i++){
      $("#photoIcons").append("<div class='card' style='background-image:url(img/wood/Jewelry/img"+i+".JPG);' data-toggle='modal' data-target='#imgModal' data-url='img/wood/Jewelry/img"+i+".JPG'></div>");
    }
    for(var i = 1; i <= 10; i++){
      $("#photoIcons").append("<div class='card' style='background-image:url(img/wood/Misc/img"+i+".JPG);' data-toggle='modal' data-target='#imgModal' data-url='img/wood/Misc/img"+i+".JPG'></div>");
    }
  };
  //Populate images within url
  function populateImgs(url,qty){
    for(var i = 1; i <= qty; i++){
      $("#photoIcons").append("<div class='card' style='background-image:url(img/wood/"+url+"img"+i+".JPG);' data-toggle='modal' data-target='#imgModal' data-url='img/wood/"+url+"img"+i+".JPG'></div>");
    }
  };

  //Setup image modal
  $('#imgModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var imgURL = button.data('url');
    var modal = $(this);
    modal.find('.modal-body img').attr("src", imgURL);
  });


  //Perform initial functions on startup
  getAllImgs();
  toggleTitleBreak();
});
