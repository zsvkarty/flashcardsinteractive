import { useState } from 'react';
import { Flashcard } from './Flashcard';

interface FlashcardData {
  id: number;
  front: string;
  back: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

const initialCards: FlashcardData[] = [
  { id: 1, front: "Co je to spor o univerzálie?", back: "nevim" },
  { id: 2, front: "fuckscio?", back: "xdd" },
  { id: 3, front: "ye fuck them?", back: "ing" },
];

export const FlashcardDeck = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cards, setCards] = useState<FlashcardData[]>(initialCards);
  const [isReviewingHard, setIsReviewingHard] = useState(false);
  const [showReviewPrompt, setShowReviewPrompt] = useState(false);

  // Get hard cards for review
  const hardCards = cards.filter(card => card.difficulty === 'hard');
  
  // Current set of cards being used (either all cards or hard cards)
  const currentCards = isReviewingHard ? hardCards : cards;

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % currentCards.length;
    if (nextIndex === 0 && !isReviewingHard && hardCards.length > 0) {
      // Show prompt instead of automatically starting review
      setShowReviewPrompt(true);
    } else {
      setCurrentIndex(nextIndex);
    }
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + currentCards.length) % currentCards.length);
  };

  const handleDifficultySelect = (difficulty: 'easy' | 'medium' | 'hard') => {
    setCards(prevCards => {
      const newCards = [...prevCards];
      const cardToUpdate = isReviewingHard 
        ? newCards.find(card => card.id === hardCards[currentIndex].id)
        : newCards[currentIndex];
      if (cardToUpdate) {
        cardToUpdate.difficulty = difficulty;
      }
      return newCards;
    });
    handleNext();
  };

  // Calculate progress
  const progress = {
    total: cards.length,
    reviewed: cards.filter(card => card.difficulty).length,
    easy: cards.filter(card => card.difficulty === 'easy').length,
    medium: cards.filter(card => card.difficulty === 'medium').length,
    hard: cards.filter(card => card.difficulty === 'hard').length,
  };

  // Handle restart
  const handleRestart = () => {
    setIsReviewingHard(false);
    setCurrentIndex(0);
    setShowReviewPrompt(false);
    setCards(cards.map(card => ({ ...card, difficulty: undefined })));
  };

  // Handle starting hard cards review
  const handleStartHardReview = () => {
    setIsReviewingHard(true);
    setShowReviewPrompt(false);
    setCurrentIndex(0);
  };

  // Handle skipping hard cards review
  const handleSkipHardReview = () => {
    setShowReviewPrompt(false);
    setCurrentIndex(0);
  };

  // Show review prompt
  if (showReviewPrompt) {
    return (
      <div className="flex flex-col items-center gap-8 p-8">
        <div className="text-2xl font-bold text-gray-700 bg-white px-8 py-6 rounded-xl shadow-sm text-center">
          <p>You've completed the deck! 🎉</p>
          <p className="text-lg mt-2">You marked {hardCards.length} cards as hard.</p>
          <p className="text-lg mt-2">Would you like to review them?</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleStartHardReview}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium shadow-sm"
          >
            Review Hard Cards
          </button>
          <button
            onClick={handleSkipHardReview}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 font-medium shadow-sm"
          >
            Skip Review
          </button>
        </div>
        <button
          onClick={handleRestart}
          className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
        >
          Start New Session
        </button>
      </div>
    );
  }

  // Show completion message if done reviewing hard cards
  if (isReviewingHard && currentIndex === 0 && hardCards.length === 0) {
    return (
      <div className="flex flex-col items-center gap-8 p-8">
        <div className="text-2xl font-bold text-gray-700 bg-white px-8 py-4 rounded-xl shadow-sm">
          🎉 Congratulations! You've completed all cards including hard ones!
        </div>
        <button
          onClick={handleRestart}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium shadow-sm"
        >
          Start New Session
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      {/* Mode indicator */}
      {isReviewingHard && (
        <div className="text-lg font-medium text-red-600 bg-red-50 px-6 py-2 rounded-full">
          Reviewing Hard Cards
        </div>
      )}

      {/* Progress bar */}
      <div className="w-full max-w-2xl">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Progress: {progress.reviewed} / {progress.total} cards reviewed
          </span>
          <span className="text-sm font-medium text-gray-700">
            {Math.round((progress.reviewed / progress.total) * 100)}%
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="flex h-full">
            <div 
              className="bg-green-500 h-full transition-all duration-300"
              style={{ width: `${(progress.easy / progress.total) * 100}%` }}
            />
            <div 
              className="bg-yellow-500 h-full transition-all duration-300"
              style={{ width: `${(progress.medium / progress.total) * 100}%` }}
            />
            <div 
              className="bg-red-500 h-full transition-all duration-300"
              style={{ width: `${(progress.hard / progress.total) * 100}%` }}
            />
          </div>
        </div>
        <div className="flex justify-between mt-1 text-xs text-gray-600">
          <span>Easy: {progress.easy}</span>
          <span>Medium: {progress.medium}</span>
          <span>Hard: {progress.hard}</span>
        </div>
      </div>

      <div className="text-2xl font-bold text-gray-700 bg-white px-6 py-2 rounded-full shadow-sm">
        Card {currentIndex + 1} of {currentCards.length}
      </div>
      
      <div className="perspective-1000">
        <Flashcard
          front={currentCards[currentIndex].front}
          back={currentCards[currentIndex].back}
          onDifficultySelect={handleDifficultySelect}
        />
      </div>
      
      <div className="flex gap-4">
        <button
          onClick={handlePrevious}
          className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 font-medium shadow-sm"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 font-medium shadow-sm"
        >
          Next
        </button>
      </div>

      {/* Restart button */}
      <button
        onClick={handleRestart}
        className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
      >
        Restart Session
      </button>
    </div>
  );
}; 