import { Button } from 'components/Button';
import Modal from 'react-bootstrap/Modal';
import { ReactComponent as HandWavingIcon } from 'assets/icons/hand-waving.svg';
import { Input } from 'components';
import classes from './ShopperSignInDialog.module.css';
import classNames from 'classnames';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { createApiCall } from 'api/call';
import { useAuthContext } from 'context/AuthContext';
import { useToastContext } from 'context';

/**
 * Dialog that is used to Sign in as a shopper
 * @param {{onSignIn: () => unknown, show: boolean, close: () => void, redirectUrl: string}} param0 props
 * @returns
 */
export function ShopperSignInDialog({ onSignIn, show, close, redirectUrl }) {
  const [email, setEmail] = useState();
  const { login } = useAuthContext();
  const { setMessage } = useToastContext();
  const [success, setSuccess] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      email_address: email,
      redirect_url: redirectUrl,
      device_fingerprint: uuidv4(),
    };
    createApiCall({
      url: 'api/v1/account/create',
      method: 'POST',
      data,
    }).then((data) => {
      if (data?.magiclink && data?.magiclink === 'sent') {
        setSuccess(true);
      } else {
        let token = data?.jwt;
        login(token);
        onSignIn();
      }

      if (data.error) {
        setMessage({
          title: 'Failed to create a user',
          content: 'Please try again later.',
          type: 'error',
        });
      }
    });
  };

  let content;
  if (success) {
    content = (
      <>
        <h1 className="fs-2 fw-normal text-center">Sign in link sent</h1>
        <p>Please check the link in your email.</p>
      </>
    );
  } else {
    content = (
      <>
        <h1 className="fs-2 fw-normal text-center">Create a free account for crypto awards</h1>

        <form className="d-flex flex-column w-100 my-4" onSubmit={onSubmit}>
          <Input
            id="shopper-login-email-address-input"
            type="email"
            placeholder="Enter your email address"
            onChange={(newEmail) => {
              setEmail(newEmail);
            }}
            autoFocus
          />
          <Button id="shopper-login-dialog-button" className="mt-3" type="submit">
            Sign up with email
          </Button>
        </form>
        <span className={classNames(classes.textMuted)}>
          By clicking "Sign up with email" above, you acknowledge that you have read and understood,
          and agree to Rye's <a href="/terms-of-service">Terms and Conditions</a> and{' '}
          <a href="/privacy-policy">Privacy Policy</a>
        </span>
      </>
    );
  }

  return (
    <Modal show={show} centered onHide={close}>
      <div className="d-flex flex-column align-items-center px-4 py-5">
        <HandWavingIcon role="presentation" />
        {content}
      </div>
    </Modal>
  );
}
