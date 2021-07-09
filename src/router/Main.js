import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../Users';
import dotenv from 'dotenv';
import axios from 'axios';
import Youtube from 'react-youtube';
import { useUsersState } from '../Users';
dotenv.config();

const Main = () => {
  const { logout } = useAuthContext();
  const state = useUsersState();
  const { categories } = state;
  const { select } = state;

  const [items, setItems] = useState([]);
  const [number, setNumber] = useState(0);
  const [start, setStart] = useState(false);
  const [playerPlayVideo, setPlayerPlayVideo] = useState(false);

  // 에피아이 받기
  const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
  const response = async () => {
    await axios
      .get(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${select[number].category}&maxResults=50&key=${API_KEY}`,
      )
      .then((res) => setItems(res.data.items))
      .catch((err) => console.log(err.response));
  };

  // 로그아웃하기
  const handleLogOut = () => {
    logout();
  };

  // 유튜브 api
  const opts = {
    width: '640',
    height: '390',
  };

  // 카테고리 고르기
  const clickHandler = (e) => {
    e.preventDefault();
    switch (e.target.innerText) {
      case '비발디':
        setNumber(0);
        break;
      case '베토벤':
        setNumber(1);
        break;
      case '모차르트':
        setNumber(2);
        break;
      default:
        console.error('맞는짝이없습니다.');
    }
    response();
    setStart(true);
  };

  // 시작하고 멈추기
  const videoOnReady = (event) => {
    event.target.playVideo();
    setPlayerPlayVideo(event);
    console.log(event);
  };

  const clickPlay = () => {
    playerPlayVideo.target.playVideo();
  };

  const clickPause = () => {
    playerPlayVideo.target.pauseVideo();
  };

  return (
    <>
      {start &&
        items
          .filter((v, i) => i === 0)
          .map((item) => {
            const { id, snippet = {} } = item;
            const { title, thumbnails = {}, resourceId = {} } = snippet;
            const { medium = {} } = thumbnails;
            const { videoId } = resourceId;
            return (
              <li key={id}>
                <img width={medium.width} height={medium.height} src={medium.url} alt="썸네일" />
                <Youtube opts={opts} videoId={videoId} onReady={videoOnReady} />
                <h3>{title}</h3>
              </li>
            );
          })}

      {categories.map((category) => (
        <button key={category.id} onClick={clickHandler}>
          {category.category}
        </button>
      ))}

      <button onClick={clickPlay}>시작</button>
      <button onClick={clickPause}>정지</button>

      <Link to="/signup">
        <button>회원가입하러가기 </button>
      </Link>
      <button onClick={handleLogOut}>로그아웃</button>
    </>
  );
};

export default Main;
