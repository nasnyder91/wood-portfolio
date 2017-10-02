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

  //Populate all gallery images
  $.ajax({
    url: "../img/",
    success: function(data){
      var parser = new DOMParser(),
          doc = parser.parseFromString(data, 'text/html');

      var fileCount = 0,
          rows = doc.querySelector('table').querySelectorAll('tr');

      for (var i=0;i<rows.length;i++) {
        if (rows[i].children[2]) {
          if (parseInt(rows[i].children[2].innerText)>0){
            fileCount++;
            console.log(rows[i].children[3].children[0].text);
            $("#photoIcons").append("<div class='card' style='background-image:url(/img/"+rows[i].children[3].children[0].text+")'></div>");
          };
        };
      };
      console.log(fileCount);
    }
  });
});
