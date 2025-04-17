import { githubRepoContants } from '@app/constants/githubRepo.constants';

import { generateUniqueFileName, parseImageAsUrl } from './helpers';

const uploadToGitHub = async (file) => {
  const fileName = `profile-pics/${generateUniqueFileName(file)}`;
  const imageUrl = await parseImageAsUrl(file);
  const content = imageUrl.split(',')[1]; // Remove the data URL prefix

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

export { uploadToGitHub };
