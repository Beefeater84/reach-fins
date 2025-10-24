import { useEffect } from 'react'

/**
 * Custom hook to handle automatic scrolling to anchor elements
 * when the page loads with a hash or when the hash changes
 */
export const useAnchorScroll = () => {
  useEffect(() => {
    const scrollToAnchor = () => {
      const hash = window.location.hash

      if (hash) {
        // Remove the # symbol to get the element ID
        const elementId = hash.substring(1)
        const targetElement = document.getElementById(elementId)

        if (targetElement) {
          // Small delay to ensure DOM is fully rendered
          setTimeout(() => {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            })
          }, 100)
        }
      }
    }

    // Handle initial page load
    scrollToAnchor()

    // Handle hash changes (when clicking anchor links)
    const handleHashChange = () => {
      scrollToAnchor()
    }

    window.addEventListener('hashchange', handleHashChange)

    // Cleanup event listener
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])
}
