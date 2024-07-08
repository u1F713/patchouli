import { createEffect, createSignal, onMount, type Component, For } from 'solid-js'
import styles from './AccentColor.module.css'

const AccentColorPicker: Component = () => {
  const colors = ['red', 'green', 'yellow', 'blue']
  const [accentColor, setAccentColor] = createSignal('')

  onMount(() => {
    const localAColor = localStorage.getItem('css-accent-color')

    if (localAColor) setAccentColor(localAColor)
  })

  createEffect(() => {
    localStorage.setItem('css-accent-color', accentColor())
    document.documentElement.style.setProperty('--accent-color', accentColor())
  })

  return (
    <form class={styles.AccentColor}>
      <For each={colors}>{color => (
        <span>
          <input
            type="radio"
            name="accent-color"
            value={color}
            id={color}
            onChange={({ currentTarget }) =>
              setAccentColor(`var(--${currentTarget.value})`)
            }
          />
          <label for={color} style={{ background: `var(--${color})` }} />
        </span>
      )}</For>
    </form>
  )
}

export default AccentColorPicker
