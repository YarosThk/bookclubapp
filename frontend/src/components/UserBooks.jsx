import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function UserBooks() {
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    return () => {
      //
    };
  }, []);

  return <div>User posts go here</div>;
}

export default UserBooks;
