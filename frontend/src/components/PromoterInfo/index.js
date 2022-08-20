import React from 'react';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';

import { SocialIcons, TotalView } from 'components';
import { NameEdit } from './NameEdit';
import { DescEdit } from './DescEdit';
import { TagEdit } from './TagEdit';
import { AvatarUploader } from './AvatarUploader';
import { EarnsCommission } from './EarnsCommission';
import { removeEmpty } from 'utils';
import './style.scss';

export const PromoterInfo = ({
  data,
  isView,
  className, // custom class name
}) => {
  return (
    <>
      <div className={classNames('promoter-info', className)}>
        <AvatarUploader
          id="promoter-info-avatar-uploader"
          isView={isView}
          className="promoter-info-avatar"
          label="Upload avatar"
        />
        <div className="promoter-info-content-wrapper">
          <div className="promoter-info-content">
            {isView && isEmpty(removeEmpty(data)) && (
              <h3 className="d-flex promoter-info-empty">Promoter info is empty</h3>
            )}
            <NameEdit placeholder="Your name here" isView={isView} />
            <DescEdit
              isView={isView}
              className="mt-1 mb-1"
              placeholder="Add a description of yourself"
            />
            <SocialIcons isView={isView} />
            <TagEdit isView={isView} className="mt-1" />
            {isView && <EarnsCommission />}
          </div>
          {!isView && <TotalView />}
        </div>
      </div>
      <hr className="seperator" />
    </>
  );
};
