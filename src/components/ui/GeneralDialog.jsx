import React, { memo } from 'react';
import PropTypes from 'prop-types';

import {
  Dialog,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  CloseButton,
  Portal,
  DialogBackdrop,
  DialogPositioner,
} from '@chakra-ui/react';
import PropertyControlledComponent from '@app/hoc/PropertyControlledComponent';
import { Button } from './atoms';

/**
 * A generic dialog component that allows a user to confirm or cancel an action.
 *
 * @param {boolean} isOpen - A boolean indicating whether the dialog is open or not.
 * @param {boolean} showClose - A boolean indicating whether to show the close button. Defaults to true.
 * @param {Function} onClose - A callback function when the dialog is closed.
 * @param {string} title - The title of the dialog.
 * @param {string} description - The description of the dialog.
 * @param {string} primaryButtonText - The text of the primary button. Defaults to 'Confirm'.
 * @param {Function} onPrimaryClick - A callback function when the primary button is clicked.
 * @param {boolean} isPrimaryLoading - A boolean indicating whether the primary button is in a loading state. Defaults to false.
 * @param {boolean} isPrimaryDisabled - A boolean indicating whether the primary button is disabled. Defaults to false.
 * @param {boolean} showSecondary - A boolean indicating whether to show the secondary button. Defaults to true.
 * @param {string} secondaryButtonText - The text of the secondary button. Defaults to 'Cancel'.
 * @param {Function} onSecondaryClick - A callback function when the secondary button is clicked.
 * @param {boolean} hideFooter - A boolean indicating whether to hide the footer with the buttons. Defaults to false.
 */
const GeneralDialog = ({
  isOpen,
  showClose = true,
  onClose,
  title,
  description,
  primaryButtonText = 'Confirm',
  onPrimaryClick,
  isPrimaryLoading = false,
  isPrimaryDisabled = false,
  showSecondary = true,
  secondaryButtonText = 'Cancel',
  onSecondaryClick,
  hideFooter = false,
}) => {
  const handleSecondary = () => {
    if (onSecondaryClick) onSecondaryClick();
    else onClose();
  };

  return (
    <Dialog.Root open={isOpen}>
      <Portal>
        <DialogBackdrop />
        <DialogPositioner>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
            </DialogHeader>
            <DialogBody>
              <DialogDescription>{description}</DialogDescription>
            </DialogBody>
            <PropertyControlledComponent controllerProperty={!hideFooter}>
              <DialogFooter>
                <PropertyControlledComponent controllerProperty={showSecondary}>
                  <Dialog.ActionTrigger asChild>
                    <Button onClick={handleSecondary} variant="outline">
                      {secondaryButtonText}
                    </Button>
                  </Dialog.ActionTrigger>
                </PropertyControlledComponent>
                <Button
                  isLoading={isPrimaryLoading}
                  isDisabled={isPrimaryDisabled}
                  onClick={onPrimaryClick}
                >
                  {primaryButtonText}
                </Button>
              </DialogFooter>
            </PropertyControlledComponent>
            <PropertyControlledComponent controllerProperty={showClose}>
              <DialogCloseTrigger asChild>
                <CloseButton size="sm" />
              </DialogCloseTrigger>
            </PropertyControlledComponent>
          </DialogContent>
        </DialogPositioner>
      </Portal>
    </Dialog.Root>
  );
};

GeneralDialog.propTypes = {
  isOpen: PropTypes.bool,
  showClose: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  primaryButtonText: PropTypes.string,
  onPrimaryClick: PropTypes.func,
  isPrimaryLoading: PropTypes.bool,
  isPrimaryDisabled: PropTypes.bool,
  showSecondary: PropTypes.bool,
  secondaryButtonText: PropTypes.string,
  onSecondaryClick: PropTypes.func,
  hideFooter: PropTypes.bool,
  children: PropTypes.node,
};

export default memo(GeneralDialog);
