import React from 'react';
import { Alert } from '../Alert';
import { deleteAlert, deleteAlertByIndex } from '@/features/alerts/alertsSlice';
import { useAppSelector, useAppDispatch } from '@/store/hooks';

export const Alerts = () => {
  const alerts = useAppSelector((state) => state.alerts.alerts);

  const dispatch = useAppDispatch();

  const handleCloseAlert = React.useCallback(() => {
    dispatch(deleteAlert());
  }, [dispatch]);

  const handleCloseAlertByClick = React.useCallback(
    (alertIndex: number) => {
      dispatch(deleteAlertByIndex(alertIndex));
    },
    [dispatch]
  );

  const renderAlerts = React.useMemo(() => {
    return alerts.map((alert: any, index: number) => {
      const alertProps = {
        type: alert.type,
        title: alert.title,
        message: alert.message,
        onClose: handleCloseAlert,
        onCloseByClick: () => handleCloseAlertByClick(index),
      };

      return (
        <div className="relative my-2" key={index}>
          <Alert {...alertProps} />
        </div>
      );
    });
  }, [alerts, handleCloseAlert, handleCloseAlertByClick]);

  return (
    <div className="fixed z-[1000] right-1">
      {renderAlerts}
    </div>
  );
};
