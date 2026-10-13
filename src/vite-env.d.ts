/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Production origin used for canonical URLs and Open Graph tags. */
  readonly VITE_SITE_URL?: string
  /** Public business email shown on the contact page and footer (only when set). */
  readonly VITE_CONTACT_EMAIL?: string
  /**
   * Optional HTTP endpoint that accepts POST JSON project-inquiry submissions.
   * When unset, the contact form shows an honest "not connected" state.
   */
  readonly VITE_CONTACT_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
