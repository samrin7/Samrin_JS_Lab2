//Quiz Prototype
function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
  }
  
  Quiz.prototype.getQuestionByIndex = function() {
    return this.questions[this.questionIndex];
  }
  
  Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
  }
  
  Quiz.prototype.checkOptionWithAnswer = function(answer) {
    if(this.getQuestionByIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
  
    this.questionIndex++;
  }
  
  //Question Prototype
  function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
  }
  
  Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
  }

  // create questions here
  var questions = [
    new Question("What is the tallest building in the world?", ["Burj Khalifa", "Shangai Tower","Warison Merdeka Tower", "Tokyo Skytree"], "Burj Khalifa"),
    new Question("Which is the longest river of the world?", ["Amazon River", "Nile", "Congo River", "Yellow River"], "Nile"),
    new Question("Which is the largest island in the world?", ["New Guinea", "Madagascar","Great Britain", "Greenland"], "Greenland"),
    new Question("What year was the very first model of the iPhone released?", ["2007", "2004", "2008", "2005"], "2007"),
    new Question("Which email service is owned by Microsoft?", ["Rediff Mail", "Yahoo! Mail", "Gmail", "Hot Mail"], "Hot Mail")
  ];
  
  //Quiz Display and Score display
  function loadQuestions() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
   // show question
   var element = document.getElementById("question");
   element.innerHTML = quiz.getQuestionByIndex().text;
  // show options
  var choices = quiz.getQuestionByIndex().choices;
  for(var i = 0; i < choices.length; i++) {
      var element = document.getElementById("choice" + i);
      element.innerHTML = choices[i];
      handleOptionButton("btn" + i, choices[i]);
  }
  showProgress();
  }
  };
  
  //handle Event and load next question
  function handleOptionButton(id, choice) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.checkOptionWithAnswer(choice);
        loadQuestions();
    }
  };
  
  //show progress bar
  function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
  };
  
  // show result
  function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + ".And mark percentage is: "+(quiz.score/questions.length*100)+"%"+"</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
  };
  
  // create quiz
  var quiz = new Quiz(questions);
  
  // display quiz
  loadQuestions();