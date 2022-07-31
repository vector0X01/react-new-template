import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import clsx from 'clsx';
import { selectLayout, drawerToggle } from '../../redux/slice/layoutSlice';
import { drawerData } from './drawerData';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    padding: '10px 5px',
    boxSizing: 'border-box',
  },
  itemContainer: {
    borderRadius: '8px',
    backgroundColor: '#FFFFFFB0',
    height: '100%',
    paddingTop: '12px',
    boxSizing: 'border-box',
  },
  listText: {
    minWidth: '85px !important',
  },
  listButton: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0px !important',
  },
  listItems: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '8px 16px',
    boxSizing: 'border-box',
  },
  noMinWidth: {
    minWidth: 'unset !important',
  },
  onFocus: {
    backgroundColor: '#1CB5DD !important',
  },
}));

const DrawerItem = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const layout = useSelector(selectLayout);
  const dispatch = useDispatch();
  const [collapseIndex, setCollapseIndex] = useState(-1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const matches900 = useMediaQuery('(min-width:900px)');
  const matches500 = useMediaQuery('(min-width:500px)');

  const handleClick = (link, name, e) => {
    e.preventDefault();
    if (!layout.drawerOpen && !matches900) {
      const menuData = drawerData.find((item) => item.name === name);
      const items = [{ ...menuData }];
      if (menuData.subList?.length) {
        menuData.subList.forEach((item) => items.push(item));
      }
      setMenuItems(items);
      setAnchorEl(e.currentTarget);
    } else {
      navigate(link);
    }
  };

  useEffect(() => {
    if (anchorEl) {
      setAnchorEl(null);
    }
  }, [layout]);

  const handleCollapse = (index, e) => {
    e.preventDefault();
    e.stopPropagation();
    setCollapseIndex(index === collapseIndex ? -1 : index);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuSelect = () => {
    setAnchorEl(null);
    setMenuItems([]);
  };

  const handleSubClick = (e, link) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(link);
  };

  const toggleDrawer = () => {
    dispatch(drawerToggle());
  };

  const checkWidth = () => {
    if (layout.drawerOpen && !matches500) {
      return false;
    }
    return !matches900;
  };

  const checkFocus = (link) => {
    if (location.pathname === link) return true;
    return false;
  };

  const renderDrawerList = () => {
    return drawerData.map((item, i) => {
      if ((item.hasOwnProperty('showItem') && item.showItem) || !item.hasOwnProperty('showItem'))
        return (
          <span key={item.name}>
            <ListItemButton
              className={classes.listButton}
              name={item.name}
              onClick={(e) => handleClick(item.link, item.name, e)}
              aria-controls="menu-appbar"
              aria-haspopup={!layout.drawerOpen && checkWidth()}
            >
              <div className={clsx(classes.listItems, { [classes.onFocus]: checkFocus(item.link) })}>
                <ListItemIcon className={clsx({ [classes.noMinWidth]: checkWidth() })}>
                  {item.icon && item.icon}
                </ListItemIcon>
                <ListItemText className={classes.listText} primary={item.name} hidden={checkWidth()} />
                {!checkWidth() && item.subList ? (
                  <div onClick={(e) => handleCollapse(i, e)}>
                    {collapseIndex === i ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </div>
                ) : (
                  <div hidden={checkWidth()} style={{ height: 24, width: 24 }} />
                )}
              </div>
              {item.subList && item.subList.length > 1 ? (
                <Collapse in={collapseIndex === i} timeout="auto" unmountonedit="true">
                  <List component="nav" disablePadding>
                    {item.subList.map((subItem) => {
                      if (
                        (subItem.hasOwnProperty('showItem') && subItem.showItem) ||
                        !subItem.hasOwnProperty('showItem')
                      )
                        return (
                          <span key={subItem.name}>
                            <Divider variant="middle" />
                            <ListItemButton
                              className={clsx(classes.listButton, { [classes.onFocus]: checkFocus(subItem.link) })}
                              onClick={(e) => handleSubClick(e, subItem.link)}
                            >
                              <div className={classes.listItems}>
                                <ListItemIcon className={clsx({ [classes.noMinWidth]: checkWidth() })}>
                                  {subItem.icon && subItem.icon}
                                </ListItemIcon>
                                <ListItemText
                                  className={classes.listText}
                                  primary={subItem.name}
                                  hidden={checkWidth()}
                                />
                              </div>
                            </ListItemButton>
                          </span>
                        );
                    })}
                  </List>
                </Collapse>
              ) : null}
            </ListItemButton>

            <Divider variant="middle" />
          </span>
        );
    });
  };

  return (
    <>
      <Drawer anchor="left" open={layout.drawerOpen && !matches500} onClose={toggleDrawer}>
        {renderDrawerList()}
      </Drawer>
      <div className={classes.root}>
        <div className={classes.itemContainer}>{renderDrawerList()}</div>
      </div>
      <Menu
        id="drawer-menu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {menuItems.map((item) => (
          <ListItemButton
            key={item.name}
            className={clsx(classes.listButton, { [classes.onFocus]: checkFocus(item.link) })}
            component={Link}
            to={item.link}
            onClick={handleMenuSelect}
          >
            <div className={classes.listItems}>
              <ListItemIcon>{item.icon && item.icon}</ListItemIcon>
              <ListItemText className={classes.listText} primary={item.name} />
            </div>
          </ListItemButton>
        ))}
      </Menu>
    </>
  );
};

export default DrawerItem;
