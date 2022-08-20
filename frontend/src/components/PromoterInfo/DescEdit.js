import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import get from 'lodash/get';

import { useDataContext } from 'context';
import { EditIcon } from 'components/Icons/EditIcon';

export const DescEdit = ({ isView, placeholder, className }) => {
  const ref = React.useRef();
  const [innerValue, setInnerValue] = useState(placeholder);
  const [isEditable, setIsEditable] = useState(false);
  const {
    state,
    actions: { updateStore },
  } = useDataContext();

  const onClickEdit = () => {
    setIsEditable(true);
    setTimeout(() => {
      if (ref.current) {
        ref.current.focus();
        ref.current.select();
      }
    }, 1);
  };

  useEffect(() => {
    setInnerValue(get(state, 'promoter.bio') || (isView ? '' : placeholder));
    return () => {};
  }, [placeholder, state]);

  const handleChange = (e) => {
    setInnerValue(e.target.value);
  };

  const closeEdit = () => {
    setIsEditable(false);
    updateStore({
      path: 'promoter.bio',
      value: innerValue,
    });
  };

  return (
    <div
      className={classNames(
        'promoter-info-description',
        className,
        isEditable ? 'editable' : '',
        !isView ? 'editable-desc-font' : ''
      )}
    >
      {!isEditable ? (
        <div className="promoter-info-description-content">{innerValue}</div>
      ) : (
        <textarea
          ref={ref}
          value={innerValue}
          onBlur={() => closeEdit()}
          onChange={handleChange}
          id="promoter-description-text"
        />
      )}
      <div className="promoter-info-description-icon-wrapper">
        {!isView && (
          <EditIcon
            name="promoter-description"
            className="promoter-info-description-edit"
            onClick={onClickEdit}
          />
        )}
      </div>
    </div>
  );
};
