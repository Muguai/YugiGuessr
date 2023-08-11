export function handleOptionClick(option) {
    // Reset the color of all options
    var options = document.getElementsByClassName("option");
    for (var i = 0; i < options.length; i++) {
      options[i].style.backgroundColor = "#e0e0e0";
      options[i].style.border = "none";
      options[i].removeAttribute("onclick");
    }
  
    var selectedOptionText = option.textContent;
    console.log("Selected option:", selectedOptionText + " Correct Answer " + correctAnswer);
  
    const containsImage = option.querySelector('img') !== null;
  
    // Get the string for the entire img element inside the div
    const imgString = containsImage ? option.querySelector('img').outerHTML : '';
    if (containsImage) {
      const matchSRC1 = imgString.match(/src="([^"]+)"/)[1];
      correctAnswer = correctAnswer.match(/src="([^"]+)"/)[1];
      console.log("This is the selected image " + imgString + " This is the correct answer " + correctAnswer);
      if (correctAnswer == matchSRC1) {
        option.style.border = "4px solid green";
      } else {
        for (var i = 0; i < options.length; i++) {
          const imgString = options[i].querySelector('img').outerHTML;
          const matchSRC2 = imgString.match(/src="([^"]+)"/)[1];
          if (matchSRC2 == correctAnswer)
            options[i].style.border = "4px solid green"
        }
  
        console.log()
        option.style.border = "4px solid red";
      }
      return;
    }
  
    console.log("This is the selected text " + selectedOptionText);
  
    if (selectedOptionText == correctAnswer) {
      option.style.border = "4px solid green";
    } else {
      for (var i = 0; i < options.length; i++) {
        if (options[i].textContent == correctAnswer)
          options[i].style.border = "4px solid green"
      }
      //options[correctAnswer].style.border = "4px solid green";
      console.log()
      option.style.border = "4px solid red";
    }
    console.log("Selected option index:", selectedOptionIndex);
  }
  