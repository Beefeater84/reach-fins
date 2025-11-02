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
            It allows you to get the data your company needs by simply asking
            for it. <strong>No need for individual dashboards</strong> for
            marketing, sales, and other employees.
          </p>
          <p>
            Everyone has different access rights and requests what they need:
          </p>
          <ul>
            <li>
              <strong>Marketing</strong> need data on leads and conversions
            </li>
            <li>
              <strong>Sales</strong> need data on customers and their purchases
            </li>
            <li>
              <strong>Finance</strong> need data on revenue and expenses
            </li>
          </ul>
          <p>
            <strong>
              AI processes requests and builds the necessary tables and charts
              on the fly
            </strong>
            , without the need to create and maintain dozens of separate
            reports.
          </p>
          <p>
            This saves time and resources, allowing employees to focus on{' '}
            <em>data analysis and decision-making</em> rather than report
            preparation.
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
