export function Choice({ value, onChange, imageURL, checked, label, imageAlt }) {
  return (
    <button
      className="d-flex flex-column border rounded bg-white px-2 py-2"
      onClick={() => onChange(value)}
    >
      {imageURL && <img className="mb-2" width="100%" src={imageURL} alt={imageAlt} />}

      <div>
        <input
          onChange={() => onChange(value)}
          type="radio"
          name="variant"
          id={value}
          value={value}
          checked={checked}
        />
        <label className="ms-1" htmlFor={value}>
          {label}
        </label>
      </div>
    </button>
  );
}
