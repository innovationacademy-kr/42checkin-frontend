import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
// core components
import GridItem from '../components/Grid/GridItem.js';
import GridContainer from '../components/Grid/GridContainer.js';
import Table from '../components/Table/Table.js';
import Card from '../components/Card/Card.js';
import CardHeader from '../components/Card/CardHeader.js';
import CardBody from '../components/Card/CardBody.js';

import SearchBar from '../components/SearchBar';
import { forceCheckOut, checkAdmin as getCheckAdmin } from '../api/api';
import '../assets/styles/AdminPage.css';

const styles = {
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

  const handleFilterBtn = ({ target }) => {
    setLogs([]);
    setLogType(+target.dataset.idx);
    setPage(0);
  };

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
  }, []);

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
          <button className='filterBtn' data-idx='0' onClick={handleFilterBtn}>
            클러스터
          </button>
          <button className='filterBtn' data-idx='1' onClick={handleFilterBtn}>
            인트라 ID
          </button>
          <button className='filterBtn' data-idx='2' onClick={handleFilterBtn}>
            카드 번호
          </button>
          <button className='filterBtn' data-idx='3' onClick={handleFilterBtn}>
            미반납 카드
          </button>
          <button className='filterBtn' data-idx='4' onClick={handleFilterBtn}>
            모든 카드 정보
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
            )}
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

export default AdminPage;
