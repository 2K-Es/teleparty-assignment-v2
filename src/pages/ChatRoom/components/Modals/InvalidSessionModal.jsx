import { memo, useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import GeneralDialog from '@app/components/ui/GeneralDialog';
import { useNavigate } from 'react-router';

const InvalidSessionModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isOpen = useSelector(
    (state) => state.modals.isChatRoomInvalidSessionModalOpen
  );

  const handleConfirm = useCallback(() => {
    dispatch({
      type: 'modals/setIsChatRoomInvalidSessionModalOpen',
      payload: false,
    });
    navigate('/chat');
  }, [dispatch, navigate]);

  return (
    <GeneralDialog
      isOpen={isOpen}
      showSecondary={false}
      showClose={false}
      onPrimaryClick={handleConfirm}
      title="Invalid Room Id"
      description="Please return to previous page"
    />
  );
};

export default memo(InvalidSessionModal);
