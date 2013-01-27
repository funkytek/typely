define ["templates/index"], (ui) ->
  show: ->
    $ ->
      $("#main").html ui()

      sentence = "hola mundo"
      typedSentence = ""
      $("#sentence").html sentence
      $("#container").jrumble()
      $('body').keypress (e) -> 
        char = String.fromCharCode e.which
        console.log char
        if (typedSentence+char) is sentence.substr(0, typedSentence.length+1)
          typedSentence += char
          $("#overlay").append char
        else
          $("#container").trigger 'startRumble'
          setTimeout ->
            $("#container").trigger 'stopRumble'
          , 100
