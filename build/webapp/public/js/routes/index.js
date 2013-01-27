
define(["templates/index"], function(ui) {
  return {
    show: function() {
      return $(function() {
        var sentence, typedSentence;
        $("#main").html(ui());
        sentence = "hola mundo";
        typedSentence = "";
        $("#sentence").html(sentence);
        $("#container").jrumble();
        return $('body').keypress(function(e) {
          var char;
          char = String.fromCharCode(e.which);
          console.log(char);
          if ((typedSentence + char) === sentence.substr(0, typedSentence.length + 1)) {
            typedSentence += char;
            return $("#overlay").append(char);
          } else {
            $("#container").trigger('startRumble');
            return setTimeout(function() {
              return $("#container").trigger('stopRumble');
            }, 100);
          }
        });
      });
    }
  };
});
