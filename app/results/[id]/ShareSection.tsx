'use client'

import { useState } from 'react'

export default function ShareSection({ url }: { url: string }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent('五大要素で知る、あなたの性格 — ビッグファイブ診断')}`

  return (
    <div style={{ marginTop: '48px', padding: '24px', background: '#F0F0EC', borderRadius: '8px' }}>
      <p style={{ fontSize: '14px', color: '#5F5E5A', marginBottom: '16px', textAlign: 'center' }}>
        結果をシェアする
      </p>
      <div style={{ display: 'flex', alignItems: 'center', background: '#fff', borderRadius: '4px', padding: '10px 12px', gap: '8px', marginBottom: '12px', border: '0.5px solid #E8E8E4' }}>
        <span style={{ fontSize: '12px', color: '#5F5E5A', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {url}
        </span>
        <button
          onClick={handleCopy}
          style={{ fontSize: '12px', color: '#1D9E75', border: '1px solid #1D9E75', borderRadius: '3px', padding: '4px 10px', background: 'transparent', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}
        >
          {copied ? '✓ コピーしました' : 'コピー'}
        </button>
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
        <a href={lineUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '8px 20px', background: '#06C755', color: '#fff', borderRadius: '4px', fontSize: '13px', fontWeight: '500', textDecoration: 'none' }}>
          LINE
        </a>
        <a href={twitterUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '8px 20px', background: '#000', color: '#fff', borderRadius: '4px', fontSize: '13px', fontWeight: '500', textDecoration: 'none' }}>
          X
        </a>
      </div>
    </div>
  )
}