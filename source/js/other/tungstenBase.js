jQuery(function($) {

  // Fancybox
  $(".fancybox").fancybox(
  		{
        helpers:  {
            title : {
                type : 'inside'
            },
            overlay : {
                showEarly : false
            }
        }
    });

  // Add open class to nain-nav li, when mouse over dropdown
  $(".main-nav ul li ul").hover(
    function(){ // Mouse Over
     $(this).parent().addClass("open");
    },
    function(){ // Mouse Out
      $(this).parent().removeClass("open");
    }
  );

  // Toggle dropdown navigation in mobile

  $('.main-nav-toggle').click(function(){
    $(this).attr('aria-expanded', function (i, attr) {
      return attr == 'true' ? 'false' : 'true'
    });
    $('.main-nav').toggleClass('open');
  });

  // Specify Navigations
  var navigations = ['.main-nav', '.top-nav'];

  // Set Active Items In Specified Navigations
  $location = $(location).prop('pathname').split('/')[1];
  for (var i = navigations.length - 1; i >= 0; i--) {
    selector = navigations[i] + ' li a';
    $(selector).each(function() {
      $link = $(this).attr('href').substr($(this).attr('href').lastIndexOf('/') + 1);
      if($link == $location) {
        $(this).parent('li').addClass('active');
      }
    });
  }
  
  // RESPONSIVE VIDEOS
  // Find all YouTube videos
  var $allVideos = $("iframe[src*='//www.youtube.com']"),
      
      // The element that is fluid width
      $fluidEl = $(".video-content");
      
    // Figure out and save aspect ratio for each video
    $allVideos.each(function() {

      $(this)
        .data('aspectRatio', this.height / this.width)

        // and remove the hard coded width/height
        .removeAttr('height')
        .removeAttr('width');

    });
  
    // When the window is resized
    $(window).resize(function() {

      var newWidth = $fluidEl.width();

      // Resize all videos according to their own aspect ratio
      $allVideos.each(function() {

        var $el = $(this);
        $el
          .width(newWidth)
          .height(newWidth * $el.data('aspectRatio'));

      });

  // Kick off one resize to fix all videos on page load
  }).resize();
  
  // RESPONSIVE TABLES
  var headertext = [];
  var headers = document.querySelectorAll("thead");
  var tablebody = document.querySelectorAll("tbody");

  for (var i = 0; i < headers.length; i++) {
    headertext[i]=[];
    for (var j = 0, headrow; headrow = headers[i].rows[0].cells[j]; j++) {
      var current = headrow;
      headertext[i].push(current.textContent);
      }
  } 

  for (var h = 0, tbody; tbody = tablebody[h]; h++) {
    for (var i = 0, row; row = tbody.rows[i]; i++) {
      for (var j = 0, col; col = row.cells[j]; j++) {
        col.setAttribute("data-th", headertext[h][j]);
      } 
    }
  }

  // Add a title element to YouTube iframes
  $('iframe[allowfullscreen]').prop('title', 'YouTube embedded video');

  // Set Season Class for body

  var today = new Date();
  var mm = today.getMonth();


  switch(mm) {
    case 11:
    case 0:
    case 1:
        var season = "winter"
        break;
    case 2:
    case 3:
    case 4:
        var season = "spring"
        break;
    case 5:
    case 6:
    case 7:
        var season = "summer"
        break;
    case 8:
    case 9:
    case 10:
        var season = "fall"
        break;
    default:
        var season = ""
  }

  $('.page-wrap').addClass(season);

});