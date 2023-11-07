import { serverHttp } from "./http";
import './websocket';

serverHttp.listen(8000, () => console.log('servidor rodando'))