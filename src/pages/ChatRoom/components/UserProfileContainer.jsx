import { memo } from 'react';
import PropTypes from 'prop-types';

import _isEmpty from 'lodash/isEmpty';

import { Image } from '@chakra-ui/react';

import PropertyControlledComponent from '@app/hoc/PropertyControlledComponent';
import { githubRepoContants } from '@app/constants/githubRepo.constants';

import './styles.css';

const UserProfileContainer = ({ userProfilePic, userName }) => {
  return (
    <div className="userProfileContainer">
      <h3>User: </h3>
      <PropertyControlledComponent
        controllerProperty={!_isEmpty(userProfilePic)}
      >
        <Image
          src={`${githubRepoContants.GITHUB_USERCONTENT_LINK}/${userProfilePic}`}
          alt="Uploaded Profile Pic"
          boxSize="40px"
          borderRadius="full"
        />
      </PropertyControlledComponent>
      <span>{userName}</span>
    </div>
  );
};

UserProfileContainer.propTypes = {
  userProfilePic: PropTypes.string,
  userName: PropTypes.string,
};

export default memo(UserProfileContainer);
