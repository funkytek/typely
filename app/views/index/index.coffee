define ["app/server", "templates/index"], (server, ui) ->
  show: ->

    loadSentence = =>
      @sentence = @sentences.shift()
      @typedSentence = ""
      $("#sentence").html @sentence 
    
    $ ->  
      $("#main").html ui()
      $("#container").jrumble()
      
      $("#ok").click ->
        loadSentence()
        $("#overlay").html ""
        $("#next").modal 'hide'

      $("#nextForm").submit (e) ->
        e.preventDefault()
        loadSentence()
        $("#overlay").html ""
        $("#next").modal 'hide'
        return false
        

    server.ready =>
      server.getLesson (@sentences) =>
        loadSentence()
        $('body').keypress (e) => 
          char = String.fromCharCode e.which
          if (@typedSentence+char) is @sentence.substr(0, @typedSentence.length+1)
            @typedSentence += char
            $("#overlay").append char
            if @typedSentence.length is @sentence.length
              $("#next").modal keyboard: true
          else
            console.log @typedSentence+char
            $("#container").trigger 'startRumble'
            setTimeout ->
              $("#container").trigger 'stopRumble'
            , 100


