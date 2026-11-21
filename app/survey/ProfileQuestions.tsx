import { GENDER_OPTIONS, AGE_RANGE_OPTIONS } from '../lib/config'
import type { Gender, AgeRange } from '../lib/config'
import styles from './survey.module.css'

type Props = {
  gender: Gender | null
  ageRange: AgeRange | null
  onGenderChange: (value: Gender) => void
  onAgeRangeChange: (value: AgeRange) => void
}

// Last survey page: gender and age range, saved with the response for statistics.
export default function ProfileQuestions({ gender, ageRange, onGenderChange, onAgeRangeChange }: Props) {
  return (
    <div className={styles.profile}>
      <p className={styles.instructions}>
        最後に、あなたについて教えてください。回答は統計のためだけに使われ、個人が特定されることはありません。
      </p>

      <fieldset className={styles.profileGroup}>
        <legend className={styles.questionText}>性別</legend>
        <div className={styles.optionGrid} role="radiogroup">
          {GENDER_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={gender === value}
              onClick={() => onGenderChange(value)}
              className={`${styles.option} ${gender === value ? styles.optionSelected : ''}`}
            >
              {label}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className={styles.profileGroup}>
        <legend className={styles.questionText}>年齢</legend>
        <div className={`${styles.optionGrid} ${styles.optionGridAge}`} role="radiogroup">
          {AGE_RANGE_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={ageRange === value}
              onClick={() => onAgeRangeChange(value)}
              className={`${styles.option} ${ageRange === value ? styles.optionSelected : ''}`}
            >
              {label}
            </button>
          ))}
        </div>
      </fieldset>
    </div>
  )
}
