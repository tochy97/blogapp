import React, {useEffect, Fragment} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {Routes, Route, Navigate, useNavigate} from "react-router-dom";
import Admin from "./Admin";
import NavComp from './NavComp/NavComp';
import { fetchPost } from './redux/actionCreators/postActionCreators';
import Dashboard from './Dashboard/Dashboard';
import ViewPost from './Dashboard/ViewPost';
import ReqAcc from './Dashboard/ReqAcc';

function App() {
  const isLoading = useSelector(state => state.post.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    if(isLoading){
      dispatch(fetchPost());
    }
  }, [isLoading,dispatch]);

  return (
    <div className="App">
      <NavComp/>
      <Routes>
        <Route exact path="post/:postId" element={<ViewPost/>}/>
        <Route exact path="/" element={<Dashboard/>}/>
        <Route path="/admin/*" element={<Admin/>}/>
        <Route path="/login" element={<Navigate to="/admin/login" />}/>
        <Route path="/req" element={<ReqAcc/>}/>
      </Routes>
    </div>
  );
}

export default App;
