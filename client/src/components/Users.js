import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ListGroup, Row, Col, Button } from "react-bootstrap";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'react-timeago'
import fromnowStrings from 'react-timeago/lib/language-strings/fr'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import Editable from "./tables/Editable";


function Users() {
  const [cols, setcols] = useState([
    { title: 'Name', field: 'name' },
    { title: 'Email', field: 'email' }
  ])
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const history = useHistory('')


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [state, setstate] = useState([]);

  const [dlt, setdlt] = useState('')
  const handleDelete = (id) => {
    console.log(id)
    axios.delete('http://localhost:4000/api/users/' + id)
      .then((res) => {
        console.log(res.data);
        setdlt(`${id} is deleted successfully`);
        window.location='/users'
        // history.push('/users')
        setOpen(false)
        
      })
      .catch((e) => console.log(e));


  }
  useEffect(() => {
    async function fetchUsers() {
      const users = await axios.get('http://localhost:4000/api/users')
      console.log(users.data.data);
      setstate(users.data.data)

    }
    fetchUsers()
  }, []);
  
  return (
    <Editable rows={state} cols={cols}/>
  );
}

export default Users;
