import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import get from 'lodash/get';
import OutsideClickHandler from 'react-outside-click-handler';
import CreatableSelect from 'react-select/creatable';

import { useDataContext } from 'context';
import { EditIcon } from 'components/Icons/EditIcon';

const options = [
  // { value: "Tech", label: "Tech" },
  // { value: "Entrepreneurship", label: "Entrepreneurship" },
  // { value: "Hair", label: "Hair" },
];

export const TagEdit = ({ isView, className = '' }) => {
  const [innerValue, setInnerValue] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const {
    state,
    actions: { updateStore },
  } = useDataContext();

  const handleClickEdit = () => {
    setIsEditable(true);
  };

  const handleChange = (params) => {
    updateStore({
      path: 'promoter.tags',
      value: params.map(({ label }) => label),
    });
  };

  useEffect(() => {
    setInnerValue(
      get(state, 'promoter.tags').map((item) => ({
        value: item,
        label: item,
      }))
    );

    return () => {};
  }, [state]);

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setIsEditable(false);
      }}
    >
      <div className={classNames('promoter-info-tags', className, isEditable ? 'editable' : '')}>
        {!isEditable ? (
          <div className="d-flex flex-wrap">
            {innerValue.length === 0 && !isView ? <div>Add Tags</div> : null}
            {innerValue.map(({ label }) => (
              <div key={label} className="promoter-info-tag">
                {label}
              </div>
            ))}
          </div>
        ) : (
          <CreatableSelect
            isMulti
            defaultValue={innerValue}
            onChange={handleChange}
            options={options}
            styles={{
              width: '100%',
            }}
          />
        )}
        <div className="promoter-info-tags-action-wrapper">
          {!isView && (
            <EditIcon
              name="promoter-store-tags"
              className="promoter-info-tags-edit"
              onClick={handleClickEdit}
            />
          )}
        </div>
      </div>
    </OutsideClickHandler>
  );
};
