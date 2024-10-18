import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';
import axios from './../../axiosConfig';
import classes from './postAnswer.module.css';

const PostAnswer = ({ onAnswerPosted }) => {
  const { id } = useParams(); // Get the question ID from the URL
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); // New state for success message

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null); // Reset the error state
    setSuccessMessage(null); // Reset the success message

    try {
      setIsLoading(true); // Show loading spinner while waiting for response

      // Fetch the question details using the question ID
      const token = localStorage.getItem('token');
      await axios.post(
        '/answers',
        { question_id: id, answer },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAnswer(''); // Clear the input field
      setSuccessMessage('Answer posted successfully!'); // Set success message
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      onAnswerPosted();
      setIsLoading(false); // Call the callback to refresh answers
    } catch (err) {
      setIsLoading(true);
      console.error('Error posting answer:', err);
      setError('Failed to post answer. Please try again.');
      setIsLoading(false); // Hide loading spinner after error
    }
  };

  if (isLoading) return <Loading />;

  return (
    <>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <div className={classes.container}>
        {/* Success message */}
        <form onSubmit={handleSubmit}>
          <textarea
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            required
            placeholder="Your answer..."
            className="form-control p-4 fs-3"
          />
          <button className="btn btn-primary p-3 fs-3 mt-3" type="submit">
            Post Answer
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </div>
    </>
  );
};

export default PostAnswer;
