import Link from 'next/link'

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', background: '#FAFAF8', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ maxWidth: '480px', width: '100%', textAlign: 'center' }}>
        <p style={{ fontSize: '12px', letterSpacing: '0.1em', color: '#888', marginBottom: '24px' }}>
          BIG FIVE JP
        </p>
        <h1 style={{ fontSize: '36px', fontWeight: '500', color: '#2C2C2A', lineHeight: '1.2', marginBottom: '16px' }}>
          あなたの<br />パーソナリティを知る
        </h1>
        <p style={{ fontSize: '15px', color: '#5F5E5A', lineHeight: '1.8', marginBottom: '40px' }}>
          科学的根拠に基づいた60問の質問で、あなたの性格を深く分析します。日本人データをもとにした詳細な結果をご覧いただけます。
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