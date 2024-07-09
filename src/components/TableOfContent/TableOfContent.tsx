import { MarkdownHeading } from 'astro'
import { Component, createSignal, onCleanup, onMount } from 'solid-js'

interface TOCProps {
  contentDOMId: string
  headings: MarkdownHeading[]
}

function getElement(container: Document | HTMLElement, elementId: string) {
  const elementTarget = container.querySelector<HTMLElement>(`#${elementId}`)
  return elementTarget
    ? elementTarget
    : new Error(`Fail quering element ${elementId}`)
}

const TableOfContent: Component<TOCProps> = props => {
  const [activeHeading, setActiveHeading] = createSignal<string>()

  onMount(() => {
    const containerTarget = getElement(document, props.contentDOMId)
    if (containerTarget instanceof Error) return

    const documentTargets = props.headings.map(({ slug }) =>
      getElement(containerTarget, slug)
    )
    const hTargets = documentTargets.filter(_ => _ instanceof HTMLElement)
    const trackActiveHeading = () =>
      setActiveHeading(
        hTargets.findLast(h => h.getBoundingClientRect().top < 30)?.id
      )

    trackActiveHeading()
    window.addEventListener('scroll', trackActiveHeading)
    onCleanup(() => window.removeEventListener('scroll', trackActiveHeading))
  })

  return (
    <div>{props.headings.find(h => h.slug === activeHeading())?.text}</div>
  )
}

export default TableOfContent
