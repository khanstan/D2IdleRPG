import React from 'react';
import { withAuthorization } from '../Session';
import { HERO_CLASSES_MAP } from '../../constants/gameConstants';


const InventoryPage = () => (
  <div>
    <img src={HERO_CLASSES_MAP.DRUID.portrait}></img>
    <p>Your inventory</p>
  </div>
);
 
const condition = authUser => !!authUser;
 
export default withAuthorization(condition)(InventoryPage);