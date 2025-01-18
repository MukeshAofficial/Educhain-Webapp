// components/ContentDisplay.tsx
import React from 'react';
import { Flashcard, LessonPlan, SolvedDoubt, Question } from '@/types/types';

interface ContentDisplayProps {
  content?: LessonPlan | { flashcards: Flashcard[] } | null;
  contentType: "lesson_plan" | "flashcards" | null;
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({ content, contentType }) => {
  if (!content) {
      return <div className="text-center p-4">No content available.</div>;
  }
    if (contentType === 'lesson_plan' && 'topic' in content) {
        const lessonPlan = content as LessonPlan;
        return (
            <div className="mt-4  bg-white dark:bg-dark-primary rounded p-6 shadow">
                <h2 className="text-2xl font-semibold mb-4 dark:text-white">Lesson Plan</h2>
                <p className="mb-2 dark:text-white"><span className="font-medium dark:text-gray-400">Topic:</span> {lessonPlan.topic}</p>
                <p className="mb-2 dark:text-white"><span className="font-medium dark:text-gray-400">Objectives:</span> {lessonPlan.objectives.join(', ')}</p>
                <p className="mb-2 dark:text-white"><span className="font-medium dark:text-gray-400">Introduction:</span> {lessonPlan.introduction}</p>
                <p className="mb-2 dark:text-white"><span className="font-medium dark:text-gray-400">Content:</span> {lessonPlan.content}</p>
                <p className="mb-2 dark:text-white"><span className="font-medium dark:text-gray-400">Assessment:</span> {lessonPlan.assessment}</p>
                <p className="mb-2 dark:text-white"><span className="font-medium dark:text-gray-400">Conclusion:</span> {lessonPlan.conclusion}</p>
            </div>
        );
    } else if (contentType === 'flashcards' && 'flashcards' in content) {
        const flashcards = content as { flashcards: Flashcard[] };
        return (
            <div className="mt-4  bg-white dark:bg-dark-primary rounded p-6 shadow">
                <h2 className="text-2xl font-semibold mb-4 dark:text-white">Flashcards</h2>
                {flashcards.flashcards.map((card, index) => (
                    <div key={index} className="border rounded p-4 mb-4 dark:border-gray-700 bg-white dark:bg-dark-primary shadow">
                        <p className="mb-2 dark:text-white"><span className="font-medium dark:text-gray-400">Front:</span> {card.front}</p>
                        <p className="mb-2 dark:text-white"><span className="font-medium dark:text-gray-400">Back:</span> {card.back}</p>
                        {card.explanation && (
                            <p className="mb-2 dark:text-white"><span className="font-medium dark:text-gray-400">Explanation:</span> {card.explanation}</p>
                        )}
                        <hr className="border-t border-gray-300 dark:border-gray-700 my-4" />
                    </div>
                ))}
            </div>
        );
    }

    return <div className="text-center p-4">Invalid content type.</div>;
};

export default ContentDisplay;