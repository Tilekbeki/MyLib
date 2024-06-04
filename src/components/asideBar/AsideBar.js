import { Component } from 'react';
import ControlForm from '../controlForm/ControlForm';
import './AsideBar.scss';

class AsideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.setState({ data: this.props.data });
        }
    }
    render() {
        return(
            <div className='aside-bar'>
                <ControlForm data={this.state.data} createBook={this.props.createBook}></ControlForm>
            </div>
        )
    }
}

export default AsideBar;