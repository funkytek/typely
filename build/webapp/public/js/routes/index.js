
define(["app/server", "templates/index"], function(server, ui) {
  return {
    show: function() {
      var loadSentence,
        _this = this;
      loadSentence = function() {
        _this.sentence = _this.sentences.shift();
        _this.typedSentence = "";
        return $("#sentence").html(_this.sentence);
      };
      $(function() {
        $("#main").html(ui());
        $("#container").jrumble();
        $("#ok").click(function() {
          loadSentence();
          $("#overlay").html("");
          return $("#next").modal('hide');
        });
        return $("#nextForm").submit(function(e) {
          e.preventDefault();
          loadSentence();
          $("#overlay").html("");
          $("#next").modal('hide');
          return false;
        });
      });
      return server.ready(function() {
        return server.getLesson(function(sentences) {
          _this.sentences = sentences;
          loadSentence();
          return $('body').keypress(function(e) {
            var char;
            char = String.fromCharCode(e.which);
            if ((_this.typedSentence + char) === _this.sentence.substr(0, _this.typedSentence.length + 1)) {
              _this.typedSentence += char;
              $("#overlay").append(char);
              if (_this.typedSentence.length === _this.sentence.length) {
                return $("#next").modal({
                  keyboard: true
                });
              }
            } else {
              console.log(_this.typedSentence + char);
              $("#container").trigger('startRumble');
              return setTimeout(function() {
                return $("#container").trigger('stopRumble');
              }, 100);
            }
          });
        });
      });
    }
  };
});
