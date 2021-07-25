import React, { useState, useEffect, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuthContext } from '../Users';
import dotenv from 'dotenv';
import axios from 'axios';
import Youtube from 'react-youtube';
import { useUsersState } from '../Users';
import { firestore, storage } from '../firebase';
import Form from '../components/Form';
import Write from '../components/Write';
import '../styles/Main.css';
import '../styles/Public.css';
import ProfileChange from '../components/ProfileChange';

dotenv.config();

const Main = () => {
  const { logout, currentUser, background, setBackground } = useAuthContext();
  const state = useUsersState();
  const { categories, select } = state;
  const history = useHistory();

  const [items, setItems] = useState([]);
  const [number, setNumber] = useState(0);
  const [start, setStart] = useState(false);
  const [playerPlayVideo, setPlayerPlayVideo] = useState(false);
  const [write, setWrite] = useState([]);
  const [displayChange, setDisplayChange] = useState(false);
  const [targetNumber, setTargetNumber] = useState(0);
  const [gotoLogOut, setGoToLogout] = useState(false);

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
    history.push('/');
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
  const clickHandler = useCallback(
    (e) => {
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
      setStart(true);
    },
    [setNumber],
  );

  useEffect(() => {
    response();
    return response();
  }, [number]);

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

  const clickNext = () => {
    if (items.length - 1 <= targetNumber) {
      return setTargetNumber(0);
    }
    setTargetNumber((prev) => prev + 1);
  };
  const clickPrev = () => {
    if (targetNumber <= 0) {
      return setTargetNumber(items.length - 1);
    }
    setTargetNumber((prev) => prev - 1);
  };

  // 글가져오기
  const currentUserUid = (currentUserUid) => {
    firestore
      .collection(currentUserUid)
      .orderBy('createAt', 'desc')
      .onSnapshot((snapshot) => {
        const writeArray = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setWrite(writeArray);
      });
  };

  useEffect(() => {
    if (currentUser) {
      currentUserUid(`${currentUser.uid}`);
      storage
        .ref(`backgroundImage/bg${number + 1}.jpg`)
        .getDownloadURL()
        .then((rep) => setBackground(rep));
    } else {
      currentUserUid('gest');
    }
  }, [currentUser, setBackground, number]);

  return (
    <section className="main-section ">
      <div className="main-page-box">
        <div className="music-button-set">
          {categories.map((category) => (
            <button key={category.id} onClick={clickHandler}>
              {category.category}
            </button>
          ))}
          <div className="play-state-button">
            <button onClick={clickPlay}>시작</button>
            <button onClick={clickPause}>정지</button>
            <button onClick={clickNext}>다음</button>
            <button onClick={clickPrev}>이전</button>
          </div>
          <Link to="/">
            <button>홈으로</button>
          </Link>
        </div>

        {start &&
          items
            .filter((v) => {
              return v.snippet.position === targetNumber;
            })
            .map((item) => {
              const {
                id,
                snippet: {
                  resourceId: { videoId },
                },
              } = item;
              return (
                <Youtube key={id} opts={opts} videoId={videoId} onReady={videoOnReady} className="youtube-player" />
              );
            })}
        <div className="main-box">
          <div className="main-profile">
            {currentUser ? (
              <>
                <div>{currentUser.displayName}</div>
                {currentUser.photoURL && (
                  <img
                    src={currentUser.photoURL}
                    alt="프로필"
                    onClick={() => {
                      setGoToLogout(!gotoLogOut);
                      setDisplayChange(false);
                    }}
                  />
                )}
              </>
            ) : (
              <div>게스트</div>
            )}
            {gotoLogOut && (
              <>
                <button onClick={handleLogOut}>로그아웃</button>
                <button onClick={() => setDisplayChange((prev) => !prev)}>프로필변경</button>
                {displayChange && <ProfileChange />}
              </>
            )}
          </div>

          {!currentUser && (
            <Link to="/signup">
              <button>회원가입하러가기</button>
            </Link>
          )}

          <Form />
        </div>
        {write.map((write) => {
          return <Write key={write.id} write={write} />;
        })}
      </div>
      {background && <img className="background" src={background} alt="배경화면" />}
    </section>
  );
};

export default Main;
