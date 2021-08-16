// import jeaopardy file
async function importJeopardy() {
    const rawData = await fetch('./jeopardy.json');
    const gameData = await rawData.json();
    console.log(gameData);




    const gameArea = document.querySelector('.gameArea');
    const categoryArea = document.querySelector('.category')
    const questionArea = document.querySelector('.question')
    const userInput = document.querySelector('#userInput')
    const submitButton = document.querySelector('#submitButton');
    const resultArea = document.querySelector('.resultArea')

    function getDivs() {

        let boardAmount = 200;

        for (let i = 0; i < 30; i++) {

            // make a div
            $('.gameArea').append('<div id="moneyGrid"></div>');

            // if the grididmoney grid is = 0 go ahead and update the count]

        }

        const moneyGrid = document.querySelectorAll('#moneyGrid')
        console.log(moneyGrid);

        // loop through array of moneyGrid which contains div id moneyGrid


        for (const div of moneyGrid) {

            if (boardAmount > 1000) {
                boardAmount = 200;
            }

            console.log(div);

            div.innerText = '$' + boardAmount
            div.value = div.innerText;

            boardAmount = boardAmount + 200;

            //event listener for button divs
            div.addEventListener('click', () => {
                categoryArea.innerHTML = '';
                questionArea.innerHTML = '';
                resultArea.innerHTML = '';
                userInput.value = '';
                const compatibleQuestions = [];

                for (const question of gameData) {

                    if (div.value === "$1000") {

                        div.value = "$1,000"

                    }

                    if (question.value == div.value) {

                        compatibleQuestions.push(question)

                    }

                }

                let selectedQuestion = compatibleQuestions[Math.floor(Math.random() * compatibleQuestions.length)];
                console.log('Selected Random Object:', selectedQuestion)

                $(categoryArea).append('<b>Category: </b>', selectedQuestion.category)
                $(questionArea).append('<b>Question: </b>', selectedQuestion.question)



                let selectedQuestionTest = selectedQuestion.value

                function toFloat(num) {
                    dotPos = num.indexOf('.');
                    commaPos = num.indexOf(',');

                    if (dotPos < 0)
                        dotPos = 0;

                    if (commaPos < 0)
                        commaPos = 0;

                    if ((dotPos > commaPos) && dotPos)
                        sep = dotPos;
                    else {
                        if ((commaPos > dotPos) && commaPos)
                            sep = commaPos;
                        else
                            sep = false;
                    }

                    if (sep == false)
                        return parseFloat(num.replace(/[^\d]/g, ""));

                    return parseFloat(
                        num.substr(0, sep).replace(/[^\d]/g, "") + '.' +
                        num.substr(sep + 1, num.length).replace(/[^0-9]/, "")
                    );

                }

                let selectedQuestionTest2 = toFloat(selectedQuestionTest);

                //submit button
                submitButton.addEventListener('click', () => {
                    console.log(userInput.value);

                    let score = localStorage.getItem('score');
                    if (score === null) {
                        score = 0;
                    }

                    if (userInput.value === selectedQuestion.answer) {
                        $('.resultArea').append('<b>Congratulations, you\'ve earned: </b>', selectedQuestion.value);
                        score = score + selectedQuestionTest2;
                        $('.score').append('<b>Current Score: </b>', score)
                        localStorage.setItem('score', score)
                    }


                    if (userInput.value !== selectedQuestion.answer) {
                        $('.resultArea').append('<b>Sorry, you\'ve lost: </b>', selectedQuestion.value)
                    }
                })

            })

        }

    }
    getDivs();


}
importJeopardy();
