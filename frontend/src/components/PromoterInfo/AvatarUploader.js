/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import get from 'lodash/get';
import FormData from 'form-data';
import { User } from 'phosphor-react';

import { createApiCall } from 'api/call';
import { useDataContext } from 'context';
import PlusIcon from 'assets/images/plus-circle.svg';

const baseStyle = {
  border: '1px solid transparent',
};

const activeStyle = {
  borderColor: '#35a56e',
};

const acceptStyle = {
  borderColor: '#35a56e',
};

const rejectStyle = {
  borderColor: '#CC4B39',
};

export const AvatarUploader = ({
  isView,
  className = '', // custom classNames
  label = 'Upload cover image', // text label on the uploader
  acceptFileTypes = ['image/jpeg', 'image/png'], // acceptable file types
  maxFileSize = 10 * 1024 * 1024, // 20MB,
  value,
  onChange = () => {},
  ...props
}) => {
  const [img, setImg] = useState('');
  const {
    state,
    actions: { updateStore },
  } = useDataContext();
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles[0].size < maxFileSize) {
        setImg(acceptedFiles[0]);
        handleChange(acceptedFiles[0]);
      }
    },
    [img]
  );

  const handleChange = async (file) => {
    let data = new FormData();
    data.append('file', file, file.name);
    const res = await createApiCall({
      url: 'api/v1/image/store',
      method: 'POST',
      data: data,
      headers: {
        accept: 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      },
    });
    updateStore({
      path: 'promoter.avatar',
      value: res.image_url,
    });
  };
  useEffect(() => {
    setImg(get(state, 'promoter.avatar'));
    return () => {};
  }, [state]);
  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    noKeyboard: true,
    onDrop,
    accept: { 'image/*': [] },
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <div {...props}>
      <div
        {...(!isView &&
          getRootProps({
            className: 'img-uploader' + ` ${className} ${img ? 'filled' : ''}`,
            style,
          }))}
        className={
          `img-uploader` + ` ${className} ${img ? 'filled' : ''}` + (isView ? ' view' : '')
        }
      >
        <div className="d-flex flex-wrap"></div>
        {img && (
          <img
            src={img ? (typeof img === 'string' ? img : URL.createObjectURL(img)) : ''}
            alt="upload"
          />
        )}
        <input {...getInputProps()} />
        {!img && isView && (
          <div className="img-uploader-placeholder">
            <User size={110} alt="promoter avatar" />
          </div>
        )}
        {!img && !isView && (
          <div className="img-uploader-placeholder">
            <img src={PlusIcon} alt="plus" />
            <span>{label}</span>
          </div>
        )}
      </div>
    </div>
  );
};
