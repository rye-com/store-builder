import Spinner from 'react-bootstrap/Spinner';
import classNames from 'classnames';
import './style.scss';

const OperatorSpinner = ({ fill = true }) => {
  return (
    <div className={classNames({ 'spinner-wrapper': fill })}>
      <Spinner animation="border" />
    </div>
  );
};

export default OperatorSpinner;
