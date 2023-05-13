import { Brands } from './Brands';
import { ButtonOnReset } from './ButtonOnReset';
import { Categories } from './Categories';
import { Price } from './Price';
import { Rating } from './Rating';
import './Sidebar.scss';

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <Categories />
      <Brands />
      <Rating />
      <Price />
      <ButtonOnReset />
    </div>
  );
};
