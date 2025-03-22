import React from 'react'
import { FlashcardDeck } from './components/FlashcardDeck'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">Flashcards App</h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-12">
        <FlashcardDeck />
      </main>
    </div>
  )
}

export default App 