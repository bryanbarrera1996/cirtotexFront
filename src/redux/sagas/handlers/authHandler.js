import { call, put, takeLatest } from 'redux-saga/effects';
import { types } from '../../types/types';
import { loginApi } from '../requests/authResquest';

function* setLoginApi() {
    try{
        const response = yield call(loginApi);
        console.log(response);
        yield put({type:types.setTokenApi,payload:response})
    }catch(e){
        console.log(e);
        const msg={
            msg:'No se pudo lanzar el proceso',
            severity:'error'
        } 
        yield put({type: types.uiSetMessage,payload:msg});
    }
}

function* authSaga (){
    yield takeLatest(types.loginApi,setLoginApi)
}

export default authSaga;