import React from 'react';
import Bgimage from '../components/Bgimage';
import Bgmusic from '../components/Bgmusic';
import { useUsersState } from '../Users';

const Main = () => {
  const context = useUsersState();
  const { categories } = context;
  console.log(categories[0]);
  return (
    <>
      {categories.map((category) => (
        <button key={category.id}>{category.category}</button>
      ))}
      <Bgimage />
      <Bgmusic />
    </>
  );
};

export default Main;
