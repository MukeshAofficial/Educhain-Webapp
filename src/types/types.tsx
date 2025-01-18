// types/types.ts
export interface Question {
    question: string;
    options?: string[];
    answer?: string;
    keywords?: string[];
    explanation?: string;
}

export interface LessonPlan {
  topic: string;
  objectives: string[];
  introduction: string;
  content: string;
  assessment: string;
  conclusion: string;
}

export interface Flashcard {
    front: string;
    back: string;
    explanation?: string;
}

export interface SolvedDoubt {
    explanation: string;
    steps?: string[];
    additional_notes?: string;
}