import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import ContentEditable from 'react-contenteditable';
import classNames from 'classnames';
import get from 'lodash/get';

import { useDataContext } from 'context';
import { DOMAIN_NAME } from 'config';
import { getStoreCanonicalURL, sanitizeInput } from 'utils';
import { EditIcon } from 'components/Icons/EditIcon';
import './style.scss';

export const StoreName = ({ tag = 'div', style, wrapperStyle = {}, className }) => {
  const {
    state,
    actions: { updateStore },
  } = useDataContext();
  const storeName = useMemo(() => get(state, 'store_name'), [state.store_name]);
  const [newUrl, setNewUrl] = useState(getStoreCanonicalURL(storeName));

  const ref = useRef();
  const text = useRef('');
  const [isEditable, setIsEditable] = useState(false);

  const onClickEdit = () => {
    setIsEditable(true);
    setTimeout(() => {
      if (ref.current) {
        ref.current.focus();
      }
    }, 1);
  };

  useEffect(() => {
    text.current = sanitizeInput(storeName);
  }, [storeName]);

  const handleChange = useCallback(
    (e) => {
      text.current = sanitizeInput(e.target.value);
    },
    [sanitizeInput]
  );
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
    const newLink = getStoreCanonicalURL(text.current);
    setNewUrl(newLink);
    updateStore({
      path: 'store_name',
      value: text.current,
    });
  };
  return (
    <div className="store-name-control-wrapper">
      <div style={wrapperStyle} className="store-name-control-container">
        <a
          href={newUrl}
          target="_blank"
          className={classNames('store-name-control', isEditable ? 'editable' : '', className)}
          rel="noreferrer"
        >
          <ContentEditable
            onFocus={onFocusFn}
            onBlur={() => closeEdit()}
            className="store-name-control-content"
            innerRef={ref}
            html={get(state, 'store_name')} // innerHTML of the editable div
            disabled={!isEditable} // use true to disable editing
            onChange={handleChange} // handle innerHTML change
            tagName={tag} // Use a custom HTML tag (uses a div by default)
            style={style}
          />
          <div className="store-name-control-content">{'.' + DOMAIN_NAME}</div>
        </a>
        <EditIcon name="store-name" className="store-name-control-edit" onClick={onClickEdit} />
      </div>
    </div>
  );
};
