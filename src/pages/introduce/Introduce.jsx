import { useNavigate } from 'react-router-dom'
import './Introduce.css'

const Introduce = () => {
  const navigate = useNavigate()
  const total_questions = 10

  const startQuiz = () => {
    navigate(`/quiz/${total_questions}`)
  }
  return (
    <div className="introduce">
      <div onClick={startQuiz} className='introduce-btn'>Quiz'e Başla</div>
    </div>
  )
}

export default Introduce