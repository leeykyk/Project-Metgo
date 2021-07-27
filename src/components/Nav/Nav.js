import React, { useState, useEffect } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

// COMPONENTS
import Modal from './Modal/Modal';
import UserMy from './UserMy/UserMy';

// DATA
import { LOGIN_INFO, SIGNUP_INFO } from './NavData';

// STYLES
import * as S from './NavEle';
import { useHistory, useLocation } from 'react-router-dom';

function Nav() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserMyOpen, setIsUserMyOpen] = useState(false);
  const [form, setForm] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(
    // false
    !!localStorage.getItem('access_token')
  );

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (token) {
      setIsLoggedIn(token);
    }
  }, [isLoggedIn]);

  const loginOrSignup = e => {
    const { name } = e.target;
    {
      name === '로그인' ? setForm(LOGIN_INFO) : setForm(SIGNUP_INFO);
    }
    modalOpen();
  };

  const modalOpen = () => {
    setIsModalOpen(true);
  };

  const modalClose = () => {
    setIsModalOpen(false);
  };
  const userMyOpen = () => {
    setIsUserMyOpen(!isUserMyOpen);
  };

  return (
    <S.NavContainer>
      <S.Navbar>
        <S.NavLeft>
          <S.LogoBox>
            <S.LogoImg src="/images/metgo.png" art="logo" />
          </S.LogoBox>
          <S.MenuBox>
            <S.MenuList>견적보기</S.MenuList>
            <S.MenuList>채팅</S.MenuList>
            <S.MenuList>고수찾기</S.MenuList>
          </S.MenuBox>
        </S.NavLeft>
        <S.UserBox>
          {isLoggedIn ? (
            <>
              <S.UserImgBox>
                <S.UserImg src="/images/user_img1.jpg" alt="userImg" />
              </S.UserImgBox>
              <S.User onClick={userMyOpen}>
                <S.UserName>성정준 고객님</S.UserName>
                <IoIosArrowDown className="userIcons" />
              </S.User>
            </>
          ) : (
            <>
              <S.Login name="로그인" onClick={loginOrSignup}>
                로그인
              </S.Login>
              <S.Signup name="회원가입" onClick={loginOrSignup}>
                회원가입
              </S.Signup>
            </>
          )}
        </S.UserBox>
        {isUserMyOpen && <UserMy />}
      </S.Navbar>

      {isModalOpen && (
        <Modal
          form={form}
          modalClose={modalClose}
          setIsLoggedIn={setIsLoggedIn}
          modalOpen={modalOpen}
          setForm={setForm}
        />
      )}
    </S.NavContainer>
  );
}

export default Nav;
