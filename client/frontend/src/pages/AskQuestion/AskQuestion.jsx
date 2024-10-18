import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axiosConfig';
import LayOut from '../../components/LayOut/LayOut';
import Loading from '../../components/Loading/Loading';
import './askquestion.css';

const AskQuestion = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const questionDom = useRef(null);
  const descriptionDom = useRef(null);
  const tagDom = useRef(null);

  const [loading, setLoading] = useState(false); // Loading state
  const [successMessage, setSuccessMessage] = useState(''); // Success message state
  const [errorMessage, setErrorMessage] = useState(''); // Error message state

  async function handleSubmit(e) {
    e.preventDefault();
    const questionValue = questionDom.current.value;
    const descriptionValue = descriptionDom.current.value;
    const tagValue = tagDom.current.value;

    // Reset error message on submit
    setErrorMessage('');

    if (!questionValue || !descriptionValue || !tagValue) {
      setErrorMessage('Please provide all required fields');
      return;
    }

    try {
      // Post the question
      const response = await axios.post(
        '/questions',
        {
          question: questionValue,
          description: descriptionValue,
          tag: tagValue,
        },
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );

      // Clear form inputs
      questionDom.current.value = '';
      descriptionDom.current.value = '';
      tagDom.current.value = '';

      console.log(response, 'response');

      // Set success message and loading
      setSuccessMessage(
        'Your Question Has Been Successfully Posted. Redirecting to Home Page....'
      );
      setLoading(true); // Start loading to display spinner

      // Wait for 4 seconds before navigating
      setTimeout(() => {
        setLoading(false);
        setSuccessMessage('');
        navigate('/home'); // Navigate back to the homepage
        window.location.reload(); // Optionally reload the page
      }, 4000);
    } catch (error) {
      alert('Something went wrong');
      console.log(error.response);
    }
  }
  return (
    <LayOut>
      <section>
        <div className="container d-flex flex-column mt-4 ">
          <div className=" arrow-list justify-content-around mb-4 ">
            <h1>Steps to Write a Good Question</h1>
          </div>
          <div>
            <ul className="arrow-list">
              <li>Summarize your problem in a one-line-title.</li>
              <li>Describe your problem in more detail.</li>
              <li>Describe what you tried and what you expected to happen.</li>
              <li>Review your question and post it to the site.</li>
            </ul>
          </div>
        </div>

        <div className="d-flex flex-column align-items-center shadow-sm p-3 mb-5 rounded ">
          <div className="fw-b mt-5 pt-4">
            <h1>Ask a Public Question</h1>
          </div>

          {/* Display error message if it exists */}
          {errorMessage && (
            <div className="mt-2 text-danger">{errorMessage}</div>
          )}

          {/* Show success message here */}
          {successMessage && (
            <div className="mt-3 text-success text-center">
              {successMessage}
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: '50px' }}
              >
                <Loading />
              </div>
            </div>
          )}

          <div className="container custom-bg">
            <form onSubmit={handleSubmit}>
              <div className="my-3 ">
                <input
                  type="text"
                  placeholder="Question title"
                  className="form-control fs-3 p-4"
                  ref={questionDom}
                />
              </div>

              <div>
                <textarea
                  className="mt-4 p-4 fs-3 form-control"
                  rows="3"
                  placeholder="Question Detail ..."
                  ref={descriptionDom}
                ></textarea>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Tag"
                  className="form-control mt-2 fs-3 p-3"
                  ref={tagDom}
                />
              </div>

              <div className="mt-2">
                <button
                  className="btn btn-primary  p-4 fs-3  action_btn"
                  type="submit"
                >
                  Post Question
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </LayOut>
  );
};

export default AskQuestion;
