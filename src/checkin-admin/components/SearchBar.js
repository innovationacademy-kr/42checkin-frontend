import React, { forwardRef, useImperativeHandle, useEffect, useCallback } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Looks4Icon from '@material-ui/icons/Looks4';
import LooksTwoIcon from '@material-ui/icons/LooksTwo';
import { debounce } from 'lodash';

import { getCluster, getStudent, getCard, getCheckIn } from '../api/api';

import '../assets/styles/SearchBar.css';

const SearchBar = forwardRef(
  (
    {
      type,
      setLogs,
      page,
      setPage,
      clusterType,
      setClusterType,
      login,
      setLogin,
      cardId,
      setCardId,
      setLastPage,
      listSize
    },
    ref
  ) => {
    useImperativeHandle(ref, () => ({
      onSubmit
    }));

    const useStyles = makeStyles(() => ({
      margin: {
        display: 'flex',
        width: '100%',
        height: '10vh',
        minHeight: '60px',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'white',
        color: 'black'
      }
    }));
    const classes = useStyles();

    const onSubmit = useCallback(
      async e => {
        try {
          let response;
          switch (type) {
            case 0:
              response = await getCluster(clusterType, page, listSize);
              break;
            case 1:
              if (login) response = await getStudent(login, page, listSize);
              else throw new Error('유효한 인트라 ID를 입력하세요.');
              break;
            case 2:
              if (cardId !== 0 && cardId !== '') response = await getCard(cardId, page, listSize);
              else throw new Error('유효한 카드 번호를 입력하세요.');
              break;
            case 3:
              response = await getCheckIn(clusterType, page);
              break;
            // case 4:
            //   response = await getAllCard(clusterType, page);
            //   break;
            default:
              break;
          }
          if (response.data.list) {
            let datas;
            datas = response.data.list;
            setLogs(datas);
            setLastPage(response.data.lastPage);
          } else {
            setLogs([]);
            setLastPage(0);
            throw new Error('response 형식이 올바르지 않습니다.');
          }
        } catch (err) {
          console.log(err);
        }
      },
      [cardId, clusterType, listSize, login, page, setLastPage, setLogs, type]
    );

    const handleChange = event => {
      setLogs([]);
      setClusterType(event.target.value);
    };

    const handleKeyDown = event => {
      if (event.code === 'Enter') {
        onSubmit();
      }
    };

    const handleChangeWithDebounce = debounce(e => {
      if (e.target.id === 'intra-id') setLogin(e.target.value);
      else if (e.target.id === 'card-number') setCardId(e.target.value);
    }, 200);

    useEffect(() => {
      if (!(type === 1 && !login) && !(type === 2 && !cardId)) onSubmit();
    }, [type, login, cardId, onSubmit]);

    const Cluster = () => (
      <div className={classes.margin}>
        <FormControl component='fieldset'>
          <RadioGroup name='cluster' value={clusterType} onChange={handleChange} row>
            <FormControlLabel
              value='0'
              control={<Radio color='default' size='small' />}
              label='개포'
            />
            <FormControlLabel
              value='1'
              control={<Radio color='default' size='small' />}
              label='서초'
            />
          </RadioGroup>
        </FormControl>
      </div>
    );

    const Student = () => (
      <div className={classes.margin}>
        <Grid container spacing={1} justifyContent='center' alignItems='flex-end'>
          <Grid item>
            <AccountCircle />
          </Grid>
          <Grid item>
            <TextField
              id='intra-id'
              label='인트라 ID'
              onChange={handleChangeWithDebounce}
              onKeyDown={handleKeyDown}
            />
          </Grid>
          <Grid item>
            <Button variant='outlined' onClick={onSubmit}>
              조회
            </Button>
          </Grid>
        </Grid>
      </div>
    );

    const Card = () => (
      <div className={classes.margin}>
        <Grid container spacing={1} justifyContent='center' alignItems='flex-end'>
          <Grid item>
            <Looks4Icon />
            <LooksTwoIcon />
          </Grid>
          <Grid item>
            <TextField
              id='card-number'
              label='카드 번호'
              type='number'
              onChange={handleChangeWithDebounce}
              onKeyDown={handleKeyDown}
            />
          </Grid>
          <Grid item>
            <Button variant='outlined' onClick={onSubmit}>
              조회
            </Button>
          </Grid>
        </Grid>
      </div>
    );
    switch (type) {
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
  }
);

export default SearchBar;
