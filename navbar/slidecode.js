


  var slideCount = document.querySelectorAll('.slider .slide-item').length;
  var slideWidth = document.querySelectorAll('.slider-outer')[0].offsetWidth;
  var slideHeight = document.querySelectorAll(".slider-outer")[0].offsetHeight;

  var sliderUlWidth = slideCount * slideWidth;
  document.querySelectorAll('.slider')[0].style.cssText = "width:" + sliderUlWidth + "px";

  for (var i = 0; i < slideCount; i++) {
    document.querySelectorAll('.slide-item')[i].style.cssText = "width:" + slideWidth + "px;height:" + slideHeight + "px";
  }

  setInterval(function() {
    moveRight();
  }, 3000);
  var counter = 1;

  function moveRight() {
    var slideNum = counter++
      if (slideNum < slideCount) {
        var transformSize = slideWidth * slideNum;
        document.querySelectorAll('.slider')[0].style.cssText = 
          "width:" + sliderUlWidth + "px; -webkit-transition:all 800ms ease; -webkit-transform:translate3d(-" + transformSize + "px, 0px, 0px);-moz-transition:all 800ms ease; -moz-transform:translate3d(-" + transformSize + "px, 0px, 0px);-o-transition:all 800ms ease; -o-transform:translate3d(-" + transformSize + "px, 0px, 0px);transition:all 800ms ease; transform:translate3d(-" + transformSize + "px, 0px, 0px)";

      } else {
        counter = 1;
        document.querySelectorAll('.slider')[0].style.cssText = "width:" + sliderUlWidth + "px;-webkit-transition:all 800ms ease; -webkit-transform:translate3d(0px, 0px, 0px);-moz-transition:all 800ms ease; -moz-transform:translate3d(0px, 0px, 0px);-o-transition:all 800ms ease; -o-transform:translate3d(0px, 0px, 0px);transition:all 800ms ease; transform:translate3d(0px, 0px, 0px)";
      }

  }



