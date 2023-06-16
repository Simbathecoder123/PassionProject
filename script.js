let questionsData = [];


function renderQuestions() {
  const questionsElement = document.getElementById('questions');
  questionsElement.innerHTML = '';

  questionsData.forEach((question, questionIndex) => {
    const listItem = document.createElement('li');
    listItem.className = 'question';
    listItem.textContent = `${question.name}: ${question.question}`;

    if (question.answers && question.answers.length > 0) {
      const answersList = document.createElement('ul');
      answersList.className = 'answers';

      question.answers.forEach(answer => {
        const answerItem = document.createElement('li');
        answerItem.className = 'answer';
        answerItem.textContent = `${answer.name}: ${answer.text}`;
        answersList.appendChild(answerItem);
      });

      listItem.appendChild(answersList);
    }

    const answerForm = document.createElement('form');
    answerForm.addEventListener('submit', event => {
      handleAnswerSubmit(event, questionIndex);
    });

    const answerInput = document.createElement('input');
    answerInput.type = 'text';
    answerInput.placeholder = 'Your answer';
    answerInput.required = true;
    answerForm.appendChild(answerInput);

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.placeholder = 'Your name';
    nameInput.required = true;
    answerForm.appendChild(nameInput);

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Submit Answer';
    answerForm.appendChild(submitButton);

    listItem.appendChild(answerForm);

    questionsElement.appendChild(listItem);
  });
}


function handleQuestionSubmit(event) {
  event.preventDefault();

  const questionInput = document.getElementById('question-input');
  const nameInput = document.getElementById('name-input');

  const question = questionInput.value;
  const name = nameInput.value;

  if (question && name) {
    const newQuestion = {
      question,
      name,
      answers: []
    };

    questionsData.push(newQuestion);

   
    questionInput.value = '';
    nameInput.value = '';

    renderQuestions();
  }
}


function handleAnswerSubmit(event, questionIndex) {
  event.preventDefault();

  const answerInput = event.target.querySelector('input[type="text"]');
  const nameInput = event.target.querySelector('input[type="text"]:last-of-type');

  const answer = answerInput.value;
  const name = nameInput.value;

  if (answer && name) {
    const newAnswer = {
      text: answer,
      name
    };

    questionsData[questionIndex].answers.push(newAnswer);

    answerInput.value = '';
    nameInput.value = '';

    renderQuestions();
  }
}

const askForm = document.getElementById('ask-form');
askForm.addEventListener('submit', handleQuestionSubmit);

renderQuestions();
