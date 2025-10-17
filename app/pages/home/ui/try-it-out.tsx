import { Container } from '@/shared/components/Container'
import { useState } from 'react'

export const TryItOut = () => {
  const [question, setQuestion] = useState('')

  const sampleQuestions = [
    'How many people earned over 1 million euros in 2023?',
    'What was the average income in Central Finland?',
    'Show me how many high-earners in each region?',
    'In what Region do most high-earners live?',
  ]

  const handleQuestionClick = (selectedQuestion: string) => {
    setQuestion(selectedQuestion)
  }

  return (
    <Container className="pt-8 pb-8">
      <div className="mx-auto prose prose-lg max-w-none prose-slate dark:prose-invert">
        <h2 id="try-it-out">Try It Out</h2>
        <p>
          I got a database with Finnish high-earner data. ( It's public data in
          Finland, can You believe it? )
        </p>
        <p>
          It's 70 000 people, who earns over 100 000 euros per year in 2023.
        </p>
        <div>
          <strong>Try asking questions like:</strong>
          <ul>
            {sampleQuestions.map((q, index) => (
              <li key={index}>
                <button
                  type="button"
                  onClick={() => handleQuestionClick(q)}
                  className="cursor-pointer text-left underline-offset-4 transition-colors hover:text-indigo-600 hover:underline dark:hover:text-indigo-400"
                >
                  {q}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <form action="#" className="mt-10 grid grid-cols-1 gap-y-8">
          <div className="col-span-full">
            <label
              htmlFor="question-textarea"
              className="block text-sm/6 font-medium text-gray-900 dark:text-white"
            >
              Ask your question about Finnish high-earner data
            </label>
            <div className="mt-2">
              <textarea
                id="question-textarea"
                name="question"
                rows={3}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Enter your question here..."
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
              />
            </div>
            <p className="mt-3 text-sm/6 text-gray-600 dark:text-gray-400">
              Click on any sample question above or type your own question.
            </p>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                className="cursor-pointer rounded-md bg-indigo-600 px-6 py-3 text-center text-base font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
              >
                Get the data
              </button>
            </div>
          </div>
        </form>
      </div>
    </Container>
  )
}
