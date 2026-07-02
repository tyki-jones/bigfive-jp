'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { TRAITS, TRAIT_LABELS_JP } from '../lib/config'
import styles from './survey.module.css'

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

export default function SurveyPage() {
  const [pages, setPages] = useState<Question[][]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

  function handleAnswer(questionId: number, value: number) {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
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

  function handleSubmit() {
    // Phase 2: calculate scores and navigate to results
    console.log('Final answers:', answers)
  }

  if (loading) return (
    <main style={{ minHeight: '100vh', background: '#FAFAF8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#888', fontSize: '14px' }}>読み込み中...</p>
    </main>
  )

  if (error) return (
    <main style={{ minHeight: '100vh', background: '#FAFAF8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#E24B4A', fontSize: '14px' }}>{error}</p>
    </main>
  )

  const progress = (currentPage / 6) * 100
  const isLastPage = currentPage === 5

  return (
    <main style={{ minHeight: '100vh', background: '#FAFAF8' }}>
      {/* Progress bar */}
      <div style={{ position: 'sticky', top: 0, zIndex: 10, background: '#FAFAF8', borderBottom: '0.5px solid #E8E8E4', padding: '12px 20px' }}>
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
              <div className={styles.bubbleRow}>
                {[1, 2, 3, 4, 5, 6, 7].map((value, i) => {
                  const isSelected = answers[question.id] === value
                  const sizeClass = styles[BUBBLE_SIZE_CLASSES[i]]
                  return (
                    <button
                      key={value}
                      onClick={() => handleAnswer(question.id, value)}
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
      </div>
    </main>
  )
}