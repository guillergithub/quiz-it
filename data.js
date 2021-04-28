'use strict'

let question = 'Dato invalido'
function transitionToGamePage () {
    const inputAmount = document.getElementById('selectManyQuestions').value;
    const inputCategory = document.getElementById('selectCategory').value;
    const inputDifficult = document.getElementById('selectDifficult').value;
    const inputMultipleChoice = document.getElementById('multiple');    
    const inputTypeOfQuestions = () => {
        if(inputMultipleChoice.checked) {
            return inputMultipleChoice.value;
        } else {
            const inputBoolean = document.getElementById('boolean');
            return inputBoolean.value;
        }    
       }
    
    window.location.href = `game.html?test=0&amount=${inputAmount}&category=${inputCategory}&difficult=${inputDifficult}&type=${inputTypeOfQuestions()}`    
}

function getCategoryOptions () {
    fetch('https://opentdb.com/api_category.php')
        .then(response => response.json())
        .then(result => printCategoryOptions(result.trivia_categories))
}

function printCategoryOptions (categories) {
    const container = document.getElementById('selectCategory')    
    categories.forEach( (category) => {        
        container.innerHTML += `<option value="${category.id}">${category.name}</option>`        
    })
}

getCategoryOptions()


