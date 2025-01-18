// frontend/src/pages/index.tsx
import React, { useState } from 'react';
import axios from 'axios';
import Layout from '@/components/Layout';
import InputComponent from '@/components/InputComponent';
import QuestionDisplay from '@/components/QuestionDisplay';
import LoadingSpinner from '@/components/LoadingSpinner';
import AnimatedSection from '@/components/AnimatedSection';
import ContentDisplay from '@/components/ContentDisplay';
import ImageUpload from '@/components/ImageUpload';
import { Question, LessonPlan, Flashcard, SolvedDoubt } from '@/types/types';

const Home: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'qna' | 'content' | 'multimodal' | 'document' | 'youtube'>('qna');
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState<{ questions: Question[] } | null>(null);
    const [content, setContent] = useState<LessonPlan | { flashcards: Flashcard[] } | null>(null);
    const [solvedDoubt, setSolvedDoubt] = useState<SolvedDoubt | null>(null);

    // Q&A State
    const [qnaTopic, setQnaTopic] = useState('Solar System');
    const [qnaNumQuestions, setQnaNumQuestions] = useState(3);
    const [qnaQuestionType, setQnaQuestionType] = useState('Multiple Choice');
    const [qnaCustomInstructions, setQnaCustomInstructions] = useState('');

    // Content State
    const [contentTopic, setContentTopic] = useState('Photosynthesis');
    const [contentType, setContentType] = useState<'Lesson Plan' | 'Flashcards'>('Lesson Plan');

    // Multimodal State
    const [uploadedImage, setUploadedImage] = useState<File | null>(null);
    const [multimodalPrompt, setMultimodalPrompt] = useState('');
    const [multimodalDetailLevel, setMultimodalDetailLevel] = useState('Low');


    // Document State
    const [docSourceType, setDocSourceType] = useState<'pdf' | 'url' | 'text'>('pdf');
    const [docContent, setDocContent] = useState<string | null>(null);
     const [docPdfPreview, setDocPdfPreview] = useState<string | null>(null);
    const [docNumQuestions, setDocNumQuestions] = useState(3);
    const [docLearningObjective, setDocLearningObjective] = useState('');
    const [docDifficultyLevel, setDocDifficultyLevel] = useState('');

    // Youtube State
    const [ytUrl, setYtUrl] = useState('');
    const [ytNumQuestions, setYtNumQuestions] = useState(3);
    const [ytQuestionType, setYtQuestionType] = useState('Multiple Choice');
    const [ytCustomInstructions, setYtCustomInstructions] = useState('');

    const handleImageUpload = (file: File) => {
        setUploadedImage(file);
    };

   const handlePdfUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];

           const reader = new FileReader();
                reader.onload = (event) => {
                     setDocContent(event.target?.result as string)
                      setDocPdfPreview(event.target?.result as string)
                };
             reader.readAsDataURL(file);

        }else{
           setDocContent(null)
           setDocPdfPreview(null)
        }
    };

    const handleSubmit = async (type: string) => {
        setLoading(true);
        setQuestions(null);
        setContent(null);
        setSolvedDoubt(null)

        try {
            let response;
            switch (type) {
                case 'qna':
                    response = await axios.post('http://localhost:8000/api/questions', {
                        topic: qnaTopic,
                        num_questions: qnaNumQuestions,
                        question_type: qnaQuestionType,
                        custom_instructions: qnaCustomInstructions,
                    });
                    setQuestions(response.data.questions);
                    break;
                case 'content':
                    response = await axios.post('http://localhost:8000/api/content', {
                        topic: contentTopic,
                        content_type: contentType.toLowerCase().replace(' ', '_'),
                    });
                    setContent(response.data.content);
                    break;
                case 'multimodal':
                    if (uploadedImage) {
                        const formData = new FormData();
                        formData.append('image', uploadedImage);
                        formData.append('prompt', multimodalPrompt);
                        formData.append('detail_level', multimodalDetailLevel);

                        response = await axios.post('http://localhost:8000/api/image-doubt', formData, {
                            headers: { 'Content-Type': 'multipart/form-data' },
                        });
                         setSolvedDoubt(response.data)
                    } else {
                        console.log("Please upload an image")
                        alert("Please Upload an image")
                        setLoading(false);
                        return;
                    }
                    break;
                case 'document':
                    response = await axios.post('http://localhost:8000/api/document-questions', {
                        source_type: docSourceType,
                        content: docContent,
                        num_questions: docNumQuestions,
                        learning_objective: docLearningObjective,
                        difficulty_level: docDifficultyLevel,
                    });
                    setQuestions(response.data.questions);

                    break;
                case 'youtube':
                    response = await axios.post('http://localhost:8000/api/youtube-questions', {
                        url: ytUrl,
                        num_questions: ytNumQuestions,
                        question_type: ytQuestionType,
                        custom_instructions: ytCustomInstructions
                    });
                    setQuestions(response.data.questions);
                    break;
            }

        } catch (error) {
            console.error('Error during API call:', error);
            alert("An error occurred. Please check console.")
        } finally {
            setLoading(false);
        }
    };
    return (
        <Layout>
            <h1 className="text-3xl font-bold mb-6 dark:text-white">Educhain Interactive Demo</h1>
            <div className="flex flex-col md:flex-row gap-4 ">
                <div className=" flex flex-col gap-2 w-full md:w-1/4">
                    <button
                        className={` py-2 px-4 rounded   hover:bg-gray-700 transition-colors duration-200
                             ${activeTab === 'qna' ? 'bg-gray-700 text-white' : 'bg-gray-300 dark:bg-dark-secondary dark:text-white dark:hover:bg-dark-accent'}`}
                        onClick={() => setActiveTab('qna')}
                    >
                        Q&A Engine
                    </button>
                    <button
                        className={` py-2 px-4 rounded   hover:bg-gray-700 transition-colors duration-200
                             ${activeTab === 'content' ? 'bg-gray-700 text-white' : 'bg-gray-300 dark:bg-dark-secondary dark:text-white dark:hover:bg-dark-accent'}`}
                        onClick={() => setActiveTab('content')}
                    >
                        Content Engine
                    </button>
                    <button
                        className={` py-2 px-4 rounded   hover:bg-gray-700 transition-colors duration-200
                             ${activeTab === 'multimodal' ? 'bg-gray-700 text-white' : 'bg-gray-300 dark:bg-dark-secondary dark:text-white dark:hover:bg-dark-accent'}`}
                        onClick={() => setActiveTab('multimodal')}
                    >
                        Multimodal Q&A
                    </button>
                    <button
                        className={` py-2 px-4 rounded   hover:bg-gray-700 transition-colors duration-200
                             ${activeTab === 'document' ? 'bg-gray-700 text-white' : 'bg-gray-300 dark:bg-dark-secondary dark:text-white dark:hover:bg-dark-accent'}`}
                        onClick={() => setActiveTab('document')}
                    >
                        Document Q&A
                    </button>
                    <button
                        className={` py-2 px-4 rounded   hover:bg-gray-700 transition-colors duration-200
                             ${activeTab === 'youtube' ? 'bg-gray-700 text-white' : 'bg-gray-300 dark:bg-dark-secondary dark:text-white dark:hover:bg-dark-accent'}`}
                        onClick={() => setActiveTab('youtube')}
                    >
                        YouTube Q&A
                    </button>
                </div>

                <div className="w-full md:w-3/4  ">
                    {loading && <LoadingSpinner />}

                    {activeTab === 'qna' && (
                        <AnimatedSection>
                            <h2 className="text-2xl font-semibold mb-4 dark:text-white">Generate Questions</h2>
                            <InputComponent
                                label="Topic"
                                type="text"
                                value={qnaTopic}
                                onChange={(e) => setQnaTopic(e.target.value)}
                                placeholder="e.g. Solar System"
                                id="qna-topic"
                            />
                            <InputComponent
                                label="Number of Questions"
                                type="number"
                                value={qnaNumQuestions}
                                onChange={(e) => setQnaNumQuestions(parseInt(e.target.value, 10))}
                                id="qna-number"
                            />
                            <InputComponent
                                label="Select Question Type"
                                type="select"
                                value={qnaQuestionType}
                                onChange={(e) => setQnaQuestionType(e.target.value)}
                                options={["Multiple Choice", "Short Answer", "True/False", "Fill in the Blank"]}
                                id="qna-type"
                            />
                            <InputComponent
                                label="Custom Instructions (optional)"
                                type="textarea"
                                value={qnaCustomInstructions}
                                onChange={(e) => setQnaCustomInstructions(e.target.value)}
                                placeholder="e.g. 'Focus on planets'"
                                id="qna-instruction"
                                as="textarea"
                            />
                            <button
                                onClick={() => handleSubmit('qna')}
                                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors duration-200"
                            >
                                Generate Questions
                            </button>
                            {questions && <QuestionDisplay questions={questions} />}
                        </AnimatedSection>
                    )}

                    {activeTab === 'content' && (
                        <AnimatedSection>
                            <h2 className="text-2xl font-semibold mb-4 dark:text-white">Generate Content</h2>
                            <InputComponent
                                label="Topic"
                                type="text"
                                value={contentTopic}
                                onChange={(e) => setContentTopic(e.target.value)}
                                placeholder="e.g. Photosynthesis"
                                id="content-topic"
                            />
                            <InputComponent
                                label="Select Content Type"
                                type="select"
                                value={contentType}
                                onChange={(e) => setContentType(e.target.value as 'Lesson Plan' | 'Flashcards')}
                                options={["Lesson Plan", "Flashcards"]}
                                id="content-type"
                            />
                            <button
                                onClick={() => handleSubmit('content')}
                                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors duration-200"
                            >
                                Generate Content
                            </button>
                            {content && <ContentDisplay content={content} contentType={contentType.toLowerCase().replace(' ', '_') as "lesson_plan" | "flashcards"} />}
                        </AnimatedSection>
                    )}

                    {activeTab === 'multimodal' && (
                        <AnimatedSection>
                            <h2 className="text-2xl font-semibold mb-4 dark:text-white">Solve Doubt With Image</h2>
                            <ImageUpload onImageUpload={handleImageUpload} />
                            <InputComponent
                                label="Describe what you want the AI to do"
                                type="textarea"
                                value={multimodalPrompt}
                                onChange={(e) => setMultimodalPrompt(e.target.value)}
                                placeholder="e.g. 'Explain the diagram in detail'"
                                id="multi-prompt"
                                as="textarea"
                            />
                            <InputComponent
                                label="Select Detail Level"
                                type="select"
                                value={multimodalDetailLevel}
                                onChange={(e) => setMultimodalDetailLevel(e.target.value)}
                                options={["Low", "Medium", "High"]}
                                id="multi-detail"
                            />

                            <button
                                onClick={() => handleSubmit('multimodal')}
                                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors duration-200"
                            >
                                Solve Doubt
                            </button>
                           {solvedDoubt && (
                                <div className="mt-4 bg-white dark:bg-dark-primary p-4 rounded shadow">
                                    <h3 className="text-xl font-semibold mb-2 dark:text-white">Solution</h3>
                                    <p className="mb-2 dark:text-white"><span className="font-medium dark:text-gray-400">Explanation:</span> {solvedDoubt.explanation}</p>
                                    {solvedDoubt.steps && (
                                        <div>
                                            <p className="mb-2 dark:text-white">
                                                <span className="font-medium dark:text-gray-400">Steps:</span>
                                            </p>
                                            <ul className="list-disc list-inside mb-2 dark:text-white">
                                                {solvedDoubt.steps.map((step, index) => (
                                                    <li key={index}> {step}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {solvedDoubt.additional_notes && (
                                        <p className="mb-2 dark:text-white"><span className="font-medium dark:text-gray-400">Additional Notes:</span> {solvedDoubt.additional_notes}</p>
                                    )}
                                </div>
                            )}
                        </AnimatedSection>
                    )}

                    {activeTab === 'document' && (
                        <AnimatedSection>
                            <h2 className="text-2xl font-semibold mb-4 dark:text-white">Generate Questions From Document</h2>
                            <InputComponent
                                label="Select Source Type"
                                type="select"
                                value={docSourceType}
                                onChange={(e) => setDocSourceType(e.target.value as 'pdf' | 'url' | 'text')}
                                options={["pdf", "url", "text"]}
                                id="doc-type"
                            />
                           {docSourceType === 'pdf' && (
                                <div className="mb-4">
                                   <label htmlFor="doc-pdf" className="block mb-2 text-sm font-medium dark:text-white">
                                           Upload PDF File
                                   </label>
                                   <input
                                       type="file"
                                       id="doc-pdf"
                                     onChange={handlePdfUpload}
                                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                     {docPdfPreview && (
                                        <div className="mt-2">
                                            <iframe src={docPdfPreview}
                                            title="PDF Preview"
                                            className="max-h-40  shadow rounded" />
                                          </div>
                                      )}
                                </div>
                             )}
                            {docSourceType === 'url' && (
                                <InputComponent
                                    label="Enter URL"
                                    type="text"
                                    value={docContent || ''}
                                    onChange={(e) => setDocContent(e.target.value)}
                                    placeholder="Enter URL"
                                    id="doc-url"
                                />
                            )}
                            {docSourceType === 'text' && (
                                <InputComponent
                                    label="Enter Text Content"
                                    type="textarea"
                                    value={docContent || ''}
                                    onChange={(e) => setDocContent(e.target.value)}
                                    placeholder="Enter Text"
                                    id="doc-text"
                                    as="textarea"

                                />

                            )}

                            <InputComponent
                                label="Number of Questions"
                                type="number"
                                value={docNumQuestions}
                                onChange={(e) => setDocNumQuestions(parseInt(e.target.value, 10))}
                                id="doc-number"
                            />
                            <InputComponent
                                label="Learning Objective (optional)"
                                type="text"
                                value={docLearningObjective}
                                onChange={(e) => setDocLearningObjective(e.target.value)}
                                placeholder="e.g. 'Key events'"
                                id="doc-objective"
                            />
                            <InputComponent
                                label="Select Difficulty Level (optional)"
                                type="select"
                                value={docDifficultyLevel}
                                onChange={(e) => setDocDifficultyLevel(e.target.value)}
                                options={["", "Easy", "Intermediate", "Hard"]}
                                id="doc-difficulty"
                            />
                            <button
                                onClick={() => handleSubmit('document')}
                                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors duration-200"
                            >
                                Generate Questions from Document
                            </button>
                            {questions && <QuestionDisplay questions={questions} />}
                        </AnimatedSection>
                    )}
                    {activeTab === 'youtube' && (
                        <AnimatedSection>
                            <h2 className="text-2xl font-semibold mb-4 dark:text-white">Generate Questions from YouTube</h2>
                            <InputComponent
                                label="Enter YouTube Video URL"
                                type="text"
                                value={ytUrl}
                                onChange={(e) => setYtUrl(e.target.value)}
                                placeholder="Enter Youtube Url"
                                id="yt-url"
                            />
                            <InputComponent
                                label="Number of Questions"
                                type="number"
                                value={ytNumQuestions}
                                onChange={(e) => setYtNumQuestions(parseInt(e.target.value, 10))}
                                id="yt-number"
                            />
                            <InputComponent
                                label="Select Question Type"
                                type="select"
                                value={ytQuestionType}
                                onChange={(e) => setYtQuestionType(e.target.value)}
                                options={["Multiple Choice", "Short Answer", "True/False", "Fill in the Blank"]}
                                id="yt-type"
                            />
                            <InputComponent
                                label="Custom Instructions (optional)"
                                type="textarea"
                                value={ytCustomInstructions}
                                onChange={(e) => setYtCustomInstructions(e.target.value)}
                                placeholder="e.g. 'Focus on key concepts'"
                                id="yt-instruction"
                                as="textarea"
                            />
                            <button
                                onClick={() => handleSubmit('youtube')}
                                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors duration-200"
                            >
                                Generate Questions from YouTube
                            </button>
                            {questions && <QuestionDisplay questions={questions} />}
                        </AnimatedSection>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Home;