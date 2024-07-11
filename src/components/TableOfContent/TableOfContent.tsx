import { MarkdownHeading } from 'astro'
import {
  Component,
  createSelector,
  createSignal,
  For,
  onCleanup,
  onMount
} from 'solid-js'
import styles from './TableOfContent.module.css'

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
  const isActive = createSelector(activeHeading)

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
    <aside>
      <h3 class={styles.heading}>In this article</h3>
      <ul class={styles.TableOfContent}>
        <For each={props.headings}>
          {({ slug, text }) => (
            <li data-current={isActive(slug)}>
              <a href={`#${slug}`}>{text}</a>
            </li>
          )}
        </For>
      </ul>
    </aside>
  )
}

export default TableOfContent
