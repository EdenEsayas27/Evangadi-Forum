import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppState } from '../../App';
import axiosBase from '../../axiosConfig';
import LayOut from '../../components/LayOut/LayOut';
import Loading from '../../components/Loading/Loading';
import QuestionList from '../../components/QuestionList/QuestionList';
import './home.css';

const Home = () => {
  const { user } = useContext(AppState);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data } = await axiosBase.get('/questions', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setQuestions(data.questions);
        console.log('Fetched Questions:', data.questions);

        console.log(data.questions); // Debugging: log questions
      } catch (err) {
        console.error('Error fetching questions:', err);
        setError(
          'Failed to load questions. Error: ' +
            (err.response?.data?.msg || err.message)
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [token]);

  // Filter questions based on the search term
  const filteredQuestions = questions.filter(question => 
    question.tag && question.tag.trim().toLowerCase().includes(searchTerm.trim().toLowerCase())
  );
   // Show all questions if no search term

  return (
    <LayOut>
      <section className="container">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {/* Search Input */}
            <div className="my-3">
              <input
                type="text"
                placeholder="Search by Tag"
                className="form-control fs-3 p-4"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on change
              />
            </div>

            <header className="d-flex justify-content-between mt-5 p-4">
              <div>
                <Link to="/ask-question">
                  <button className="btn btn-primary p-2 fs-4">
                    Ask Question
                  </button>
                </Link>
              </div>
              <div>
                <h4 className="fs-2">Welcome, {user?.username}!</h4>
              </div>
            </header>

            {error ? (
              <div>{error}</div>
            ) : (
              <div className="mt-4">
                {filteredQuestions.length > 0 ? (
                  filteredQuestions.map((question) => (
                    <QuestionList key={question.id} question={question} />
                  ))
                ) : (
                  <p>No questions found with that tag.</p>
                )}
              </div>
            )}
          </>
        )}
      </section>
    </LayOut>
  );
};

export default Home;
