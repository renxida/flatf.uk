

function toBinary(number) {
    return (number >>> 0).toString(2);
}

function padNumber(numberString) {
    var pad = "0".repeat(20);
    return pad.substring(0, pad.length - numberString.length) + numberString;
}

function seconds_until_next_friday(){
    if (force_friday){
      return 0;
    }
    function getNextFriday(date = new Date()) {
      const dateCopy = new Date(date.getTime());
    
      const nextFriday = new Date(
        dateCopy.setHours(
          dateCopy.getDate() + ((7 - dateCopy.getDay() + 5) % 7 || 7),
          0,0,0
        ),
      );
    
      return nextFriday;
    }
    
    // 👇️ Get Friday of Next Week
    const now = new Date();
    const nextFriday = getNextFriday(now); // next friday from now
    console.log("It is currently" + now + " and the next Friday is " + nextFriday);
    secondsTill = (nextFriday-now)/1000;
    console.log("It is" + secondsTill  + "seconds until next Friday");
    // computes the number of seconds until the next friday
    return secondsTill;

}


function refresh_count() {
    const count = seconds_until_next_friday();
    var number = Math.floor(count);
    var numberString = padNumber(toBinary(number));
  
    var numberArea = document.querySelector(".binary");
    numberArea.innerHTML = numberString;
    
    var binaryArray = numberString.split("");
    return binaryArray;
  }

  