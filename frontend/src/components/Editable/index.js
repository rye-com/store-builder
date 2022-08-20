import React, { useState, useEffect, useRef, useCallback } from 'react';
import ContentEditable from 'react-contenteditable';
import classNames from 'classnames';
import get from 'lodash/get';

import { OperatorTooltip } from 'components';
import ConfirmModal from 'components/ConfirmModal';
import { EditIcon } from 'components/Icons/EditIcon';
import { DeleteIcon } from 'components/Icons/DeleteIcon';
import { useDataContext } from 'context';
import './style.scss';

export const Editable = ({
  isView,
  tag = 'div',
  placeholder,
  styles,
  value = '',
  onChange = () => {},
  wrapperStyle = {},
  className,
  storePath,
  isDeletable,
  onDeleteClick,
  deleteMessage,
  skipDeleteModal,
  showTooltip = false,
  tooltipId,
  name,
}) => {
  if (name === undefined) {
    throw new Error('Editable name is required');
  }
  const {
    state,
    actions: { updateStore },
  } = useDataContext();
  const ref = useRef();
  const text = useRef('');
  const [isEditable, setIsEditable] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const onClickEdit = () => {
    setIsEditable(true);
    setTimeout(() => {
      if (ref.current) {
        ref.current.focus();
      }
    }, 1);
  };

  useEffect(() => {
    text.current = get(state, storePath) || (isView ? '' : placeholder);
    return () => {};
  }, [storePath, placeholder, state]);

  const handleChange = (e) => {
    text.current = e.target.value;
    onChange(e.target.value);
  };
  const onFocusFn = (event) => {
    var cell = event.target;
    var range, selection;
    if (document.body.createTextRange) {
      range = document.body.createTextRange();
      range.moveToElementText(cell);
      range.select();
    } else if (window.getSelection) {
      selection = window.getSelection();
      range = document.createRange();
      range.selectNodeContents(cell);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };
  const closeEdit = async () => {
    setIsEditable(false);
    if (storePath) {
      updateStore({
        path: storePath,
        value: text.current,
      });
    }
  };

  const handleDeleteClick = useCallback(() => {
    if (skipDeleteModal) {
      onDeleteClick();
    } else {
      setShowModal(true);
    }
  }, [skipDeleteModal, onDeleteClick]);

  const handleClose = useCallback(() => {
    setShowModal(false);
  }, []);

  const EditableText = () => (
    <ContentEditable
      onPaste={(ev) => {
        ev.preventDefault();
        ev.target.innerText = ev.clipboardData.getData('text/plain');
      }}
      onFocus={onFocusFn}
      onBlur={() => closeEdit()}
      className={classNames('editable-control-content', isEditable ? 'editable' : '')}
      innerRef={ref}
      html={get(state, storePath) || (isView ? '' : placeholder)} // innerHTML of the editable div
      disabled={!isEditable} // use true to disable editing
      onChange={handleChange} // handle innerHTML change
      tagName={tag} // Use a custom HTML tag (uses a div by default)
      style={styles?.edit}
      id={`input-${name}`}
    />
  );

  return (
    <div className={classNames('editable-control', className)} style={wrapperStyle}>
      <div
        className={classNames(
          'flex-row flex-wrap',
          !isView && name === 'product-blurb-editor'
            ? 'col-9 editable-control__product-description'
            : ''
        )}
      >
        {showTooltip ? (
          <OperatorTooltip tooltipText={value} id={tooltipId}>
            <EditableText />
          </OperatorTooltip>
        ) : (
          <EditableText />
        )}
      </div>
      <div className="editable-control__icon-container" style={styles?.icon}>
        {!isView && (
          <EditIcon
            name={name}
            className="editable-control-edit"
            onClick={onClickEdit}
            title="Edit"
          />
        )}
        {!isView && isDeletable && (
          <DeleteIcon
            name={name}
            className="editable-control-delete"
            onClick={handleDeleteClick}
            title="Delete"
          />
        )}
      </div>
      {isDeletable && !skipDeleteModal && (
        <ConfirmModal
          show={showModal}
          message={deleteMessage}
          onClose={handleClose}
          onConfirm={onDeleteClick}
        />
      )}
    </div>
  );
};
