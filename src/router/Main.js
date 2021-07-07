import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../Users';
import Loading from '../components/Loading';
import dotenv from 'dotenv';
import axios from 'axios';
import Youtube from 'react-youtube';
dotenv.config();

const Main = () => {
  const { logout } = useAuthContext();
  const [items, setItems] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

  const handleLogOut = () => {
    logout();
  };

  useEffect(async () => {
    await axios
      .get(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLih16QaoQoPdiZDgUX_0067s7UYsFYgrw&maxResults=50&key=${API_KEY}`,
      )
      .then((res) => setItems(res.data.items))
      .catch((err) => console.log(err.response));
    setIsLoading(false);
  }, [isLoading]);

  const opts = {
    width: '640',
    height: '390',
    playerVars: {
      autoplay: 0,
    },
  };

  console.log(items);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        items.map((item) => {
          const { id, snippet = {} } = item;
          const { title, thumbnails = {}, resourceId = {} } = snippet;
          const { medium = {} } = thumbnails;
          const { videoId } = resourceId;
          return (
            <li key={id}>
              <p>
                <img width={medium.width} height={medium.height} src={medium.url} alt="" />
                <Youtube opts={opts} videoId={videoId} />
              </p>
              <h3>{title}</h3>
            </li>
          );
        })
      )}
      {/* <button onClick={onPause}>멈춤</button> */}
      <Link to="/signup">
        <button>회원가입하러가기 </button>
      </Link>
      <button onClick={handleLogOut}>로그아웃</button>
    </>
  );
};

export default Main;
