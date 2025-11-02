import { Container } from '@/shared/components/Container'

export const ProblemDescription = () => {
  return (
    <div>
      <Container className="pt-8 pb-8">
        <div className="mx-auto prose prose-lg max-w-none prose-slate dark:prose-invert">
          <h2 id="problem-description">
            But GPT knows the answers, what is the problem?
          </h2>
          <p>
            Yes, GPT knows the answers to the questions it has been trained on.
            But your company's data is different.{' '}
            <strong>It wasn't trained on it.</strong>
          </p>
          <ul>
            <li>
              <strong>Any company's database exceeds 1,000,000 tokens</strong> -
              GPT cannot read and analyze it in a single request.
            </li>
            <li>
              <strong>GPT doesn't have current data</strong> - it was trained on
              something. It takes everything from its memory, not from your
              company's database.
            </li>
            <li>
              <strong>GPT has no priorities</strong> - for it, your company's
              data is as important as advice from an internet guru on a forum.
              Therefore, it will often suggest incorrect data.
            </li>
          </ul>
          <p>
            <em>These are the problems we need to solve.</em>
          </p>
        </div>
      </Container>
    </div>
  )
}
