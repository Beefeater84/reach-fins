import { getReachFinns } from '@/entities/reach-finns'
import { Container } from '@/shared/components/Container'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRef, useState } from 'react'
import { AvailableData } from './available-data'
import { ShowResults } from './show-results'

export const TryItOut = () => {
  const [question, setQuestion] = useState('')
  const queryClient = useQueryClient()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const getReachFinnsRequest = useMutation({
    mutationFn: getReachFinns,
    onSuccess: (data) => {
      queryClient.setQueryData(['getReachFinns'], data)
    },
    onError: (error) => {
      console.error('Error fetching data:', error)
    },
  })

  // Check if we have an error response from the API
  const hasErrorResponse =
    getReachFinnsRequest.data?.error === 'Failed to fetch data from database'

  const sampleQuestions = [
    'How many people earned over 1 million euros?',
    'Who are the youngest millionaires? Show people under 35 with highest earnings',
    'Who pays the highest tax rates and how much do they earn?',
    'Who received the biggest tax refunds and how much did they earn?',
    'Show people from Uusimaa province ranked in top 100 nationally',
  ]

  const handleSubmit = () => {
    if (question.trim()) {
      // Reset any previous errors and data before new request
      getReachFinnsRequest.reset()
      getReachFinnsRequest.mutate(question.trim())
    }
  }

  const handleQuestionClick = (selectedQuestion: string) => {
    setQuestion(selectedQuestion)
    // Set focus to textarea after setting the question
    setTimeout(() => {
      textareaRef.current?.focus()
    }, 0)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault() // Prevent new line
      handleSubmit()
    }
  }

  return (
    <>
      <Container className="pt-8 pb-8">
        <div className="mx-auto prose prose-lg max-w-none prose-slate dark:prose-invert">
          <h2 id="try-it-out">Try It Out</h2>
          <p>
            I got a database with Finnish high-earner data. ( It's public data
            in Finland, can You believe it? )
          </p>
          <p>
            It's 70 000 people, who earns over 100 000 euros per year in 2023.
          </p>

          <div className="rounded-lg bg-slate-100/50 p-4 dark:bg-slate-800/30">
            <strong className="text-indigo-600 dark:text-indigo-400">
              Try asking questions like:
            </strong>
            <ul className="mt-3 list-none space-y-2">
              {sampleQuestions.map((q, index) => (
                <li key={index}>
                  <button
                    type="button"
                    onClick={() => handleQuestionClick(q)}
                    className="group flex w-full cursor-pointer items-center gap-2 rounded-md p-2 text-left text-sm transition-all hover:bg-indigo-50 hover:text-indigo-700 dark:hover:bg-indigo-900/30 dark:hover:text-indigo-300"
                  >
                    <span className="flex-shrink-0 text-indigo-500 dark:text-indigo-400">
                      →
                    </span>
                    <span className="group-hover:underline">{q}</span>
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
                Ask your question about Finnish high-earner data. ( It can't
                show you average income or group by province yet ). So try to
                find your boss.
              </label>
              <div className="mt-2">
                <textarea
                  ref={textareaRef}
                  id="question-textarea"
                  name="question"
                  rows={3}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter your question here..."
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                />
              </div>
              <p className="mt-3 text-sm/6 text-gray-600 dark:text-gray-400">
                Click on any sample question above or type your own question.
                Press Enter to submit.
              </p>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleSubmit}
                  type="button"
                  disabled={!question.trim() || getReachFinnsRequest.isPending}
                  className="cursor-pointer rounded-md bg-indigo-600 px-6 py-3 text-center text-base font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500 dark:disabled:hover:bg-indigo-500"
                >
                  {getReachFinnsRequest.isPending
                    ? 'Loading...'
                    : 'Get the data'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </Container>

      {/* Error Message */}
      {hasErrorResponse && (
        <Container className="pt-4 pb-8">
          <div className="rounded-lg border border-red-200 bg-red-50 px-6 py-4 dark:border-red-800 dark:bg-red-900/20">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-500 dark:text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-red-800 dark:text-red-200">
                  Unable to Extract Data
                </h4>
                <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                  <p>
                    We couldn't extract this information from our database. This
                    might be because we don't support this type of query yet.
                  </p>
                  <p className="mt-2 font-medium">
                    Please try a different question or select one from the
                    suggested options above.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      )}

      {!hasErrorResponse && (
        <ShowResults isLoading={getReachFinnsRequest.isPending} />
      )}

      <AvailableData />
    </>
  )
}
