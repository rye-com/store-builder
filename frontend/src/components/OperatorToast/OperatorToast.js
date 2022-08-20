import { useCallback } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

import { useToastContext } from 'context';
import { ReactComponent as RocketLaunchIcon } from 'assets/icons/rocket-launch-icon.svg';
import './styles.scss';

const OperatorToast = () => {
  const { show, setMessage, message } = useToastContext();

  const handleClose = useCallback(() => {
    setMessage({
      title: '',
      content: '',
      type: '',
    });
  }, [setMessage]);

  return (
    <ToastContainer className="p-3 toast-container">
      <Toast onClose={handleClose} show={show} autohide delay={3000}>
        <div className="toast-content">
          <RocketLaunchIcon className="toast-content__icon" />
          <div className="toast-content__text">
            <Toast.Header closeButton={false} className="toast-content__text-title">
              <strong className="me-auto">{message?.title}</strong>
            </Toast.Header>
            <Toast.Body as="p" className="toast-content__text-content">
              {message?.content}
            </Toast.Body>
          </div>
        </div>
      </Toast>
    </ToastContainer>
  );
};

export default OperatorToast;
