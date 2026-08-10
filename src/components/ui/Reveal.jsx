import { useScrollReveal } from '../../hooks/useScrollReveal.js';

/**
 * Fades and slides its children up as they enter the viewport.
 *
 * @param {object} props
 * @param {number} [props.delay=0] - Stagger in ms, for grids of cards.
 * @param {keyof JSX.IntrinsicElements} [props.as='div'] - Element to render.
 */
export function Reveal({ delay = 0, as: Tag = 'div', className = '', children, ...rest }) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <Tag
      ref={ref}
      className={`reveal ${isVisible ? 'is-visible' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default Reveal;
