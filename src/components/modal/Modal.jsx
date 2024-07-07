import React from 'react';
import './Modal.css';
import ResultsTable from '../results/ResultsTable';
import { useNavigate } from 'react-router-dom';

const Modal = ({ score, show, handleClose, userAnswers }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    const navigate = useNavigate()

    const handleRedirect = () => {
        navigate('/')
    };

    return (
        <div className={showHideClassName}>
            <section className='modal-main'>
                <ResultsTable userAnswers={userAnswers} />
                <button className='modal-btn' onClick={handleRedirect}>Kapat</button>
            </section>
        </div>
    );
};

export default Modal
