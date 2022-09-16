import { Input } from 'components/Input';
import { Button } from 'components/Button';

export function DetailsForm({ orderDetails, setOrderDetails, submit }) {
  return (
    <form className="d-flex flex-column gap-2" onSubmit={submit}>
      <h3>Shipping address</h3>
      <label className="d-flex flex-row justify-content-between align-items-baseline">
        <span className="me-2">E-mail:</span>
        <Input
          placeholder="email"
          value={orderDetails.email}
          type="email"
          onChange={(val) => setOrderDetails((det) => ({ ...det, email: val }))}
        />
      </label>

      <label className="d-flex flex-row justify-content-between align-items-baseline">
        <span className="me-2">First name:</span>
        <Input
          placeholder="First name"
          value={orderDetails.firstName}
          onChange={(val) => setOrderDetails((det) => ({ ...det, firstName: val }))}
        />
      </label>

      <label className="d-flex flex-row justify-content-between align-items-baseline">
        <span className="me-2">Last name:</span>
        <Input
          placeholder="Last name"
          value={orderDetails.lastName}
          onChange={(val) => setOrderDetails((det) => ({ ...det, lastName: val }))}
        />
      </label>

      <label className="d-flex flex-row justify-content-between align-items-baseline">
        <span className="me-2">Phone:</span>
        <Input
          placeholder="Phone"
          value={orderDetails.phone}
          onChange={(val) => setOrderDetails((det) => ({ ...det, phone: val }))}
        />
      </label>

      <label className="d-flex flex-row justify-content-between align-items-baseline">
        <span className="me-2">Address 1:</span>
        <Input
          placeholder="Address 1"
          value={orderDetails.address1}
          onChange={(val) => setOrderDetails((det) => ({ ...det, address1: val }))}
        />
      </label>

      <label className="d-flex flex-row justify-content-between align-items-baseline">
        <span className="me-2">Address 2:</span>
        <Input
          placeholder="Address 2"
          value={orderDetails.address2}
          onChange={(val) => setOrderDetails((det) => ({ ...det, address2: val }))}
        />
      </label>

      <label className="d-flex flex-row justify-content-between align-items-baseline">
        <span className="me-2">City:</span>
        <Input
          placeholder="City"
          value={orderDetails.city}
          onChange={(val) => setOrderDetails((det) => ({ ...det, city: val }))}
        />
      </label>

      <label className="d-flex flex-row justify-content-between align-items-baseline">
        <span className="me-2">State Code:</span>
        <Input
          placeholder="WA"
          value={orderDetails.stateCode}
          onChange={(val) => setOrderDetails((det) => ({ ...det, stateCode: val }))}
        />
      </label>

      {/* TODO Handle countries? */}
      <label className="d-flex flex-row justify-content-between align-items-baseline">
        <span className="me-2">Country:</span>
        <Input
          placeholder="country"
          readOnly
          value={orderDetails.countryCode}
          onChange={(val) => setOrderDetails((det) => ({ ...det, countryCode: val }))}
        />
      </label>

      <label className="d-flex flex-row justify-content-between align-items-baseline">
        <span className="me-2">Zip:</span>
        <Input
          placeholder="zip"
          value={orderDetails.zip}
          onChange={(val) => setOrderDetails((det) => ({ ...det, zip: val }))}
        />
      </label>

      <Button type="submit">Continue To shipping</Button>
    </form>
  );
}
