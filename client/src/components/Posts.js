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
import Editable from "./tables/Editable";

function Posts() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [state, setstate] = useState([]);
  const [msg, setmsg] = useState('')
  const [cols, setcols] = useState([
    { title: 'title', field: 'title' },
    { title: 'description', field: 'description' }
  ])

  const handleDelete = (id)=>{
    console.log(id)
    axios.delete('http://localhost:4000/api/posts/'+id)
    .then((res) => {
      console.log(res.data);
      setmsg(`${id} is deleted successfully`);
      setOpen(false)
    })
    .catch((e) => console.log(e));


  }
  useEffect(() => {
      axios.get('http://localhost:4000/api/posts/')
      .then((res) => {
        console.log(res.data);
        setstate(res.data.data);
      })
      .catch((e) => console.log(e));
  }, []);
  return (
<Editable rows={state} cols={cols}/>
  );
}

export default Posts;
