// components/QuestionDisplay.tsx
import React from 'react';
import { Question } from '../types/types';

interface QuestionDisplayProps {
  questions?: { questions: Question[] };
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ questions }) => {
    if (!questions || !questions.questions || questions.questions.length === 0) {
        return <div className="text-center p-4">No questions available.</div>;
      }

  return (
    <div className="mt-4">
        {questions.questions.map((question, index) => (
          <div key={index} className="border rounded p-4 mb-4 dark:border-gray-700 bg-white dark:bg-dark-primary shadow">
            <h3 className="text-xl font-semibold mb-2 dark:text-white">
              Question {index + 1}:
            </h3>
            <p className="mb-2 dark:text-white">
              <span className="font-medium dark:text-gray-400">Question:</span> {question.question}
            </p>
            {question.options && (
              <div>
                <p className="mb-2 dark:text-white">
                  <span className="font-medium dark:text-gray-400">Options:</span>
                </p>
                <ul className="list-disc list-inside mb-2 dark:text-white">
                  {question.options.map((option, optionIndex) => (
                    <li key={optionIndex}>{String.fromCharCode(65 + optionIndex)}. {option}</li>
                  ))}
                </ul>
              </div>
            )}

            {question.answer && (
                <p className="mb-2 dark:text-white">
                    <span className="font-medium dark:text-gray-400">Answer:</span> {question.answer}
                </p>
            )}
            {question.keywords && (
                <p className="mb-2 dark:text-white">
                    <span className="font-medium dark:text-gray-400">Keywords:</span> {question.keywords.join(', ')}
                </p>
            )}
            {question.explanation && (
              <p className="mb-2 dark:text-white">
                <span className="font-medium dark:text-gray-400">Explanation:</span> {question.explanation}
              </p>
            )}

            <hr className="border-t border-gray-300 dark:border-gray-700 my-4" />
          </div>
        ))}
      </div>
  );
};

export default QuestionDisplay;