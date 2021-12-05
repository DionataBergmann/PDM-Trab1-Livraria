import axios from 'axios';

const Conecta = axios.create({baseURL: 'http://localhost:3002/'});

export default Conecta;