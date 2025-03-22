import { useState } from 'react';

interface FlashcardProps {
  front: string;
  back: string;
  onDifficultySelect: (difficulty: 'easy' | 'medium' | 'hard') => void;
}

export const Flashcard = ({ front, back, onDifficultySelect }: FlashcardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(true);
  };

  return (
    <div className="relative">
      <div
        className="relative w-96 h-56 cursor-pointer"
        onClick={!isFlipped ? handleFlip : undefined}
      >
        <div
          className={`absolute w-full h-full transition-transform duration-500 ${
            isFlipped ? 'rotate-y-180' : ''
          } transform-style-preserve-3d`}
        >
          {/* Front of card */}
          <div className="absolute w-full h-full bg-white rounded-xl shadow-lg p-6 backface-hidden flex items-center justify-center">
            <p className="text-xl text-center font-medium text-gray-800">{front}</p>
          </div>
          
          {/* Back of card */}
          <div className="absolute w-full h-full bg-blue-50 rounded-xl shadow-lg p-6 backface-hidden rotate-y-180 flex items-center justify-center">
            <p className="text-xl text-center font-medium text-gray-800">{back}</p>
          </div>
        </div>
      </div>

      {/* Difficulty buttons - only show when card is flipped */}
      {isFlipped && (
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => {
              onDifficultySelect('hard');
              setIsFlipped(false);
            }}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium shadow-sm"
          >
            Hard
          </button>
          <button
            onClick={() => {
              onDifficultySelect('medium');
              setIsFlipped(false);
            }}
            className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-200 font-medium shadow-sm"
          >
            Medium
          </button>
          <button
            onClick={() => {
              onDifficultySelect('easy');
              setIsFlipped(false);
            }}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 font-medium shadow-sm"
          >
            Easy
          </button>
        </div>
      )}
    </div>
  );
}; 