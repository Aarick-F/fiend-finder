$(document).ready(() => {

  let newFiend, matchedFiend, fiendArray;


  // EVENT LISTENER

  $("#submit").on("click", (e) => {
    e.preventDefault();
    fiendArray = [];
    getData();
    let answersArray = [];
    
    let a1 = $("#question-one")["0"].selectedOptions["0"].value;
    let a2 = $("#question-two")["0"].selectedOptions["0"].value;
    let a3 = $("#question-three")["0"].selectedOptions["0"].value;
    let a4 = $("#question-four")["0"].selectedOptions["0"].value;
    let a5 = $("#question-five")["0"].selectedOptions["0"].value;
    let a6 = $("#question-six")["0"].selectedOptions["0"].value;
    let a7 = $("#question-seven")["0"].selectedOptions["0"].value;
    let a8 = $("#question-eight")["0"].selectedOptions["0"].value;
    let a9 = $("#question-nine")["0"].selectedOptions["0"].value;
    let a10 = $("#question-ten")["0"].selectedOptions["0"].value;
    
    answersArray.push(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10);

    
    let name = $("#name").val().trim();
    let photo = $("#photo").val().trim();
    
    newFiend = new Fiend(name, photo, answersArray);

    $.post("/api/fiends", newFiend, data => {
        if(!data) {
          alert("Something horrible has happened.");
        }
    });

  });

  // OBJECT CLASS

  class Fiend {
    constructor(name, photo, scores) {
      this.name = name;
      this.photo = photo;
      this.scores = scores;
      this.matchLevel = 0;
    }
  }

  // FUNCTIONS

  findMatch = (fiendArr) => {
    let resultsArr = [];
    fiendArr.pop();

    for(let i = 0; i < fiendArray.length; i++) {
      let individualResults = [];
      for(let j = 0; j < fiendArray[i].scores.length; j++) {
        if(parseInt(fiendArray[i].scores[j]) >= parseInt(newFiend.scores[j])) {
          let difference = parseInt(fiendArray[i].scores[j]) - parseInt(newFiend.scores[j]);
          individualResults.push(difference);
        } else {
          let difference = parseInt(newFiend.scores[j]) - parseInt(fiendArray[i].scores[j]);
          individualResults.push(difference);
        }
      }
      resultsArr.push(individualResults);
    }
    console.log(resultsArr);
    for(let i = 0; i < resultsArr.length; i++) {
      fiendArray[i].matchLevel = resultsArr[i].reduce((a, b) => {
        return a + b;
      });
    }
    console.log(fiendArray);
    let matchLevelArr = [];
    fiendArray.forEach(fiend => {
      matchLevelArr.push(fiend.matchLevel);
    });
    let closestMatch = getMin(matchLevelArr);
    matchedFiend = fiendArray[matchLevelArr.indexOf(closestMatch)];
    console.log(`NEW FIEND: ${newFiend}
      MATCHED FIEND: ${matchedFiend}`);

    buildModal(newFiend, matchedFiend);
  }

  getData = () => {
    $.get("/api/fiends", (data) => {
      fiendArray = data;
      findMatch(fiendArray);
    });
  }

  getMin = (arr) => {
    return arr.reduce((p, v) => {
      return (p < v ? p : v);
    });
  }

  buildModal = (user, match) => {
    let pictureBox = $("<div id='pictureBox'>");
    if(user.photo.length > 0) {
      pictureBox.append("<img class='picture' src='" + user.photo + "'>");
    }
    pictureBox.append("<img class='picture' src='" + match.photo + "'>");
    let message = $("<h1 id='message'>Congratulations " + user.name +
                  ", you've been matched with " + match.name + "!</h1>");
    $("#resultsWindow").append(pictureBox, message);
    $(".modal").addClass("is-active");
  }

});