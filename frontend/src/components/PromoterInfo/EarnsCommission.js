import { useState, useCallback } from 'react';
import ReactTooltip from 'react-tooltip';
import { Question } from 'phosphor-react';

export const EarnsCommission = () => {
  const [show, setShow] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setShow(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setShow(false);
  }, []);

  return (
    <div>
      <span
        className="affiliate-disclosure-placeholder"
        data-tip="custom show"
        data-event="click focus"
        data-for="affiliate-closure"
        onMouseEnter={handleMouseEnter}
      >
        Earns Commission
        <Question size={16} />
      </span>

      {show && (
        <span onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <ReactTooltip
            id="affiliate-closure"
            place="bottom"
            effect="solid"
            className="affiliate-disclosure-tooltip"
          >
            <div className="d-flex flex-column">
              <span>{`Contributors recommend products and may earn commissions on purchases. `}</span>
              <a style={{ color: 'white' }} target="_blank" href="/affiliate-disclosure">
                Find out more
              </a>
            </div>
          </ReactTooltip>
        </span>
      )}
    </div>
  );
};
