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
    $.ajax({
      url: "../img/wood/",
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
      url: "../img/wood/"+url,
      success: function(imgData){
        var imgParser = new DOMParser(),
            imgDoc = imgParser.parseFromString(imgData, 'text/html');

        var imgRows = imgDoc.querySelector('table').querySelectorAll('tr')

        for(var r = 0; r < imgRows.length; r++){
          if (imgRows[r].children[2]) {
            if (parseInt(imgRows[r].children[2].innerText)>0){
              $("#photoIcons").append("<div class='card' style='background-image:url(/img/wood/"+url+imgRows[r].children[3].children[0].text+");' data-toggle='modal' data-target='#imgModal' data-url='/img/wood/"+url+imgRows[r].children[3].children[0].text+"'></div>");
            };
          }
        }
      }
    })
  };

  getAllImgs();

  //Setup image modal
  $('#imgModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var imgURL = button.data('url'); // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this);
    modal.find('.modal-body img').attr("src", imgURL);
  });


  window.onresize = function(){
    newPos = $(currentFilter).offset();
    $("#filterHL").height($(".filterBtns").height()).width($(".filterBtns").width());
    $("#filterHL").offset({ top: newPos.top, left: newPos.left });
  };

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
});
