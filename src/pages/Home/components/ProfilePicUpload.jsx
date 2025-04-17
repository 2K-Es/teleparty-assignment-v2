import { memo, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import _head from 'lodash/head';

import { LuFileImage } from 'react-icons/lu';
import { FileUpload, Image } from '@chakra-ui/react';

import { Button } from '@app/components/ui/atoms';
import { githubRepoContants } from '@app/constants/githubRepo.constants';

import { uploadToGitHub } from './actions';
import './styles.css';

const ProfilePicUpload = () => {
  const [imageSrc, setImageSrc] = useState('');
  const dispatch = useDispatch();

  const handleFileChange = useCallback(
    async (files) => {
      const acceptedFileObject = _head(files.acceptedFiles);
      if (!acceptedFileObject) return;

      dispatch({
        type: 'userDetails/setIsUploadingProfilePic',
        payload: true,
      });

      try {
        const uniqueId = await uploadToGitHub(acceptedFileObject);

        setImageSrc(uniqueId);
        dispatch({
          type: 'userDetails/setUserProfilePic',
          payload: uniqueId,
        });
      } catch (error) {
        console.error('Error uploading file:', error);
      } finally {
        dispatch({
          type: 'userDetails/setIsUploadingProfilePic',
          payload: false,
        });
      }
    },
    [dispatch]
  );

  return (
    <div className="profilePicUploaderContainer">
      {imageSrc && (
        <Image
          src={`${githubRepoContants.GITHUB_USERCONTENT_LINK}/${imageSrc}`}
          alt="Uploaded Profile Pic"
          boxSize="150px"
          borderRadius="full"
        />
      )}
      <FileUpload.Root accept="image/*" onFileChange={handleFileChange}>
        <FileUpload.HiddenInput />
        <FileUpload.Trigger asChild>
          <Button size="xs">
            <LuFileImage />{' '}
            {imageSrc ? 'Change Profile Pic' : 'Upload Profile Pic'}
          </Button>
        </FileUpload.Trigger>
      </FileUpload.Root>
    </div>
  );
};

export default memo(ProfilePicUpload);
