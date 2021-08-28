import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
// core components
import GridItem from '../admin/components/Grid/GridItem.js';
import GridContainer from '../admin/components/Grid/GridContainer.js';
import Table from '../admin/components/Table/Table.js';
import Card from '../admin/components/Card/Card.js';
import CardHeader from '../admin/components/Card/CardHeader.js';
import CardBody from '../admin/components/Card/CardBody.js';
import { Button } from '@material-ui/core';

import SearchBar from '../components/SearchBar';
import { forceCheckOut, checkAdmin as getCheckAdmin } from '../api/api';
import '../styles/AdminPage.css';

const styles = {
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: '0',
      fontSize: '14px',
      marginTop: '0',
      marginBottom: '0'
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF'
    }
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
  }
};

const useStyles = makeStyles(styles);

function AdminPage() {
  const history = useHistory();
  const [logType, setLogType] = useState(0);
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(0);

  const ref = useRef();
  const classes = useStyles();
  const tableHead = ['ID', '시간', '출/입', '인트라 ID', '카드 번호', '클러스터', '강제 퇴실'];
  const checkAdmin = async () => {
    try {
      const response = await getCheckAdmin();
      if (!(response.data && response.data.isAdmin)) history.push('/checkin');
    } catch (err) {
      console.log(err);
      history.push('/');
    }
  };

  useEffect(() => {
    checkAdmin();
  }, []);

  const handleClusterButton = () => {
    setLogs([]);
    setLogType(0);
    setPage(0);
  };

  const handleStudentButton = () => {
    setLogs([]);
    setLogType(1);
    setPage(0);
  };

  const handleCardButton = () => {
    setLogs([]);
    setLogType(2);
    setPage(0);
  };

  const handleCheckInButton = () => {
    setLogs([]);
    setLogType(3);
    setPage(0);
  };

  const handleAllCaradButton = () => {
    setLogs([]);
    setLogType(4);
    setPage(0);
  };

  const checkOutOnClick = async e => {
    try {
      const userId = e.target.getAttribute('data');
      const response = await forceCheckOut(userId);
      setLogs([]);
      ref.current.onSubmit(e);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div className='selectorWrapper'>
        <div
          style={{
            display: 'flex',
            // width: "50%",
            justifyContent: 'center'
          }}
        >
          <button className='filterBtn' onClick={handleClusterButton}>
            클러스터 로그
          </button>
          <button className='filterBtn' onClick={handleStudentButton}>
            학생 로그
          </button>
          <button className='filterBtn' onClick={handleCardButton}>
            카드 로그
          </button>
          <button className='filterBtn' onClick={handleCheckInButton}>
            미반납 카뎃
          </button>
          <button className='filterBtn' onClick={handleAllCaradButton}>
            모든 카드 정보 보기
          </button>
        </div>
        <div
          style={{
            display: 'flex',
            width: '50%',
            padding: '1rem',
            height: '5rem'
          }}
        >
          <SearchBar type={logType} setLogs={setLogs} ref={ref} Page={page} setPage={setPage} />
        </div>
      </div>
      <div style={{ overflowX: 'scroll', margin: 'auto' }}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color='primary'>
                <h4 className={classes.cardTitleWhite}>Logs</h4>
                <p className={classes.cardCategoryWhite}></p>
              </CardHeader>
              {logs && (
                <CardBody>
                  <Table
                    tableHeaderColor='primary'
                    tableHead={tableHead}
                    tableData={logs.map((log, idx) => {
                      const date = new Date(log.createdAt);
                      return [
                        log.id ?? page * 50 + idx + 1,
                        moment(date).format('MM월 DD일 HH:mm') ?? null,
                        log.logType ?? null,
                        log.user ? log.user.userName : null,
                        log.card ? log.card.cardId.toString() : null,
                        log.card ? (log.card.type === 0 ? '개포' : '서초') : null,
                        log.card ? (
                          log.card.cardId === log.user.cardId ? (
                            <Button variant='outlined' onClick={checkOutOnClick}>
                              퇴실 처리
                            </Button>
                          ) : null
                        ) : null
                      ];
                    })}
                  />
                </CardBody>
              )}
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}

export default AdminPage;
