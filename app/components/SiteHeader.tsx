import Link from 'next/link'

// Height of the site header. Other sticky elements (e.g. the survey progress bar) sit below it.
export const SITE_HEADER_HEIGHT = 48

// Shown at the top of every page (rendered from the root layout).
// "BIG FIVE JP" in the top left always links back to the home page.
export default function SiteHeader() {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 20,
        height: `${SITE_HEADER_HEIGHT}px`,
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        background: '#FAFAF8',
      }}
    >
      <Link
        href="/"
        aria-label="BIG FIVE JP ホームへ"
        style={{
          fontSize: '12px',
          letterSpacing: '0.1em',
          color: '#5F5E5A',
          textDecoration: 'none',
          fontWeight: 500,
        }}
      >
        BIG FIVE JP
      </Link>
    </header>
  )
}
