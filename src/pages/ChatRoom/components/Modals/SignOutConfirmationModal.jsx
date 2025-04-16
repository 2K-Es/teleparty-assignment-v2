import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import telepartyClientInstance from '@app/utils/telepartyClientInstance';
import GeneralDialog from '@app/components/ui/GeneralDialog';

const SignOutConfirmationModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isOpen = useSelector(
    (state) => state.modals.isSignOutConfirmationModalOpen
  );

  const handleConfirm = useCallback(() => {
    dispatch({
      type: 'modals/setIsSignOutConfirmationModalOpen',
      payload: false,
    });
    telepartyClientInstance.disconnect();
    dispatch({ type: 'chat/clearMessages' });
    navigate('/');
  }, [dispatch, navigate]);

  const handleClose = useCallback(() => {
    dispatch({
      type: 'modals/setIsSignOutConfirmationModalOpen',
      payload: false,
    });
  }, [dispatch]);

  return (
    <GeneralDialog
      isOpen={isOpen}
      onPrimaryClick={handleConfirm}
      onClose={handleClose}
      title="Sign Out"
      description="Are you sure you want to sign out?"
    />
  );
};

export default memo(SignOutConfirmationModal);
