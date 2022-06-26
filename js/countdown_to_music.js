/**
 * RAD1ENC3#3283 stole this from https://binarypiano.com/ 
 * which is in turn
 * Inspired by: 1023.exe (by Alfred Kedhammar) - /w Tone.js
 * -- Original video concept here: https://www.youtube.com/watch?v=CdaPhpGG6As
 * ---- Not quite as cool with the backing violins, but still cool!
 */

force_friday=false;

var count = 0;



 (function() {
 

    var played = false;
    var playing = false;

    
    var notes = [
      "G6","F4","A4","B4",
      "G6","F4","A4","B4",
      "G3","D3","A3","C3",
      "D3","F3","A5","A4",
      "D5","E4","G4","C4"
    ];
    
    var times = [0.1,0.1];
    while (times.length < notes.length) {
      // times.push(times[times.length-1] + times[times.length-2]);
      times.push(times[times.length-1] + 0.1);
    }

  
    console.log("times:", times);
    console.log("notes:", notes);


  

    // if(notes.length!=default_pad.length){
    //     console.log("Notes length:"+notes.length+", which is different from pad length:" + pad.length);
    // }

    // // check that notes length, times length, and default_pad length are all the same
    // if(notes.length!=times.length || notes.length!=default_pad.length){
    //     console.log("Notes length:"+notes.length+", which is different from times length:" + times.length + ", and pad length:" + pad.length);
    // }

    var play;
  
    function playOrPause() {
      if (playing) {
        Tone.Transport.stop();
        playing = false;
        play.classList.toggle('pause');
        return;
      }
  
      if (!played) {
        var synth = new Tone.PolySynth(8, Tone.Synth, {
          oscillator: {
            partials: [0, 2, 3, 4]
          }
        }).toMaster();
  
        Tone.Transport.bpm.value = 30;

        first_tick = true;  
        
        var previousBinarySet = refresh_count();
        Tone.Transport.scheduleRepeat(function(time) {
          
  
          var binaryArray = refresh_count();
  
          for (var i = 0; i < binaryArray.length; i++) {
            if (
              binaryArray[i] === "1" &&
              previousBinarySet[i] !== binaryArray[i]
            ) {
              if(!first_tick){ // avoid triggering all the notes on the first tick
                synth.triggerAttackRelease(notes[i], times[i], time);
              }
            }
          }
  
          previousBinarySet = binaryArray;
          first_tick = false;
  
          // check if today is friday
          if(new Date().getDay() == 5){
            location.assign('index.html');
          }

        }, 1); // every second
  
        played = true;
      }
  
      playing = true;
      play.classList.toggle('pause');
      Tone.Transport.start();
    }
  
    function cacheDOM() {
      // customizeButton = document.querySelector(".info");
      // customizeArea = document.querySelector(".editor-container");
      // inputAreas = document.querySelectorAll(".notes input");
      keys = document.querySelectorAll(".piano-key");
      play = document.querySelector(".play");
    }
  
    function bindUI() {
      readNotesFromUrl();
  
      // customizeButton.addEventListener("click", onCustomizeButtonClicked, false);
      // for (var i = 0; i < keys.length; i++) {
      //   keys[i].addEventListener("click", e => onKeyClicked(e), false);
      // }
  
      // for (var i = 0; i < inputAreas.length; i++) {
      //   inputAreas[i].value = notes[i];
      //   inputAreas[i].addEventListener("click", e => {
      //     currentFocusedInput = parseInt(e.target.dataset.index);
      //   });
      // }
  
      play.addEventListener("click", playOrPause, false);
    }
  
    function onCustomizeButtonClicked() {
      if (!customizeArea.classList.contains("open")) {
        inputAreas[0].focus();
        currentFocusedInput = 0;
      }
      customizeArea.classList.toggle("open");
    }
  
    function setNotesInUrl() {
      history.replaceState &&
        history.replaceState(
          {},
          "",
          `?keys=${notes.join(",")}`.replace(/\#/g, "^")
        );
    }
  
    function readNotesFromUrl() {
      const url = document.location.href;
      const urlData = new URL(url);
      const keys = urlData.searchParams.get("keys");
  
      if (!keys) {
        return;
      }
  
      const keyData = keys.replace(/\^/g, "#").split(",");
  
      if (keyData.length === 10) {
        for (var i = 0; i < keyData.length; i++) {
          const el = document.querySelector(`[data-piano-key="${keyData[i]}"]`);
          if (!el) {
            return;
          }
        }
  
        notes = keyData;
      }
    }
  
    function onKeyClicked(e) {
      const valueSelected = e.target.dataset.pianoKey;
      inputAreas[currentFocusedInput].value = valueSelected;
      notes[currentFocusedInput] = valueSelected;
  
      currentFocusedInput = currentFocusedInput + 1;
      if (currentFocusedInput >= inputAreas.length) {
        currentFocusedInput = 0;
      }
      inputAreas[currentFocusedInput].focus();
  
      setNotesInUrl();
    }
  
    cacheDOM();
    bindUI();
  })();