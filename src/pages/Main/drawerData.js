import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import TimelineIcon from '@mui/icons-material/Timeline';
import GroupIcon from '@mui/icons-material/Group';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import SettingsIcon from '@mui/icons-material/Settings';
import ViewListIcon from '@mui/icons-material/ViewList';
import AddCardIcon from '@mui/icons-material/AddCard';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import PermDataSettingIcon from '@mui/icons-material/PermDataSetting';

export const drawerData = [
  {
    name: 'Dashboard',
    icon: <DashboardIcon className="dashboard" sx={{ fill: 'fill' }} />,
    link: '/dashboard',
    showMenu: true,
    key: 'dashboard',
    subList: [
      {
        name: 'Top Categories',
        icon: <CategoryIcon />,
        link: '/topcats',
        showMenu: false,
      },
      {
        name: 'Analysis',
        icon: <TimelineIcon />,
        link: '/analysis',
        showMenu: false,
      },
    ],
  },
  {
    name: 'Clients',
    link: '/clients',
    icon: <GroupIcon className="clients" sx={{ fill: 'fill' }} />,
    showMenu: true,
    key: 'client',
    subList: [
      {
        name: 'Project',
        link: '/projects',
        icon: <AccountTreeIcon />,
        showMenu: true,
        key: 'project',
      },
      {
        name: 'Location',
        link: '/locations',
        icon: <LocationOnIcon />,
        key: 'location',
        showMenu: true,
      },
    ],
  },
  {
    name: 'Parts',
    link: '/parts',
    icon: <Inventory2Icon className="parts" sx={{ fill: 'fill', fontSize: '2rem !important' }} />,
    showMenu: true,
    key: 'part',
    subList: [
      {
        name: 'List Parts',
        link: '/partcatalog',
        icon: <ViewListIcon />,
        showMenu: false,
      },
      {
        name: 'Add Parts',
        link: '/partadd',
        icon: <AddCardIcon />,
        showMenu: false,
      },
    ],
  },
  {
    name: 'Settings',
    link: '/admin-settings',
    icon: <SettingsIcon className="settings" sx={{ fill: 'fill' }} />,
    showMenu: false,
  },
  {
    name: 'Users',
    link: '/user-settings',
    icon: <ManageAccountsIcon className="users" sx={{ fill: 'fill' }} />,
    showMenu: true,
    key: 'user',
    subList: [
      {
        name: 'Menu Access',
        link: '/menu-access',
        icon: <DisplaySettingsIcon />,
        showMenu: false,
      },
      {
        name: 'Data Access',
        link: '/data-access',
        icon: <PermDataSettingIcon />,
        showMenu: false,
      },
    ],
  },
];
