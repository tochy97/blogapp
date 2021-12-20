import React, { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Routes, Route, Navigate } from "react-router-dom";
import Admin from "./Admin";
import NavComp from './NavComp/NavComp';
import { fetchPost } from './redux/actionCreators/postActionCreators';
import { auth } from './config/firebase'
import { loginUser } from './redux/actionCreators/authActionCreators';
import Dashboard from './Dashboard/Dashboard';
import ViewPost from './Dashboard/ViewPost';
import ReqAcc from './Dashboard/ReqAcc';
import Footer from './Footer/Footer';
import AboutCreator from './Dashboard/AboutCreator';
import AboutSite from './Dashboard/AboutSite';

function App() {
  const isLoading = useSelector(state => state.post.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    if(isLoading){
      dispatch(fetchPost());
    }
  }, [isLoading,dispatch]);
  useEffect(() => {
      auth.onAuthStateChanged(user=>{
          if(user === null){
              return;
          }
          const data = {
              user:user.providerData[0],
              id:user.uid,
          }
          dispatch(loginUser(data));
      })
  }, [dispatch]);
  
  return (
    <div className="App">
      <NavComp/>
      <Routes>
        <Route exact path="post/:postId" element={<ViewPost/>}/>
        <Route exact path="/" element={<Dashboard/>}/>
        <Route exact path="/aboutcreator" element={<AboutCreator/>}/>
        <Route exact path="/aboutsite" element={<AboutSite/>}/>
        <Route path="/admin/*" element={<Admin/>}/>
        <Route path="/login" element={<Navigate to="../admin/login" />}/>
        <Route path="/req" element={<ReqAcc/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
