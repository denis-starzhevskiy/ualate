import React, { useEffect } from 'react';
import SettingsView from '@/components/modules/settings';
import { getUsers } from '@/api/authAPI';

const Settings = () => {
  useEffect(() => {
    getUsers().then((result) => console.log(result));
  }, []);

  return <SettingsView />;
};

export default Settings;
