import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../Users';
import dotenv from 'dotenv';
import axios from 'axios';
import Youtube from 'react-youtube';
import { useUsersState } from '../Users';
import { firestore } from '../firebase';
import '../styles/Main.css';

dotenv.config();

const Main = () => {
  const { logout, currentUser } = useAuthContext();
  const state = useUsersState();
  const { categories } = state;
  const { select } = state;

  console.log(currentUser);

  const [items, setItems] = useState([]);
  const [number, setNumber] = useState(0);
  const [start, setStart] = useState(false);
  const [playerPlayVideo, setPlayerPlayVideo] = useState(false);
  const [value, setValue] = useState('');
  const [write, setWrite] = useState([]);

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
    playerVars: {
      autoplay: 1,
    },
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
    setPlayerPlayVideo(event);
  };

  const clickPlay = () => {
    playerPlayVideo.target.playVideo();
  };

  const clickPause = () => {
    playerPlayVideo.target.pauseVideo();
  };

  // 메모장기능
  const changeValue = (e) => {
    const {
      target: { value },
    } = e;
    setValue(value);
  };
  // 글쓰기
  const submitHandler = (e) => {
    e.preventDefault();
    firestore.collection('cities').add({
      value,
      createAt: Date.now(),
      createId: currentUser.uid,
    });
    setValue('');
  };

  // 글가져오기
  const getValue = async () => {
    const write = await firestore.collection('cities').get();
    write.forEach((document) => {
      const newObj = {
        ...document.data(),
        id: document.id,
      };
      setWrite((prev) => [newObj, ...prev]);
    });
  };

  useEffect(() => {
    getValue();
    return () => {
      getValue();
      console.log('hi');
    };
  }, []);

  console.log(write);

  return (
    <>
      {start &&
        items
          .filter((v) => {
            return v.snippet.position === 0;
          })
          .map((item) => {
            const {
              id,
              snippet: {
                resourceId: { videoId },
              },
            } = item;
            return <Youtube key={id} opts={opts} videoId={videoId} onReady={videoOnReady} className="youtube-player" />;
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

      <form onSubmit={submitHandler}>
        <input type="text" value={value} onChange={changeValue} />
        <button>보내기</button>
      </form>
      <div>
        {write.map((write) => (
          <div key={write.id}>{write.value}</div>
        ))}
      </div>
    </>
  );
};

export default Main;
