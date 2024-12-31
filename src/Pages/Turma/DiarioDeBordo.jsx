
import PropTypes from 'prop-types';


const DiarioDeBordo = ({ turmaId }) => {
  
  return (
    <>
      diario de bordo: {turmaId}
    </>
  );
};

DiarioDeBordo.propTypes = {
  turmaId: PropTypes.number.isRequired,
};

export default DiarioDeBordo;
