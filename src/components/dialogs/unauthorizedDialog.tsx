import { Dialog, type DialogProps } from '@/components/dialogs/dialog/dialog'
import { LoginLink } from '@/components/links/loginLink'
import { RegisterLink } from '@/components/links/registerLink'

export const UnauthorizedDialog = ({ close, ...restProps }: DialogProps) => (
  <Dialog aria-label='Unauthorized' close={close} {...restProps}>
    <p>
      Only authorized user can create, like, dislike & add card to favorites.
    </p>
    <LoginLink onClick={close} />
    <RegisterLink onClick={close} />
  </Dialog>
)
