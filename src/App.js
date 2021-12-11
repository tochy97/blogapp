import React, {useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {Routes, Route, Navigate, useNavigate} from "react-router-dom";
import Admin from "./Admin";
import NavComp from './NavComp/NavComp';
import { auth } from './config/firebase';
import { fetchPost } from './redux/actionCreators/postActionCreators';
import { loginUser } from './redux/actionCreators/authActionCreators';
import Dashboard from './Dashboard/Dashboard';

function App() {
  const isLoading = useSelector(state => state.post.isLoading);
  const dispatch = useDispatch();
  const histroy = useNavigate();

  useEffect(() => {
    if(isLoading){
      dispatch(fetchPost());
    }
  }, [isLoading,dispatch]);

  return (
    <div className="App">
      <NavComp/>
      <Routes>
        <Route exact path="/" element={<Dashboard/>}/>
        <Route path="/admin/*" element={<Admin/>}/>
        <Route path="/login" element={<Navigate to="/admin/login" />}/>
      </Routes>
    </div>
  );
}

export default App;
