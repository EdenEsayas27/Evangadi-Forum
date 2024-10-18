import { Link } from 'react-router-dom';

function About({ className }) {
  return (
    <>
      <section className="para align-self-center">
        <div className="para_container">
          <Link className="text-warning link-underline-opacity-0">About</Link>
          <div>
            <h2 className="fs-1 fw-bold mt-2">Evangadi Networks</h2>
          </div>
          <div className="mt-5">
            <p className="fs-4 text-light-emphasis">
              No matter what stage of life you are in, whether you are just
              starting elementary school or being promoted to CEO of a Fortune
              500 company, you have much to offer to those who are trying to
              follow in your footsteps.
            </p>
            <p className="fs-4 text-light-emphasis">
              Whether you are willing to share your knowledge or you are just
              looking to meet mentors of your own, please start by joining the
              network here.
            </p>
          </div>
          <button className="btn btn-warning px-4 fs-4 py-2">
            HOW IT WORKS
          </button>
        </div>
      </section>
    </>
  );
}

export default About;
