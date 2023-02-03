export function getTimeString(seconds: number):String{
    //86400 seconds in a day, substracting the total possible days
  let days = Math.floor(seconds / 86400);
  seconds -= days * 86400;

  //3600 seconds in a hour, substracting the total possible hours
  let hours = Math.floor(seconds / 3600);
  seconds -= hours * 3600;

  //60 seconds in a minute, substracting the total possible minutes
  let minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;

  //Rounding the excedent milliseconds from the first opperation
  seconds = Math.floor(seconds);

  let timeString: String = ""

  if(days>0){
    timeString += days + "d "
    if(!(hours>0 || minutes>0 || seconds>0)) return timeString;
  }

  if(hours>0 || days>0){
    timeString += hours < 10 ? "0" + hours + ":" : hours + ":"
  }  

  timeString += minutes < 10 ? "0" + minutes + ":" : minutes + ":"
  
  timeString += seconds < 10 ? "0" + seconds : seconds + ""

  return timeString;
}
