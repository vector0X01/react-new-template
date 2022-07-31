import React, { useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { BreadCrumb } from 'primereact/breadcrumb';
import clsx from 'clsx';
import Appbar from './Appbar';
import Drawer from './Drawer';
import Bg from '../../assets/images/bg.jpg';
import { selectUser, getUserMenu } from '../../redux/slice/userSlice';
import { drawerData } from './drawerData';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const appBarHeight = 64;
const drawerFullWidth = 230;
const drawerShortWidth = 70;
const headContentHeight = 102;

const useStyles = makeStyles(() => ({
  root: {
    background: `url(${Bg}) top center fixed no-repeat`,
    backgroundSize: 'cover',
    height: '100vh',
    width: '100%',
  },
  appBar: {
    height: `${appBarHeight}px`,
    width: '100%',
  },
  main: {
    display: 'flex',
    height: `calc(100% - ${appBarHeight}px)`,
  },
  drawer: {
    height: '100%',
    width: `${drawerFullWidth}px`,
    transition: 'width 0.5s',
  },
  drawerSmall: {
    width: `${drawerShortWidth}px`,
  },
  drawerHide: {
    display: 'none',
  },
  content: {
    height: '100%',
    width: `calc(100% - ${drawerFullWidth}px)`,
    overflow: 'auto',
    padding: '10px 20px',
    boxSizing: 'border-box',
  },
  innerContent: {
    height: '100%',
    boxSizing: 'border-box',
    overflow: 'auto',
  },
  headContent: {
    height: `${headContentHeight}px`,
  },
  heading: {
    color: '#FFFFFF',
  },
  mainContent: {
    borderRadius: '0 0 8px 8px',
    overflow: 'auto',
    boxSizing: 'border-box',
    height: `calc(100% - ${headContentHeight}px)`,
  },
  contentExpand: {
    width: `calc(100% - ${drawerShortWidth}px)`,
  },
  contentFull: {
    width: '100%',
  },
  breadcrumb: {
    backgroundColor: '#1414141f',
    border: '0px',
    borderBottom: '2px solid #ffffff59',
    borderRadius: '5px 5px 0 0',
    fontSize: '14px',
    marginBottom: '10px',
    '& .pi,span': {
      color: '#FFF !important',
    },
  },
}));

const Layout = (props) => {
  const { children = null } = props;
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { userData } = useSelector(selectUser);
  const classes = useStyles();
  const matches900 = useMediaQuery('(min-width:900px)');
  const matches500 = useMediaQuery('(min-width:500px)');

  useEffect(() => {
    if (userData) {
      dispatch(getUserMenu({ params: { previlegeName: userData?.menuaccess } }));
    }
  }, [userData]);

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  const headingValue = useMemo(() => {
    const data = drawerData.find((item) => item.link === location.pathname);
    if (data) {
      return data.name;
    }
    const subData = drawerData.find((item) => {
      return item.subList?.some((subItem) => subItem.link === location.pathname);
    });
    if (subData) {
      return subData.subList.find((item) => item.link === location.pathname).name;
    }
  }, [location]);

  const items = [{ label: headingValue }];

  const home = { icon: 'pi pi-th-large', command: () => navigate('/dashboard') };

  return (
    <div className={classes.root}>
      <div className={classes.appBar}>
        <Appbar />
      </div>
      <div className={classes.main}>
        <div
          className={clsx(classes.drawer, { [classes.drawerSmall]: !matches900, [classes.drawerHide]: !matches500 })}
        >
          <Drawer />
        </div>
        <div
          className={clsx(classes.content, {
            [classes.contentExpand]: !matches900,
            [classes.contentFull]: !matches500,
          })}
        >
          <div className={classes.innerContent}>
            <div className={classes.headContent}>
              <Typography className={classes.heading} variant="h4">
                {headingValue}
              </Typography>
              <BreadCrumb className={classes.breadcrumb} model={items} home={home} />
            </div>
            <div className={classes.mainContent}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
