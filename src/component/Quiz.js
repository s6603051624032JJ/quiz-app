import { useContext, useState } from "react";
import { DataContext } from "../App";
import QuestionsData from "../data/QuestionsData";

const Quiz = () => {
  const [current, setCurrent] = useState(0);

  // เก็บคำตอบที่เลือกของแต่ละข้อ
  const [answers, setAnswers] = useState(
    Array(QuestionsData.length).fill("")
  );

  const { setScore, setAppState } =
    useContext(DataContext);

  // เลือกคำตอบ
  const selectAnswer = (choice) => {
    const newAnswers = [...answers];
    newAnswers[current] = choice;
    setAnswers(newAnswers);
  };

  // ข้อถัดไป
  const nextQuestion = () => {
    if (current < QuestionsData.length - 1) {
      setCurrent(current + 1);
    }
  };

  // ย้อนกลับไปข้อก่อนหน้า
  const previousQuestion = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  // ส่งคำตอบและคำนวณคะแนน
  const submitAnswer = () => {
    let totalScore = 0;

    answers.forEach((answer, index) => {
      if (
        answer === QuestionsData[index].answer
      ) {
        totalScore++;
      }
    });

    setScore(totalScore);
    setAppState("score");
  };

  return (
    <div className="quiz">

      <h1>
        {QuestionsData[current].question}
      </h1>

      <div className="choices">

        <button
          className={
            answers[current] === "A"
              ? "selected"
              : ""
          }
          onClick={() => selectAnswer("A")}
        >
          {QuestionsData[current].A}
        </button>

        <button
          className={
            answers[current] === "B"
              ? "selected"
              : ""
          }
          onClick={() => selectAnswer("B")}
        >
          {QuestionsData[current].B}
        </button>

        <button
          className={
            answers[current] === "C"
              ? "selected"
              : ""
          }
          onClick={() => selectAnswer("C")}
        >
          {QuestionsData[current].C}
        </button>

        <button
          className={
            answers[current] === "D"
              ? "selected"
              : ""
          }
          onClick={() => selectAnswer("D")}
        >
          {QuestionsData[current].D}
        </button>

      </div>

      <p>
        {current + 1} / {QuestionsData.length}
      </p>

      <div className="navigation">

        {/* ปุ่มย้อนกลับ */}
        <button
          onClick={previousQuestion}
          disabled={current === 0}
        >
          ย้อนกลับ
        </button>

        {/* ถ้ายังไม่ใช่ข้อสุดท้าย */}
        {current < QuestionsData.length - 1 ? (
          <button
            onClick={nextQuestion}
            disabled={answers[current] === ""}
          >
            ถัดไป
          </button>
        ) : (
          /* ถ้าเป็นข้อสุดท้าย */
          <button
            onClick={submitAnswer}
            disabled={answers[current] === ""}
          >
            ส่งคำตอบ
          </button>
        )}

      </div>

    </div>
  );
};

export default Quiz;
