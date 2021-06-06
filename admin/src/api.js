import axios from 'axios';

export default axios.create({
  baseURL: `https://ersystems.herokuapp.com/`
});