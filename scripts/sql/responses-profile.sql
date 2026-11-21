-- Adds gender and age range to responses (asked on the page after the 60 questions).
-- Values must match GENDER_OPTIONS / AGE_RANGE_OPTIONS in app/lib/config.ts.
-- Existing responses stay as they are, with both columns empty (null).

alter table responses
  add column gender text
    check (gender in ('man', 'woman', 'other')),
  add column age_range text
    check (age_range in ('0-10', '11-15', '16-20', '21-25', '26-30', '31-35',
                         '36-40', '41-45', '46-50', '51-55', '56-60', '61+'));
