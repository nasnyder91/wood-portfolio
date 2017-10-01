$(document).ready(function(){


  //Set initial position of filter highlight
  var initialPos = $(".filterBtns").offset();
  $("#filterHL").height($(".filterBtns").height()).width($(".filterBtns").width());
  $("#filterHL").offset({ top: initialPos.top, left: initialPos.left });

  //Set highlight animation on filter button click
  $(".filterBtns").click(function(){
    var newPos = $(this).offset();
    $("#filterHL").animate({top: newPos.top}, "slow");
  });
});
