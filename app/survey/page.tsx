'use client'

import { useEffect, useRef, useState } from 'react'
import { supabase } from '../lib/supabase'
import { TRAITS, TRAIT_LABELS_JP } from '../lib/config'
import styles from './survey.module.css'
import { useRouter } from 'next/navigation'
import { calculateScores, saveResponse } from '../lib/scoring'
import { SITE_HEADER_HEIGHT } from '../components/SiteHeader'

type Question = {
  id: number
  text_jp: string
  trait: string
  reverse_scored: boolean
}

type Answers = Record<number, number>

const TRAITS_ORDER = ['extraversion', 'neuroticism', 'openness', 'conscientiousness', 'agreeableness']

function organizeQuestions(questions: Question[]): Question[][] {
  const byTrait: Record<string, Question[]> = {}
  TRAITS_ORDER.forEach(t => { byTrait[t] = [] })
  questions.forEach(q => {
    if (byTrait[q.trait]) byTrait[q.trait].push(q)
  })

  const pages: Question[][] = []
  for (let page = 0; page < 6; page++) {
    const pageQuestions: Question[] = []
    TRAITS_ORDER.forEach(trait => {
      const traitQuestions = byTrait[trait]
      const start = page * 2
      pageQuestions.push(...traitQuestions.slice(start, start + 2))
    })
    pages.push(pageQuestions)
  }
  return pages
}

const BUBBLE_SIZE_CLASSES = ['bubbleXl', 'bubbleLg', 'bubbleMd', 'bubbleSm', 'bubbleMd', 'bubbleLg', 'bubbleXl']

// Auto-scroll after answering: short and snappy.
const AUTO_SCROLL_MS = 220
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

// Animates window scroll by `distance` px. Returns a function that stops it early.
// Stops by itself if the user starts scrolling (wheel, touch, keys) so they can take over.
function animateWindowScroll(distance: number, onDone: () => void): () => void {
  const start = window.scrollY
  let startTime: number | null = null
  let frame = 0

  const stop = () => {
    cancelAnimationFrame(frame)
    window.removeEventListener('wheel', stop)
    window.removeEventListener('touchstart', stop)
    window.removeEventListener('keydown', stop)
    onDone()
  }
  window.addEventListener('wheel', stop, { passive: true })
  window.addEventListener('touchstart', stop, { passive: true })
  window.addEventListener('keydown', stop)

  const step = (now: number) => {
    startTime ??= now
    const t = Math.min((now - startTime) / AUTO_SCROLL_MS, 1)
    window.scrollTo(0, start + distance * easeOutCubic(t))
    if (t < 1) frame = requestAnimationFrame(step)
    else stop()
  }
  frame = requestAnimationFrame(step)
  return stop
}

export default function SurveyPage() {
  const [pages, setPages] = useState<Question[][]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Bubble row of each question on the current page, used to measure how far to scroll.
  const bubbleRowRefs = useRef<(HTMLDivElement | null)[]>([])
  // Extra space under the page so the last questions can still be scrolled into place.
  const bottomSpacerRef = useRef<HTMLDivElement | null>(null)
  const cancelScrollRef = useRef<(() => void) | null>(null)

  // Stop any running auto-scroll when leaving the page.
  useEffect(() => () => cancelScrollRef.current?.(), [])

  // New page: drop the extra bottom space from the previous page.
  useEffect(() => {
    if (bottomSpacerRef.current) bottomSpacerRef.current.style.height = '0px'
  }, [currentPage])

  useEffect(() => {
    async function fetchQuestions() {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .order('id')
      if (error) {
        setError('質問の読み込みに失敗しました')
        return
      }
      setPages(organizeQuestions(data))
      setLoading(false)
    }
    fetchQuestions()
  }, [])

  function handleAnswer(questionId: number, value: number, index: number) {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
    scrollToNextQuestion(index)
  }

  // Scrolls by exactly the distance from this question's bubble row to the next one's,
  // so whatever was under the mouse pointer or finger is now the next question's bubbles.
  function scrollToNextQuestion(index: number) {
    const current = bubbleRowRefs.current[index]
    const next = bubbleRowRefs.current[index + 1]
    if (!current || !next) return // last question on the page

    cancelScrollRef.current?.()

    const distance = next.getBoundingClientRect().top - current.getBoundingClientRect().top
    const start = window.scrollY
    const target = start + distance

    // Near the bottom of the page there may not be enough room to scroll that far.
    const spacer = bottomSpacerRef.current
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    if (spacer && target > maxScroll) {
      spacer.style.height = `${spacer.offsetHeight + Math.ceil(target - maxScroll)}px`
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.scrollTo(0, target)
      return
    }

    cancelScrollRef.current = animateWindowScroll(distance, () => {
      cancelScrollRef.current = null
    })
  }

  function currentPageAnswered() {
    if (!pages[currentPage]) return false
    return pages[currentPage].every(q => answers[q.id] !== undefined)
  }

  function handleNext() {
    if (currentPage < 5) {
      setCurrentPage(prev => prev + 1)
      window.scrollTo(0, 0)
    }
  }

  async function handleSubmit() {
    const allQuestions = pages.flat()
    const scores = calculateScores(answers, allQuestions)
    const id = await saveResponse(scores)
    if (id) {
      router.push(`/results/${id}`)
    } else {
      alert('エラーが発生しました。もう一度お試しください。')
    }
  }

  if (loading) return (
    <main style={{ flex: 1, background: '#FAFAF8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#888', fontSize: '14px' }}>読み込み中...</p>
    </main>
  )

  if (error) return (
    <main style={{ flex: 1, background: '#FAFAF8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#E24B4A', fontSize: '14px' }}>{error}</p>
    </main>
  )

  const progress = (currentPage / 6) * 100
  const isLastPage = currentPage === 5

  return (
    <main style={{ flex: 1, background: '#FAFAF8' }}>
      {/* Progress bar */}
      <div style={{ position: 'sticky', top: SITE_HEADER_HEIGHT, zIndex: 10, background: '#FAFAF8', borderBottom: '0.5px solid #E8E8E4', padding: '12px 20px' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <div style={{ minWidth: '60px' }}>
              {currentPage > 0 && (
                <button
                  onClick={() => {
                    setCurrentPage(prev => prev - 1)
                    window.scrollTo(0, 0)
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    fontSize: '13px',
                    color: '#5F5E5A',
                    cursor: 'pointer',
                    padding: '0',
                  }}
                >
                  ← 戻る
                </button>
              )}
            </div>
            <span style={{ fontSize: '12px', color: '#888' }}>ページ {currentPage + 1} / 6</span>
            <span style={{ fontSize: '12px', color: '#888', minWidth: '60px', textAlign: 'right' }}>{Math.round(progress)}% 完了</span>
          </div>
          <div style={{ height: '2px', background: '#E8E8E4', borderRadius: '2px' }}>
            <div style={{ height: '100%', width: `${progress}%`, background: '#1D9E75', borderRadius: '2px', transition: 'width 0.3s ease' }} />
          </div>
        </div>
      </div>

      {/* Questions */}
      <div className={styles.pageContent}>
      {pages[currentPage]?.map((question, index) => (
        <div key={question.id}>
          <div className={styles.questionWrapper}>
            <p className={styles.questionNumber}>
              質問 {currentPage * 10 + index + 1} / 60
            </p>
            <p className={styles.questionText}>
              {question.text_jp}
            </p>
            <div className={styles.scaleContainer}>
              <span className={styles.sideLabelLeft}>全く当てはまらない</span>
              <div
                className={styles.bubbleRow}
                ref={el => { bubbleRowRefs.current[index] = el }}
              >
                {[1, 2, 3, 4, 5, 6, 7].map((value, i) => {
                  const isSelected = answers[question.id] === value
                  const sizeClass = styles[BUBBLE_SIZE_CLASSES[i]]
                  return (
                    <button
                      key={value}
                      onClick={() => handleAnswer(question.id, value, index)}
                      className={`${styles.bubble} ${sizeClass} ${isSelected ? styles.bubbleSelected : ''}`}
                      aria-label={`${value}`}
                    />
                  )
                })}
              </div>
              <span className={styles.sideLabelRight}>非常に当てはまる</span>
            </div>
            <div className={styles.labelMobile}>
              <span>全く当てはまらない</span>
              <span className={styles.labelRight}>非常に当てはまる</span>
            </div>
          </div>
          {index < pages[currentPage].length - 1 && (
            <div className={styles.divider} />
          )}
        </div>
      ))}

        {/* Navigation buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
          {!isLastPage && (
            <button
              onClick={handleNext}
              disabled={!currentPageAnswered()}
              style={{
                padding: '12px 28px',
                background: currentPageAnswered() ? '#1D9E75' : '#E8E8E4',
                color: currentPageAnswered() ? '#fff' : '#B4B2A9',
                border: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: currentPageAnswered() ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s ease',
              }}
            >
              次へ →
            </button>
          )}
          {isLastPage && (
            <button
              onClick={handleSubmit}
              disabled={!currentPageAnswered()}
              style={{
                padding: '12px 28px',
                background: currentPageAnswered() ? '#1D9E75' : '#E8E8E4',
                color: currentPageAnswered() ? '#fff' : '#B4B2A9',
                border: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: currentPageAnswered() ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s ease',
              }}
            >
              結果を見る
            </button>
          )}
        </div>
        <div ref={bottomSpacerRef} aria-hidden="true" />
      </div>
    </main>
  )
}