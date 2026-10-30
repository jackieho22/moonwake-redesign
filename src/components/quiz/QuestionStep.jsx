import { Box } from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import AnswerCard from './AnswerCard'
import QuizHeading from './QuizHeading'

// The single question template every step uses.
export default function QuestionStep({ question, number, total, selectedId, onChoose, focusOnMount }) {
  const headingId = `quiz-q-${question.id}`

  return (
    <>
      <QuizHeading id={headingId} focusOnMount={focusOnMount}>
        <Box component="span" sx={visuallyHidden}>
          Question {number} of {total}:{' '}
        </Box>
        {question.prompt}
      </QuizHeading>
      <Box
        role="group"
        aria-labelledby={headingId}
        sx={{
          px: { xs: '20px', sm: '80px' },
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: '12px', sm: '18px' },
        }}
      >
        {question.answers.map((answer) => (
          <AnswerCard
            key={answer.id}
            label={answer.label}
            selected={selectedId === answer.id}
            onSelect={() => onChoose(answer)}
          />
        ))}
      </Box>
    </>
  )
}
