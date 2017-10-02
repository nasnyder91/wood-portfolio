$(document).ready(function(){


  //Set initial position of filter highlight
  var initialPos = $(".filterBtns").offset();
  $("#filterHL").height($(".filterBtns").height()).width($(".filterBtns").width());
  $("#filterHL").offset({ top: initialPos.top, left: initialPos.left });

  //Set highlight animation on filter button click/populate gallery with filtered results
  $(".filterBtns").click(function(){
    var sender = $(this);
    var newPos = sender.offset();
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

  //Populate all gallery images\
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

   };
});
