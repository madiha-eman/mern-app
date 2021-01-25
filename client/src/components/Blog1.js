import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { Link} from "react-router-dom"
import './terry.css'



const Blog1 = () => {

    const [state, setstate] = useState([]);
    //   const [msg, setmsg] = useState('')
      const [open, setOpen] = React.useState(false);

      useEffect(() => {
        axios.get('http://localhost:4000/api/posts/')
        .then((res) => {
          console.log(res.data);
          setstate(res.data.data);
        })
        .catch((e) => console.log(e));
    }, []);
    return (
        <div>
            	<h2>Terry</h2>
				<div class="grid">
                {state.map((item, ind) => (
					<figure class="effect-terry">
                    
						<img src={item.img} alt="img16"/>
						<figcaption>
							<h2>{item.title}</h2>
							<p>
                                <Link to='/read'>
								<a href="#"><i class="fa fa-fw fa-download"></i></a></Link>
								<a href="#"><i class="fa fa-fw fa-heart"></i></a>
								<a href="#"><i class="fa fa-fw fa-share"></i></a>
								<a href="#"><i class="fa fa-fw fa-tags"></i></a>
							</p>
                        </figcaption>	
                   	
					</figure>
                ))}
				</div>
        </div>
    )
}

export default Blog1
