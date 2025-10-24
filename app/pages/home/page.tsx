import { useAnchorScroll } from '@/shared/hooks/useAnchorScroll'
import Header from '@/widgets/header'
import { ProblemDescription } from './ui/problem'
import { ProjectDescription } from './ui/project-description'
import { Stages } from './ui/stages'
import { TryItOut } from './ui/try-it-out'

export function Page() {
  // Enable automatic scrolling to anchors on page load and navigation
  useAnchorScroll()

  return (
    <>
      <Header />
      <main>
        <ProjectDescription />
        <ProblemDescription />
        <Stages />
        <TryItOut />
      </main>
    </>
  )
}
