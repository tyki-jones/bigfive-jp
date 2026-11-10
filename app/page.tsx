import Link from 'next/link'

export default function Home() {
  return (
    <main style={{ flex: 1, background: '#FAFAF8', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ maxWidth: '480px', width: '100%', textAlign: 'center' }}>
        <h1 style={{ fontSize: '36px', fontWeight: '500', color: '#2C2C2A', lineHeight: '1.4', marginBottom: '16px', textAlign: 'center' }}>
          <ruby>五大要素<rt style={{ fontSize: '11px', fontWeight: '400', letterSpacing: '0.05em' }}>ビッグファイブ</rt></ruby>で知る<br />あなたの性格
        </h1>
        <p style={{ fontSize: '15px', color: '#5F5E5A', lineHeight: '1.8', marginBottom: '40px' }}>
          科学的根拠に基づいた60問の質問で、あなたの性格を解き明かします。日本人データをもとにした詳細な分析をご覧いただけます。
        </p>
        <Link
          href="/survey"
          style={{
            display: 'inline-block',
            padding: '14px 36px',
            background: '#1D9E75',
            color: '#fff',
            borderRadius: '4px',
            fontSize: '15px',
            fontWeight: '500',
            textDecoration: 'none',
          }}
        >
          診断を始める →
        </Link>
        <p style={{ fontSize: '12px', color: '#B4B2A9', marginTop: '16px' }}>
          所要時間：約10分
        </p>
      </div>
    </main>
  )
}