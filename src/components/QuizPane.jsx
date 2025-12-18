import React, { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import clsx from 'clsx';

export default function QuizPane({ quiz, onComplete }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [quizComplete, setQuizComplete] = useState(false);

    const question = quiz.questions[currentQuestion];
    const isCorrect = selectedAnswer === question?.correctIndex;
    const score = answers.filter((a, i) => a === quiz.questions[i].correctIndex).length;
    const percentage = Math.round((score / quiz.questions.length) * 100);

    const handleSelect = (index) => {
        if (showResult) return;
        setSelectedAnswer(index);
    };

    const handleCheck = () => {
        if (selectedAnswer === null) return;
        setShowResult(true);
        setAnswers([...answers, selectedAnswer]);
    };

    const handleNext = () => {
        if (currentQuestion < quiz.questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setShowResult(false);
        } else {
            setQuizComplete(true);
            if (percentage >= 70) {
                onComplete?.();
            }
        }
    };

    const handleRetry = () => {
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setShowResult(false);
        setAnswers([]);
        setQuizComplete(false);
    };

    if (quizComplete) {
        const passed = percentage >= 70;
        return (
            <div className="h-full flex flex-col items-center justify-center p-8 bg-slate-50">
                <div className={clsx(
                    "w-32 h-32 rounded-full flex items-center justify-center mb-6",
                    passed ? "bg-green-100" : "bg-red-100"
                )}>
                    {passed ? (
                        <CheckCircle2 size={64} className="text-green-500" />
                    ) : (
                        <XCircle size={64} className="text-red-500" />
                    )}
                </div>
                
                <h2 className="text-3xl font-bold text-slate-900 mb-2">
                    {passed ? "Quiz Passed! 🎉" : "Keep Practicing!"}
                </h2>
                
                <p className="text-gray-600 mb-6">
                    You scored {score} out of {quiz.questions.length} ({percentage}%)
                </p>

                <div className="flex gap-4">
                    {!passed && (
                        <button
                            onClick={handleRetry}
                            className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                        >
                            <RotateCcw size={18} />
                            Try Again
                        </button>
                    )}
                    <button
                        onClick={() => onComplete?.()}
                        className="flex items-center gap-2 px-6 py-3 bg-presuniv-maroon text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                    >
                        Continue
                        <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col bg-slate-50">
            {/* Progress */}
            <div className="p-4 bg-white border-b">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">
                        Question {currentQuestion + 1} of {quiz.questions.length}
                    </span>
                    <span className="text-sm font-bold text-presuniv-maroon">
                        {Math.round(((currentQuestion) / quiz.questions.length) * 100)}% Complete
                    </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-presuniv-maroon transition-all duration-300"
                        style={{ width: `${((currentQuestion + (showResult ? 1 : 0)) / quiz.questions.length) * 100}%` }}
                    />
                </div>
            </div>

            {/* Question */}
            <div className="flex-1 overflow-y-auto p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-8">
                    {question.question}
                </h2>

                <div className="space-y-3">
                    {question.options.map((option, index) => {
                        const isSelected = selectedAnswer === index;
                        const isCorrectAnswer = index === question.correctIndex;
                        
                        let bgColor = "bg-white hover:bg-gray-50";
                        let borderColor = "border-gray-200";
                        let textColor = "text-slate-900";

                        if (showResult) {
                            if (isCorrectAnswer) {
                                bgColor = "bg-green-50";
                                borderColor = "border-green-500";
                                textColor = "text-green-700";
                            } else if (isSelected && !isCorrectAnswer) {
                                bgColor = "bg-red-50";
                                borderColor = "border-red-500";
                                textColor = "text-red-700";
                            }
                        } else if (isSelected) {
                            bgColor = "bg-blue-50";
                            borderColor = "border-blue-500";
                            textColor = "text-blue-700";
                        }

                        return (
                            <button
                                key={index}
                                onClick={() => handleSelect(index)}
                                disabled={showResult}
                                className={clsx(
                                    "w-full p-4 rounded-xl border-2 text-left transition-all",
                                    bgColor, borderColor, textColor,
                                    !showResult && "cursor-pointer"
                                )}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={clsx(
                                        "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
                                        isSelected || (showResult && isCorrectAnswer)
                                            ? "bg-current text-white"
                                            : "bg-gray-100 text-gray-600"
                                    )}>
                                        {String.fromCharCode(65 + index)}
                                    </div>
                                    <span className="font-medium">{option}</span>
                                    {showResult && isCorrectAnswer && (
                                        <CheckCircle2 size={20} className="ml-auto text-green-500" />
                                    )}
                                    {showResult && isSelected && !isCorrectAnswer && (
                                        <XCircle size={20} className="ml-auto text-red-500" />
                                    )}
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Explanation */}
                {showResult && (
                    <div className={clsx(
                        "mt-6 p-4 rounded-xl",
                        isCorrect ? "bg-green-50 border border-green-200" : "bg-amber-50 border border-amber-200"
                    )}>
                        <div className="flex items-center gap-2 mb-2">
                            {isCorrect ? (
                                <CheckCircle2 size={20} className="text-green-600" />
                            ) : (
                                <XCircle size={20} className="text-amber-600" />
                            )}
                            <span className={clsx(
                                "font-bold",
                                isCorrect ? "text-green-700" : "text-amber-700"
                            )}>
                                {isCorrect ? "Correct!" : "Not quite right"}
                            </span>
                        </div>
                        <p className={clsx(
                            "text-sm",
                            isCorrect ? "text-green-600" : "text-amber-600"
                        )}>
                            {question.explanation}
                        </p>
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="p-4 bg-white border-t">
                {!showResult ? (
                    <button
                        onClick={handleCheck}
                        disabled={selectedAnswer === null}
                        className={clsx(
                            "w-full py-3 rounded-lg font-bold transition-colors",
                            selectedAnswer !== null
                                ? "bg-presuniv-maroon text-white hover:bg-red-700"
                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        )}
                    >
                        Check Answer
                    </button>
                ) : (
                    <button
                        onClick={handleNext}
                        className="w-full py-3 bg-presuniv-navy text-white rounded-lg font-bold hover:bg-blue-900 transition-colors flex items-center justify-center gap-2"
                    >
                        {currentQuestion < quiz.questions.length - 1 ? "Next Question" : "See Results"}
                        <ArrowRight size={18} />
                    </button>
                )}
            </div>
        </div>
    );
}
