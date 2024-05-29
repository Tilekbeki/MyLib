import { Component } from 'react';
import ControlForm from '../controlForm/ControlForm';
import './AsideBar.scss';

class AsideBar extends Component {
    render() {
        return(
            <div className='aside-bar'>
                <ControlForm></ControlForm>
            </div>
        )
    }
}

export default AsideBar;