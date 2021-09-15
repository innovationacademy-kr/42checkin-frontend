import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import * as moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from '../components/Grid/GridItem.js';
import GridContainer from '../components/Grid/GridContainer.js';
import Table from '../components/Table/Table.js';
import Card from '../components/Card/Card.js';
import CardHeader from '../components/Card/CardHeader.js';
import CardBody from '../components/Card/CardBody.js';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SettingsIcon from '@material-ui/icons/Settings';

import PaginationRounded from '../components/Paging';
import SearchBar from '../components/SearchBar';
import StatusBoard from '../../components/StatusBoard';
import { forceCheckOut, checkAdmin as getCheckAdmin } from '../api/api';

import '../assets/styles/AdminPage.css';

const LOGTYPE = {
  0: '클러스터',
  1: '인트라 ID',
  2: '카드 번호',
  3: '미반납 카드'
};
const styles = {
  root: {
    flexGrow: 1,
    maxWidth: ''
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '500',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontSize: '65%',
      fontWeight: '400',
      lineHeight: '1'
    }
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  settingBtn: {
    background: 'white',
    '&:hover': {
      background: 'white'
    }
  }
};

const useStyles = makeStyles(styles);

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  };
}

function CheckInLog() {
  const history = useHistory();
  const [logType, setLogType] = useState(0);
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(1);

  const [clusterType, setClusterType] = useState('0');
  const [login, setLogin] = useState('');
  const [cardId, setCardId] = useState(0);

  const [lastPage, setLastPage] = useState(1);

  const ref = useRef();

  const classes = useStyles();
  const tableHead = ['ID', '시간', '출/입', '인트라 ID', '카드 번호', '클러스터', '강제 퇴실'];

  const [listSize, setListSize] = useState(50);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = e => {
    setListSize(e.target.innerText);
    setAnchorEl(null);
  };

  const handleChange = (event, newValue) => {
    if (logType !== newValue) {
      setLogs([]);
      setPage(1);
      setLogType(newValue);
      setLogin('');
      setCardId(0);
      setLastPage(0);
    }
  };

  const checkAdmin = useCallback(async () => {
    try {
      const response = await getCheckAdmin();
      if (!(response.data && response.data.isAdmin)) {
        window.alert('접근 권한이 없습니다.');
        history.push('/');
      }
    } catch (err) {
      console.log(err);
      window.alert('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      history.push('/');
    }
  }, [history]);

  const checkOutOnClick = async e => {
    try {
      const userId = e.target.dataset.idx;
      if (userId) {
        window.confirm('퇴실 처리 하시겠습니까?');
        await forceCheckOut(userId);
        setLogs([]);
        ref.current.onSubmit(e);
      } else {
        window.alert('유효한 인트라 ID가 아닙니다.');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkAdmin();
  }, [checkAdmin]);

  return (
    <div style={{}}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <StatusBoard></StatusBoard>
      </div>
      <div style={{ marginBottom: '5px' }}>
        <Button
          className={classes.settingBtn}
          startIcon={<SettingsIcon />}
          onClick={() => {
            history.push('/admin/setting');
          }}
        >
          Setting
        </Button>
      </div>
      <Paper className={classes.root}>
        <Tabs
          value={logType}
          onChange={handleChange}
          indicatorColor='primary'
          textColor='primary'
          centered
        >
          <Tab label='클러스터' {...a11yProps(0)} />
          <Tab label='인트라 ID' {...a11yProps(1)} />
          <Tab label='카드 번호' {...a11yProps(2)} />
          <Tab label='미반납 카드' {...a11yProps(3)} />
        </Tabs>
      </Paper>
      <SearchBar
        type={logType}
        setLogs={setLogs}
        ref={ref}
        page={page}
        setPage={setPage}
        clusterType={clusterType}
        setClusterType={setClusterType}
        login={login}
        setLogin={setLogin}
        cardId={cardId}
        setCardId={setCardId}
        setLastPage={setLastPage}
        listSize={listSize}
      />
      <PaginationRounded lastPage={lastPage} setPage={setPage} />
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color='info' className={classes.header}>
              <h4 className={classes.cardTitleWhite}>{LOGTYPE[logType]} 로그</h4>
              <div>
                <Button
                  aria-controls='simple-menu'
                  aria-haspopup='true'
                  onClick={handleClick}
                  variant='outlined'
                  disabled={logType === 3}
                >
                  size: {listSize}
                </Button>
                <Menu id='simple-menu' anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)}>
                  <MenuItem onClick={handleClose}>10</MenuItem>
                  <MenuItem onClick={handleClose}>30</MenuItem>
                  <MenuItem onClick={handleClose}>50</MenuItem>
                  <MenuItem onClick={handleClose}>100</MenuItem>
                </Menu>
              </div>
            </CardHeader>
            <CardBody>
              <Table
                tableHead={tableHead}
                tableData={logs.map((log, idx) => {
                  const date = new Date(log.createdAt);
                  return [
                    log.id ?? (page - 1) * listSize + idx + 1,
                    moment(date).format('MM월 DD일 HH:mm') ?? null,
                    log.logType ?? null,
                    log.user ? log.user.userName : null,
                    log.card ? log.card.cardId.toString() : null,
                    log.card ? (log.card.type === 0 ? '개포' : '서초') : null,
                    log.user ? (
                      log.card.cardId === log.user.cardId ? (
                        <button
                          className='force-out-Btn'
                          onClick={checkOutOnClick}
                          data-idx={log.user._id}
                        >
                          퇴실 처리
                        </button>
                      ) : null
                    ) : null
                  ];
                })}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

export default CheckInLog;
