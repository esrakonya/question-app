import React, { useState, useEffect } from 'react';
import './Quiz.css';
import QuestionCard from '../../components/questionCard/QuestionCard';
import Modal from '../../components/modal/Modal';
import { fetchQuizData } from '../../api/api'; // Assuming this path is correct

const Quiz = () => {
    const [questionsData, setQuestionsData] = useState([]);
    const [score, setScore] = useState(0);
    const [count, setCount] = useState(0);
    const [modal, setModal] = useState(false);
    const [userAnswers, setUserAnswers] = useState([]);

    useEffect(() => {
        const loadQuizData = async () => {
            try {
                const data = await fetchQuizData(10); // Example: Fetching 10 questions
                setQuestionsData(data);
                console.log('Questions data loaded:', data);
            } catch (error) {
                console.error('Error loading quiz data:', error.message);
            }
        };

        loadQuizData();
    }, []);

    const handleClose = () => {
        setModal(false);
    };

    return (
        <div className='quiz'>
            {questionsData.length > 0 ? (
                <>
                    <QuestionCard
                        questionsData={questionsData}
                        score={score}
                        setScore={setScore}
                        count={count}
                        setCount={setCount}
                        modal={modal}
                        setModal={setModal}
                        userAnswers={userAnswers}
                        setUserAnswers={setUserAnswers}
                    />
                    {modal && (
                        <div className='modal'>
                            <Modal score={score} userAnswers={userAnswers} handleClose={handleClose} show={modal} />
                        </div>
                    )}
                </>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default Quiz;
