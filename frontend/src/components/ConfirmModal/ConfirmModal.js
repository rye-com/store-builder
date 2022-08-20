import { useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import './styles.scss';

const ConfirmModal = ({ show, onClose, onConfirm, message }) => {
  const handleConfirm = useCallback(() => {
    onConfirm();
    onClose();
  }, [onConfirm, onClose]);
  return (
    <Modal
      show={show}
      onHide={onClose}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body className="confirm-modal__content">
        <h4>Are you sure?</h4>
        <p> {message} </p>
      </Modal.Body>
      <Modal.Footer className="confirm-modal__content confirm-modal__footer">
        <div className="confirm-modal__footer-button-wrapper">
          <Button size="lg" variant="secondary" onClick={onClose}>
            No
          </Button>
        </div>
        <div className="confirm-modal__footer-button-wrapper">
          <Button size="lg" variant="danger" onClick={handleConfirm}>
            Yes
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
