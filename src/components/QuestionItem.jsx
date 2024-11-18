import { forwardRef } from "react";

const QuestionItem = forwardRef(
  ({ children, CheckAnswer, isDisabled }, ref) => {
    return (
      <li>
        <button ref={ref} onClick={CheckAnswer} disabled={isDisabled}>
          {children}
        </button>
      </li>
    );
  }
);

export default QuestionItem;