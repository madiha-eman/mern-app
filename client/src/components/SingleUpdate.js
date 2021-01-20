import React, { useEffect, useState } from "react";
import { Button, ListGroup, Row, Col } from "react-bootstrap";
import axios from 'axios';
import FileBase64 from 'react-file-base64'
import { useParams } from "react-router-dom";

const SingleUpdate = () => {
    const [title, settitle] = useState('')
    const [description, setdescription] = useState('')
    const [img, setimg] = useState('')
    const { id } = useParams();
    const [user, setUser] = useState(null);
   const [update, setupadate]= useState('')

    const handleSubmit=(e)=>{
        e.preventDefault()
        let newPost = {title, description, img};
        axios.post('http://localhost:4000/api/posts/update/'+ id,newPost)
        .then(res => console.log(res))
        .catch(err=>console.log(err,'error'));
      }
      useEffect(() => {
        fetch("http://localhost:4000/api/posts/" + id)
          .then((res) => res.json())
          .then((res) => {
              console.log(res)
              setUser(res.data)
            })
          .catch((err) => console.log(err));
      }, [id]);

    return (
        <div>
    <form onSubmit={handleSubmit}>
      <Row className="mt-5" >
        <Col lg={3} md={2} sm={1} xs={1}></Col>
        <Col lg={6} md={8} sm={10} xs={10}>
          <ListGroup>
            <ListGroup.Item variant="primary" className="col-headers">
               New Post
            </ListGroup.Item>
            <ListGroup.Item variant="light">
              <Row>
                <Col className="col-headers">Title</Col>
                <Col>
                  <input type="text" value={user?.title} name='title' onChange={(e)=>settitle(e.target.value)} />
                </Col>
              </Row>
              <Row>
                <Col className="col-headers">Desc</Col>
                <Col>
                  <input type="text"  name='description' onChange={(e)=>setdescription(e.target.value)} />
                </Col>
              </Row>
              <Row>
                  <Col className="col-headers">image</Col>
                  <Col>
                    <FileBase64
                      multiple={false}
                      onDone={({base64})=>setimg(base64)}
                    />                </Col>
                </Row>
              <Row className="my-2">
                <Col className="text-center">
                  <Button type='submit' variant="info" size="md">
                    UPDATE
                  </Button>
               
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col lg={3} md={2} sm={1} xs={1}></Col>
      </Row>
    </form>

        </div>
    )
}

export default SingleUpdate
