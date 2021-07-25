// 配列をシャッフルする関数
const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// 配列をシャッフルする
quiz = shuffle(quiz);

// 各問題のindex番号
let quizIndex = 0;

// 正解するとscore+1される
let score = 0;

// プログレスバーの要素を取得する
const $progress = document.getElementById("js-progress");

// 左上の何問目かの要素を取得する
const $quizNumber = document.getElementById("quiz-number");

// 右上の残りの問題数の要素を取得する
const $quizRemainNum = document.getElementById("quiz-remain-number");
let quizCount = 1;

// リトライボタンの要素を取得する
const $retry = document.getElementById("retry");
const $displayOriginal = $retry.style.display;
$retry.style.display = "none";

// すべてのボタンの要素を取得する
const $btns = document.getElementsByClassName("quiz-btn");
const btnsLength = $btns.length;

// 問題文とボタンのテキストを設定する
const setupQuiz = () => {
  // 問題文を設定
  document.getElementById("question").textContent = quiz[quizIndex].question;

  // 左上の何問目かを設定
  $quizNumber.textContent = quizCount;

  // プログレスバーの設定
  $progress.style.width = `${(quizIndex)/(quiz.length) * 100}%`;

  // 右上の残りの問題数を設定
  $quizRemainNum.textContent = quiz.length + 1 - quizCount;
  quizCount++;

  // ボタンのテキストを設定
  let btnsIndex = 0;
  while (btnsIndex < btnsLength) {
    $btns[btnsIndex].textContent = quiz[quizIndex].answers[btnsIndex];
    btnsIndex++;
  }
};
setupQuiz();

const clickHandler = (e) => {
  if (quiz[quizIndex].correct === e.target.textContent) {
    alert("◎ 正解！！");
    score++;
  } else {
    alert(`× 不正解！\n正解は "${quiz[quizIndex].correct}" です`);
  }
  // 次の問題へ進むためのインデックス変数
  quizIndex++;

  if (quizIndex < quiz.length) {
    // 問題数がまだある場合の処理
    setupQuiz();
  } else {
    // 問題数がもう無い場合の処理
    const result = document.getElementById("result");
    $progress.style.width = `100%`;
    $quizRemainNum.textContent = 0;
    result.textContent = `終了！！ あなたの正解数は${score}/${quiz.length}です！`;
    $retry.style.display = $displayOriginal;
  }
};

let handlerIndex = 0;
while (handlerIndex < btnsLength) {
  $btns[handlerIndex].addEventListener("click", (e) => {
    clickHandler(e);
  });
  handlerIndex++;
}
