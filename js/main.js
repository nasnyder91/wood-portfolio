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
    $("#filterHL").animate({top: newPos.top}, "slow");
    $("#photoIcons").fadeOut("fast", function(){
      $("#photoIcons").empty();
      if($(sender).attr("id") == "all"){
        getAllImgs();
      } else{
        populateImgs($(sender).attr("url"));
      }
      $("#photoIcons").fadeIn("fast");
    });
  });

  //Get all gallery images in all folders
  function getAllImgs(){
    $.ajax({
      url: "../img/",
      success: function(data){
        var parser = new DOMParser(),
            doc = parser.parseFromString(data, 'text/html');

        var rows = doc.querySelector('table').querySelectorAll('tr');

        for (var i=1;i<rows.length;i++) {
          populateImgs(rows[i].children[3].children[0].text);
        }
      }
    });
  };
  //Populate images within url
  function populateImgs(url){
    $.ajax({
      url: "../img/"+url,
      success: function(imgData){
        var imgParser = new DOMParser(),
            imgDoc = imgParser.parseFromString(imgData, 'text/html');

        var imgRows = imgDoc.querySelector('table').querySelectorAll('tr')

        for(var r = 0; r < imgRows.length; r++){
          if (imgRows[r].children[2]) {
            if (parseInt(imgRows[r].children[2].innerText)>0){
              $("#photoIcons").append("<div class='card' style='background-image:url(/img/"+url+imgRows[r].children[3].children[0].text+")'></div>");
            };
          }
        }
      }
    })
  };

  getAllImgs();

  window.onresize = function(){
    newPos = $(currentFilter).offset();
    $("#filterHL").height($(".filterBtns").height()).width($(".filterBtns").width());
    $("#filterHL").offset({ top: newPos.top, left: newPos.left });
  };
});
