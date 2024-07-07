import React from 'react'
import './ResultsTable.css'

const ResultsTable = ({ userAnswers }) => {
    return (
        <div className='resultsTable'>
            <h2>Quiz Sonuçları</h2>
            <table>
                <thead>
                    <tr>
                        <th>Sorular</th>
                        <th>Cevapların</th>
                    </tr>
                </thead>
                <tbody>
                    {userAnswers.map((answer, index) => (
                        <tr key={index}>
                            <td>{answer.question}</td>
                            <td>{answer.answer}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ResultsTable