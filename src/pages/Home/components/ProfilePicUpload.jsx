import { memo, useState } from 'react';
import { useDispatch } from 'react-redux';

import _head from 'lodash/head';

import { LuFileImage } from 'react-icons/lu';
import { FileUpload, Image } from '@chakra-ui/react';

import { Button } from '@app/components/ui/atoms';
import { githubRepoContants } from '@app/constants/githubRepo.constants';

import './styles.css';
import { parseImageAsUrl, generateUniqueFileName } from './helpers';

const ProfilePicUpload = () => {
  const [imageSrc, setImageSrc] = useState('');
  const dispatch = useDispatch();

  const uploadToGitHub = async (file) => {
    const fileName = `profile-pics/${generateUniqueFileName(file)}`;
    const base64Content = await parseImageAsUrl(file);
    const content = base64Content.split(',')[1]; // Remove the data URL prefix

    const response = await fetch(
      `${githubRepoContants.GITHUB_API_URL}/repos/${githubRepoContants.GITHUB_REPO_OWNER}/${githubRepoContants.GITHUB_REPO_NAME}/contents/${fileName}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Upload profile picture: ${file.name}`,
          content: content,
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to upload file to GitHub');
    }

    return fileName;
  };

  const handleFileChange = async (files) => {
    const acceptedFileObject = _head(files.acceptedFiles);
    if (!acceptedFileObject) return;

    try {
      // Upload the file to GitHub
      const uniqueId = await uploadToGitHub(acceptedFileObject);

      setImageSrc(uniqueId);
      dispatch({
        type: 'userDetails/setUserProfilePic',
        payload: uniqueId,
      });
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="profilePicUploaderContainer">
      {imageSrc && (
        <Image
          src={`https://raw.githubusercontent.com/2K-Es/teleparty-assignment-v2/main/${imageSrc}`}
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
