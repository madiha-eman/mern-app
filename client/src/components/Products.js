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


function Products() {
  const [state, setstate] = useState([]);
  const [msg, setmsg] = useState('')
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

  const handleDelete = (id)=>{
    console.log(id)
    axios.delete('http://localhost:4000/api/products/'+id)
    .then((res) => {
      console.log(res.data);
      setmsg(`${id} is deleted successfully`);
      window.location='/products'
      setOpen(false);
    })
    .catch((e) => console.log(e));


  }
  useEffect(() => {
      axios.get('http://localhost:4000/api/products/')
      .then((res) => {
        // console.log(res.data);
        setstate(res.data.data);
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <Row className="mt-5">
      <Col lg={3} md={2} sm={1} xs={1}></Col>
      <Col lg={6} md={8} sm={10} xs={10}>
        <p>{msg}</p>
        <ListGroup>
          <ListGroup.Item variant="primary">
            <Row className="col-headers">
              <Col>Name</Col>
              <Col>image</Col>
              <Col>desc</Col>
              <Col>Actions</Col>
            </Row>
          </ListGroup.Item>

          {state.map((item, ind) => (
            <ListGroup.Item key={ind} variant="light">
              <Row>
                <Col>{item.title}</Col>
                <Col><img width={100} height={60} src={item.img} /></Col>
                <Col>{item.description}</Col>
               
                <Col>
                <Button 
                    variant="info"
                    size="sm"
                    as={Link}
                    to={"/single-product/" + item._id}
                  >
                    View
                  </Button>&nbsp;
                  <Button 
                    variant="info"
                    size="sm" 
                    onClick={handleClickOpen}
                  >
                    Delete
                  </Button>
                  {/* <Button 
                    variant="info"
                    size="sm" 
                    as={Link}
                    to={"/single-update/" + item._id}
                  >
                   update
                  </Button> */}
                   <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                  >
                    <DialogTitle id="responsive-dialog-title">{"are you sure you want to delete?"}</DialogTitle>
                    <DialogActions>
                      <Button autoFocus onClick={handleClose} color="primary">
                        Disagree
               </Button>
                      <Button onClick={() => handleDelete(item._id)} color="primary" autoFocus>
                        Agree
               </Button>
                    </DialogActions>
                  </Dialog>
                </Col>
              </Row>
            </ListGroup.Item>
          ))} 
        </ListGroup>
      </Col>
      <Col lg={3} md={2} sm={1} xs={1}></Col>
    </Row>
  );
}

export default Products;
