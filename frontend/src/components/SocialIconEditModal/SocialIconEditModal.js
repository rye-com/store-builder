import React, { useState, useCallback, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import { ReactComponent as LeftArrowIcon } from '../../assets/icons/left-arrow.svg';
import './style.scss';

const SocialIconEditModal = ({ onClose, onUpdate, show, socialLinks, socialLinkOptions }) => {
  const [socialLinkValues, setSocialLinkValues] = useState(socialLinks);

  useEffect(() => {
    setSocialLinkValues(socialLinks);
  }, [socialLinks]);

  const handleLinkChange = useCallback(
    (type) => (e) => {
      setSocialLinkValues((prevState) => ({
        ...prevState,
        [type]: e.target.value,
      }));
    },
    []
  );

  const handleUpdate = useCallback(() => {
    onUpdate(socialLinkValues);
    onClose();
  }, [onUpdate, socialLinkValues]);

  return (
    <Modal show={show} onHide={onClose} size="lg" centered contentClassName="modal">
      <div className="modal__content-wrapper">
        <div className="modal__content-navigator" onClick={onClose}>
          <LeftArrowIcon />
          <span>Back to editor</span>
        </div>
        <Modal.Header>
          <Modal.Title>Add socials</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {socialLinkOptions.map((linkItem, idx) => {
            const Icon = linkItem.icon;
            return (
              <Form.Group className="mb-3 modal__content-line" key={idx}>
                <Icon />
                <Form.Control
                  placeholder={linkItem.placeholder}
                  value={socialLinkValues[linkItem.type] || ''}
                  onChange={handleLinkChange(linkItem.type)}
                />
              </Form.Group>
            );
          })}
        </Modal.Body>
        <Modal.Footer className="modal__footer">
          <div className="modal__footer-button-wrapper">
            <Button onClick={handleUpdate} id="social-icons-edit-modal-update-button">
              Update links
            </Button>
          </div>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default SocialIconEditModal;
