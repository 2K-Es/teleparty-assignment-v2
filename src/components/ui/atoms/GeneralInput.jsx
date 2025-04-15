import { memo } from 'react';
import { Input } from '@chakra-ui/react';

const GeneralInput = (props) => <Input variant={'subtle'} {...props} />;

export default memo(GeneralInput);
