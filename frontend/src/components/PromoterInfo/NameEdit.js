import React from 'react';
import classNames from 'classnames';
import { Editable } from 'components';

export const NameEdit = ({ isView, placeholder }) => {
  return (
    <div className={classNames('promoter-info-name', !isView ? 'editable-name-font' : '')}>
      <Editable
        name="promoter-name"
        isView={isView}
        className="promoter-info-name-content"
        placeholder={placeholder}
        tag="div"
        storePath={`promoter.name`}
        showTooltip={false}
      ></Editable>
    </div>
  );
};
