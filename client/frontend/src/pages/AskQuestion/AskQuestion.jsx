import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axiosConfig';
import LayOut from '../../components/LayOut/LayOut';
import Loading from '../../components/Loading/Loading';
import './askquestion.css';

const AskQuestion = ({ onQuestionPosted }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const questionDom = useRef(null);
  const descriptionDom = useRef(null);
  const tagDom = useRef(null);
  
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const questionValue = questionDom.current.value;
    const descriptionValue = descriptionDom.current.value;
    const tagValue = tagDom.current.value;

    setErrorMessage('');

    if (!questionValue || !descriptionValue || !tagValue) {
      setErrorMessage('Please provide all required fields');
      return;
    }

    try {
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

      questionDom.current.value = '';
      descriptionDom.current.value = '';
      tagDom.current.value = '';

      setSuccessMessage('Your Question Has Been Successfully Posted.');
      setLoading(true);

      // Call the parent function to refresh questions
      onQuestionPosted();

      setTimeout(() => {
        setLoading(false);
        setSuccessMessage('');
        navigate('/home'); // Redirect to homepage or appropriate page
      }, 4000);
    } catch (error) {
      alert('Something went wrong');
      console.log(error.response);
    }
  }

  return (
    <LayOut>
      {/* ... rest of the component */}
    </LayOut>
  );
};

export default AskQuestion;
