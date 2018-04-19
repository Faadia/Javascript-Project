$(document).ready(function() {

  var counter = function($this) {
    var maxNum = Math.abs(parseInt($this.text()));
    var i = 0;
    var repeat = maxNum / 50;

    setInterval(function() {

      $this.text(parseInt(i += repeat));

      if (i > maxNum) {
        $this.text(parseInt(maxNum));
        return;
      }

    }, 40);
  }

  $("#count .num").each(function(index, element) {
    counter($(element));
  });

});
