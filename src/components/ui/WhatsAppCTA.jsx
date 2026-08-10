import Button from './Button.jsx';
import Icon from './Icon.jsx';
import { buildWhatsAppLink } from '../../lib/whatsapp.js';

/**
 * A Button pre-wired to open WhatsApp with a contextual message.
 * Every "book / join" action on the site funnels through here.
 *
 * @param {object} props
 * @param {string} props.message - Pre-filled chat text.
 * @param {boolean} [props.showIcon=true]
 */
export function WhatsAppCTA({ message, children, showIcon = true, ...rest }) {
  return (
    <Button href={buildWhatsAppLink(message)} external {...rest}>
      {showIcon && <Icon name="whatsapp" size={18} />}
      {children}
    </Button>
  );
}

export default WhatsAppCTA;
