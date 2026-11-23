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

      <div className={styles.profileGroup}>
        <label htmlFor="age-range" className={styles.questionText} style={{ display: 'block' }}>年齢</label>
        {/* Native dropdown: on phones it opens the system picker. */}
        <div className={styles.selectWrapper}>
          <select
            id="age-range"
            value={ageRange ?? ''}
            onChange={e => onAgeRangeChange(e.target.value as AgeRange)}
            className={`${styles.select} ${ageRange ? '' : styles.selectPlaceholder}`}
          >
            <option value="" disabled>年齢を選択する</option>
            {AGE_RANGE_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
