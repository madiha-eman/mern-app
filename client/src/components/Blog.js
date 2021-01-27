import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import axios from 'axios';
import { motion } from 'framer-motion'
import { useHistory } from "react-router-dom";
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 320,
    dixplay:'flex',
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems: 'flex-start'
  },
  media: {
    height: '400px',
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Blog() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [state, setstate] = useState([]);
//   const [msg, setmsg] = useState('')
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

//   const handleDelete = (id)=>{
//     console.log(id)
//     axios.delete('http://localhost:4000/api/products/'+id)
//     .then((res) => {
//       console.log(res.data);
//       setmsg(`${id} is deleted successfully`);
//       window.location='/products'
//       setOpen(false);
//     })
//     .catch((e) => console.log(e));


//   }
useEffect(() => {
    axios.get('http://localhost:4000/api/posts/')
    .then((res) => {
      console.log(res.data);
      setstate(res.data.data);
    })
    .catch((e) => console.log(e));
}, []);

  return (
    // <Card className={classes.root}>
       <Typography paragraph>
            <div className='products-container'>
              
                {state.map((item, ind) => (
                    <div className='product-card' key={item.id}>
                        <div className="product-hvr">
                        <div className='product-img'>
                            <motion.img src={item.img} alt="not found" 
                              initial={{opacity: 0}}
                              animate={{opacity: 1 }}
                              transition={{duration: 5 }} />
                             <div class="card-body text-white rgba-black-light p-2">
                                <h2>{item.title}</h2>
                                
                              </div>
                                   
                    <div class="middle">
                      <h4>{item.title}</h4>
                            <p>{item.description}</p>
                      <button className='btn-hvr'>Read more</button>
                    </div>
                        </div>
                       
                  
                    </div>
                    </div>
                ))}
            </div>
            </Typography>
           
/* </Card> */

  );
}
