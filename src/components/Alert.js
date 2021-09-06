import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const styles = {
  info: {
    background: 'rgba(0, 0, 0, 0.5)'
  }
};

const useStyles = makeStyles(styles);

export default function Alert(props) {
  const classes = useStyles();
  return <MuiAlert elevation={6} variant='filled' {...props} className={classes.info} />;
}
