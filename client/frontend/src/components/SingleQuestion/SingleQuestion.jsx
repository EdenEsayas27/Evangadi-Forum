// src/components/SingleQuestion.js
import React from 'react';
import { FaArrowCircleRight } from 'react-icons/fa';
import classes from './singleQuestion.module.css';

const SingleQuestion = ({ question }) => {
  return (
    <div className={classes.container}>
      <div className={`${classes.Question} ms-5`}>QUESTION</div>
      <div className={classes.Question__title}>
        {/* <hr style={{width:"30%"}} />
         */}
        <FaArrowCircleRight
          size={25}
          style={{ color: 'rgb(81, 108, 240)', marginRight: '15px' }}
        />

        {question.question}
      </div>
      <div className={`${classes.Question__desc}`}>
        <p className="mt-3">{question.description}</p>
      </div>
      <hr style={{ padding: '-15px' }} />
      <div className={classes.Title}>Answer From The Community</div>

      <hr />
      <br />
    </div>
  );
};

export default SingleQuestion;
