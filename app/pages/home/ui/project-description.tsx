import { Container } from '@/shared/components/Container'

export const ProjectDescription = () => {
  return (
    <div className="bg-slate-800/80">
      <Container className="pt-8 pb-8">
        <div className="mx-auto prose prose-lg max-w-none prose-slate dark:prose-invert">
          <h2 id="project-description">Project Description</h2>
          <p>
            An experiment to build a{' '}
            <strong>next-generation SaaS platform</strong> powered by AI.
          </p>
          <p>
            Where users can get any data they need using{' '}
            <strong>natural language</strong> queries - no complex interfaces or
            technical knowledge required.
          </p>
          <div className="mt-8">
            <video
              className="w-full rounded-lg shadow-lg"
              controls
              preload="metadata"
            >
              <source src="/project-desc.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="not-prose mt-8 text-center">
            <a
              href="#try-it-out"
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm transition-colors duration-200 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
            >
              Try it out
            </a>
          </div>
        </div>
      </Container>
    </div>
  )
}
