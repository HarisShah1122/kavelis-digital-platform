import type { RenderedEmail } from '../emails/client'
import { getMailConfig, getTransport, signatureAttachment, signatureSrc, type SignatureKind } from './mailer'

interface DeliverOptions {
  signature: SignatureKind
  from: string
  /** Team inbox that receives the notification. */
  inbox: string
  /** Person who submitted the form. */
  submitter: { name: string; email: string }
  render: (ctx: { siteUrl: string; signatureSrc: string }) => { notification: RenderedEmail; confirmation: RenderedEmail }
}

/**
 * Sends the team notification first — that one must succeed, or the form
 * reports an error so nothing is silently lost. The confirmation to the
 * submitter goes second; if it fails (for example a mistyped address), the
 * enquiry still counts as delivered and the failure is logged.
 */
export async function deliver({ signature, from, inbox, submitter, render }: DeliverOptions): Promise<void> {
  const { siteUrl } = getMailConfig()
  const attachment = signatureAttachment(signature)
  const { notification, confirmation } = render({ siteUrl, signatureSrc: signatureSrc(signature, attachment !== null, siteUrl) })
  const attachments = attachment ? [attachment] : []
  const transport = getTransport()

  await transport.sendMail({
    from,
    to: inbox,
    replyTo: { name: submitter.name, address: submitter.email },
    subject: notification.subject,
    html: notification.html,
    text: notification.text,
    attachments,
  })

  try {
    await transport.sendMail({
      from,
      to: { name: submitter.name, address: submitter.email },
      replyTo: inbox,
      subject: confirmation.subject,
      html: confirmation.html,
      text: confirmation.text,
      attachments,
    })
  } catch (error) {
    console.error('[mail] confirmation to submitter failed', error)
  }
}
