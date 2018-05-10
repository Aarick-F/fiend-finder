$(document).ready(() => {

  $("#submit").on("click", () => {
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
    
    let newFiend = new Fiend(name, image, answersArray);
    
    console.log(newFiend);
  });
  
  class Fiend {
    constructor(name, photo, scores) {
      this.name = name;
      this.photo = photo;
      this.scores = scores;
    }
  }

});