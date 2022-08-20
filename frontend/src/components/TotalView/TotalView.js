import { useState, useEffect } from 'react';

import { getTotalClicks, getTotalViews } from 'api';
import './style.scss';
import { ReactComponent as ArrowSquareOut } from 'assets/icons/arrow-square-out.svg';

const TotalView = () => {
  const [totalClicks, setTotalClicks] = useState('-');
  const [totalViews, setTotalViews] = useState('-');

  useEffect(() => {
    getTotalClicks().then((data) => {
      if (data?.total_clicks !== undefined) {
        setTotalClicks(data.total_clicks);
      }
    });
  }, [setTotalClicks]);

  useEffect(() => {
    getTotalViews().then((data) => {
      if (data?.total_views !== undefined) {
        setTotalViews(data.total_views);
      }
    });
  }, [setTotalClicks]);

  return (
    <div className="total-view__wrapper">
      <div className="total-view__list">
        <div className="total-view__list-title">
          <span>Total views</span>
          {/* <ArrowSquareOut /> */}
        </div>
        <h2 className="total-view__list-value">{totalViews}</h2>
      </div>
      <div className="total-view__list">
        <div className="total-view__list-title">
          <span>Total clicks</span>
          {/* <ArrowSquareOut /> */}
        </div>
        <h2 className="total-view__list-value">{totalClicks}</h2>
      </div>
    </div>
  );
};

export default TotalView;
