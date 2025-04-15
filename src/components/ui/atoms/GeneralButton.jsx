import { memo } from 'react';
import { Button } from '@chakra-ui/react';

const GeneralButton = (props) => <Button variant={'outline'} {...props} />;

export default memo(GeneralButton);
