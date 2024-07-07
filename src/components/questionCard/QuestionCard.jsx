import React, { useEffect, useState } from 'react';
import './QuestionCard.css';

const QuestionCard = ({ questionsData, score, setScore, count, setCount, modal, setModal, userAnswers, setUserAnswers }) => {
    const [timer, setTimer] = useState(30)
    const labels = ['A', 'B', 'C', 'D']
    const [isClickable, setIsClickable] = useState(false)

    const approvedChoice = (e) => {
        if (!isClickable) return

        const selectedAnswer = e.currentTarget.value
        const isCorrect = selectedAnswer === questionsData[count]?.correct_answer

        if (isCorrect) {
            setScore(prevScore => prevScore + 10)
        }

        setUserAnswers(prevUserAnswers => [
            ...prevUserAnswers,
            { question: questionsData[count]?.question, answer: selectedAnswer }
        ])

        if (count < questionsData.length - 1) {
            setCount(prevCount => prevCount + 1)
            setTimer(30)
            setIsClickable(false)
        } else {
            setModal(true)
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (timer > 0) {
                setTimer(prevTimer => prevTimer - 1)
            } else {
                if (count < questionsData.length - 1) {
                    setUserAnswers(prevUserAnswers => [
                        ...prevUserAnswers,
                        { question: questionsData[count]?.question }
                    ])
                    setCount(prevCount => prevCount + 1)
                    setTimer(30);
                    setIsClickable(false)
                } else {
                    setModal(true)
                    clearInterval(interval)
                }
            }
        }, 1000)

        if (timer === 20) {
            setIsClickable(true)
        }

        return () => clearInterval(interval);
    }, [timer, count, questionsData, setCount, setModal, setUserAnswers])

    useEffect(() => {
        const clickableTimeout = setTimeout(() => {
            setIsClickable(true);
        }, 10000)

        return () => clearTimeout(clickableTimeout)
    }, [count])

    useEffect(() => {
        console.log('Current question index:', count)
        console.log('Current question:', questionsData[count])
    }, [count, questionsData])

    if (!questionsData || questionsData.length === 0) {
        console.log('Questions data is not loaded or empty')
        return <div>Loading...</div>
    }

    if (count >= questionsData.length) {
        console.log('Count exceeds questions data length')
        return <div>Daha fazla soru bulunamadı.</div>
    }

    return (
        <div className='questionCard'>
            <div className='questionCard-timer'>{timer}</div>
            <div className='questionCard-title'>{count + 1} - {questionsData[count]?.question}</div>
            {
                questionsData[count]?.answers?.map((answer, i) => (
                    <div className='answers-container' key={i}>
                        <div className='answers'>
                            <span>{labels[i]}</span>
                            <button disabled={!isClickable} onClick={approvedChoice} key={i} value={answer}>{answer}</button>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default QuestionCard
