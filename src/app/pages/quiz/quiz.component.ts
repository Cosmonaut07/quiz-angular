import {Component, OnDestroy, OnInit} from '@angular/core';
import {QuestionModel, QuestionType} from "../../models/question";
import {GuestUserModel} from "../../models/guest-user";
import {SettingService} from "../../services/settings/setting.service";
import {QuizRepositoryService} from "../../services/API/quizes/quiz-repository.service";
import {QuestionChoice} from "../../models/question-choice";
import {interval} from "rxjs";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit, OnDestroy {
  guestUser: GuestUserModel | null = null;
  quizType: number = 0;
  quizID: number | null = null;
  progress: string = "0";

  public isQuizCompleted = false;
  public questions: QuestionModel[] = [];
  public currentQuestionIndex: number = 0;

  public score: number = 0;
  public correctAnswer = 0;
  public incorrectAnswer = 0;
  public finalScore: number | null = null;
  public timeLeft: number = 0;

  public isChoiceCorrect: boolean | null = null;
  public currentAnswered = false;
  public correctChoice: QuestionChoice | null = null;

  interval$: any;
  counter = 300;
  timeUp = false;


  constructor(
    private settings: SettingService,
    private quizRepo: QuizRepositoryService,
  ) {
  }

  ngOnInit(): void {
    this.startQuiz();
    this.startCounter()

  }

  ngOnDestroy() {
    this.endQuiz()
  }

  startCounter() {
    this.interval$ = interval(1000)
      .subscribe(val => {
        this.counter--;
        console.log(this.counter);
        if (this.counter === 0) {
          this.timeUp = true;
          this.endQuiz()
          this.counter = 60;
        }
      });
  }

  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }

  resetCounter() {
    this.stopCounter();
    this.counter = 300;
    this.startCounter();
  }


  startQuiz() {
    this.guestUser = this.getGuestUserInfo();
    this.quizType = this.settings._isBinary ? QuestionType.Binary : QuestionType.MultipleChoice;
    if (this.guestUser?.id)
      this.sendQuizStart(this.guestUser.id, this.quizType);
  }


  sendQuizStart(id: number, type: number) {
    return this.quizRepo.startQuiz({'guest_user_id': id, 'quiz_type': type}).subscribe(
      (questions: any) => {
        this.quizID = questions.data.quiz_id;
        this.questions = questions.data.questions.map(
          (question: any) => new QuestionModel(question)
        );
      }
    );
  }

  endQuiz() {
    this.isQuizCompleted = true;
    this.stopCounter();
    this.sendEndQuiz();
  }

  sendEndQuiz() {
    this.quizRepo.endQuiz({
      guest_user_id: this.getGuestUserInfo()?.id,
      quiz_id: this.quizID
    }).subscribe(
      (data: any) => {
        console.log(data);
        this.finalScore = data.data.score;
        this.timeLeft = data.data.time_left;
      }
    )
  }


  answer(questionIndex: number, choice: any) {
    if (!this.currentAnswered) {
      console.log(questionIndex)
      this.currentAnswered = true;
      this.quizRepo.checkAnswer({
        quiz_id: this.quizID,
        question_id: this.questions[questionIndex].id,
        choice_id: choice.id,
        guest_user_id: this.getGuestUserInfo()?.id,
      }).subscribe(
        (data: any) => {
          if (data.data.is_correct) {
            this.score++;
            this.correctAnswer++;
            this.isChoiceCorrect = true;
            this.correctChoice = data.data.correct_answer;
            this.syncTime(data.data.time_left);
          } else {
            this.incorrectAnswer++;
            this.correctChoice = data.data.correct_answer;
            this.isChoiceCorrect = false;
          }
        }
      )
    }
  }

  syncTime(time: number) {
    this.counter = time;
  }

  nextQuestion(currentQuestionIndex: number) {
    this.isChoiceCorrect = null;
    this.currentQuestionIndex++;
    this.currentAnswered = false;
    this.correctChoice = null;
    if (currentQuestionIndex == this.questions.length - 1) {
      this.endQuiz();
    }
  }

  getGuestUserInfo() {
    let json = sessionStorage.getItem('userDetails');
    return json ? new GuestUserModel(JSON.parse(json)) : null;
  }


  resetQuiz() {
    this.resetCounter()
    this.isQuizCompleted = false;
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.correctAnswer = 0;
    this.incorrectAnswer = 0;
    this.currentAnswered = false;
    this.isChoiceCorrect = null;
    this.startQuiz();
  }


}
