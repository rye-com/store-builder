import { useState, useCallback } from 'react';
import ReactTooltip from 'react-tooltip';
import './style.scss';

const OperatorTooltip = ({ tooltipText, id, children }) => {
  const [show, setShow] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setShow(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setShow(false);
  }, []);

  return (
    <>
      <span data-tip data-for={id} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {children}
      </span>
      {show && (
        <ReactTooltip id={id} place="right" multiline={true} className="operator-tooltip">
          <p>{tooltipText}</p>
        </ReactTooltip>
      )}
    </>
  );
};

export default OperatorTooltip;
