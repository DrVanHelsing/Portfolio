(function(){

  var docInfo = getInfo();

  bindClickHandlers(docInfo);

  function bindClickHandlers(docInfo){
    
    for(var f in docInfo.buttonTypes){
   
      for(var i = 0; i<docInfo.buttonTypes[f].buttonIDs.length; i++){
        var button = document.getElementById(docInfo.buttonTypes[f].buttonIDs[i]);

        if(button){
          if(docInfo.buttonTypes[f].eventType=="click"){
            button.onclick = docInfo.buttonTypes[f].clickHandler;  
          } else if(docInfo.buttonTypes[f].eventType=="hover"){
            button.addEventListener("mouseenter", infoEnter)
            button.addEventListener("mouseleave", infoLeave)
                    
            }
          
          
          //console.log("found " + docInfo.buttonTypes[f].buttonIDs[i])

          //add button class, because Illustrator can't
          button.setAttribute("class", "button");
        }
    }
    }
  }

  
  function infoEnter(e){
    var popupId = "popup--" + e.currentTarget.id.split("--")[1];
   
    var popup = document.getElementById(popupId);
    fadeShow(popup);
    slideInShow(popup);
    

  }
  
  function infoLeave(e){
    var popupId = "popup--" + e.currentTarget.id.split("--")[1];
    var popup = document.getElementById(popupId);
    fadeHide(popup);
    slideOutHide(popup);
  }
  
  function nextTimelineClick(e){
    //find timelines
    var nextTimelineID = e.currentTarget.id.split("--")[1];
    var nextTimeline = document.getElementById(nextTimelineID);
    var currentTimeline = document.getElementById(docInfo.currentTimeline);
    
    //find headers
    var currentHeader = document.getElementById("header--" + currentTimeline.id);
    var nextHeader = document.getElementById("header--" + nextTimelineID);
    
    //hide current timeline & header
    //currentTimeline.classList.add("hide");
    //currentTimeline.setAttribute("transform", "translate(2000px)");
    slideOutHide(currentTimeline);
    slideOutHide(currentHeader)
    //currentHeader.classList.add("hide--header")
    
    //update background
    setBackground(docInfo, nextTimelineID);
    
    //show new timeline
    //nextTimeline.classList.remove("hide");
    slideInShow(nextTimeline);
    slideInShow(nextHeader);
    //nextHeader.classList.remove("hide--header")

    //update current timeline
    docInfo.currentTimeline = nextTimelineID;

    
  }
  
  
 
  
  function setBackground(docInfo, currentTimeline){
  var months = getMonths(docInfo, currentTimeline);
  
  //hide months that fall outside start/end months
  hideMonths(months.hiddenMonths);
  //show active months (as in going back to main)
  showMonths(months.activeMonths);
  //resize active months
  resizeMonths(docInfo, months.activeMonths, currentTimeline)
  
}
 
  

function resizeMonths(docInfo, activeMonths, currentTimeline){
  var numOfMonths = docInfo.timelines.numOfMonths(currentTimeline);
  var monthWidth = docInfo.graphWidth / numOfMonths;
  
  for(var i = 0; i<activeMonths.length; i++){
    var rects = activeMonths[i].getElementsByTagName("rect");
    
    var monthPos = (i*monthWidth) + docInfo.leftMargin;
    
    for(var r = 0; r<rects.length; r++){
      rects[r].x.baseVal.value = monthPos;
      rects[r].width.baseVal.value = monthWidth;
    }
    
    //center text
    var text = activeMonths[i].getElementsByTagName("g")[0];
    var bbox = text.getBBox();
    
    var textCenter = (monthWidth / 2) - (bbox.width / 2) + (i * monthWidth + docInfo.leftMargin);
    
    var shiftPX = textCenter - bbox.x;
    
    //var transform = "translateX(" + shiftPX + "px)";
    var transform = "translate(" + shiftPX + ")";
    //console.log(transform)
    //text.style.transform = transform;
    text.setAttribute("transform", transform)
    
  }
  
}

function fadeHide(element){
  element.setAttribute("opacity","0");
}
  
function fadeShow(element){
  element.removeAttribute("opacity");
}
  
function slideOutHide(element){
  element.setAttribute("transform","translate(2000)");
}
  
function slideInShow(element){
  element.removeAttribute("transform");
}

function hideMonths(hiddenMonths){
  for(var i = 0; i<hiddenMonths.length; i++){
    hiddenMonths[i].setAttribute("transform","translate(2000)");
  }
}

function showMonths(activeMonths){
  for(var i = 0; i<activeMonths.length; i++){
    activeMonths[i].removeAttribute("transform","translate(2000)");
  }
}

function getMonths(docInfo, currentTimeline){
  var months = {
    activeMonths: [],
    hiddenMonths: []
  }
  
  for(var i = 0; i<docInfo.totalMonths; i++){
    var currentMonth = document.getElementById(docInfo.getMonth(i).toLowerCase());
    var startMonth = docInfo.timelines[currentTimeline].startMonth;
    var endMonth = docInfo.timelines[currentTimeline].endMonth;
    
    if(i<startMonth || i>endMonth){
       months.hiddenMonths.push(currentMonth)
       continue;
       }
    
    months.activeMonths.push(currentMonth)
  }
  
  return months;
  
}

function getInfo(){
  var info = {
    currentTimeline: "main",
    canvasWidth: 0,
    graphWidth: 952,
    leftMargin: 35.5,
    totalMonths: 12, //max number of months in graph
    buttonTypes:{
      navButtons:{
        buttonIDs:["next-button--cfap", "next-button--cipm", "next-button--invfo", "back-button-cfap-header--main", "back-button-cipm-header--main", "back-button-invfo-header--main"],
        clickHandler:nextTimelineClick,
        eventType:"click"
      },
      infoButtons:{
        buttonIDs:["info-button--cfap-rr-spreadsheet", 
                   "info-button--cfap-rr-pdf", 
                   "info-button--cfap-rr-online", 
                   "info-button--cfap-postlive",
                   "info-button--cfap-it-review", 
                   "info-button--cfap-epub-production", 
                   "info-button--cfap-wiley-index", 
                   "info-button--cfap-wiley-printing", 
                   "info-button--cfap-sprint", 
                   "info-button--cfap-pdf-production", 
                   "info-button--cfap-content-updates", 
                   "info-button--cfap-errata-updates"],
        clickHandler:[infoEnter, infoLeave],
        eventType:"hover"
      }
    },
    timelines: {
      main:{
        startMonth:0,
        endMonth:11,
        layerID:"main"
      },
      cfap:{
        startMonth:0,
        endMonth:9,
        layerID:"cfap"
      },
      cipm:{
        startMonth:7,
        endMonth:10,
        layerID:"cipm"
      },
      invfo:{
        startMonth:9,
        endMonth:11,
        layerID:"invfo"
      },
      numOfMonths: function(timeline){
        return this[timeline].endMonth - this[timeline].startMonth + 1;
      }
    },
    getMonth:function(monthNum){
      switch(monthNum){
        case(0):
          return "November";
          break;
        case(1):
          return "December";
          break;
        case(2):
          return "January";
          break;
        case(3):
          return "February";
          break;
        case(4):
          return "March";
          break;
        case(5):
          return "April";
          break;
        case(6):
          return "May";
          break;
        case(7):
          return "June";
          break;
        case(8):
          return "July";
          break;
        case(9):
          return "August";
          break;
        case(10):
          return "September";
          break;
        case(11):
          return "October";
          break;
      }
    }
  }
  
  return info;
}



  
})()


