import { createApiCall } from 'api/call';
import { Button } from 'components/Button';
import { AuthPageLayout } from '../AuthPageLayout/AuthPageLayout';

function sendNewLink() {
  return createApiCall({
    url: 'api/v1/account/resend-auth-link',
    method: 'POST',
    data: {
      current_link: window.location.href,
    },
  });
}

export function ExpiredAuthLink() {
  return (
    <AuthPageLayout>
      <h1 className="text-center">Login link expired</h1>
      <p className="mt-4 mb-0 text-center">Whoops, seems like this link has expired.</p>
      <p className="text-center">Click the link below to request a new link.</p>
      <Button className="mt-4" autoFocus onClick={sendNewLink} id="send-new-auth-link">
        Send me a new link
      </Button>
    </AuthPageLayout>
  );
}
