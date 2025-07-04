import type { UserOrAnonymousDto } from 'api/@types/user';
import { useState } from 'react';

export const useUserOrAnonymousState = () => {
  const [userOrAnonymous, setUserOrAnonymous] = useState<UserOrAnonymousDto | null>(null);

  return {
    userOrAnonymous,
    setUserOrAnonymous,
  };
};
