import React, { forwardRef, useImperativeHandle, useState } from 'react';
import '../assets/styles/SearchBar.css';
import Paging from './Paging';
import { getCluster, getStudent, getCard, getCheckIn, getAllCarad } from '../api/api';
import { gaepoCard, seochoCard } from '../../utils/cardList';

const SearchBar = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    onSubmit
  }));
  const [ClusterType, setClusterType] = useState(0);
  const [Login, setLogin] = useState('');
  const [CardId, setCardId] = useState(0);

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
          response = await getCluster(ClusterType, props.Page);
          break;
        case 1:
          response = await getStudent(Login, props.Page);
          break;
        case 2:
          response = await getCard(CardId, props.Page);
          break;
        case 3:
          response = await getCheckIn(ClusterType);
          break;
        case 4:
          response = await getAllCarad(ClusterType);
          break;
        default:
          break;
      }
      let data;
      data = response.data;
      if (props.type === 3 || props.type === 4) {
        data = response.data
          .filter((item, index) => {
            return (
              response.data.findIndex((item2, i) => {
                return item.user._id === item2.user._id;
              }) === index
            );
          })
          .reverse();
      }
      if (props.type === 4) {
        let newdata = [];
        const card = ClusterType == 0 ? gaepoCard : seochoCard;
        card.map((item, index) => {
          const tmp = data.find(ele => {
            if (ele.card.cardId === item) return true;
          });
          newdata.push({ id: item, ...tmp });
        });
        data = newdata;
      }
      props.setLogs(data);
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
              value={0}
              checked={ClusterType == 0}
              onChange={handleClick}
            />
            개포
          </label>
          <label>
            <input
              type='radio'
              name='cluster'
              value={1}
              checked={ClusterType == 1}
              onChange={handleClick}
            />
            서초
          </label>
          <button onClick={onSubmit}>불러오기</button>
        </div>
        <Paging Page={props.Page} setPage={props.setPage} />
      </form>
    </div>
  );

  const Student = () => (
    <div className='control-section'>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          name='로그인'
          value={Login}
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
          value={CardId}
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
