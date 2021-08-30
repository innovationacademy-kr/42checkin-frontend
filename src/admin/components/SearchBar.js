import React, { forwardRef, useImperativeHandle, useState } from 'react';
import '../assets/styles/SearchBar.css';
import Paging from './Paging';
import { getCluster, getStudent, getCard, getCheckIn, getAllCard } from '../api/api';
import { gaepoCard, seochoCard } from '../utils/cardList';

const SearchBar = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    onSubmit
  }));
  const [clusterType, setClusterType] = useState('0');
  const [login, setLogin] = useState('');
  const [cardId, setCardId] = useState(0);

  const handleClick = e => {
    props.setLogs([]);
    setClusterType(e.target.value);
    props.setPage(0);
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      let response;
      switch (props.type) {
        case 0:
          response = await getCluster(clusterType, props.Page);
          break;
        case 1:
          response = await getStudent(login, props.Page);
          break;
        case 2:
          response = await getCard(cardId, props.Page);
          break;
        case 3:
          response = await getCheckIn(clusterType);
          break;
        case 4:
          response = await getAllCard(clusterType);
          break;
        default:
          break;
      }
      let datas;
      datas = response.data;
      if (props.type === 3 || props.type === 4) {
        datas = response.data
          .filter(
            (item, index) =>
              response.data.findIndex(item2 => item.user._id === item2.user._id) === index
          )
          .reverse();
        if (props.type === 4) {
          let newdata = [];
          const card = clusterType === '0' ? gaepoCard : seochoCard;
          card.map(item => {
            return newdata.push({ id: item, ...datas.find(ele => ele.card.cardId === item) });
          });
          datas = newdata;
        }
      }
      props.setLogs(datas);
    } catch (err) {
      console.log(err);
    }
  };

  const Cluster = () => (
    <div className='control-section'>
      <form onSubmit={onSubmit}>
        <div>
          <label>
            <input
              type='radio'
              name='cluster'
              value={'0'}
              checked={clusterType === '0'}
              onChange={handleClick}
            />
            개포
          </label>
          <label>
            <input
              type='radio'
              name='cluster'
              value={'1'}
              checked={clusterType === '1'}
              onChange={handleClick}
            />
            서초
          </label>
          <button onClick={onSubmit}>불러오기</button>
        </div>
        {props.type === 0 && <Paging Page={props.Page} setPage={props.setPage} />}
      </form>
    </div>
  );

  const Student = () => (
    <div className='control-section'>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          name='로그인'
          value={login}
          placeholder='인트라 아이디'
          onChange={e => {
            setLogin(e.target.value);
          }}
          style={{
            textAlign: 'center'
          }}
        />
        <button onClick={onSubmit}>불러오기</button>
        <Paging Page={props.Page} setPage={props.setPage} />
      </form>
    </div>
  );

  const Card = () => (
    <div className='control-section'>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          name='text'
          value={cardId}
          placeholder='카드번호'
          onChange={e => {
            setCardId(e.target.value);
          }}
          style={{
            textAlign: 'center'
          }}
        />
        <button onClick={onSubmit}>불러오기</button>
        <Paging Page={props.Page} setPage={props.setPage} />
      </form>
    </div>
  );
  switch (props.type) {
    case 0:
      return Cluster();
    case 1:
      return Student();
    case 2:
      return Card();
    case 3:
      return Cluster();
    default:
      return Cluster();
  }
});

export default SearchBar;
